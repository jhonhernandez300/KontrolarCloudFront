import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { iCompany } from '../../models/iCompany';
import { UserService } from '../../services/user/user.service';
import { LocalStorageService } from '../../helpers/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { DateFormatter } from '../../helpers/date-formatter';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from '../../services/general/auth-service.service';
import { CryptoHelper } from '../../helpers/CryptoHelper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  identificationNumber: number = 0;
  idCompany: number = 0;
  idUser: number = 0;
  items: any[] = [];
  companyNames: string[] = [];
  selectedCompany: string = '';
  companyName: string = '';
  password: string = '';
  isCompanySelected: boolean = false;
  isEnabled: boolean = false;
  companyPassword: string = '';
  modalMessage: string = '';
  token: string = '';
  licenseValidDate: string = '';

  @ViewChild('passwordInput', { static: false })
  passwordInput: ElementRef | null = null;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {}

  private showModal(messageKey: string): void {
    this.translate.get(messageKey).subscribe((translatedMessage: string) => {
      this.modalMessage = translatedMessage;
      const modalElement = document.getElementById('errorModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error('No se encontró el elemento modal con id "errorModal".');
      }
    });
  }

  private validateIdentificationNumber(): boolean {
    const numberPattern = /^\d+$/;
    if (!this.identificationNumber) {
      this.showModal('IDENTIFICATION_NUMBER_CANNOT_BE_EMPTY');
      return false;
    } else if (!numberPattern.test(this.identificationNumber.toString())) {
      this.showModal('IDENTIFICATION_NUMBER_MUST_HAVE_ONLY_NUMBERS');
      return false;
    }
    return true;
  }

  private handleCompaniesResponse(response: any): void {
    if (Array.isArray(response)) {
      // const passwordDeBD = response.map((company: any) => company.Password);
      // console.log(passwordDeBD);
      // const encryptedPassword = CryptoHelper.encrypt(passwordDeBD[0]);
      // console.log(passwordDeBD[0]);
      // console.log(encryptedPassword);
      this.companyNames = response.map((company: any) => company.CompanyName);
    } else {
      console.error("La respuesta no es un array", response);
    }

    this.userService.setLastResponse(response);
    if (this.companyNames.length > 0) {
      this.selectFirstCompany(response);
    } else {
      this.resetCompanySelection();
    }
  }

  private selectFirstCompany(response: any): void {
    this.selectedCompany = this.companyNames[0];
    this.idCompany = response[0]['IdCompany'];
    this.updateCompanyPassword();
    this.isCompanySelected = true;
    this.focusPasswordInput();
  }

  private resetCompanySelection(): void {
    this.isCompanySelected = false;
    this.selectedCompany = '';
    this.companyPassword = '';
  }

  private focusPasswordInput(): void {
    setTimeout(() => {
      if (this.passwordInput) {
        this.passwordInput.nativeElement.focus();
      }
    }, 0);
  }

  handleConsultCompanies(): void {
    if (!this.validateIdentificationNumber()) return;

    this.userService
      .GetCompaniesByIdentificationNumber(this.identificationNumber)
      .subscribe(
        (response) => this.handleCompaniesResponse(response),
        (error) => this.handleCompaniesError(error)
      );
  }

  private handleCompaniesError(error: any): void {
    if (error.status === 404) {
      this.showModal('NO_COMPANIES_FOUND_FOR_THE_IDENTIFICATION_NUMBER_PROVIDED');
    } else {
      console.error('Error fetching company names: ', error);
    }
  }

  public updateCompanyPassword(): void {
    const selectedCompanyIndex = this.companyNames.findIndex(
      (company) => company === this.selectedCompany
    );

    if (selectedCompanyIndex !== -1) {
      const response = this.userService.getLastResponse();
      this.companyPassword = response[selectedCompanyIndex]['Password'];
      this.isEnabled = response[selectedCompanyIndex]['IsEnabled'];
      const date = new Date(response[selectedCompanyIndex]['LicenseValidDate']);
      const dateFormatter = new DateFormatter();
      this.licenseValidDate = dateFormatter.formatDate(date);
      this.idCompany = response[selectedCompanyIndex]['IdCompany'];
    }
  }

  private handleTokenResponse(response: any): void {
    this.token = response;
    this.localStorageService.setToken('token', this.token);    
    localStorage.setItem('last date', new Date().toISOString());    

    this.authService.setAuthenticated(true); 
    this.router.navigate(['/bienvenido']);
  }

  private handleTokenError(error: any): void {
    console.log(error);
    if (error.status === 404) {
      this.showModal('THERE_WAS_AN_ERROR_GETTING_THE_TOKEN');
    } else {
      console.error('Error al obtener el token ', error);
    }
  }

  getToken(): void {
    this.userService
      .getToken(this.identificationNumber, this.idCompany)
      .subscribe(
        (response) => this.handleTokenResponse(response),
        (error) => this.handleTokenError(error)
      );
  }

  private isPasswordValid(): boolean {
    //console.log(this.password);
    //console.log(this.companyPassword);
    if (!this.password) {
      this.showModal('THE_PASSWORD_CANNOT_BE_EMPTY');
      return false;
    } else if (this.password !== this.companyPassword) {
      this.showModal('INCORRECT_PASSWORD_VERIFY_YOUR_CREDENTIALS');
      return false;
    }
    return true;
  }

  private isLicenseValid(): boolean {
    const today = new Date();
    const dateFormatter = new DateFormatter();
    const formattedDate = dateFormatter.formatDate(today);

    if (this.licenseValidDate < formattedDate) {
      this.showModal('THE_LICENCE_HAS_EXPIRED');
      return false;
    }
    return true;
  }

  handleLogin(): void {
    if (!this.isPasswordValid()) return;

    if (this.isEnabled) {
      if (this.isLicenseValid()) {        
        this.getToken();        
        this.localStorageService.setData('selectedCompany', this.selectedCompany);        
      }
    } else {
      this.showModal('THIS_USERS_ACCOUNT_FOR_THIS_COMPANY_IS_DEACTIVATED');
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
