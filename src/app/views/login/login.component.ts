import { Component } from '@angular/core';
import { iCompany } from '../../models/iCompany';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  company: iCompany = {
    IdCompany: 0,
    CompanyName: '',
    DB: '',
    UserName: '',
    CompanyPassword: '',
    LicenseValidDate: new Date,
    ConnectionsSimultaneousNumber: 0
  };

  documentNumber:string = ''; 
  items: any[] = [];

  constructor(
    private userService: UserService
    ) { }

    handleConsultCompanies(): void {      
      if (this.documentNumber) {
        console.log('Número de documento a consultar:', this.documentNumber);  
        
        this.userService.GetCompaniesByDocumentNumber(Number(this.documentNumber)).toPromise()
          .then((response) => {
            console.log('Respuesta de GetCompaniesByDocumentNumber:', response);
            this.items = response;
            this.enableFields();
          })
          .catch((error) => {
            console.error('Error al llamar a GetCompaniesByDocumentNumber:', error);
          });
      } else {
        console.warn('Por favor ingrese un número de documento válido.');
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
