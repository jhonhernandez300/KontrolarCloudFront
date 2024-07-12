import { Component } from '@angular/core';
import { iCompany } from '../../models/iCompany';
import { UserService } from '../../services/user/user.service';
import { ViewChild, ElementRef } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { LocalStorageService } from '../../helpers/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  documentNumber: number = 0;
  idCompany: number = 0;
  idUser: number = 0;
  items: any[] = [];
  companyNames: string[] = [];
  selectedCompany: string = '';
  companyName: string = '';
  password: string = '';
  isCompanySelected: boolean = false;
  companyPassword: string = '';
  modalMessage: string = '';
  token: string = '';

  @ViewChild('passwordInput', { static: false })
  passwordInput: ElementRef | null = null;

  constructor(private userService: UserService, 
    private localStorageService: LocalStorageService,    
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  showModal(message: string): void {
    this.modalMessage = message;
    const modalElement = document.getElementById('errorModal');

    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('No se encontró el elemento modal con id "errorModal".');
    }
  }

  handleConsultCompanies(): void {
    const numberPattern = /^\d+$/;
    if (!this.documentNumber) {
      console.error('Número de documento no puede estar vacío');
      this.showModal('Número de documento no puede estar vacío');
      return;
    } else if (!numberPattern.test(this.documentNumber.toString())) {
      console.error('Número de documento debe contener solo números');
      this.showModal('Número de documento debe contener solo números');
      return;
    }
  
    this.userService
      .GetCompaniesByDocumentNumber(this.documentNumber)
      .subscribe(
        (response) => {
          //console.log('response of GetCompaniesByDocumentNumber ', response);
          
          if (Array.isArray(response)) {
            this.companyNames = response.map((company: any) => company.CompanyName);
          } else {
            console.error("La respuesta no es un array", response);
          }
  
          this.userService.setLastResponse(response);         
          //console.log("this.companyNames ", this.companyNames);
  
          if (this.companyNames.length > 0) {
            // Por defecto se usa el primer elemento
            this.selectedCompany = this.companyNames[0];
            this.idCompany = response[0]['IdCompany'];
            //console.log("this.idCompany ", this.idCompany);
            this.updateCompanyPassword();
            this.isCompanySelected = true;
  
            setTimeout(() => {
              if (this.passwordInput) {
                this.passwordInput.nativeElement.focus();
              }
            }, 0);
          } else {
            this.isCompanySelected = false;
            this.selectedCompany = '';
            this.companyPassword = '';
          }
        },
        (error) => {
          if (error.status === 404) {
            this.showModal('No se encontraron compañías para el número de documento proporcionado.');
          } else {
            console.error('Error fetching company names: ', error);
          }
        }
      );
  }  

  updateCompanyPassword(): void {
    const selectedCompanyIndex = this.companyNames.findIndex(
      (company) => company === this.selectedCompany
    );
    //console.log('this.selectedCompanyIndex ', selectedCompanyIndex);    

    if (selectedCompanyIndex !== -1) {
      const response = this.userService.getLastResponse();
      //console.log('this.response ', response);  
      this.companyPassword = response[selectedCompanyIndex]['CompanyPassword'];
      //console.log('this.companyPassword ', this.companyPassword);
      this.idCompany = response[selectedCompanyIndex]['IdCompany'];
      //console.log('this.idCompany ', this.idCompany);
    }
  }

  getToken(): void{
    this.userService
      .getToken(this.documentNumber, this.idCompany)
      .subscribe(
        (response) => {
          console.log('response of GetToken ', response);    
          this.token = response;      
        },
        (error) => {
          if (error.status === 404) {
            this.showModal('Hubo un error al obtener el token.');
          } else {
            console.error('Error al obtener el token ', error);
          }
        }
      );
  }

  handleLogin(): void {    
    //console.log("this.password ", this.password);
    //console.log("this.companyPassword ", this.companyPassword);
    if (!this.password) {
      console.error('Número de documento no puede estar vacío');
      this.showModal('El password de la compañía no puede estar vacío');
      return;
    }else if (this.password === this.companyPassword) {
      //console.log('Contraseña correcta ', this.password, this.companyPassword);      
      this.getToken();
      console.log("this.token ", this.token);
      this.localStorageService.setData('token', this.token);
      const currentDate = new Date();
      const dateString = currentDate.toISOString();        
      localStorage.setItem('last date', dateString);
      this.router.navigate(['/bienvenido']);
    } else {
      //console.log('Contraseña incorrecta. Verifica tus credenciales.');
      this.showModal('Contraseña incorrecta. Verifica tus credenciales.');
    }    
  }

  enableFields(): void {
    const companyNameElement = document.getElementById(
      'companyName'
    ) as HTMLSelectElement;
    const companyPasswordElement = document.getElementById(
      'companyPassword'
    ) as HTMLInputElement;

    if (companyNameElement && companyPasswordElement) {
      companyNameElement.disabled = false;
      companyPasswordElement.disabled = false;
    }
  }
}
