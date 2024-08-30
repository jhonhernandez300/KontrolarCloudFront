import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile/profile.service';
import { iOptionProfileDTO } from '../../../models/iOptionProfileDTO';
import * as bootstrap from 'bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageChangeService } from '../../../services/general/language-change-service';

@Component({
  selector: 'app-profiles-options',
  templateUrl: './profiles-options.component.html',
  styleUrl: './profiles-options.component.css'
})
export class ProfilesOptionsComponent implements AfterViewInit, OnInit {
  private modal: bootstrap.Modal | null = null;
  myForm: FormGroup;
  serviceError: string = '';
  showServiceError: boolean = true;
  submitted: boolean = false;
  modalMessage: string = '';
  modalHeader: string = '';

  optionProfiles: iOptionProfileDTO[] = [];

  @ViewChild('errorModal') modalElementRef!: ElementRef;

  constructor(
    private fb: FormBuilder, 
    private profileService: ProfileService,
    private translate: TranslateService,
    private languageChangeService: LanguageChangeService
  ) {
    this.myForm = this.fb.group({
      parametro: ['', Validators.required]
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

  afterUpdating(){
    this.translate.get('SAVED_SUCCESSFULLY').subscribe((translatedMessage: string) => {
      this.modalMessage = translatedMessage;
      this.translate.get('SUCCESS').subscribe((translatedHeader: string) => {
        this.modalHeader = translatedHeader;
        this.showModal(this.modalMessage, this.modalHeader);
      });
    });
    this.resetForm();
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
      parametro: ''
    });
  }

  onSubmit() {    
    this.submitted = true;

    if (this.myForm.valid) {
      const parametro = this.myForm.get('parametro')?.value;

      this.profileService.GetOptionsProfile(parametro).subscribe(
        (response) => {
          console.log(response);          
          this.optionProfiles = response;
          this.showServiceError = false;
        },
        (error) => {
          console.error('Error fetching profiles:', error);
          this.serviceError = error.error?.message || 'UNKNOWN_ERROR';
          this.translateServiceError(this.serviceError);
          this.showServiceError = true;
        }
      );

    } else {
      this.myForm.markAllAsTouched();
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

  closeModal(): void {
    if (this.modal) {
      this.modal.hide();
    }
  }

  onUserAssignedChange(option: iOptionProfileDTO) {
    const index = this.optionProfiles.findIndex(o => o.idOption === option.idOption);
    if (index !== -1) {
      this.optionProfiles[index].userAssigned = option.userAssigned;
    }
  }
  
  onSave() {
    const idProfile = this.myForm.get('parametro')?.value;

    this.profileService.setOptionsProfile(idProfile, this.optionProfiles).subscribe(
      response => {
        console.log('Options saved successfully:', response);
        this.afterUpdating();
      },
      error => {
        console.error('Error saving options:', error);
        this.serviceError = error.error?.message || 'UNKNOWN_ERROR';
          this.translateServiceError(this.serviceError);
          this.showServiceError = true;
      }
    );
  }
}
