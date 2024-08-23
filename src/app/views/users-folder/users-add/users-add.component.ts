import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { iUserDTO } from '../../../models/iUserDTO';
import * as bootstrap from 'bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageChangeService } from '../../../services/general/language-change-service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements AfterViewInit, OnInit {
  myForm: FormGroup;
  modalMessage: string = '';
  modalHeader: string = '';
  identificationNumber = 0;
  names = '';
  surnames = '';  
  modalVisible: boolean = false;
  private modal: bootstrap.Modal | null = null;
  serviceError: string = '';
  showServiceError: boolean = false;
  messageHeader: string = '';
  responseMessage: string = '';
  messageStatus: string = '';

  @ViewChild('errorModal') modalElementRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private languageChangeService: LanguageChangeService
  ) {
    this.myForm = this.fb.group({
      identificationNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(25)]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]]      
    });
  }

  ngOnInit(): void {
    // Suscribirse a cambios de idioma
    this.languageChangeService.currentLanguage.subscribe(language => {
      this.translate.use(language);
    });
  }

  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(this.modalElementRef.nativeElement);
  }

  private showModal(message: string, header: string): void {
    this.modalMessage = message;
    this.modalHeader = header;
    this.modalVisible = true;

    if (this.modal) {
      this.modal.show();
      this.modalElementRef.nativeElement.addEventListener('hidden.bs.modal', this.onModalHidden.bind(this), { once: true });
    } else {
      console.error('No se encontró el elemento modal con id "errorModal".');
    }
  }

  private onModalHidden(): void {
    this.modalVisible = false;
    if (this.modalHeader === 'Éxito') {
      this.resetForm();
    }
  }

  public resetForm(): void {    
    this.myForm.reset({
      identificationNumber: '',
      firstName: '',
      lastName: ''      
    });
  }

  onSubmit() {
    this.resetVariables(); // En caso de que tenga algo de una interacción anterior
  
    if (this.myForm.valid) {
      const user: iUserDTO = {
        idUser: 0,
        identificationNumber: this.myForm.value.identificationNumber,
        names: this.myForm.value.firstName,
        surnames: this.myForm.value.lastName        
      };
  
      this.userService.saveData(user).subscribe(
        response => {
          console.log(response);
          this.responseMessage = response.message;
          this.messageStatus = 'success';
  
          // Suscribirse a cambios de idioma
          this.languageChangeService.currentLanguage.subscribe(language => {
            this.translate.use(language).subscribe(() => {
              this.translate.get(this.responseMessage).subscribe((translatedMessage: string) => {
                this.responseMessage = translatedMessage;
                this.translate.get('Exito').subscribe((translatedHeader: string) => {
                  this.messageHeader = translatedHeader;
                  this.showModal(this.responseMessage, this.messageHeader);
                });
              });
            });
          });
        },
        error => {
          this.serviceError = error.error?.message || 'Error desconocido';
          this.translateServiceError(this.serviceError);
          this.showServiceError = true;
        }
      );
    } else {      
      this.translateServiceError('FORM_IS_INVALID');
      this.showServiceError = true;
    }
  }  

  translateServiceError(message: string): void{
    this.translate.get(message).subscribe((translatedName: string) => {               
      this.serviceError = translatedName;
    });
  }

  resetVariables(): void{
    this.serviceError = '';
    this.showServiceError = false;
    this.messageHeader = '';
    this.responseMessage = '';
  }

  closeModal(): void {
    this.resetVariables();
    this.resetForm();

    if (this.modal) {
      this.modal.hide();
    }
  }
}
