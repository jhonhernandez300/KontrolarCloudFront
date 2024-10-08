// users-show-table.component.ts
import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { iUserDTO } from '../../../models/iUserDTO';
import { LocalStorageService } from '../../../helpers/local-storage.service';
import { UserService } from '../../../services/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageChangeService } from '../../../services/general/language-change-service';
import * as bootstrap from 'bootstrap';
import { EditCommunicationService } from '../../../services/general/edit-communication.service';
import { UserTransferService } from '../../../services/user/user-transfer.service';
import { ActivateEditSaveService } from '../../../services/general/activate-edit-save.service';
import { ShowTableGetDataCommunicationService } from '../../../services/user/show-table-get-data-communication.service';

@Component({
  selector: 'app-users-show-table',
  templateUrl: './users-show-table.component.html',
  styleUrls: ['./users-show-table.component.css']
})
export class UsersShowTableComponent implements OnInit {
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
  usersArray: iUserDTO[] = [];

  @ViewChild('errorModal') modalElementRef!: ElementRef;

  @Input() users: iUserDTO[] | null = null;
  @Input() submitted: boolean = false; 

 
  showDeleteAlert: boolean = false;
  userToDelete: iUserDTO | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private translate: TranslateService,
    private languageChangeService: LanguageChangeService,
    private editCommunicationService: EditCommunicationService,
    private userTransferService: UserTransferService,
    private activateEditSaveService: ActivateEditSaveService,
    private showTableGetDataCommunicationService: ShowTableGetDataCommunicationService
    ) 
    { }

  ngOnInit(): void {
    this.action = this.localStorageService.getData('action');
  }

  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(this.modalElementRef.nativeElement);
  }  

  onEditUser(user: iUserDTO) {
    //console.log('Editing user:', user);   
    //Hacer que user-search cambie el valor de una variable que se usa en el html para decidir que componentes se muestran
    this.editCommunicationService.notifyEditMode(true); 
    //Enviarle el user a users-edit-action. Él lo carga en el formulario   
    this.userTransferService.changeUser(user);
    //Hacer que se muestren los íconos del disquete y la logout en users
    this.activateEditSaveService.triggerAction();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.action = this.localStorageService.getData('action');    
  }
  
  confirmDeleteUser(user: iUserDTO) {
    this.userToDelete = user;
    this.showDeleteAlert = true; 
  }
  
  logoutDelete() {
    this.showDeleteAlert = false;
    this.userToDelete = null;
  }
  
  deleteUser(user: iUserDTO | null) {
    if (user) {      
      console.log(user);
      this.showDeleteAlert = false; 
      this.userToDelete = null;
      this.delete(user);
    }
  }

  delete(user: iUserDTO){
    
    this.userService.deleteUser(user).subscribe(
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
                this.showTableGetDataCommunicationService.notifySibling()
              });
            });
          });
        });

        if(this.users != null){
          this.users = this.users.filter(p => p !== user);            
        }     
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
