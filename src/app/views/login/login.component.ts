import { Component } from '@angular/core';
import { iCompany } from '../../models/iCompany';
import { UserService } from '../../services/user/user.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  documentNumber:number = 0; 
  items: any[] = [];
  companyNames: string[] = [];
  selectedCompany: string = '';
  companyName: string = '';
  password: string = '';
  isCompanySelected: boolean = false;
  companyPassword: string = '';  

  @ViewChild('passwordInput', { static: false }) passwordInput: ElementRef | null = null;

  constructor(
    private userService: UserService
    ) { }

    handleConsultCompanies(): void {
      if (!this.documentNumber) {
          console.error('Número de documento no puede estar vacío');
          return;
      }
  
      this.userService.GetCompaniesByDocumentNumber(this.documentNumber).subscribe(
          (response) => {
              console.log('response of GetCompaniesByDocumentNumber ', response);       
              this.userService.setLastResponse(response);       
              this.companyNames = response.map((company: any) => company.companyName);
  
              if (this.companyNames.length > 0) {
                  // Por defecto se usa el primer elemento
                  this.selectedCompany = this.companyNames[0];
                  if (response && response.length > 0) {
                    this.companyPassword = response[0]?.['companyPassword'] ?? ''; 
                  }
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
              console.error('Error fetching company names: ', error);
          }
      );
    } 

    updateCompanyPassword(): void {
      const selectedCompanyIndex = this.companyNames.findIndex(company => company === this.selectedCompany);      

      if (selectedCompanyIndex !== -1) {
        const response = this.userService.getLastResponse();
        this.companyPassword = response[selectedCompanyIndex]['companyPassword'];
        console.log("this.companyPassword ", this.companyPassword);
      }
    }  

    handleLogin(): void {
      if (this.password === this.companyPassword) {
        console.log('Contraseña correcta ', this.password, this.companyPassword);       
      } else {
        console.log('Contraseña incorrecta. Verifica tus credenciales.');        
      }
    }
  
    enableFields(): void {
      const companyNameElement = document.getElementById('companyName') as HTMLSelectElement;
      const companyPasswordElement = document.getElementById('companyPassword') as HTMLInputElement;      
  
      if (companyNameElement && companyPasswordElement) {
        companyNameElement.disabled = false;
        companyPasswordElement.disabled = false;        
      }
    }
}
