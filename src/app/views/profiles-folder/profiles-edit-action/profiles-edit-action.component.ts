import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile/profile.service';
import * as bootstrap from 'bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageChangeService } from '../../../services/general/language-change-service';
import { iProfileDTO } from '../../../models/iProfileDTO';
import { ProfileTransferService } from '../../../services/profile/profile-transfer.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-profiles-edit-action',
  templateUrl: './profiles-edit-action.component.html',
  styleUrl: './profiles-edit-action.component.css'
})
export class ProfilesEditActionComponent implements AfterViewInit, OnInit {
  myForm: FormGroup;
  modalMessage: string = '';
  modalHeader: string = '';
  profileIdReceived: number = 0;

  profile: iProfileDTO = {
    idProfile: 0,
    codProfile: '',
    nameProfile: '',
    description: ''
  };
  private modal: bootstrap.Modal | null = null;
  serviceError: string = '';
  showServiceError: boolean = false;

  @ViewChild('errorModal') modalElementRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private translate: TranslateService,
    private languageChangeService: LanguageChangeService,
    private profileTransferService: ProfileTransferService,
    private userService: UserService
  ) {
    this.myForm = this.fb.group({
      codProfile: ['', [Validators.required]],
      nameProfile: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Suscribirse a cambios de idioma
    this.languageChangeService.currentLanguage.subscribe(language => {
      this.translate.use(language);
    });

    this.profileTransferService.currentProfile.subscribe(profile => { 
      if (profile) {
        console.log(profile);
        this.profile = profile;
        this.profileIdReceived = profile.idProfile;        
        this.myForm.patchValue(profile);
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
    //console.log(this.myForm.valid); 

    if (this.myForm.valid) {
      
      const profile: iProfileDTO = {
        idProfile: this.profileIdReceived,
        codProfile: this.myForm.value.codProfile,
        nameProfile: this.myForm.value.nameProfile,
        description: this.myForm.value.description       
      };          
      //console.log(profile);

      this.profileService.update(profile).subscribe(
        response => {
          console.log(response);
          this.translate.get('SAVED_SUCCESSFULLY').subscribe((translatedMessage: string) => {
            this.modalMessage = translatedMessage;
            this.translate.get('SUCCESS').subscribe((translatedHeader: string) => {
              this.modalHeader = translatedHeader;
              this.showModal(this.modalMessage, this.modalHeader);
            });
          });
          this.resetForm();
        },
        error => {
          this.serviceError = error.error?.message || 'UNKNOWN_ERROR';
          this.translateServiceError(this.serviceError);
          this.showServiceError = true;
        }
      );
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

  onCancel(): void {
    this.myForm.reset({
      profileCode: '',
      profileName: '',
      profileDescription: ''
    });
  }
}
