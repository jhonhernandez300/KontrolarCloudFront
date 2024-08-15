import { Component, Input, OnChanges, OnInit, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { iProfileDTO } from '../../../models/iProfileDTO';
import { LocalStorageService } from '../../../helpers/local-storage.service';
import { ProfileService } from '../../../services/profile/profile.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageChangeService } from '../../../services/language-change-service';
import * as bootstrap from 'bootstrap';
import { ProfileTransferService } from '../../../services/profile/profile-transfer.service';

@Component({
  selector: 'app-profiles-show-table',
  templateUrl: './profiles-show-table.component.html',
  styleUrl: './profiles-show-table.component.css'
})
export class ProfilesShowTableComponent implements OnInit{
  action: string = '';
  responseMessage: string = '';
  messageStatus: string = '';
  messageHeader: string = '';
  modalMessage: string = '';
  modalHeader: string = '';
  modalVisible: boolean = false;
  private modal: bootstrap.Modal | null = null;
  serviceError: string = '';
  showServiceError: boolean = false;

  @ViewChild('errorModal') modalElementRef!: ElementRef;

  @Input() profiles: iProfileDTO[] | null = null;
  @Input() submitted: boolean = false;

  showDeleteAlert: boolean = false;
  profileToDelete: iProfileDTO | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private profileService: ProfileService,
    private translate: TranslateService,
    private languageChangeService: LanguageChangeService,
    private profileTransferService: ProfileTransferService
    ) { }

  ngOnInit(): void {
    this.action = this.localStorageService.getData('action');
  }

  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(this.modalElementRef.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges)
  {
    // if (changes['submitted']) {
    //   console.log('Submitted:', this.submitted); // Asegúrate de que esto es true cuando el formulario se envía
    // }

    // // Verifica si 'profiles' ha cambiado
    // if (changes['profiles']) {
    //   console.log('Profiles:', this.profiles);
    // }
  }

  editProfile(profile: iProfileDTO) {
    console.log('Editing profile:', profile);
    this.profileTransferService.changeProfile(profile); // Cambio
  }

  confirmDeleteProfile(profile: iProfileDTO) {
    this.profileToDelete = profile;
    this.showDeleteAlert = true; 
  }
  
  cancelDelete() {
    this.showDeleteAlert = false; 
    this.profileToDelete = null;
  }

  deleteProfile(profile: iProfileDTO | null) {
    if (profile) {
      console.log('Deleting profile:', profile);
      this.showDeleteAlert = false; 
      this.profileToDelete = null;
      this.disableProfile(profile);
    }
  }

  disableProfile(profile: iProfileDTO){
    
    this.profileService.disableProfile(profile).subscribe(
      response => {        
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
  }

  translateServiceError(message: string): void{
    this.translate.get(message).subscribe((translatedName: string) => {               
      this.serviceError = translatedName;
    });
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
  }

  closeModal(): void {    
    if (this.modal) {
      this.modal.hide();
    }
  }

}
