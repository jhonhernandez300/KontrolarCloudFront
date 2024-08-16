import { UserTransferService } from '../../../services/user/user-transfer.service'
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageChangeService } from '../../../services/language-change-service';
import { ProfileTransferService } from '../../../services/profile/profile-transfer.service';
import { iUserDTO } from '../../../models/iUserDTO';

@Component({
  selector: 'app-users-edit-action',
  templateUrl: './users-edit-action.component.html',
  styleUrl: './users-edit-action.component.css'
})
export class UsersEditActionComponent implements AfterViewInit, OnInit {
  myForm: FormGroup;
  modalMessage: string = '';
  modalHeader: string = '';
  user: iUserDTO = {
    idUser: 0,
    identificationNumber: '',
    names: '',
    surnames: '',
    userMaster: false
  };
  private modal: bootstrap.Modal | null = null;
  serviceError: string = '';
  showServiceError: boolean = false;

  @ViewChild('errorModal') modalElementRef!: ElementRef;

  constructor(
    private userTransferService: UserTransferService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private languageChangeService: LanguageChangeService,
    private profileTransferService: ProfileTransferService
    )
    {
      this.myForm = this.fb.group({
        identificationNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(25)]],
        firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(100)]],
        lastName: ['', [Validators.required, Validators.maxLength(100)]],
        userMaster: ['no', Validators.required]
      });
    }

  ngOnInit(): void {
    // Suscribirse a cambios de idioma
    this.languageChangeService.currentLanguage.subscribe(language => {
      this.translate.use(language);
    });

    this.userTransferService.currentUser.subscribe(user => { 
      if (user) {        
        console.log(user);
        this.user = user;
        this.myForm.patchValue(user);
      }
    });
  }

  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(this.modalElementRef.nativeElement);
  }

  private showModal(message: string, header: string): void {
    this.modalMessage = message;
    this.modalHeader = header;
    if (this.modal) {
      this.modal.show();
      this.modalElementRef.nativeElement.addEventListener('hidden.bs.modal', this.onModalHidden.bind(this), { once: true });
    }
  }

  private onModalHidden(): void {
    if (this.modalHeader === 'SUCCESS') {
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.myForm.reset({
      CodProfile: '',
      NameProfile: '',
      Description: ''
    });
  }

  onSubmit() {
    this.resetVariables();    

    if (this.myForm.valid) {
      
      const user: iUserDTO = {
        idUser: 0,
        identificationNumber: this.myForm.value.IdentificationNumber,
        names: this.myForm.value.Names,
        surnames: this.myForm.value.Surnames,
        userMaster: this.myForm.value.UserMaster
      };          

      // this.userService. saveData(user).subscribe(
      //   response => {
      //     console.log(response);
      //     this.translate.get('SAVED_SUCCESSFULLY').subscribe((translatedMessage: string) => {
      //       this.modalMessage = translatedMessage;
      //       this.translate.get('SUCCESS').subscribe((translatedHeader: string) => {
      //         this.modalHeader = translatedHeader;
      //         this.showModal(this.modalMessage, this.modalHeader);
      //       });
      //     });
      //     this.resetForm();
      //   },
      //   error => {
      //     this.serviceError = error.error?.message || 'UNKNOWN_ERROR';
      //     this.translateServiceError(this.serviceError);
      //     this.showServiceError = true;
      //   }
      // );
    } else {      
      this.translateServiceError('FORM_IS_INVALID');
      this.showServiceError = true;
    }
  }

  translateServiceError(message: string): void {
    this.translate.get(message).subscribe((translatedMessage: string) => {      
      this.serviceError = translatedMessage;
      this.showServiceError = true;
    });
  }

  private resetVariables(): void {
    this.serviceError = '';
    this.showServiceError = false;
  }

  closeModal(): void {
    if (this.modal) {
      this.modal.hide();
    }
  }

}