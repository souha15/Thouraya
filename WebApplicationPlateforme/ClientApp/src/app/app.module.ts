import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { LoginPageComponent } from './User/login-page/login-page.component';
import { UserInfoComponent } from './User/user-info/user-info.component'; 
import { MainTasksComponent } from './Tache/main-tasks/main-tasks.component';
import { NewTaskComponent } from './Tache/new-task/new-task.component';
import { TasksListComponent } from './Tache/tasks-list/tasks-list.component';
import { TaskDetailsComponent } from './Tache/task-details/task-details.component';
import { EvaluatedTaskComponent } from './Tache/evaluated-task/evaluated-task.component';
import { CompletedTaskComponent } from './Tache/completed-task/completed-task.component';
import { AlertsComponent } from './alerts/alerts.component';
import { MailingComponent } from './mailing/mailing.component';
import { UserRegistrationComponent } from './User/user-registration/user-registration.component';
import { UserServiceService } from './shared/Services/User/user-service.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/Services/User/auth/auth.guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { TasksListReceivedComponent } from './Tache/tasks-list-received/tasks-list-received.component';
import { TasksListDoneComponent } from './Tache/tasks-list-done/tasks-list-done.component';
import { TasksListDelayedComponent } from './Tache/tasks-list-delayed/tasks-list-delayed.component';
import { TasksListCreatedComponent } from './Tache/tasks-list-created/tasks-list-created.component';
import { EvaluationService } from './shared/Services/Taches/evaluation.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersListComponent } from './User/users-list/users-list.component';
import { PrivilegesService } from './shared/Services/User/privileges.service';
import { CommentaireService } from './shared/Services/Taches/commentaire.service';
import { TasksReportsComponent } from './Tache/tasks-reports/tasks-reports.component';
import { TasksReportsReceivedComponent } from './Tache/tasks-reports-received/tasks-reports-received.component';
import { AdministrationListComponent } from './Administration/administration-list/administration-list.component';
import { NewAdministrationComponent } from './Administration/new-administration/new-administration.component';
import { NewEtablissementComponent } from './Etablissement/new-etablissement/new-etablissement.component';
import { EtablissementListComponent } from './Etablissement/etablissement-list/etablissement-list.component';
import { UserUpdatingComponent } from './User/user-updating/user-updating.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { AuthInterceptor } from './shared/Services/User/auth/auth.interceptor';
import { EtablissementService } from './shared/Services/Etablissement/etablissement.service';
import { AdministrationService } from './shared/Services/Administration/administration.service';
import { TasksUpMenuComponent } from './Tache/tasks-up-menu/tasks-up-menu.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserChangePaswordComponent } from './User/user-change-pasword/user-change-pasword.component';
import { EnregistrerDotationComponent } from './Finances/Dotations/enregistrer-dotation/enregistrer-dotation.component';
import { ListeDotationComponent } from './Finances/Dotations/liste-dotation/liste-dotation.component';
import { DotationDetailsComponent } from './Finances/Dotations/dotation-details/dotation-details.component';
import { DotationEditComponent } from './Finances/Dotations/dotation-edit/dotation-edit.component';
import { UniteEditComponent } from './Finances/Unites/unite-edit/unite-edit.component';
import { UniteDetailsComponent } from './Finances/Unites/unite-details/unite-details.component';
import { EnregistrerUniteComponent } from './Finances/Unites/enregistrer-unite/enregistrer-unite.component';
import { ListeUniteComponent } from './Finances/Unites/liste-unite/liste-unite.component';
import { ListeLocataireComponent } from './Finances/Locataires/liste-locataire/liste-locataire.component';
import { EditLocataireComponent } from './Finances/Locataires/edit-locataire/edit-locataire.component';
import { LocataireDetailsComponent } from './Finances/Locataires/locataire-details/locataire-details.component';
import { RevenusDetailsComponent } from './Finances/Revenus/revenus-details/revenus-details.component';
import { RevenusListComponent } from './Finances/Revenus/revenus-list/revenus-list.component';
import { EnregistrerRevenusComponent } from './Finances/Revenus/enregistrer-revenus/enregistrer-revenus.component';
import { EditRevenusComponent } from './Finances/Revenus/edit-revenus/edit-revenus.component';
import { EnregistrerLocataireComponent } from './Finances/Locataires/enregistrer-locataire/enregistrer-locataire.component';
import { DepotRevenusComponent } from './Finances/Parametrage/depot-revenus/depot-revenus.component';
import { ServiceRevenusComponent } from './Finances/Parametrage/service-revenus/service-revenus.component';
import { TypedotationComponent } from './Finances/Parametrage/typedotation/typedotation.component';
import { EtatdotationComponent } from './Finances/Parametrage/etatdotation/etatdotation.component';
import { EtatuniteComponent } from './Finances/Parametrage/etatunite/etatunite.component';
import { TypeuniteComponent } from './Finances/Parametrage/typeunite/typeunite.component';
import { MenuFinanceComponent } from './Finances/Main/menu-finance/menu-finance.component';
import { MainFinancePageComponent } from './Finances/Main/main-finance-page/main-finance-page.component';
import { MainFarametrageFinancePageComponent } from './Finances/Parametrage/main-farametrage-finance-page/main-farametrage-finance-page.component';
import { TypeDotationService } from './shared/Services/Dotations/type-dotation.service';
import { EtatDotationService } from './shared/Services/Dotations/etat-dotation.service';
import { BureauImmobPageComponent } from './Finances/Parametrage/bureau-immob-page/bureau-immob-page.component';
import { AgenceImmobService } from './shared/Services/Dotations/agence-immob.service';
import { TypeUniteService } from './shared/Services/Dotations/type-unite.service';
import { EtatUniteService } from './shared/Services/Dotations/etat-unite.service';
import { ServiceRevenusService } from './shared/Services/Dotations/service-revenus.service';
import { UniteService } from './shared/Services/Dotations/unite.service';
import { LocataireService } from './shared/Services/Dotations/locataire.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { DepotRevenusService } from './shared/Services/Dotations/depot-revenus.service';
import { OrganismeComponent } from './AdministrativeCommunication/ParametrageCA/organisme/organisme.component';
import { ProprietaireComponent } from './AdministrativeCommunication/ParametrageCA/proprietaire/proprietaire.component';
import { EnregistrerTRRecueComponent } from './AdministrativeCommunication/Transaction/Recue/enregistrer-tr-recue/enregistrer-tr-recue.component';
import { MyListeTrComponent } from './AdministrativeCommunication/Transaction/Recue/my-liste-tr/my-liste-tr.component';
import { MyListeTrEmiseComponent } from './AdministrativeCommunication/Transaction/Emise/my-liste-tr-emise/my-liste-tr-emise.component';
import { EnregistrerTREComponent } from './AdministrativeCommunication/Transaction/Emise/enregistrer-tre/enregistrer-tre.component';
import { EnregistrerTRIComponent } from './AdministrativeCommunication/Transaction/Interne/enregistrer-tri/enregistrer-tri.component';
import { MyListeTrIComponent } from './AdministrativeCommunication/Transaction/Interne/my-liste-tr-i/my-liste-tr-i.component';
import { MyListeDecisionComponent } from './AdministrativeCommunication/Transaction/Decision/my-liste-decision/my-liste-decision.component';
import { EnregistrerDecisionComponent } from './AdministrativeCommunication/Transaction/Decision/enregistrer-decision/enregistrer-decision.component';
import { ACMenuComponent } from './AdministrativeCommunication/ParametrageCA/acmenu/acmenu.component';
import { ListeOrganismeComponent } from './AdministrativeCommunication/ParametrageCA/liste-organisme/liste-organisme.component';
import { ListeProprietaireComponent } from './AdministrativeCommunication/ParametrageCA/liste-proprietaire/liste-proprietaire.component';
import { MainPageACComponent } from './AdministrativeCommunication/Main-Menu/main-page-ac/main-page-ac.component';
import { MainPageAC2Component } from './AdministrativeCommunication/Main-Menu/main-page-ac2/main-page-ac2.component';
import { TransactionsRListComponent } from './AdministrativeCommunication/Transaction/Recue/transactions-rlist/transactions-rlist.component';
import { EnregDefRComponent } from './AdministrativeCommunication/Transaction/Recue/enreg-def-r/enreg-def-r.component';
import { EnregTempRComponent } from './AdministrativeCommunication/Transaction/Recue/enreg-temp-r/enreg-temp-r.component';
import { EnregRComponent } from './AdministrativeCommunication/Transaction/Recue/enreg-r/enreg-r.component';
import { AfftectedToMyAdminRComponent } from './AdministrativeCommunication/Transaction/Recue/afftected-to-my-admin-r/afftected-to-my-admin-r.component';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { TransactionsElistComponent } from './AdministrativeCommunication/Transaction/Emise/transactions-elist/transactions-elist.component';
import { EnregEComponent } from './AdministrativeCommunication/Transaction/Emise/enreg-e/enreg-e.component';
import { AfftectedToMyAdminEComponent } from './AdministrativeCommunication/Transaction/Emise/afftected-to-my-admin-e/afftected-to-my-admin-e.component';
import { EnregTempEComponent } from './AdministrativeCommunication/Transaction/Emise/enreg-temp-e/enreg-temp-e.component';
import { EnregDefEComponent } from './AdministrativeCommunication/Transaction/Emise/enreg-def-e/enreg-def-e.component';
import { RappotEmiseComponent } from './AdministrativeCommunication/Rapport/rappot-emise/rappot-emise.component';
import { RapportInterneComponent } from './AdministrativeCommunication/Rapport/rapport-interne/rapport-interne.component';
import { RapportRecueComponent } from './AdministrativeCommunication/Rapport/rapport-recue/rapport-recue.component';
import { EnregDefIComponent } from './AdministrativeCommunication/Transaction/Interne/enreg-def-i/enreg-def-i.component';
import { EnregTempIComponent } from './AdministrativeCommunication/Transaction/Interne/enreg-temp-i/enreg-temp-i.component';
import { EnregIComponent } from './AdministrativeCommunication/Transaction/Interne/enreg-i/enreg-i.component';
import { AffectedToMyAdminIComponent } from './AdministrativeCommunication/Transaction/Interne/affected-to-my-admin-i/affected-to-my-admin-i.component';
import { BeneficiaireCComponent } from './Evenement/beneficiaire-c/beneficiaire-c.component';
import { TacheEvCComponent } from './Evenement/tache-ev-c/tache-ev-c.component';
import { OutilsCComponent } from './Evenement/outils-c/outils-c.component';
import { MediasCComponent } from './Evenement/medias-c/medias-c.component';
import { ClasseCComponent } from './Evenement/classe-c/classe-c.component';
import { TblMenuComponent } from './Evenement/tbl-menu/tbl-menu.component';
import { TblMainComponent } from './Evenement/tbl-main/tbl-main.component';
import { EventRegisterComponent } from './Evenement/event-register/event-register.component';
import { EventDetailsComponent } from './Evenement/event-details/event-details.component';
import { EventListComponent } from './Evenement/event-list/event-list.component';
import { ActivityCComponent } from './Evenement/activity-c/activity-c.component';
import { DepenseCComponent } from './Evenement/depense-c/depense-c.component';
import { DemandeCongeComponent } from './RH/Conge/demande-conge/demande-conge.component';
import { MyListCongeComponent } from './RH/Conge/my-list-conge/my-list-conge.component';
import { ValidateCongeComponent } from './RH/Conge/validate-conge/validate-conge.component';
import { SuivieCongeComponent } from './RH/Conge/suivie-conge/suivie-conge.component';
import { PermissionAddComponent } from './RH/Permission/permission-add/permission-add.component';
import { PermissionListComponent } from './RH/Permission/permission-list/permission-list.component';
import { NomEquipementComponent } from './RH/Equipement/nom-equipement/nom-equipement.component';
import { TypeEquipementComponent } from './RH/Equipement/type-equipement/type-equipement.component';
import { EquipementAddComponent } from './RH/Equipement/equipement-add/equipement-add.component';
import { EquipementListComponent } from './RH/Equipement/equipement-list/equipement-list.component';
import { RecrutementListComponent } from './RH/Recrutement/recrutement-list/recrutement-list.component';
import { RecrutementAddComponent } from './RH/Recrutement/recrutement-add/recrutement-add.component';
import { EquipementListDirComponent } from './RH/Equipement/equipement-list-dir/equipement-list-dir.component';
import { PermissionUListDirComponent } from './RH/Permission/permission-list-dir/permission-list-dir.component';
import { MenurequestsComponent } from './RH/menurequests/menurequests.component';
import { NavmenurequestsComponent } from './RH/navmenurequests/navmenurequests.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TicketAddComponent } from './RH/DemandeTicket/ticket-add/ticket-add.component';
import { TicketMyLisComponent } from './RH/DemandeTicket/ticket-my-lis/ticket-my-lis.component';
import { TicketDirLisComponent } from './RH/DemandeTicket/ticket-dir-lis/ticket-dir-lis.component';
import { SalaialeAddComponent } from './RH/DemandeSalariale/salaiale-add/salaiale-add.component';
import { SalaialeMyLisComponent } from './RH/DemandeSalariale/salaiale-my-lis/salaiale-my-lis.component';
import { SalaialeDirLisComponent } from './RH/DemandeSalariale/salaiale-dir-lis/salaiale-dir-lis.component';
import { SoldeCongeComponent } from './RH/Conge/solde-conge/solde-conge.component';
import { EmployeeAddComponent } from './User/employee-add/employee-add.component';
import { EmployeePrivilegesUpdateComponent } from './User/employee-privileges-update/employee-privileges-update.component';
import { EmployeePrivilegesAddComponent } from './User/employee-privileges-add/employee-privileges-add.component';
import { EmployeeUpdateComponent } from './User/employee-update/employee-update.component';
import { RecrutmenetDirListComponent } from './RH/Recrutement/recrutmenet-dir-list/recrutmenet-dir-list.component';
import { MyListRecrutmentComponent } from './RH/Recrutement/my-list-recrutment/my-list-recrutment.component';
import { RhRecrutmentListComponent } from './RH/Recrutement/rh-recrutment-list/rh-recrutment-list.component';
import { RhCongeListComponent } from './RH/Conge/rh-conge-list/rh-conge-list.component';
import { NewsDetailComponent } from './News/news-detail/news-detail.component';
import { NewsAddComponent } from './News/news-add/news-add.component';
import { NewsListViewerComponent } from './News/news-list-viewer/news-list-viewer.component';
import { NewsListCreatorComponent } from './News/news-list-creator/news-list-creator.component';
import { PrivAddComponent } from './RH/PrivilegesRequests/priv-add/priv-add.component';
import { MyPrivListComponent } from './RH/PrivilegesRequests/my-priv-list/my-priv-list.component';
import { PrivListDirComponent } from './RH/PrivilegesRequests/priv-list-dir/priv-list-dir.component';
import { PrivListRhComponent } from './RH/PrivilegesRequests/priv-list-rh/priv-list-rh.component';
import { CarsAddComponent } from './voiture/cars-add/cars-add.component';
import { CarsListComponent } from './voiture/cars-list/cars-list.component';
import { CarsRepairRequestAddComponent } from './voiture/cars-repair-request-add/cars-repair-request-add.component';
import { CarsRepairRequestListComponent } from './voiture/cars-repair-request-list/cars-repair-request-list.component';
import { CarsMenuComponent } from './voiture/cars-menu/cars-menu.component';
import { FinanceMenuParamComponent } from './Finance/Parametrage/finance-menu-param/finance-menu-param.component';
import { TypeBeneficiaireComponent } from './Finance/Parametrage/type-beneficiaire/type-beneficiaire.component';
import { TypeDepenseComponent } from './Finance/Parametrage/type-depense/type-depense.component';
import { BrancheOneComponent } from './Finance/Parametrage/branche-one/branche-one.component';
import { BrancheTwoComponent } from './Finance/Parametrage/branche-two/branche-two.component';
import { TypeFactureComponent } from './Finance/Parametrage/type-facture/type-facture.component';
import { ProjetProgComponent } from './Finance/Parametrage/projet-prog/projet-prog.component';
import { FactureAddComponent } from './Finance/Facture/facture-add/facture-add.component';
import { FactureListComptableComponent } from './Finance/Facture/facture-list-comptable/facture-list-comptable.component';
import { FactureListDirecteurComponent } from './Finance/Facture/facture-list-directeur/facture-list-directeur.component';
import { AcceptedFactureComponent } from './Finance/Facture/accepted-facture/accepted-facture.component';
import { MainNotAcceptedComponent } from './Finance/Main/main-not-accepted/main-not-accepted.component';
import { MainReadyPayementComponent } from './Finance/Main/main-ready-payement/main-ready-payement.component';
import { CreanceFinancireAddComponent } from './Finance/Creance Financiere/creance-financire-add/creance-financire-add.component';
import { CreanceFinancireListComponent } from './Finance/Creance Financiere/creance-financire-list/creance-financire-list.component';
import { MenuReadyPayementComponent } from './Finance/Main/menu-ready-payement/menu-ready-payement.component';
import { MenuNotAcceptedComponent } from './Finance/Main/menu-not-accepted/menu-not-accepted.component';
import { MainAcceptedComponent } from './Finance/Main/main-accepted/main-accepted.component';
import { MaenuAcceptedComponent } from './Finance/Main/maenu-accepted/maenu-accepted.component';
import { CreFinanAddComponent } from './Finance/Depense Exploitation/cre-finan-add/cre-finan-add.component';
import { CreFinanListEmployeeComponent } from './Finance/Depense Exploitation/cre-finan-list-employee/cre-finan-list-employee.component';
import { CreFinanListDirectorComponent } from './Finance/Depense Exploitation/cre-finan-list-director/cre-finan-list-director.component';
import { CreFinanListAcceptedComponent } from './Finance/Depense Exploitation/cre-finan-list-accepted/cre-finan-list-accepted.component';
import { CreFinanListComptableComponent } from './Finance/Depense Exploitation/cre-finan-list-comptable/cre-finan-list-comptable.component';
import { AvanceAddComponent } from './Finance/Avance/avance-add/avance-add.component';
import { AvanceListEComponent } from './Finance/Avance/avance-list-e/avance-list-e.component';
import { AvanceListCComponent } from './Finance/Avance/avance-list-c/avance-list-c.component';
import { AvanceListDComponent } from './Finance/Avance/avance-list-d/avance-list-d.component';
import { AvanceListNotAcceptedComponent } from './Finance/Avance/avance-list-not-accepted/avance-list-not-accepted.component';
import { MainAcceptedAvanceComponent } from './Finance/Main/main-accepted-avance/main-accepted-avance.component';
import { MainNotAcceptedAvanceComponent } from './Finance/Main/main-not-accepted-avance/main-not-accepted-avance.component';
import { MainReadyAvanceComponent } from './Finance/Main/main-ready-avance/main-ready-avance.component';
import { RecepChequeAddComponent } from './Finance/Reception cheque/recep-cheque-add/recep-cheque-add.component';
import { RecepChequeListComponent } from './Finance/Reception cheque/recep-cheque-list/recep-cheque-list.component';
import { EventTwoAddComponent } from './EventsTwo/event-two-add/event-two-add.component';
import { EventTwoDetailComponent } from './EventsTwo/event-two-detail/event-two-detail.component';
import { EventTwoGalleryComponent } from './EventsTwo/event-two-gallery/event-two-gallery.component';
import { EventTwoListComponent } from './EventsTwo/event-two-list/event-two-list.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TypeVoitureComponent } from './voiture/Parametrage/type-voiture/type-voiture.component';
import { OrganismeVoitureComponent } from './voiture/Parametrage/organisme-voiture/organisme-voiture.component';
import { DirectorListCarsComponent } from './voiture/director-list-cars/director-list-cars.component';
import { ComptableListCarsComponent } from './voiture/comptable-list-cars/comptable-list-cars.component';
import { RecueDonsAddComponent } from './Dons/RecueDons/recue-dons-add/recue-dons-add.component';
import { RecueDonsListComponent } from './Dons/RecueDons/recue-dons-list/recue-dons-list.component';
import { PayementReceptionAddComponent } from './Dons/ReceptionPayement/payement-reception-add/payement-reception-add.component';
import { PayementReceptionListComponent } from './Dons/ReceptionPayement/payement-reception-list/payement-reception-list.component';
import { DonsReportsComponent } from './Reports/dons-reports/dons-reports.component';
import { ProjDonsComponent } from './Dons/proj-dons/proj-dons.component';
import { RecuEmpDateComponent } from './Reports/recu-emp-date/recu-emp-date.component';
import { RecuDateComponent } from './Reports/recu-date/recu-date.component';
import { RecuEmpPeriodeComponent } from './Reports/recu-emp-periode/recu-emp-periode.component';
import { RecuProjDateComponent } from './Reports/recu-proj-date/recu-proj-date.component';
import { RecuProjPriodComponent } from './Reports/recu-proj-priod/recu-proj-priod.component';
import { RecuNbDateComponent } from './Reports/recu-nb-date/recu-nb-date.component';
import { RecuNbPeriodComponent } from './Reports/recu-nb-period/recu-nb-period.component';
import { RevenusEmpMonthComponent } from './Reports/revenus-emp-month/revenus-emp-month.component';
import { RevenusMonthComponent } from './Reports/revenus-month/revenus-month.component';
import { RevenusPeriodComponent } from './Reports/revenus-period/revenus-period.component';
import { RevenusEmpPeriodComponent } from './Reports/revenus-emp-period/revenus-emp-period.component';
import { RevenusEmpDateComponent } from './Reports/revenus-emp-date/revenus-emp-date.component';
import { RevenusEmpDateMonthComponent } from './Reports/revenus-emp-date-month/revenus-emp-date-month.component';
import { FormationAddComponent } from './ServiceRh/Formation/formation-add/formation-add.component';
import { FormationListComponent } from './ServiceRh/Formation/formation-list/formation-list.component';
import { FormationShowComponent } from './ServiceRh/Formation/formation-show/formation-show.component';
import { SpecialiteComponent } from './ServiceRh/Formation/specialite/specialite.component';
import { MenuFormationComponent } from './ServiceRh/Formation/menu-formation/menu-formation.component';
import { CrudEventsTwoComponent } from './EventsTwo/crud-events-two/crud-events-two.component';
import { CrudNewsComponent } from './News/crud-news/crud-news.component';
import { MaitenanceRequestAddComponent } from './ServiceRh/Maintenance/maitenance-request-add/maitenance-request-add.component';
import { MaitenanceRequestListComponent } from './ServiceRh/Maintenance/maitenance-request-list/maitenance-request-list.component';
import { MaitenanceRequestMecanicalListComponent } from './ServiceRh/Maintenance/maitenance-request-mecanical-list/maitenance-request-mecanical-list.component';
import { MainServicesPageComponent } from './ServiceRh/main-services-page/main-services-page.component';
import { PanneComponent } from './ServiceRh/Maintenance/panne/panne.component';
import { SuppHeureAddComponent } from './ServiceRh/SuppHeure/supp-heure-add/supp-heure-add.component';
import { SuppHeureListComponent } from './ServiceRh/SuppHeure/supp-heure-list/supp-heure-list.component';
import { DemandeSuppHeureListComponent } from './ServiceRh/SuppHeure/demande-supp-heure-list/demande-supp-heure-list.component';
import { DemandeSuppHeureAddComponent } from './ServiceRh/SuppHeure/demande-supp-heure-add/demande-supp-heure-add.component';
import { DemandeSuppHeureListcreatorComponent } from './ServiceRh/SuppHeure/demande-supp-heure-listcreator/demande-supp-heure-listcreator.component';
import { DemandeSuppHeureListDirectorComponent } from './ServiceRh/SuppHeure/demande-supp-heure-list-director/demande-supp-heure-list-director.component';
import { MenuSuppHeureComponent } from './ServiceRh/SuppHeure/menu-supp-heure/menu-supp-heure.component';
import { EmployeeMaintRequestListComponent } from './ServiceRh/Maintenance/employee-maint-request-list/employee-maint-request-list.component';
import { NomFileOrgComponent } from './FilesOrg/nom-file-org/nom-file-org.component';
import { FilesorgAddComponent } from './FilesOrg/filesorg-add/filesorg-add.component';
import { FilesorgLisComponent } from './FilesOrg/filesorg-lis/filesorg-lis.component';
import { FilesorgMenuComponent } from './FilesOrg/filesorg-menu/filesorg-menu.component';
import { FilesEmployeeComponent } from './FilesOrg/files-employee/files-employee.component';
import { AttestationTravailAddComponent } from './ServiceRh/AttestationTravail/attestation-travail-add/attestation-travail-add.component';
import { AttestationTravailLisComponent } from './ServiceRh/AttestationTravail/attestation-travail-lis/attestation-travail-lis.component';
import { AttestationTravailRhListComponent } from './ServiceRh/AttestationTravail/attestation-travail-rh-list/attestation-travail-rh-list.component';
import { TransfertInterneAddComponent } from './Transfert Interne/transfert-interne-add/transfert-interne-add.component';
import { TransfertInterneShowComponent } from './Transfert Interne/transfert-interne-show/transfert-interne-show.component';
import { TransfertInterneListComponent } from './Transfert Interne/transfert-interne-list/transfert-interne-list.component';
import { ReceptionEquipementAddComponent } from './ServiceRh/Reception Equipement/reception-equipement-add/reception-equipement-add.component';
import { ReceptionEquipementListComponent } from './ServiceRh/Reception Equipement/reception-equipement-list/reception-equipement-list.component';
import { ReceptionEquipementListRhComponent } from './ServiceRh/Reception Equipement/reception-equipement-list-rh/reception-equipement-list-rh.component';
import { DecisionListComponent } from './AdministrativeCommunication/Transaction/Decision/decision-list/decision-list.component';
import { SuppEquipementComponent } from './ServiceRh/Reception Equipement/supp-equipement/supp-equipement.component';
import { DemandeFormationAddComponent } from './ServiceRh/DemandeFormation/demande-formation-add/demande-formation-add.component';
import { DemandeFormationLisComponent } from './ServiceRh/DemandeFormation/demande-formation-lis/demande-formation-lis.component';
import { DemandeFormationListRhComponent } from './ServiceRh/DemandeFormation/demande-formation-list-rh/demande-formation-list-rh.component';
import { DemandeFormationListCComponent } from './ServiceRh/DemandeFormation/demande-formation-list-c/demande-formation-list-c.component';
import { DemandeFormationListdirComponent } from './ServiceRh/DemandeFormation/demande-formation-listdir/demande-formation-listdir.component';
import { DemandeFormationUserAddComponent } from './ServiceRh/DemandeFormation/demande-formation-user-add/demande-formation-user-add.component';
import { NewFormationRequestAddComponent } from './ServiceRh/DemandeFormation/new-formation-request-add/new-formation-request-add.component';
import { NewFormationRequestListComponent } from './ServiceRh/DemandeFormation/new-formation-request-list/new-formation-request-list.component';
import { MyFormationComponent } from './ServiceRh/DemandeFormation/my-formation/my-formation.component';
import { MyEquipementComponent } from './ServiceRh/Reception Equipement/my-equipement/my-equipement.component';
import { FormationexistsListdirComponent } from './ServiceRh/DemandeFormation/formationexists-listdir/formationexists-listdir.component';
import { CreationAddComponent } from './ServiceRh/CreationTravail/creation-add/creation-add.component';
import { CreationListComponent } from './ServiceRh/CreationTravail/creation-list/creation-list.component';
import { CreationListRhComponent } from './ServiceRh/CreationTravail/creation-list-rh/creation-list-rh.component';
import { CreationListDirComponent } from './ServiceRh/CreationTravail/creation-list-dir/creation-list-dir.component';
import { CreationListDirGComponent } from './ServiceRh/CreationTravail/creation-list-dir-g/creation-list-dir-g.component';
import { FilesCrudEmployeeComponent } from './FilesOrg/files-crud-employee/files-crud-employee.component';
import { DotationMenuComponent } from './Finances/Main/dotation-menu/dotation-menu.component';
import { ProjetAddComponent } from './Projets/Main/projet-add/projet-add.component';
import { ProjetListComponent } from './Projets/Main/projet-list/projet-list.component';
import { ProjetDetailsComponent } from './Projets/Main/projet-details/projet-details.component';
import { ProjetMenuComponent } from './Projets/Main/projet-menu/projet-menu.component';
import { ProjetListingMenuComponent } from './Projets/Listing/projet-listing-menu/projet-listing-menu.component';
import { ProjetCompteComponent } from './Projets/Listing/projet-compte/projet-compte.component';
import { ProjetOrgSuppComponent } from './Projets/Listing/projet-org-supp/projet-org-supp.component';
import { ProjetClassComponent } from './Projets/Listing/projet-class/projet-class.component';
import { ProjetPayActiviteComponent } from './Projets/Listing/projet-pay-activite/projet-pay-activite.component';
import { ProjetPayTypeComponent } from './Projets/Listing/projet-pay-type/projet-pay-type.component';
import { EventEditComponent } from './Evenement/event-edit/event-edit.component';
import { ProjetEditComponent } from './Projets/Main/projet-edit/projet-edit.component';
import { ProjetAdd2Component } from './Projets/Main/projet-add2/projet-add2.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { ComptesListComponent } from './Comptes/comptes-list/comptes-list.component';
import { EtatComptesAddComponent } from './Comptes/etat-comptes-add/etat-comptes-add.component';
import { EditEtatCompteComponent } from './Comptes/edit-etat-compte/edit-etat-compte.component';
import { EtatCompteSettingsComponent } from './Comptes/etat-compte-settings/etat-compte-settings.component';
import { ServiceBanqueAddComponent } from './Comptes/service-banque-add/service-banque-add.component';
import { ServiceBanqueLisComponent } from './Comptes/service-banque-lis/service-banque-lis.component';
import { MenuCompteComponent } from './Comptes/menu-compte/menu-compte.component';
import { MenuSettingsCompteComponent } from './Comptes/menu-settings-compte/menu-settings-compte.component';
import { SuppliesAddComponent } from './Supplies/supplies-add/supplies-add.component';
import { SuppliesListComponent } from './Supplies/supplies-list/supplies-list.component';
import { SuppliesEditComponent } from './Supplies/supplies-edit/supplies-edit.component';
import { ChequecAddComponent } from './Cheques/Cheque/chequec-add/chequec-add.component';
import { ChequecLisComponent } from './Cheques/Cheque/chequec-lis/chequec-lis.component';
import { ChequecEditComponent } from './Cheques/Cheque/chequec-edit/chequec-edit.component';
import { ChequecDetailsComponent } from './Cheques/Cheque/chequec-details/chequec-details.component';
import { PayChequecAddComponent } from './Cheques/DemPayCheque/pay-chequec-add/pay-chequec-add.component';
import { PayChequecLisComponent } from './Cheques/DemPayCheque/pay-chequec-lis/pay-chequec-lis.component';
import { PayChequecDetailComponent } from './Cheques/DemPayCheque/pay-chequec-detail/pay-chequec-detail.component';
import { PayChequecEditComponent } from './Cheques/DemPayCheque/pay-chequec-edit/pay-chequec-edit.component';
import { MenuChequeComponent } from './Cheques/menu-cheque/menu-cheque.component';
import { ChequePayListAcceptComponent } from './Cheques/DemPayCheque/cheque-pay-list-accept/cheque-pay-list-accept.component';
import { ChequePayListPayComponent } from './Cheques/DemPayCheque/cheque-pay-list-pay/cheque-pay-list-pay.component';
import { ChequeclasseComponent } from './Cheques/chequeclasse/chequeclasse.component';
import { SalaireAddComponent } from './Salaire/salaire-add/salaire-add.component';
import { SalaireMenu1Component } from './Salaire/salaire-menu1/salaire-menu1.component';
import { SalaireMenu2Component } from './Salaire/salaire-menu2/salaire-menu2.component';
import { SalaireListGlobalComponent } from './Salaire/salaire-list-global/salaire-list-global.component';
import { SalaireListDetailsComponent } from './Salaire/salaire-list-details/salaire-list-details.component';
import { SalaireDetailsComponent } from './Salaire/salaire-details/salaire-details.component';
import { GestionSuupliesComponent } from './Supplies/gestion-suuplies/gestion-suuplies.component';
import { UserDetailDataComponent } from './User/user-detail-data/user-detail-data.component';
import { UserEditComponent } from './User/user-edit/user-edit.component';
import { NavUserMenuComponent } from './User/nav-user-menu/nav-user-menu.component';
import { DemissionAddComponent } from './UserServices/demission-add/demission-add.component';
import { SalaireReportAddComponent } from './UserServices/salaire-report-add/salaire-report-add.component';
import { SalaireReportPrintComponent } from './UserServices/salaire-report-print/salaire-report-print.component';
import { DemissioListComponent } from './UserServices/demissio-list/demissio-list.component';
import { DemissioListdirComponent } from './UserServices/demissio-listdir/demissio-listdir.component';

import { PlaintAddComponent } from './UserServices/plaint-add/plaint-add.component';
import { PlaintListComponent } from './UserServices/plaint-list/plaint-list.component';
import { PlaintListdirComponent } from './UserServices/plaint-listdir/plaint-listdir.component';
import { PlaintEditComponent } from './UserServices/plaint-edit/plaint-edit.component';
import { PermoissionEditComponent } from './UserServices/permoission-edit/permoission-edit.component';
import { DemissionEditComponent } from './UserServices/demission-edit/demission-edit.component';
import { ResidenceAddComponent } from './UserServices/residence-add/residence-add.component';
import { ResidenceListComponent } from './UserServices/residence-list/residence-list.component';
import { ResidenceListDirComponent } from './UserServices/residence-list-dir/residence-list-dir.component';
import { ExperienceAddComponent } from './UserServices/experience-add/experience-add.component';
import { ExperiencePrintComponent } from './UserServices/experience-print/experience-print.component';
import { ResidenceEditComponent } from './UserServices/residence-edit/residence-edit.component';
import { LangueEvComponent } from './Evenement/langue-ev/langue-ev.component';
import { TacheGlobalDetailsComponent } from './Tache/tache-global-details/tache-global-details.component';
import { TacheReceivedDetailsComponent } from './Tache/tache-received-details/tache-received-details.component';
import { TacheARecevoirDetailsComponent } from './Tache/tache-arecevoir-details/tache-arecevoir-details.component';
import { LocataireDotAddComponent } from './Finances/LocataireDot/locataire-dot-add/locataire-dot-add.component';
import { LocataireDotDetailsComponent } from './Finances/LocataireDot/locataire-dot-details/locataire-dot-details.component';
import { LocataireDotEditComponent } from './Finances/LocataireDot/locataire-dot-edit/locataire-dot-edit.component';
import { LocataireDotListComponent } from './Finances/LocataireDot/locataire-dot-list/locataire-dot-list.component';
import { NotiftacheComponent } from './Tache/notiftache/notiftache.component';
import { TimelinetacheComponent } from './Tache/timelinetache/timelinetache.component';
import { TaskListAdminComponent } from './Tache/AdminTask/task-list-admin/task-list-admin.component';
import { TaskEditAdminComponent } from './Tache/AdminTask/task-edit-admin/task-edit-admin.component';
import { UserRolesEditComponent } from './UserRoles/user-roles-edit/user-roles-edit.component';
import { UserRolesListComponent } from './UserRoles/user-roles-list/user-roles-list.component';
import { UserRolesDetailsComponent } from './UserRoles/user-roles-details/user-roles-details.component';
import { TasksNotDoneComponent } from './Tache/tasks-not-done/tasks-not-done.component';
import { TasksInProgressComponent } from './Tache/tasks-in-progress/tasks-in-progress.component';
import { AddingTransactionsPageComponent } from './AdministrativeCommunication/newPages/adding-transactions-page/adding-transactions-page.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CountdownModule } from 'ngx-countdown';
import { TransactionGlobalRComponent } from './AdministrativeCommunication/Globals/transaction-global-r/transaction-global-r.component';
import { TransactionGlobalEComponent } from './AdministrativeCommunication/Globals/transaction-global-e/transaction-global-e.component';
import { TransactionGlobalIComponent } from './AdministrativeCommunication/Globals/transaction-global-i/transaction-global-i.component';
import { MenutrComponent } from './menutr/menutr.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TicketEditComponent } from './Maintenance/ticket-edit/ticket-edit.component';
import { TicketListComponent } from './Maintenance/ticket-list/ticket-list.component';
import { TicketListClientComponent } from './Maintenance/ticket-list-client/ticket-list-client.component';
import { TicketListAgentComponent } from './Maintenance/ticket-list-agent/ticket-list-agent.component';
import { TicketDetailAgentComponent } from './Maintenance/ticket-detail-agent/ticket-detail-agent.component';
import { PageFrwardedToTicketListForAgentCodeComponent } from './Maintenance/page-frwarded-to-ticket-list-for-agent-code/page-frwarded-to-ticket-list-for-agent-code.component';
import { TicketDetailClientComponent } from './Maintenance/ticket-detail-client/ticket-detail-client.component';
import { AlertsrhComponent } from './alertsrh/alertsrh.component';
import { TickeEmployeeAddComponent } from './UserServices/ticke-employee-add/ticke-employee-add.component';
import { DemandsDirectorComponent } from './RH/DemandsPages/demands-director/demands-director.component';
import { DemandsRHComponent } from './RH/DemandsPages/demands-rh/demands-rh.component';
import { DemandsFinanceComponent } from './RH/DemandsPages/demands-finance/demands-finance.component';
import { PermessionListRHComponent } from './RH/permession-list-rh/permession-list-rh.component';
import { EquipementListRHComponent } from './RH/equipement-list-rh/equipement-list-rh.component';
import { PlaintListRHComponent } from './RH/plaint-list-rh/plaint-list-rh.component';
import { PlaintListDirGComponent } from './RH/plaint-list-dir-g/plaint-list-dir-g.component';
import { MsgInterneAddComponent } from './Msg Interne/msg-interne-add/msg-interne-add.component';
import { MsgInterneDetailsComponent } from './Msg Interne/msg-interne-details/msg-interne-details.component';
import { MsgInterneListComponent } from './Msg Interne/msg-interne-list/msg-interne-list.component';
import { Ticket2AddComponent } from './Ticket/ticket2-add/ticket2-add.component';
import { Ticket2DetailsComponent } from './Ticket/ticket2-details/ticket2-details.component';
import { Ticket2ListComponent } from './Ticket/ticket2-list/ticket2-list.component';
import { Ticket2ListEtabComponent } from './Ticket/ticket2-list-etab/ticket2-list-etab.component';
import { Ticket2ListAdminComponent } from './Ticket/ticket2-list-admin/ticket2-list-admin.component';
import { Ticket2ListUserComponent } from './Ticket/ticket2-list-user/ticket2-list-user.component';
import { Ticket2MyListComponent } from './Ticket/ticket2-my-list/ticket2-my-list.component';
import { Ticket2EditComponent } from './Ticket/ticket2-edit/ticket2-edit.component';
import { Ticket2EtatComponent } from './Ticket/ticket2-etat/ticket2-etat.component';
import { Ticket2MenuComponent } from './Ticket/ticket2-menu/ticket2-menu.component';
import { OrgPartAddComponent } from './OrgPart/org-part-add/org-part-add.component';
import { OrgPartDetailsComponent } from './OrgPart/org-part-details/org-part-details.component';
import { OrgPartListComponent } from './OrgPart/org-part-list/org-part-list.component';
import { OrgPartEditComponent } from './OrgPart/org-part-edit/org-part-edit.component';
import { OrgPartMenuComponent } from './OrgPart/org-part-menu/org-part-menu.component';
import { TypeRevBenCrudComponent } from './gestionBen/type-rev-ben-crud/type-rev-ben-crud.component';
import { TypeMaisonCrudComponent } from './gestionBen/type-maison-crud/type-maison-crud.component';
import { TypeDroitCrudComponent } from './gestionBen/type-droit-crud/type-droit-crud.component';
import { TypeBenCrudComponent } from './gestionBen/type-ben-crud/type-ben-crud.component';
import { CrudGestBenMenuComponent } from './gestionBen/crud-gest-ben-menu/crud-gest-ben-menu.component';
import { GestBenEditChercheurComponent } from './gestionBen/Chercheur/gest-ben-edit-chercheur/gest-ben-edit-chercheur.component';
import { GestBenListChercheurComponent } from './gestionBen/Chercheur/gest-ben-list-chercheur/gest-ben-list-chercheur.component';
import { GestBenMenuChercheurComponent } from './gestionBen/Chercheur/gest-ben-menu-chercheur/gest-ben-menu-chercheur.component';
import { GestBenListDirComponent } from './gestionBen/Dir/gest-ben-list-dir/gest-ben-list-dir.component';
import { DemDirMenuComponent } from './gestionBen/Dir/dem-dir-menu/dem-dir-menu.component';
import { GestBenAddComponent } from './gestionBen/FirstAdd/gest-ben-add/gest-ben-add.component';
import { GestBenEditComponent } from './gestionBen/FirstAdd/gest-ben-edit/gest-ben-edit.component';
import { GestBenDetailComponent } from './gestionBen/FirstAdd/gest-ben-detail/gest-ben-detail.component';
import { GestBenListAccepteComponent } from './gestionBen/FirstAdd/gest-ben-list-accepte/gest-ben-list-accepte.component';
import { GestBenListRefuseComponent } from './gestionBen/FirstAdd/gest-ben-list-refuse/gest-ben-list-refuse.component';
import { MenuGestBenAddComponent } from './gestionBen/FirstAdd/menu-gest-ben-add/menu-gest-ben-add.component';
import { AddStockComponent } from './Gestion Stock/add-stock/add-stock.component';
import { EditStockComponent } from './Gestion Stock/edit-stock/edit-stock.component';
import { ListStockComponent } from './Gestion Stock/list-stock/list-stock.component';
import { DetailsStockComponent } from './Gestion Stock/details-stock/details-stock.component';
import { DetailsTypeStockComponent } from './Gestion Stock/details-type-stock/details-type-stock.component';
import { ListTypeStockComponent } from './Gestion Stock/list-type-stock/list-type-stock.component';
import { EditTypeStockComponent } from './Gestion Stock/edit-type-stock/edit-type-stock.component';
import { AddTypeStockComponent } from './Gestion Stock/add-type-stock/add-type-stock.component';
import { MenuStockageSettingsComponent } from './Gestion Stock/menu-stockage-settings/menu-stockage-settings.component';
import { AddStockageComponent } from './Gestion Stock/add-stockage/add-stockage.component';
import { EditStockageComponent } from './Gestion Stock/edit-stockage/edit-stockage.component';
import { ListStockageComponent } from './Gestion Stock/list-stockage/list-stockage.component';
import { DetailsStockageComponent } from './Gestion Stock/details-stockage/details-stockage.component';
import { AddPayDirecteComponent } from './Gestion Stock/add-pay-directe/add-pay-directe.component';
import { EDitPayDirecteComponent } from './Gestion Stock/e-dit-pay-directe/e-dit-pay-directe.component';
import { DetailsPayDirecteComponent } from './Gestion Stock/details-pay-directe/details-pay-directe.component';
import { ListPayDirecteComponent } from './Gestion Stock/list-pay-directe/list-pay-directe.component';
import { ListCreatorPayDirecteComponent } from './Gestion Stock/list-creator-pay-directe/list-creator-pay-directe.component';
import { ListDirPayDirecteComponent } from './Gestion Stock/list-dir-pay-directe/list-dir-pay-directe.component';
import { AddOrdrePayComponent } from './Gestion Stock/add-ordre-pay/add-ordre-pay.component';
import { EditOrdrePayComponent } from './Gestion Stock/edit-ordre-pay/edit-ordre-pay.component';
import { DetailsOrdrePayComponent } from './Gestion Stock/details-ordre-pay/details-ordre-pay.component';
import { ListOrdrePayComponent } from './Gestion Stock/list-ordre-pay/list-ordre-pay.component';
import { ListRespOrdrePayComponent } from './Gestion Stock/list-resp-ordre-pay/list-resp-ordre-pay.component';
import { ListAdminOrdrePayComponent } from './Gestion Stock/list-admin-ordre-pay/list-admin-ordre-pay.component';
import { ListDirOrdrePayComponent } from './Gestion Stock/list-dir-ordre-pay/list-dir-ordre-pay.component';
import { ListBenPayStockageComponent } from './Gestion Stock/list-ben-pay-stockage/list-ben-pay-stockage.component';
import { DetailsBenPayStockageComponent } from './Gestion Stock/details-ben-pay-stockage/details-ben-pay-stockage.component';
import { MenuStockage1Component } from './Gestion Stock/menu-stockage1/menu-stockage1.component';
import { MenuStockage2Component } from './Gestion Stock/menu-stockage2/menu-stockage2.component';
import { HomeStockageComponent } from './Gestion Stock/home-stockage/home-stockage.component';
import { MenuSettingsOrphelinComponent } from './Orphelin/Menu/menu-settings-orphelin/menu-settings-orphelin.component';
import { MainMenuOrphelinComponent } from './Orphelin/Menu/main-menu-orphelin/main-menu-orphelin.component';
import { MatieresOrphelinComponent } from './Orphelin/Settings/matieres-orphelin/matieres-orphelin.component';
import { MaladieOrphelinComponent } from './Orphelin/Settings/maladie-orphelin/maladie-orphelin.component';
import { TalentOrphelinComponent } from './Orphelin/Settings/talent-orphelin/talent-orphelin.component';
import { LivesWithOrphelinComponent } from './Orphelin/Settings/lives-with-orphelin/lives-with-orphelin.component';
import { OrphelinAddComponent } from './Orphelin/Orphelin/orphelin-add/orphelin-add.component';
import { OrphelinEditComponent } from './Orphelin/Orphelin/orphelin-edit/orphelin-edit.component';
import { OrphelinDetailsComponent } from './Orphelin/Orphelin/orphelin-details/orphelin-details.component';
import { OrphelinListComponent } from './Orphelin/Orphelin/orphelin-list/orphelin-list.component';
import { SubventionOrphelinComponent } from './Orphelin/Settings/subvention-orphelin/subvention-orphelin.component';
import { DotationOrphelinComponent } from './Orphelin/Settings/dotation-orphelin/dotation-orphelin.component';
import { OrganismeOrphelinComponent } from './Orphelin/Settings/organisme-orphelin/organisme-orphelin.component';
import { ParenteOrphelinComponent } from './Orphelin/Settings/parente-orphelin/parente-orphelin.component';
import { PointagePresenceAddComponent } from './Pointage/pointage-presence-add/pointage-presence-add.component';
import { PointageQuitterAddComponent } from './Pointage/pointage-quitter-add/pointage-quitter-add.component';
import { PointageAddComponent } from './Pointage/pointage-add/pointage-add.component';
import { PointageListComponent } from './Pointage/pointage-list/pointage-list.component';
import { PointageUserListComponent } from './Pointage/pointage-user-list/pointage-user-list.component';
import { PointageDirectorListComponent } from './Pointage/pointage-director-list/pointage-director-list.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MenuSoldeComponent } from './Parrainage/Menu/menu-solde/menu-solde.component';
import { MenuTuteurComponent } from './Parrainage/Menu/menu-tuteur/menu-tuteur.component';
import { MenuParrainageComponent } from './Parrainage/Menu/menu-parrainage/menu-parrainage.component';
import { AddParrainageComponent } from './Parrainage/Parrainage/add-parrainage/add-parrainage.component';
import { EditParrainageComponent } from './Parrainage/Parrainage/edit-parrainage/edit-parrainage.component';
import { ListParrainageComponent } from './Parrainage/Parrainage/list-parrainage/list-parrainage.component';
import { DetailsParrainageComponent } from './Parrainage/Parrainage/details-parrainage/details-parrainage.component';
import { AddSoldeComponent } from './Parrainage/Solde/add-solde/add-solde.component';
import { EditSoldeComponent } from './Parrainage/Solde/edit-solde/edit-solde.component';
import { DetailsSoldeComponent } from './Parrainage/Solde/details-solde/details-solde.component';
import { ListSoldeComponent } from './Parrainage/Solde/list-solde/list-solde.component';
import { AddTuteurComponent } from './Parrainage/Tuteur/add-tuteur/add-tuteur.component';
import { EditTuteurComponent } from './Parrainage/Tuteur/edit-tuteur/edit-tuteur.component';
import { DetailsTuteurComponent } from './Parrainage/Tuteur/details-tuteur/details-tuteur.component';
import { ListTuteurComponent } from './Parrainage/Tuteur/list-tuteur/list-tuteur.component';
import { MenuProjetOrg1Component } from './ProjetOrg/Menus/menu-projet-org1/menu-projet-org1.component';
import { MenuProjetOrg2Component } from './ProjetOrg/Menus/menu-projet-org2/menu-projet-org2.component';
import { AddProjetClientComponent } from './ProjetOrg/ProjetClient/add-projet-client/add-projet-client.component';
import { ListProjetClientComponent } from './ProjetOrg/ProjetClient/list-projet-client/list-projet-client.component';
import { AddProjetOrgComponent } from './ProjetOrg/Projet/add-projet-org/add-projet-org.component';
import { ListProjetOrgComponent } from './ProjetOrg/Projet/list-projet-org/list-projet-org.component';
import { EditProjetOrgComponent } from './ProjetOrg/Projet/edit-projet-org/edit-projet-org.component';
import { DetailsProjetOrgComponent } from './ProjetOrg/Projet/details-projet-org/details-projet-org.component';
import { ListProjetOrgClosedComponent } from './ProjetOrg/ProjetFiltrage/list-projet-org-closed/list-projet-org-closed.component';
import { ListProjetOrgOpenedComponent } from './ProjetOrg/ProjetFiltrage/list-projet-org-opened/list-projet-org-opened.component';
import { ListProjetOrgWorkedComponent } from './ProjetOrg/ProjetFiltrage/list-projet-org-worked/list-projet-org-worked.component';
import { ListProjetOrgActivatedComponent } from './ProjetOrg/ProjetFiltrage/list-projet-org-activated/list-projet-org-activated.component';
import { ListProjetOrgNotActivatedComponent } from './ProjetOrg/ProjetFiltrage/list-projet-org-not-activated/list-projet-org-not-activated.component';
import { AddPointageEmpComponent } from './PointageViaEmp/add-pointage-emp/add-pointage-emp.component';
import { DetailsPointageEmpComponent } from './PointageViaEmp/details-pointage-emp/details-pointage-emp.component';
import { EditPointageEmpComponent } from './PointageViaEmp/edit-pointage-emp/edit-pointage-emp.component';
import { ListPointageEmpComponent } from './PointageViaEmp/list-pointage-emp/list-pointage-emp.component';
import { UserListPointageEmpComponent } from './PointageViaEmp/user-list-pointage-emp/user-list-pointage-emp.component';
import { MenuPointageEmpComponent } from './PointageViaEmp/menu-pointage-emp/menu-pointage-emp.component';
import { DemCongeNormalComponent } from './Conges/dem-conge-normal/dem-conge-normal.component';
import { DemCongeUrgentComponent } from './Conges/dem-conge-urgent/dem-conge-urgent.component';
import { DemCongeExceptionnelComponent } from './Conges/dem-conge-exceptionnel/dem-conge-exceptionnel.component';
import { DemCongeTravailComponent } from './Conges/dem-conge-travail/dem-conge-travail.component';
import { DemCongeMaladieComponent } from './Conges/dem-conge-maladie/dem-conge-maladie.component';
import { DemCongeHajComponent } from './Conges/dem-conge-haj/dem-conge-haj.component';
import { DemCongeDevoirComponent } from './Conges/dem-conge-devoir/dem-conge-devoir.component';
import { DemCongeMaterniteComponent } from './Conges/dem-conge-maternite/dem-conge-maternite.component';
import { DemCongeMarriageComponent } from './Conges/dem-conge-marriage/dem-conge-marriage.component';
import { DemCongeNouveauNeComponent } from './Conges/dem-conge-nouveau-ne/dem-conge-nouveau-ne.component';
import { DemCongeDecesComponent } from './Conges/dem-conge-deces/dem-conge-deces.component';
import { DemCongeForgeronComponent } from './Conges/dem-conge-forgeron/dem-conge-forgeron.component';
import { DemCongeMenuComponent } from './Conges/dem-conge-menu/dem-conge-menu.component';
import { InterviewAddComponent } from './MediaCenter/Interview/interview-add/interview-add.component';
import { InterviewEditComponent } from './MediaCenter/Interview/interview-edit/interview-edit.component';
import { InterviewDetailsComponent } from './MediaCenter/Interview/interview-details/interview-details.component';
import { InterviewListComponent } from './MediaCenter/Interview/interview-list/interview-list.component';
import { InterviewListCreatorComponent } from './MediaCenter/Interview/interview-list-creator/interview-list-creator.component';
import { InterviewListUsersComponent } from './MediaCenter/Interview/interview-list-users/interview-list-users.component';
import { InterviewMenuSettingsComponent } from './MediaCenter/Interview/interview-menu-settings/interview-menu-settings.component';
import { InterviewMenuUsersComponent } from './MediaCenter/Interview/interview-menu-users/interview-menu-users.component';
import { TypeInterviewComponent } from './MediaCenter/Interview/type-interview/type-interview.component';
import { DemAssistanceAddComponent } from './ServiceRh/Assistance/dem-assistance-add/dem-assistance-add.component';
import { DemAssistanceListUserComponent } from './ServiceRh/Assistance/dem-assistance-list-user/dem-assistance-list-user.component';
import { DemAssistanceListdirComponent } from './ServiceRh/Assistance/dem-assistance-listdir/dem-assistance-listdir.component';
import { DemAssistanceListdirfinComponent } from './ServiceRh/Assistance/dem-assistance-listdirfin/dem-assistance-listdirfin.component';
import { DemAssistanceListetabfinComponent } from './ServiceRh/Assistance/dem-assistance-listetabfin/dem-assistance-listetabfin.component';
import { DemAssistanceListerhComponent } from './ServiceRh/Assistance/dem-assistance-listerh/dem-assistance-listerh.component';

import { MeadiaCenterDemandsAddUserComponent } from './MediaCenter/Menus/meadia-center-demands-add-user/meadia-center-demands-add-user.component';
import { MeadiaCenterDemandsListUserComponent } from './MediaCenter/Menus/meadia-center-demands-list-user/meadia-center-demands-list-user.component';
import { MeadiaCenterDemandsListDirComponent } from './MediaCenter/Menus/meadia-center-demands-list-dir/meadia-center-demands-list-dir.component';
import { MeadiaCenterDemandsAddDirComponent } from './MediaCenter/Menus/meadia-center-demands-add-dir/meadia-center-demands-add-dir.component';
import { CadeauxAddComponent } from './MediaCenter/CadeauxSouvenirs/cadeaux-add/cadeaux-add.component';
import { CadeauxListComponent } from './MediaCenter/CadeauxSouvenirs/cadeaux-list/cadeaux-list.component';
import { CadeauxListDirComponent } from './MediaCenter/CadeauxSouvenirs/cadeaux-list-dir/cadeaux-list-dir.component';
import { CadeauxListUserComponent } from './MediaCenter/CadeauxSouvenirs/cadeaux-list-user/cadeaux-list-user.component';
import { CadeauxListEtabComponent } from './MediaCenter/CadeauxSouvenirs/cadeaux-list-etab/cadeaux-list-etab.component';
import { CadeauxOccasionCrudComponent } from './MediaCenter/CadeauxSouvenirs/cadeaux-occasion-crud/cadeaux-occasion-crud.component';
import { CadeauxHonorCrudComponent } from './MediaCenter/CadeauxSouvenirs/cadeaux-honor-crud/cadeaux-honor-crud.component';
import { ExthechniqueAddComponent } from './MediaCenter/ExtensionTechnique/exthechnique-add/exthechnique-add.component';
import { ExthechniqueListUserComponent } from './MediaCenter/ExtensionTechnique/exthechnique-list-user/exthechnique-list-user.component';
import { ExthechniqueListDirComponent } from './MediaCenter/ExtensionTechnique/exthechnique-list-dir/exthechnique-list-dir.component';
import { ExthechniqueListEtabComponent } from './MediaCenter/ExtensionTechnique/exthechnique-list-etab/exthechnique-list-etab.component';
import { TypeExthechniqueCrudComponent } from './MediaCenter/ExtensionTechnique/type-exthechnique-crud/type-exthechnique-crud.component';
import { RecordingArchiveAddComponent } from './MediaCenter/RecordingArchive/recording-archive-add/recording-archive-add.component';
import { RecordingArchiveListUserComponent } from './MediaCenter/RecordingArchive/recording-archive-list-user/recording-archive-list-user.component';
import { RecordingArchiveListDirComponent } from './MediaCenter/RecordingArchive/recording-archive-list-dir/recording-archive-list-dir.component';
import { RecordingArchiveListEtabComponent } from './MediaCenter/RecordingArchive/recording-archive-list-etab/recording-archive-list-etab.component';
import { TypeRecordingArchiveCrudComponent } from './MediaCenter/RecordingArchive/type-recording-archive-crud/type-recording-archive-crud.component';
import { RendonneAddComponent } from './MediaCenter/Rendonee/rendonne-add/rendonne-add.component';
import { RendonneListDirComponent } from './MediaCenter/Rendonee/rendonne-list-dir/rendonne-list-dir.component';
import { RendonneListUserComponent } from './MediaCenter/Rendonee/rendonne-list-user/rendonne-list-user.component';
import { RendonneListEtabComponent } from './MediaCenter/Rendonee/rendonne-list-etab/rendonne-list-etab.component';
import { TypeRendonneCrudComponent } from './MediaCenter/Rendonee/type-rendonne-crud/type-rendonne-crud.component';
import { FilmAddComponent } from './MediaCenter/film/film-add/film-add.component';
import { FilmEdityComponent } from './MediaCenter/film/film-edity/film-edity.component';
import { FilmDetailsComponent } from './MediaCenter/film/film-details/film-details.component';
import { FilmListUserComponent } from './MediaCenter/film/film-list-user/film-list-user.component';
import { FilmListDirComponent } from './MediaCenter/film/film-list-dir/film-list-dir.component';
import { FilmListEtabComponent } from './MediaCenter/film/film-list-etab/film-list-etab.component';
import { FilmTypeCrudComponent } from './MediaCenter/film/film-type-crud/film-type-crud.component';
import { OccasionSoireeAddComponent } from './MediaCenter/OccaSoiree/occasion-soiree-add/occasion-soiree-add.component';
import { OccasionSoireeEditComponent } from './MediaCenter/OccaSoiree/occasion-soiree-edit/occasion-soiree-edit.component';
import { OccasionSoireeDetailsComponent } from './MediaCenter/OccaSoiree/occasion-soiree-details/occasion-soiree-details.component';
import { OccasionSoireeListUserComponent } from './MediaCenter/OccaSoiree/occasion-soiree-list-user/occasion-soiree-list-user.component';
import { OccasionSoireeListDirComponent } from './MediaCenter/OccaSoiree/occasion-soiree-list-dir/occasion-soiree-list-dir.component';
import { OccasionSoireeListEtabComponent } from './MediaCenter/OccaSoiree/occasion-soiree-list-etab/occasion-soiree-list-etab.component';
import { OccasionSoireeTypeCrudComponent } from './MediaCenter/OccaSoiree/occasion-soiree-type-crud/occasion-soiree-type-crud.component';
import { PartageMediaAddComponent } from './MediaCenter/PartageMedia/partage-media-add/partage-media-add.component';
import { PartageMediaEditComponent } from './MediaCenter/PartageMedia/partage-media-edit/partage-media-edit.component';
import { PartageMediaDetailComponent } from './MediaCenter/PartageMedia/partage-media-detail/partage-media-detail.component';
import { PartageMediaListUserComponent } from './MediaCenter/PartageMedia/partage-media-list-user/partage-media-list-user.component';
import { PartageMediaListDirComponent } from './MediaCenter/PartageMedia/partage-media-list-dir/partage-media-list-dir.component';
import { PartageMediaListEtabComponent } from './MediaCenter/PartageMedia/partage-media-list-etab/partage-media-list-etab.component';
import { PartageMediaTypeCrudComponent } from './MediaCenter/PartageMedia/partage-media-type-crud/partage-media-type-crud.component';
import { VisiteAddComponent } from './MediaCenter/Visite/visite-add/visite-add.component';
import { VisiteListComponent } from './MediaCenter/Visite/visite-list/visite-list.component';
import { VisiteListUserComponent } from './MediaCenter/Visite/visite-list-user/visite-list-user.component';
import { VisiteListDirComponent } from './MediaCenter/Visite/visite-list-dir/visite-list-dir.component';
import { VisiteListEtabComponent } from './MediaCenter/Visite/visite-list-etab/visite-list-etab.component';
import { VisiteEditComponent } from './MediaCenter/Visite/visite-edit/visite-edit.component';
import { VisiteDetailsComponent } from './MediaCenter/Visite/visite-details/visite-details.component';
import { VisiteTypeCrudComponent } from './MediaCenter/Visite/visite-type-crud/visite-type-crud.component';
import { MontageAddComponent } from './MediaCenter/Montage/montage-add/montage-add.component';
import { MontageListUserComponent } from './MediaCenter/Montage/montage-list-user/montage-list-user.component';
import { MontageListDirComponent } from './MediaCenter/Montage/montage-list-dir/montage-list-dir.component';
import { MontageListEmployeeComponent } from './MediaCenter/Montage/montage-list-employee/montage-list-employee.component';
import { MontageListEtabComponent } from './MediaCenter/Montage/montage-list-etab/montage-list-etab.component';
import { MontageEditComponent } from './MediaCenter/Montage/montage-edit/montage-edit.component';
import { MontageDetailsComponent } from './MediaCenter/Montage/montage-details/montage-details.component';
import { MontageEmployeeRecepComponent } from './MediaCenter/Montage/montage-employee-recep/montage-employee-recep.component';
import { MontageEmployeeAddFilesComponent } from './MediaCenter/Montage/montage-employee-add-files/montage-employee-add-files.component';
import { DesignAddComponent } from './MediaCenter/ImpressionDesign/design-add/design-add.component';
import { DesignDetailsComponent } from './MediaCenter/ImpressionDesign/design-details/design-details.component';
import { DesignEditComponent } from './MediaCenter/ImpressionDesign/design-edit/design-edit.component';
import { DesignListRecepComponent } from './MediaCenter/ImpressionDesign/design-list-recep/design-list-recep.component';
import { DesignListCreatorComponent } from './MediaCenter/ImpressionDesign/design-list-creator/design-list-creator.component';
import { DesignListEmployeeComponent } from './MediaCenter/ImpressionDesign/design-list-employee/design-list-employee.component';
import { DesignListEtabComponent } from './MediaCenter/ImpressionDesign/design-list-etab/design-list-etab.component';
import { CongesEtabListComponent } from './TransferetServices/conges-etab-list/conges-etab-list.component';
import { CongesRHListComponent } from './TransferetServices/conges-rhlist/conges-rhlist.component';
import { FormationEtabListComponent } from './TransferetServices/formation-etab-list/formation-etab-list.component';
import { FormationRHListComponent } from './TransferetServices/formation-rhlist/formation-rhlist.component';
import { SupHeureRHListComponent } from './TransferetServices/sup-heure-rhlist/sup-heure-rhlist.component';
import { SupHeureEtabListComponent } from './TransferetServices/sup-heure-etab-list/sup-heure-etab-list.component';
import { TravailEtabListComponent } from './TransferetServices/travail-etab-list/travail-etab-list.component';
import { TravailRHListComponent } from './TransferetServices/travail-rhlist/travail-rhlist.component';
import { AvanceRHListComponent } from './TransferetServices/avance-rhlist/avance-rhlist.component';
import { AvanceEtabListComponent } from './TransferetServices/avance-etab-list/avance-etab-list.component';
import { AddMusulmanComponent } from './NvMusulman/add-musulman/add-musulman.component';
import { EditMusulmanComponent } from './NvMusulman/edit-musulman/edit-musulman.component';
import { DetailsMusulmanComponent } from './NvMusulman/details-musulman/details-musulman.component';
import { MenuMusulmanComponent } from './NvMusulman/menu-musulman/menu-musulman.component';
import { ListMusulmanComponent } from './NvMusulman/list-musulman/list-musulman.component';
import { MenuRetraitComponent } from './Retrait/Menus/menu-retrait/menu-retrait.component';
import { MenuRetraitGeneralComponent } from './Retrait/Menus/menu-retrait-general/menu-retrait-general.component';
import { MenuRetraitEspeceComponent } from './Retrait/Menus/menu-retrait-espece/menu-retrait-espece.component';
import { MenuRetraitChequeComponent } from './Retrait/Menus/menu-retrait-cheque/menu-retrait-cheque.component';
import { ChequeRetraitAddComponent } from './Retrait/RetraitCheque/cheque-retrait-add/cheque-retrait-add.component';
import { ChequeRetraitEditComponent } from './Retrait/RetraitCheque/cheque-retrait-edit/cheque-retrait-edit.component';
import { ChequeRetraitDetailsComponent } from './Retrait/RetraitCheque/cheque-retrait-details/cheque-retrait-details.component';
import { ChequeRetraitListActiveComponent } from './Retrait/RetraitCheque/cheque-retrait-list-active/cheque-retrait-list-active.component';
import { ChequeRetraitListTribucheComponent } from './Retrait/RetraitCheque/cheque-retrait-list-tribuche/cheque-retrait-list-tribuche.component';
import { ChequeRetraitListGeneralComponent } from './Retrait/RetraitCheque/cheque-retrait-list-general/cheque-retrait-list-general.component';
import { EspeceRetraitAddComponent } from './Retrait/RetraitEspece/espece-retrait-add/espece-retrait-add.component';
import { EspeceRetraitListComponent } from './Retrait/RetraitEspece/espece-retrait-list/espece-retrait-list.component';
import { EspeceRetraitListActiveComponent } from './Retrait/RetraitEspece/espece-retrait-list-active/espece-retrait-list-active.component';
import { EspeceRetraitListTribucheComponent } from './Retrait/RetraitEspece/espece-retrait-list-tribuche/espece-retrait-list-tribuche.component';
import { EspeceRetraitEditComponent } from './Retrait/RetraitEspece/espece-retrait-edit/espece-retrait-edit.component';
import { EspeceRetraitDetailsComponent } from './Retrait/RetraitEspece/espece-retrait-details/espece-retrait-details.component';
import { NotifTextCrudComponent } from './NotificationSettings/notif-text-crud/notif-text-crud.component';
import { AdressMacAddComponent } from './Pointage/AdressesMac/adress-mac-add/adress-mac-add.component';
import { AdressMacListComponent } from './Pointage/AdressesMac/adress-mac-list/adress-mac-list.component';
import { AdressMacEditComponent } from './Pointage/AdressesMac/adress-mac-edit/adress-mac-edit.component';
import { AdressMacDetailsComponent } from './Pointage/AdressesMac/adress-mac-details/adress-mac-details.component';
import { NewChequeListDirDirecteComponent } from './ChequeNew/new-cheque-list-dir-directe/new-cheque-list-dir-directe.component';
import { NewChequeListEtabFinComponent } from './ChequeNew/new-cheque-list-etab-fin/new-cheque-list-etab-fin.component';
import { NewChequeListDirFinComponent } from './ChequeNew/new-cheque-list-dir-fin/new-cheque-list-dir-fin.component';
import { NewChequeListDirGeneralComponent } from './ChequeNew/new-cheque-list-dir-general/new-cheque-list-dir-general.component';
import { NewChequeListBoxMenComponent } from './ChequeNew/new-cheque-list-box-men/new-cheque-list-box-men.component';
import { NewChequeListPayeeComponent } from './ChequeNew/new-cheque-list-payee/new-cheque-list-payee.component';
import { NewChequeMenuDirComponent } from './ChequeNew/new-cheque-menu-dir/new-cheque-menu-dir.component';
import { NewChequeMenuDirGComponent } from './ChequeNew/new-cheque-menu-dir-g/new-cheque-menu-dir-g.component';
import { NewChequeMenuDirFinComponent } from './ChequeNew/new-cheque-menu-dir-fin/new-cheque-menu-dir-fin.component';
import { NewChequeMenuEtabFinComponent } from './ChequeNew/new-cheque-menu-etab-fin/new-cheque-menu-etab-fin.component';
import { NewChequeMenuBonMenComponent } from './ChequeNew/new-cheque-menu-bon-men/new-cheque-menu-bon-men.component';
import { NewChequeMenuPayeeComponent } from './ChequeNew/new-cheque-menu-payee/new-cheque-menu-payee.component';
import { ActiviteeAddComponent } from './Activitee/activitee-add/activitee-add.component';
import { ActiviteeListComponent } from './Activitee/activitee-list/activitee-list.component';
import { ActiviteeEditComponent } from './Activitee/activitee-edit/activitee-edit.component';
import { ActiviteeDetailComponent } from './Activitee/activitee-detail/activitee-detail.component';
import { TypeActiviteeComponent } from './Activitee/type-activitee/type-activitee.component';
import { MenuActiviteeComponent } from './Activitee/menu-activitee/menu-activitee.component';
import { TypeTransactionComponent } from './AdministrativeCommunication/type-transaction/type-transaction.component';
import { MusuWomenAddComponent } from './MusulmanFemme/musu-women-add/musu-women-add.component';
import { MusuWomenListComponent } from './MusulmanFemme/musu-women-list/musu-women-list.component';
import { MusuWomenEditComponent } from './MusulmanFemme/musu-women-edit/musu-women-edit.component';
import { MusuWomenDetailsComponent } from './MusulmanFemme/musu-women-details/musu-women-details.component';
import { MusuWomenMenuComponent } from './MusulmanFemme/musu-women-menu/musu-women-menu.component';
import { TypeRecrutementComponent } from './RH/Recrutement/type-recrutement/type-recrutement.component';
import { ChangeRibAddComponent } from './ChangeRib/change-rib-add/change-rib-add.component';
import { ChangeRibUserListComponent } from './ChangeRib/change-rib-user-list/change-rib-user-list.component';
import { ChangeRibRhListComponent } from './ChangeRib/change-rib-rh-list/change-rib-rh-list.component';
import { ActiviteeRapDawaaHommeComponent } from './Rapports/Activitee/activitee-rap-dawaa-homme/activitee-rap-dawaa-homme.component';
import { ActiviteeRapDawaawomenComponent } from './Rapports/Activitee/activitee-rap-dawaawomen/activitee-rap-dawaawomen.component';
import { RapWomenComponent } from './Rapports/MusulmanFemme/rap-women/rap-women.component';
import { RapMenComponent } from './Rapports/MusulmanHomme/rap-men/rap-men.component';
import { ConfigFrontSystemCrudComponent } from './ConfigSystemShowing/config-front-system-crud/config-front-system-crud.component';
import { ConfigFrontSystemDetailsComponent } from './ConfigSystemShowing/config-front-system-details/config-front-system-details.component';
import { DotationDemMenuComponent } from './Main Menus/dotation-dem-menu/dotation-dem-menu.component';
import { DotationDemUserShowMenuComponent } from './Main Menus/dotation-dem-user-show-menu/dotation-dem-user-show-menu.component';
import { DotationForSettingsMenuComponent } from './Main Menus/dotation-for-settings-menu/dotation-for-settings-menu.component';
import { DecisionUserMenuComponent } from './Decisions/DecisionMenus/decision-user-menu/decision-user-menu.component';
import { DecisionDirMenuComponent } from './Decisions/DecisionMenus/decision-dir-menu/decision-dir-menu.component';
import { AlarmeAddComponent } from './Decisions/Alarme/alarme-add/alarme-add.component';
import { AlarmeListComponent } from './Decisions/Alarme/alarme-list/alarme-list.component';
import { AttetionAddComponent } from './Decisions/Attention/attetion-add/attetion-add.component';
import { AttetionLisComponent } from './Decisions/Attention/attetion-lis/attetion-lis.component';
import { DecisifAddComponent } from './Decisions/Decisif/decisif-add/decisif-add.component';
import { DecisifListDirComponent } from './Decisions/Decisif/decisif-list-dir/decisif-list-dir.component';
import { DecisifListUserComponent } from './Decisions/Decisif/decisif-list-user/decisif-list-user.component';
import { DecisifDetailsComponent } from './Decisions/Decisif/decisif-details/decisif-details.component';
import { DecisifEditComponent } from './Decisions/Decisif/decisif-edit/decisif-edit.component';
import { CommunDetailsComponent } from './Decisions/Commun/commun-details/commun-details.component';
import { CommunEditComponent } from './Decisions/Commun/commun-edit/commun-edit.component';
import { RabattreAddComponent } from './Decisions/Rabattre/rabattre-add/rabattre-add.component';
import { RabattreListComponent } from './Decisions/Rabattre/rabattre-list/rabattre-list.component';
import { MenuDecisionListComponent } from './Decisions/DecisionMenus/menu-decision-list/menu-decision-list.component';
import { DecisionDemissionAddComponent } from './Decisions/Demission/decision-demission-add/decision-demission-add.component';
import { DecisionDemissionListComponent } from './Decisions/Demission/decision-demission-list/decision-demission-list.component';
import { AttentionReportComponent } from './Decisions/Reports/attention-report/attention-report.component';
import { RabattreReportComponent } from './Decisions/Reports/rabattre-report/rabattre-report.component';
import { DecissiveReportComponent } from './Decisions/Reports/decissive-report/decissive-report.component';
import { TicketsCommentsComponent } from './Maintenance/tickets-comments/tickets-comments.component';
import { AllTicketsComponent } from './Maintenance/all-tickets/all-tickets.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RetyourStockAddComponent } from './Gestion Stock/RetourStock/retyour-stock-add/retyour-stock-add.component';
import { HomeMenuStockageServiceComponent } from './Gestion Stock/RetourStock/home-menu-stockage-service/home-menu-stockage-service.component';
import { RetyourStockEditComponent } from './Gestion Stock/RetourStock/retyour-stock-edit/retyour-stock-edit.component';
import { RetyourStockListComponent } from './Gestion Stock/RetourStock/retyour-stock-list/retyour-stock-list.component';
import { RetyourStockDetailsComponent } from './Gestion Stock/RetourStock/retyour-stock-details/retyour-stock-details.component';
import { AllDemandsComponent } from './all-demands/all-demands.component';
import { TypeDemTechCrudComponent } from './TechnicalDemands/Settings/type-dem-tech-crud/type-dem-tech-crud.component';
import { MenuDirDemTechComponent } from './TechnicalDemands/Menus/menu-dir-dem-tech/menu-dir-dem-tech.component';
import { MenuUserDemTechComponent } from './TechnicalDemands/Menus/menu-user-dem-tech/menu-user-dem-tech.component';
import { DemTechAddUserComponent } from './TechnicalDemands/main/dem-tech-add-user/dem-tech-add-user.component';
import { DemTechListUserComponent } from './TechnicalDemands/main/dem-tech-list-user/dem-tech-list-user.component';
import { DemTechListDirrComponent } from './TechnicalDemands/main/dem-tech-list-dirr/dem-tech-list-dirr.component';
import { DemTechEditComponent } from './TechnicalDemands/main/dem-tech-edit/dem-tech-edit.component';
import { DemTechDetailsComponent } from './TechnicalDemands/main/dem-tech-details/dem-tech-details.component';
import { ServiceVenteAddComponent } from './ServiceVente/service-vente-add/service-vente-add.component';
import { ServiceVenteListComponent } from './ServiceVente/service-vente-list/service-vente-list.component';
import { ServiceVenteListFinComponent } from './ServiceVente/service-vente-list-fin/service-vente-list-fin.component';
import { ServiceVenteListDotComponent } from './ServiceVente/service-vente-list-dot/service-vente-list-dot.component';
import { CrudTypeServiceVenteComponent } from './ServiceVente/crud-type-service-vente/crud-type-service-vente.component';
import { EventsReportComponent } from './Rapports/events-report/events-report.component';
import { TypeActiviteForWomensComponent } from './Activitee/type-activite-for-womens/type-activite-for-womens.component';
import { ActiviteForWomensComponent } from './Activitee/activite-for-womens/activite-for-womens.component';
import { ActiviteForWomensListComponent } from './Activitee/activite-for-womens-list/activite-for-womens-list.component';
import { ActiviteForWomensMenusComponent } from './Activitee/activite-for-womens-menus/activite-for-womens-menus.component';
import { ActiviteDawaAddComponent } from './Activitee/Dawaa/activite-dawa-add/activite-dawa-add.component';
import { ActiviteDawaListComponent } from './Activitee/Dawaa/activite-dawa-list/activite-dawa-list.component';
import { DawaaMenuComponent } from './Activitee/Dawaa/dawaa-menu/dawaa-menu.component';
import { ActiviteCompagneAddComponent } from './Activitee/Compagne/activite-compagne-add/activite-compagne-add.component';
import { ActiviteCompagneListComponent } from './Activitee/Compagne/activite-compagne-list/activite-compagne-list.component';
import { ActiviteCompagneMenuComponent } from './Activitee/Compagne/activite-compagne-menu/activite-compagne-menu.component';
import { ActiviteEducationAddComponent } from './Activitee/Education/activite-education-add/activite-education-add.component';
import { ActiviteEducationListComponent } from './Activitee/Education/activite-education-list/activite-education-list.component';
import { EducationMenuComponent } from './Activitee/Education/education-menu/education-menu.component';
import { ActiviteImmigrationAddComponent } from './Activitee/Immigration/activite-immigration-add/activite-immigration-add.component';
import { ActiviteImmigrationListComponent } from './Activitee/Immigration/activite-immigration-list/activite-immigration-list.component';
import { ImmigrationMenuComponent } from './Activitee/Immigration/immigration-menu/immigration-menu.component';
import { ActivitePrepaAddComponent } from './Activitee/Prepa/activite-prepa-add/activite-prepa-add.component';
import { ActivitePrepaListComponent } from './Activitee/Prepa/activite-prepa-list/activite-prepa-list.component';
import { PrepaMenuComponent } from './Activitee/Prepa/prepa-menu/prepa-menu.component';
import { ActiviteTypePrepaComponent } from './Activitee/Prepa/activite-type-prepa/activite-type-prepa.component';
import { TypeActiviteeImmigrationComponent } from './Activitee/Immigration/type-activitee-immigration/type-activitee-immigration.component';
import { TypeActiviteeEducationComponent } from './Activitee/Education/type-activitee-education/type-activitee-education.component';
import { TypeActiviteeDawaaComponent } from './Activitee/Dawaa/type-activitee-dawaa/type-activitee-dawaa.component';
import { TypeActiviteeCompagneComponent } from './Activitee/Compagne/type-activitee-compagne/type-activitee-compagne.component';
import { ActiviteDawaElecAddComponent } from './Activitee/DawaaElec/activite-dawa-elec-add/activite-dawa-elec-add.component';
import { ActiviteDawaElecListComponent } from './Activitee/DawaaElec/activite-dawa-elec-list/activite-dawa-elec-list.component';
import { DawaElecMenuComponent } from './Activitee/DawaaElec/dawa-elec-menu/dawa-elec-menu.component';
import { TypeDawaElecComponent } from './Activitee/DawaaElec/type-dawa-elec/type-dawa-elec.component';
import { DemandeVoitureAddComponent } from './DemandeVoiture/demande-voiture-add/demande-voiture-add.component';
import { DemandeVoitureListUserComponent } from './DemandeVoiture/demande-voiture-list-user/demande-voiture-list-user.component';
import { DemandeVoitureListDirComponent } from './DemandeVoiture/demande-voiture-list-dir/demande-voiture-list-dir.component';
import { AllMaintenanceAddComponent } from './AllMaintenance/all-maintenance-add/all-maintenance-add.component';
import { AllMaintenanceListComponent } from './AllMaintenance/all-maintenance-list/all-maintenance-list.component';
import { AllMaintenanceListUserComponent } from './AllMaintenance/all-maintenance-list-user/all-maintenance-list-user.component';
import { AllMaintenanceListDirrComponent } from './AllMaintenance/all-maintenance-list-dirr/all-maintenance-list-dirr.component';
import { AllMaintenanceListEmployeeComponent } from './AllMaintenance/all-maintenance-list-employee/all-maintenance-list-employee.component';
import { AllMaintenanceTypeCrudComponent } from './AllMaintenance/all-maintenance-type-crud/all-maintenance-type-crud.component';
import { HistoCongesComponent } from './Historique/Demandes/histo-conges/histo-conges.component';
import { HistoPermissionComponent } from './Historique/Demandes/histo-permission/histo-permission.component';
import { HistoEquiComponent } from './Historique/Demandes/histo-equi/histo-equi.component';
import { HistoSlaireComponent } from './Historique/Demandes/histo-slaire/histo-slaire.component';
import { HistoResidenceComponent } from './Historique/Demandes/histo-residence/histo-residence.component';
import { HistoRecrutementComponent } from './Historique/Demandes/histo-recrutement/histo-recrutement.component';
import { HistoPayChequeComponent } from './Historique/Demandes/histo-pay-cheque/histo-pay-cheque.component';
import { HistoCreFinanceComponent } from './Historique/Demandes/histo-cre-finance/histo-cre-finance.component';
import { HistoFormationComponent } from './Historique/Demandes/histo-formation/histo-formation.component';
import { HistoDemissionComponent } from './Historique/Demandes/histo-demission/histo-demission.component';
import { HistoPlaintComponent } from './Historique/Demandes/histo-plaint/histo-plaint.component';
import { HistoTicketEmployeeComponent } from './Historique/Demandes/histo-ticket-employee/histo-ticket-employee.component';
import { HistoAvanceComponent } from './Historique/Demandes/histo-avance/histo-avance.component';
import { HistoMaintenanceComponent } from './Historique/Demandes/histo-maintenance/histo-maintenance.component';
import { HistoHeureSuppComponent } from './Historique/Demandes/histo-heure-supp/histo-heure-supp.component';
import { HistoEmploiComponent } from './Historique/Demandes/histo-emploi/histo-emploi.component';
import { HistoAttestationComponent } from './Historique/Demandes/histo-attestation/histo-attestation.component';
import { HistoAssistanceComponent } from './Historique/Demandes/histo-assistance/histo-assistance.component';
import { HistoChangeRibComponent } from './Historique/Demandes/histo-change-rib/histo-change-rib.component';
import { HistoVoitureComponent } from './Historique/Demandes/histo-voiture/histo-voiture.component';
import { HistoMaintenanceVoitureComponent } from './Historique/Demandes/histo-maintenance-voiture/histo-maintenance-voiture.component';
import { HistoStockageComponent } from './Historique/Demandes/histo-stockage/histo-stockage.component';
import { HistoVenteComponent } from './Historique/Demandes/histo-vente/histo-vente.component';
import { HistoTechComponent } from './Historique/Demandes/histo-tech/histo-tech.component';
import { HistoAllMaintenanceComponent } from './Historique/Demandes/histo-all-maintenance/histo-all-maintenance.component';
import { HistoMenusComponent } from './Historique/Menus/histo-menus/histo-menus.component';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SideMenuComponent,
    LoginPageComponent,
    UserInfoComponent,
    MainTasksComponent,
    NewTaskComponent,
    TasksListComponent,
    TaskDetailsComponent,
    EvaluatedTaskComponent,
    CompletedTaskComponent,
    AlertsComponent,
    MailingComponent,
    UserRegistrationComponent,
    TasksListReceivedComponent,
    TasksListDoneComponent,
    TasksListDelayedComponent,
    TasksListCreatedComponent,
    UsersListComponent,
    TasksReportsComponent,
    TasksReportsReceivedComponent,
    AdministrationListComponent,
    NewAdministrationComponent,
    NewEtablissementComponent,
    EtablissementListComponent,
    UserUpdatingComponent,
    ForbiddenPageComponent,
    TasksUpMenuComponent,
    UserRegisterComponent,
    UserChangePaswordComponent,
    EnregistrerDotationComponent,
    ListeDotationComponent,
    DotationDetailsComponent,
    DotationEditComponent,
    UniteEditComponent,
    UniteDetailsComponent,
    EnregistrerUniteComponent,
    ListeUniteComponent,
    ListeLocataireComponent,
    EditLocataireComponent,
    LocataireDetailsComponent,
    RevenusDetailsComponent,
    RevenusListComponent,
    EnregistrerRevenusComponent,
    EditRevenusComponent,
    EnregistrerLocataireComponent,
    DepotRevenusComponent,
    ServiceRevenusComponent,
    TypedotationComponent,
    EtatdotationComponent,
    EtatuniteComponent,
    TypeuniteComponent,
    MenuFinanceComponent,
    MainFinancePageComponent,
    MainFarametrageFinancePageComponent,
    BureauImmobPageComponent,
    OrganismeComponent,
    ProprietaireComponent,
    EnregistrerTRRecueComponent,
    MyListeTrComponent,
    MyListeTrEmiseComponent,
    EnregistrerTREComponent,
    EnregistrerTRIComponent,
    MyListeTrIComponent,
    MyListeDecisionComponent,
    EnregistrerDecisionComponent,
    ACMenuComponent,
    ListeOrganismeComponent,
    ListeProprietaireComponent,
    MainPageACComponent,
    MainPageAC2Component,
    TransactionsRListComponent,
    EnregDefRComponent,
    EnregTempRComponent,
    EnregRComponent,
    AfftectedToMyAdminRComponent,
    TransactionsElistComponent,
    EnregEComponent,
    AfftectedToMyAdminEComponent,
    EnregTempEComponent,
    EnregDefEComponent,
    RappotEmiseComponent,
    RapportInterneComponent,
    RapportRecueComponent,
    EnregDefIComponent,
    EnregTempIComponent,
    EnregIComponent,
    AffectedToMyAdminIComponent,
    BeneficiaireCComponent,
    TacheEvCComponent,
    OutilsCComponent,
    MediasCComponent,
    ClasseCComponent,
    TblMenuComponent,
    TblMainComponent,
    EventRegisterComponent,
    EventDetailsComponent,
    EventListComponent,
    ActivityCComponent,
    DepenseCComponent,
    DemandeCongeComponent,
    MyListCongeComponent,
    ValidateCongeComponent,
    SuivieCongeComponent,
    PermissionAddComponent,
    PermissionListComponent,
    NomEquipementComponent,
    TypeEquipementComponent,
    EquipementAddComponent,
    EquipementListComponent,
    RecrutementListComponent,
    RecrutementAddComponent,
    EquipementListDirComponent,
    PermissionUListDirComponent,
    MenurequestsComponent,
    NavmenurequestsComponent,
    TicketAddComponent,
    TicketMyLisComponent,
    TicketDirLisComponent,
    SalaialeAddComponent,
    SalaialeMyLisComponent,
    SalaialeDirLisComponent,
    SoldeCongeComponent,
    EmployeeAddComponent,
    EmployeePrivilegesUpdateComponent,
    EmployeePrivilegesAddComponent,
    EmployeeUpdateComponent,
    RecrutmenetDirListComponent,
    MyListRecrutmentComponent,
    RhRecrutmentListComponent,
    RhCongeListComponent,
    NewsDetailComponent,
    NewsAddComponent,
    NewsListViewerComponent,
    NewsListCreatorComponent,
    PrivAddComponent,
    MyPrivListComponent,
    PrivListDirComponent,
    PrivListRhComponent,
    CarsAddComponent,
    CarsListComponent,
    CarsRepairRequestAddComponent,
    CarsRepairRequestListComponent,
    CarsMenuComponent,
    FinanceMenuParamComponent,
    TypeBeneficiaireComponent,
    TypeDepenseComponent,
    BrancheOneComponent,
    BrancheTwoComponent,
    TypeFactureComponent,
    ProjetProgComponent,
    FactureAddComponent,
    FactureListComptableComponent,
    FactureListDirecteurComponent,
    AcceptedFactureComponent,
    MainNotAcceptedComponent,
    MainReadyPayementComponent,
    CreanceFinancireAddComponent,
    CreanceFinancireListComponent,
    MenuReadyPayementComponent,
    MenuNotAcceptedComponent,
    MainAcceptedComponent,
    MaenuAcceptedComponent,
    CreFinanAddComponent,
    CreFinanListEmployeeComponent,
    CreFinanListDirectorComponent,
    CreFinanListAcceptedComponent,
    CreFinanListComptableComponent,
    AvanceAddComponent,
    AvanceListEComponent,
    AvanceListCComponent,
    AvanceListDComponent,
    AvanceListNotAcceptedComponent,
    MainAcceptedAvanceComponent,
    MainNotAcceptedAvanceComponent,
    MainReadyAvanceComponent,
    RecepChequeAddComponent,
    RecepChequeListComponent,
    EventTwoAddComponent,
    EventTwoDetailComponent,
    EventTwoGalleryComponent,
    EventTwoListComponent,
    TypeVoitureComponent,
    OrganismeVoitureComponent,
    DirectorListCarsComponent,
    ComptableListCarsComponent,
    RecueDonsAddComponent,
    RecueDonsListComponent,
    PayementReceptionAddComponent,
    PayementReceptionListComponent,
    DonsReportsComponent,
    ProjDonsComponent,
    RecuEmpDateComponent,
    RecuDateComponent,
    RecuEmpPeriodeComponent,
    RecuProjDateComponent,
    RecuProjPriodComponent,
    RecuNbDateComponent,
    RecuNbPeriodComponent,
    RevenusEmpMonthComponent,
    RevenusMonthComponent,
    RevenusPeriodComponent,
    RevenusEmpPeriodComponent,
    RevenusEmpDateComponent,
    RevenusEmpDateMonthComponent,
    FormationAddComponent,
    FormationListComponent,
    FormationShowComponent,
    SpecialiteComponent,
    MenuFormationComponent,
    CrudEventsTwoComponent,
    CrudNewsComponent,
    MaitenanceRequestAddComponent,
    MaitenanceRequestListComponent,
    MaitenanceRequestMecanicalListComponent,
    MainServicesPageComponent,
    PanneComponent,
    SuppHeureAddComponent,
    SuppHeureListComponent,
    DemandeSuppHeureListComponent,
    DemandeSuppHeureAddComponent,
    DemandeSuppHeureListcreatorComponent,
    DemandeSuppHeureListDirectorComponent,
    MenuSuppHeureComponent,
    EmployeeMaintRequestListComponent,
    NomFileOrgComponent,
    FilesorgAddComponent,
    FilesorgLisComponent,
    FilesorgMenuComponent,
    FilesEmployeeComponent,
    AttestationTravailAddComponent,
    AttestationTravailLisComponent,
    AttestationTravailRhListComponent,
    TransfertInterneAddComponent,
    TransfertInterneShowComponent,
    TransfertInterneListComponent,
    ReceptionEquipementAddComponent,
    ReceptionEquipementListComponent,
    ReceptionEquipementListRhComponent,
    DecisionListComponent,
    SuppEquipementComponent,
    DemandeFormationAddComponent,
    DemandeFormationLisComponent,
    DemandeFormationListRhComponent,
    DemandeFormationListCComponent,
    DemandeFormationListdirComponent,
    DemandeFormationUserAddComponent,
    NewFormationRequestAddComponent,
    NewFormationRequestListComponent,
    MyFormationComponent,
    MyEquipementComponent,
    FormationexistsListdirComponent,
    CreationAddComponent,
    CreationListComponent,
    CreationListRhComponent,
    CreationListDirComponent,
    CreationListDirGComponent,
    FilesCrudEmployeeComponent,
    DotationMenuComponent,
    ProjetAddComponent,
    ProjetListComponent,
    ProjetDetailsComponent,
    ProjetMenuComponent,
    ProjetListingMenuComponent,
    ProjetCompteComponent,
    ProjetOrgSuppComponent,
    ProjetClassComponent,
    ProjetPayActiviteComponent,
    ProjetPayTypeComponent,
    EventEditComponent,
    ProjetEditComponent,
    ProjetAdd2Component,
    ComptesListComponent,
    EtatComptesAddComponent,
    EditEtatCompteComponent,
    EtatCompteSettingsComponent,
    ServiceBanqueAddComponent,
    ServiceBanqueLisComponent,
    MenuCompteComponent,
    MenuSettingsCompteComponent,
    SuppliesAddComponent,
    SuppliesListComponent,
    SuppliesEditComponent,
    ChequecAddComponent,
    ChequecLisComponent,
    ChequecEditComponent,
    ChequecDetailsComponent,
    PayChequecAddComponent,
    PayChequecLisComponent,
    PayChequecDetailComponent,
    PayChequecEditComponent,
    MenuChequeComponent,
    ChequePayListAcceptComponent,
    ChequePayListPayComponent,
    ChequeclasseComponent,
    SalaireAddComponent,
    SalaireMenu1Component,
    SalaireMenu2Component,
    SalaireListGlobalComponent,
    SalaireListDetailsComponent,
    SalaireDetailsComponent,
    GestionSuupliesComponent,
    UserDetailDataComponent,
    UserEditComponent,
    NavUserMenuComponent,
    DemissionAddComponent,
    SalaireReportAddComponent,
    SalaireReportPrintComponent,
    DemissioListComponent,
    DemissioListdirComponent,

    PlaintAddComponent,
    PlaintListComponent,
    PlaintListdirComponent,
    PlaintEditComponent,
    PermoissionEditComponent,
    DemissionEditComponent,
    ResidenceAddComponent,
    ResidenceListComponent,
    ResidenceListDirComponent,
    ExperienceAddComponent,
    ExperiencePrintComponent,
    ResidenceEditComponent,
    LangueEvComponent,
    TacheGlobalDetailsComponent,
    TacheReceivedDetailsComponent,
    TacheARecevoirDetailsComponent,
    LocataireDotAddComponent,
    LocataireDotDetailsComponent,
    LocataireDotEditComponent,
    LocataireDotListComponent,
    NotiftacheComponent,
    TimelinetacheComponent,
    TaskListAdminComponent,
    TaskEditAdminComponent,
    UserRolesEditComponent,
    UserRolesListComponent,
    UserRolesDetailsComponent,
    TasksNotDoneComponent,
    TasksInProgressComponent,
    AddingTransactionsPageComponent,
    TransactionGlobalRComponent,
    TransactionGlobalEComponent,
    TransactionGlobalIComponent,
    MenutrComponent,
    TicketEditComponent,
    TicketListComponent,
    TicketListClientComponent,
    TicketListAgentComponent,
    TicketDetailAgentComponent,
    PageFrwardedToTicketListForAgentCodeComponent,
    TicketDetailClientComponent,
    AlertsrhComponent,
    TickeEmployeeAddComponent,
    DemandsDirectorComponent,
    DemandsRHComponent,
    DemandsFinanceComponent,
    PermessionListRHComponent,
    EquipementListRHComponent,
    PlaintListRHComponent,
    PlaintListDirGComponent,
    MsgInterneAddComponent,
    MsgInterneDetailsComponent,
    MsgInterneListComponent,
    Ticket2AddComponent,
    Ticket2DetailsComponent,
    Ticket2ListComponent,
    Ticket2ListEtabComponent,
    Ticket2ListAdminComponent,
    Ticket2ListUserComponent,
    Ticket2MyListComponent,
    Ticket2EditComponent,
    Ticket2EtatComponent,
    Ticket2MenuComponent,
    OrgPartAddComponent,
    OrgPartDetailsComponent,
    OrgPartListComponent,
    OrgPartEditComponent,
    OrgPartMenuComponent,
    TypeRevBenCrudComponent,
    TypeMaisonCrudComponent,
    TypeDroitCrudComponent,
    TypeBenCrudComponent,
    CrudGestBenMenuComponent,
    GestBenEditChercheurComponent,
    GestBenListChercheurComponent,
    GestBenMenuChercheurComponent,
    GestBenListDirComponent,
    DemDirMenuComponent,
    GestBenAddComponent,
    GestBenEditComponent,
    GestBenDetailComponent,
    GestBenListAccepteComponent,
    GestBenListRefuseComponent,
    MenuGestBenAddComponent,
    AddStockComponent,
    EditStockComponent,
    ListStockComponent,
    DetailsStockComponent,
    DetailsTypeStockComponent,
    ListTypeStockComponent,
    EditTypeStockComponent,
    AddTypeStockComponent,
    MenuStockageSettingsComponent,
    AddStockageComponent,
    EditStockageComponent,
    ListStockageComponent,
    DetailsStockageComponent,
    AddPayDirecteComponent,
    EDitPayDirecteComponent,
    DetailsPayDirecteComponent,
    ListPayDirecteComponent,
    ListCreatorPayDirecteComponent,
    ListDirPayDirecteComponent,
    AddOrdrePayComponent,
    EditOrdrePayComponent,
    DetailsOrdrePayComponent,
    ListOrdrePayComponent,
    ListRespOrdrePayComponent,
    ListAdminOrdrePayComponent,
    ListDirOrdrePayComponent,
    ListBenPayStockageComponent,
    DetailsBenPayStockageComponent,
    MenuStockage1Component,
    MenuStockage2Component,
    HomeStockageComponent,
    MenuSettingsOrphelinComponent,
    MainMenuOrphelinComponent,
    MatieresOrphelinComponent,
    MaladieOrphelinComponent,
    TalentOrphelinComponent,
    LivesWithOrphelinComponent,
    OrphelinAddComponent,
    OrphelinEditComponent,
    OrphelinDetailsComponent,
    OrphelinListComponent,
    SubventionOrphelinComponent,
    DotationOrphelinComponent,
    OrganismeOrphelinComponent,
    ParenteOrphelinComponent,
    PointagePresenceAddComponent,
    PointageQuitterAddComponent,
    PointageAddComponent,
    PointageListComponent,
    PointageUserListComponent,
    PointageDirectorListComponent,
    MenuSoldeComponent,
    MenuTuteurComponent,
    MenuParrainageComponent,
    AddParrainageComponent,
    EditParrainageComponent,
    ListParrainageComponent,
    DetailsParrainageComponent,
    AddSoldeComponent,
    EditSoldeComponent,
    DetailsSoldeComponent,
    ListSoldeComponent,
    AddTuteurComponent,
    EditTuteurComponent,
    DetailsTuteurComponent,
    ListTuteurComponent,
    MenuProjetOrg1Component,
    MenuProjetOrg2Component,
    AddProjetClientComponent,
    ListProjetClientComponent,
    AddProjetOrgComponent,
    ListProjetOrgComponent,
    EditProjetOrgComponent,
    DetailsProjetOrgComponent,
    ListProjetOrgClosedComponent,
    ListProjetOrgOpenedComponent,
    ListProjetOrgWorkedComponent,
    ListProjetOrgActivatedComponent,
    ListProjetOrgNotActivatedComponent,
    AddPointageEmpComponent,
    DetailsPointageEmpComponent,
    EditPointageEmpComponent,
    ListPointageEmpComponent,
    UserListPointageEmpComponent,
    MenuPointageEmpComponent,
    DemCongeNormalComponent,
    DemCongeUrgentComponent,
    DemCongeExceptionnelComponent,
    DemCongeTravailComponent,
    DemCongeMaladieComponent,
    DemCongeHajComponent,
    DemCongeDevoirComponent,
    DemCongeMaterniteComponent,
    DemCongeMarriageComponent,
    DemCongeNouveauNeComponent,
    DemCongeDecesComponent,
    DemCongeForgeronComponent,
    DemCongeMenuComponent,
    InterviewAddComponent,
    InterviewEditComponent,
    InterviewDetailsComponent,
    InterviewListComponent,
    InterviewListCreatorComponent,
    InterviewListUsersComponent,
    InterviewMenuSettingsComponent,
    InterviewMenuUsersComponent,
    TypeInterviewComponent,
    DemAssistanceAddComponent,
    DemAssistanceListUserComponent,
    DemAssistanceListdirComponent,
    DemAssistanceListdirfinComponent,
    DemAssistanceListetabfinComponent,
    DemAssistanceListerhComponent,
    MeadiaCenterDemandsAddUserComponent,
    MeadiaCenterDemandsListUserComponent,
    MeadiaCenterDemandsListDirComponent,
    MeadiaCenterDemandsAddDirComponent,
    CadeauxAddComponent,
    CadeauxListComponent,
    CadeauxListDirComponent,
    CadeauxListUserComponent,
    CadeauxListEtabComponent,
    CadeauxOccasionCrudComponent,
    CadeauxHonorCrudComponent,
    ExthechniqueAddComponent,
    ExthechniqueListUserComponent,
    ExthechniqueListDirComponent,
    ExthechniqueListEtabComponent,
    TypeExthechniqueCrudComponent,
    RecordingArchiveAddComponent,
    RecordingArchiveListUserComponent,
    RecordingArchiveListDirComponent,
    RecordingArchiveListEtabComponent,
    TypeRecordingArchiveCrudComponent,
    RendonneAddComponent,
    RendonneListDirComponent,
    RendonneListUserComponent,
    RendonneListEtabComponent,
    TypeRendonneCrudComponent,
    FilmAddComponent,
    FilmEdityComponent,
    FilmDetailsComponent,
    FilmListUserComponent,
    FilmListDirComponent,
    FilmListEtabComponent,
    FilmTypeCrudComponent,
    OccasionSoireeAddComponent,
    OccasionSoireeEditComponent,
    OccasionSoireeDetailsComponent,
    OccasionSoireeListUserComponent,
    OccasionSoireeListDirComponent,
    OccasionSoireeListEtabComponent,
    OccasionSoireeTypeCrudComponent,
    PartageMediaAddComponent,
    PartageMediaEditComponent,
    PartageMediaDetailComponent,
    PartageMediaListUserComponent,
    PartageMediaListDirComponent,
    PartageMediaListEtabComponent,
    PartageMediaTypeCrudComponent,
    VisiteAddComponent,
    VisiteListComponent,
    VisiteListUserComponent,
    VisiteListDirComponent,
    VisiteListEtabComponent,
    VisiteEditComponent,
    VisiteDetailsComponent,
    VisiteTypeCrudComponent,
    MontageAddComponent,
    MontageListUserComponent,
    MontageListDirComponent,
    MontageListEmployeeComponent,
    MontageListEtabComponent,
    MontageEditComponent,
    MontageDetailsComponent,
    MontageEmployeeRecepComponent,
    MontageEmployeeAddFilesComponent,
    DesignAddComponent,
    DesignDetailsComponent,
    DesignEditComponent,
    DesignListRecepComponent,
    DesignListCreatorComponent,
    DesignListEmployeeComponent,
    DesignListEtabComponent,
    CongesEtabListComponent,
    CongesRHListComponent,
    FormationEtabListComponent,
    FormationRHListComponent,
    SupHeureRHListComponent,
    SupHeureEtabListComponent,
    TravailEtabListComponent,
    TravailRHListComponent,
    AvanceRHListComponent,
    AvanceEtabListComponent,
    AddMusulmanComponent,
    EditMusulmanComponent,
    DetailsMusulmanComponent,
    MenuMusulmanComponent,
    ListMusulmanComponent,
    MenuRetraitComponent,
    MenuRetraitGeneralComponent,
    MenuRetraitEspeceComponent,
    MenuRetraitChequeComponent,
    ChequeRetraitAddComponent,
    ChequeRetraitEditComponent,
    ChequeRetraitDetailsComponent,
    ChequeRetraitListActiveComponent,
    ChequeRetraitListTribucheComponent,
    ChequeRetraitListGeneralComponent,
    EspeceRetraitAddComponent,
    EspeceRetraitListComponent,
    EspeceRetraitListActiveComponent,
    EspeceRetraitListTribucheComponent,
    EspeceRetraitEditComponent,
    EspeceRetraitDetailsComponent,
    NotifTextCrudComponent,
    AdressMacAddComponent,
    AdressMacListComponent,
    AdressMacEditComponent,
    AdressMacDetailsComponent,
    NewChequeListDirDirecteComponent,
    NewChequeListEtabFinComponent,
    NewChequeListDirFinComponent,
    NewChequeListDirGeneralComponent,
    NewChequeListBoxMenComponent,
    NewChequeListPayeeComponent,
    NewChequeMenuDirComponent,
    NewChequeMenuDirGComponent,
    NewChequeMenuDirFinComponent,
    NewChequeMenuEtabFinComponent,
    NewChequeMenuBonMenComponent,
    NewChequeMenuPayeeComponent,
    ActiviteeAddComponent,
    ActiviteeListComponent,
    ActiviteeEditComponent,
    ActiviteeDetailComponent,
    TypeActiviteeComponent,
    MenuActiviteeComponent,
    TypeTransactionComponent,
    MusuWomenAddComponent,
    MusuWomenListComponent,
    MusuWomenEditComponent,
    MusuWomenDetailsComponent,
    MusuWomenMenuComponent,
    TypeRecrutementComponent,
    ChangeRibAddComponent,
    ChangeRibUserListComponent,
    ChangeRibRhListComponent,
    ActiviteeRapDawaaHommeComponent,
    ActiviteeRapDawaawomenComponent,
    RapWomenComponent,
    RapMenComponent,
    ConfigFrontSystemCrudComponent,
    ConfigFrontSystemDetailsComponent,
    DotationDemMenuComponent,
    DotationDemUserShowMenuComponent,
    DotationForSettingsMenuComponent,
    DecisionUserMenuComponent,
    DecisionDirMenuComponent,
    AlarmeAddComponent,
    AlarmeListComponent,
    AttetionAddComponent,
    AttetionLisComponent,
    DecisifAddComponent,
    DecisifListDirComponent,
    DecisifListUserComponent,
    DecisifDetailsComponent,
    DecisifEditComponent,
    CommunDetailsComponent,
    CommunEditComponent,
    RabattreAddComponent,
    RabattreListComponent,
    MenuDecisionListComponent,
    DecisionDemissionAddComponent,
    DecisionDemissionListComponent,
    AttentionReportComponent,
    RabattreReportComponent,
    DecissiveReportComponent,
    TicketsCommentsComponent,
    AllTicketsComponent,
    RetyourStockAddComponent,
    HomeMenuStockageServiceComponent,
    RetyourStockEditComponent,
    RetyourStockListComponent,
    RetyourStockDetailsComponent,
    AllDemandsComponent,
    TypeDemTechCrudComponent,
    MenuDirDemTechComponent,
    MenuUserDemTechComponent,
    DemTechAddUserComponent,
    DemTechListUserComponent,
    DemTechListDirrComponent,
    DemTechEditComponent,
    DemTechDetailsComponent,
    ServiceVenteAddComponent,
    ServiceVenteListComponent,
    ServiceVenteListFinComponent,
    ServiceVenteListDotComponent,
    CrudTypeServiceVenteComponent,
    EventsReportComponent,
    TypeActiviteForWomensComponent,
    ActiviteForWomensComponent,
    ActiviteForWomensListComponent,
    ActiviteForWomensMenusComponent,
    ActiviteDawaAddComponent,
    ActiviteDawaListComponent,
    DawaaMenuComponent,
    ActiviteCompagneAddComponent,
    ActiviteCompagneListComponent,
    ActiviteCompagneMenuComponent,
    ActiviteEducationAddComponent,
    ActiviteEducationListComponent,
    EducationMenuComponent,
    ActiviteImmigrationAddComponent,
    ActiviteImmigrationListComponent,
    ImmigrationMenuComponent,
    ActivitePrepaAddComponent,
    ActivitePrepaListComponent,
    PrepaMenuComponent,
    ActiviteTypePrepaComponent,
    TypeActiviteeImmigrationComponent,
    TypeActiviteeEducationComponent,
    TypeActiviteeDawaaComponent,
    TypeActiviteeCompagneComponent,
    ActiviteDawaElecAddComponent,
    ActiviteDawaElecListComponent,
    DawaElecMenuComponent,
    TypeDawaElecComponent,
    DemandeVoitureAddComponent,
    DemandeVoitureListUserComponent,
    DemandeVoitureListDirComponent,
    AllMaintenanceAddComponent,
    AllMaintenanceListComponent,
    AllMaintenanceListUserComponent,
    AllMaintenanceListDirrComponent,
    AllMaintenanceListEmployeeComponent,
    AllMaintenanceTypeCrudComponent,
    HistoCongesComponent,
    HistoPermissionComponent,
    HistoEquiComponent,
    HistoSlaireComponent,
    HistoResidenceComponent,
    HistoRecrutementComponent,
    HistoPayChequeComponent,
    HistoCreFinanceComponent,
    HistoFormationComponent,
    HistoDemissionComponent,
    HistoPlaintComponent,
    HistoTicketEmployeeComponent,
    HistoAvanceComponent,
    HistoMaintenanceComponent,
    HistoHeureSuppComponent,
    HistoEmploiComponent,
    HistoAttestationComponent,
    HistoAssistanceComponent,
    HistoChangeRibComponent,
    HistoVoitureComponent,
    HistoMaintenanceVoitureComponent,
    HistoStockageComponent,
    HistoVenteComponent,
    HistoTechComponent,
    HistoAllMaintenanceComponent,
    HistoMenusComponent,
  ],
  imports: [

    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AngularEditorModule,
    FormsModule,
    YouTubePlayerModule,
    NgSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxBarcode6Module,
    NgxPaginationModule,
    MatProgressBarModule,
    NgbModule,
    NgxCaptchaModule,
    NgxDropzoneModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,

    }),
    CountdownModule,

    RouterModule.forRoot([
      //{ path: '', redirectTo: '/User/login-page', pathMatch:'full' },
      { path: '', component: LoginPageComponent, pathMatch: 'full' },
     // { path: '', component: UserRegisterComponent, pathMatch: 'full' },
      { path: 'user-register', component: UserRegisterComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'nav-user-menu', component: NavUserMenuComponent, canActivate: [AuthGuard] },
      { path: 'user-detail-data', component: UserDetailDataComponent, canActivate: [AuthGuard] },
      { path: 'user-detail-data/:id', component: UserDetailDataComponent, canActivate: [AuthGuard] },
      { path: 'user-edit', component: UserEditComponent, canActivate: [AuthGuard] },
      { path: 'user-edit/:id', component: UserEditComponent, canActivate: [AuthGuard] },
      { path: 'user-change-pasword', component: UserChangePaswordComponent, canActivate: [AuthGuard] },

      { path: 'tasks-reports', component: TasksReportsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORADMN'] }},
      { path: 'tasks-reports-received', component: TasksReportsReceivedComponent, canActivate: [AuthGuard] },
  { path: 'tasks-list-created', component: TasksListCreatedComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORADMN'] } },
      { path: 'tasks-list-received', component: TasksListReceivedComponent, canActivate: [AuthGuard] },
      { path: 'tasks-list-done', component: TasksListDoneComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORADMN'] }},
      { path: 'tasks-list-delayed', component: TasksListDelayedComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORADMN'] }},
      { path: 'user-registration', component: UserRegistrationComponent, canActivate: [AuthGuard] },
      { path: 'side-menu', component: SideMenuComponent, canActivate: [AuthGuard] },
      { path: 'nav-menu', component: NavMenuComponent, canActivate: [AuthGuard] },
      { path: 'mailing', component: MailingComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'COMADPRIV'] } },
      { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard]},
      { path: 'alertsrh', component: AlertsrhComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'RESSOURCEHUMAINE', 'RHPRIV','FINPRIV'] } },

      { path: 'completed-task', component: CompletedTaskComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORADMN'] } },
      { path: 'completed-task/:id', component: CompletedTaskComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORADMN'] } },
      { path: 'evaluated-task', component: EvaluatedTaskComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORADMN'] }},
      { path: 'evaluated-task/:id', component: EvaluatedTaskComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORADMN'] } },
      { path: 'task-details/:id', component: TaskDetailsComponent, canActivate: [AuthGuard] },
      { path: 'task-details', component: TaskDetailsComponent, canActivate: [AuthGuard] },
      { path: 'tasks-list', component: TasksListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORADMN'] }},
  { path: 'new-task', component: NewTaskComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORADMN'] } },
      { path: 'main-tasks', component: MainTasksComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORADMN'] } },


      { path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard] },
      { path: 'users-list', component: UsersListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },
      { path: 'administration-list', component: AdministrationListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] }},
      { path: 'new-administration', component: NewAdministrationComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] }},
      { path: 'new-etablissement', component: NewEtablissementComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] }},
      { path: 'etablissement-list', component: EtablissementListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] }},
      { path: 'user-updating', component: UserUpdatingComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] }},
      { path: 'user-updating/:id', component: UserUpdatingComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] }},
      { path: 'forbidden-page', component: ForbiddenPageComponent },

      //Finanace Project

      { path: 'liste-dotation', component: ListeDotationComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] }},
      { path: 'dotation-details', component: DotationDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] }},
      { path: 'dotation-edit', component: DotationEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] }   },
      { path: 'unite-edit', component: UniteEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'unite-edit/:id', component: UniteEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'unite-details', component: UniteDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'enregistrer-unite', component: EnregistrerUniteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] }  },
      { path: 'liste-unite', component: ListeUniteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'liste-locataire', component: ListeLocataireComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'edit-locataire', component: EditLocataireComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'locataire-details', component: LocataireDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'revenus-details', component: RevenusDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] }  },
      { path: 'revenus-details/:id', component: RevenusDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'revenus-list', component: RevenusListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },

      { path: 'enregistrer-revenus', component: EnregistrerRevenusComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'enregistrer-revenus/:id', component: EnregistrerRevenusComponent, data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] }},
      { path: 'edit-revenus', component: EditRevenusComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'enregistrer-locataire', component: EnregistrerLocataireComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'depot-revenus', component: DepotRevenusComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] }},
      { path: 'service-revenus', component: ServiceRevenusComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'typedotation', component: TypedotationComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'etatdotation', component: EtatdotationComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] }},
      { path: 'etatunite', component: EtatuniteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'enregistrer-dotation', component: EnregistrerDotationComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },
      { path: 'typeunite', component: TypeuniteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV','LOCPRIV'] }},
      { path: 'menu-finance', component: MenuFinanceComponent, canActivate: [AuthGuard]  },
      { path: 'main-finance-page', component: MainFinancePageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] }  },
      { path: 'main-farametrage-finance-page', component: MainFarametrageFinancePageComponent, canActivate: [AuthGuard]  },
      { path: 'bureau-immob-page', component: BureauImmobPageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },


  { path: 'employee-privileges-update', component: EmployeePrivilegesUpdateComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },
  { path: 'employee-privileges-add', component: EmployeePrivilegesAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },
      { path: 'employee-privileges-add/:id', component: EmployeePrivilegesAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },
  { path: 'employee-update', component: EmployeeUpdateComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },
      { path: 'employee-update/:id', component: EmployeeUpdateComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

     { path: 'employee-add', component: EmployeeAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] }  },
  


      //Communication Administrative
      { path: 'organisme', component: OrganismeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] }   },
      { path: 'proprietaire', component: ProprietaireComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] }  },
      { path: 'enregistrer-tr-recue', component: EnregistrerTRRecueComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'COMADPRIV'] }},
      { path: 'my-liste-tr', component: MyListeTrComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'COMADPRIV'] } },
      { path: 'my-liste-tr-emise', component: MyListeTrEmiseComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },


      { path: 'enregistrer-tre', component: EnregistrerTREComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'COMADPRIV'] } },


      { path: 'enregistrer-tri', component: EnregistrerTRIComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'COMADPRIV'] } },
      { path: 'my-liste-tr-i', component: MyListeTrIComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'COMADPRIV'] } },
      { path: 'my-liste-decision', component: MyListeDecisionComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },
      { path: 'acmenu', component: ACMenuComponent, canActivate: [AuthGuard]  },
      { path: 'enregistrer-decision', component: EnregistrerDecisionComponent, canActivate: [AuthGuard]  },
      { path: 'liste-organisme', component: ListeOrganismeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'COMADPRIV'] }  },
      { path: 'liste-proprietaire', component: ListeProprietaireComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] }  },
      { path: 'main-page-ac', component: MainPageACComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'COMADPRIV'] } },
      { path: 'main-page-ac2', component: MainPageAC2Component, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'COMADPRIV'] }},
      { path: 'transactions-rlist', component: TransactionsRListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'COMADPRIV'] } },
      { path: 'enreg-def-r', component: EnregDefRComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },
      { path: 'enreg-temp-r', component: EnregTempRComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },
      { path: 'enreg-r', component: EnregRComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },
      { path: 'afftected-to-my-admin-r', component: AfftectedToMyAdminRComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },

      { path: 'transactions-elist', component: TransactionsElistComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'COMADPRIV'] } },
      { path: 'enreg-e', component: EnregEComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },
      { path: 'afftected-to-my-admin-e', component: AfftectedToMyAdminEComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },
      { path: 'enreg-temp-e', component: EnregTempEComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },
      { path: 'enreg-def-e', component: EnregDefEComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },
      { path: 'rappot-emise', component: RappotEmiseComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },
      { path: 'rapport-interne', component: RapportInterneComponent, canActivate: [AuthGuard] },
      { path: 'rapport-recue', component: RapportRecueComponent, canActivate: [AuthGuard] },

      //{ path: 'user-updating/:id', component: UserUpdatingComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'enreg-def-i', component: EnregDefIComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] }},
      { path: 'enreg-temp-i', component: EnregTempIComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },
      { path: 'enreg-i', component: EnregIComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },
      { path: 'affected-to-my-admin-i', component: AffectedToMyAdminIComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },


    //Evenement

      { path: 'beneficiaire-c', component: BeneficiaireCComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] }},

      { path: 'tache-ev-c', component: TacheEvCComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] }},

      { path: 'outils-c', component: OutilsCComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'medias-c', component: MediasCComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] }},

      { path: 'classe-c', component: ClasseCComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] }},

      { path: 'tbl-menu', component: TblMenuComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'tbl-main', component: TblMainComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'event-register', component: EventRegisterComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] }},

      { path: 'event-details', component: EventDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'event-details/:id', component: EventDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] }},

      { path: 'event-list', component: EventListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] }},

      { path: 'medias-c/:id', component: MediasCComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] }},
 
      { path: 'event-edit/:id', component: EventEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },
      { path: 'event-edit', component: EventEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] }},

      { path: 'activity-c', component: ActivityCComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'depense-c', component: DepenseCComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] }},

      //Ressources Humaines

      { path: 'demande-conge', component: DemandeCongeComponent, canActivate: [AuthGuard] },

      { path: 'my-list-conge', component: MyListCongeComponent, canActivate: [AuthGuard] },

      { path: 'validate-conge', component: ValidateCongeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] } },

      { path: 'suivie-conge', component: SuivieCongeComponent, canActivate: [AuthGuard] },


      { path: 'permission-add', component: PermissionAddComponent, canActivate: [AuthGuard] },

      { path: 'permission-list', component: PermissionListComponent, canActivate: [AuthGuard] },

      { path: 'nom-equipement', component: NomEquipementComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'type-equipement', component: TypeEquipementComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'equipement-add', component: EquipementAddComponent, canActivate: [AuthGuard] },

      { path: 'equipement-list', component: EquipementListComponent, canActivate: [AuthGuard] },

      { path: 'recrutement-list', component: RecrutementListComponent, canActivate: [AuthGuard] },

      { path: 'recrutement-add', component: RecrutementAddComponent, canActivate: [AuthGuard] },
 
      { path: 'equipement-list-dir', component: EquipementListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORADMN', 'DIRECTORETAB', 'DIRECTORGENERAL'] } },

      { path: 'permission-list-dir', component: PermissionUListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORADMN', 'DIRECTORETAB', 'DIRECTORGENERAL']  } },

      {
        path: 'menurequests', component: MenurequestsComponent,
        canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORADMN', 'DIRECTORETAB','DIRECTORGENERAL'] }
      },

      { path: 'navmenurequests', component: NavmenurequestsComponent, canActivate: [AuthGuard] },



      { path: 'ticket-add', component: TicketAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] }},

      { path: 'ticket-my-lis', component: TicketMyLisComponent, canActivate: [AuthGuard] },

      { path: 'ticket-dir-lis', component: TicketDirLisComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] }},

      { path: 'salaiale-add', component: SalaialeAddComponent, canActivate: [AuthGuard] },

      { path: 'salaiale-my-lis', component: SalaialeMyLisComponent, canActivate: [AuthGuard] },

      { path: 'salaiale-dir-lis', component: SalaialeDirLisComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] } },

      { path: 'solde-conge', component: SoldeCongeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'recrutmenet-dir-list', component: RecrutmenetDirListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORADMN', 'DIRECTORETAB', 'DIRECTORGENERAL']  }  },

      { path: 'my-list-recrutment', component: MyListRecrutmentComponent, canActivate: [AuthGuard] },

      { path: 'rh-recrutment-list', component: RhRecrutmentListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] } },

      { path: 'rh-conge-list', component: RhCongeListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] }},

      { path: 'news-detail', component: NewsDetailComponent, canActivate: [AuthGuard] },

      { path: 'news-detail/:id', component: NewsDetailComponent, canActivate: [AuthGuard] },

      { path: 'news-add', component: NewsAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },

      { path: 'news-list-viewer', component: NewsListViewerComponent, canActivate: [AuthGuard] },

      { path: 'news-list-creator', component: NewsListCreatorComponent, canActivate: [AuthGuard] },

      { path: 'priv-add', component: PrivAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] }},

      { path: 'my-priv-list', component: MyPrivListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] }},

      { path: 'priv-list-dir', component: PrivListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] }},

      { path: 'priv-list-rh', component: PrivListRhComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] } },

      { path: 'cars-add', component: CarsAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'cars-list', component: CarsListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'cars-repair-request-add', component: CarsRepairRequestAddComponent, canActivate: [AuthGuard]},

      { path: 'cars-repair-request-list', component: CarsRepairRequestListComponent, canActivate: [AuthGuard]},

      { path: 'cars-menu', component: CarsMenuComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'type-voiture', component: TypeVoitureComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'organisme-voiture', component: OrganismeVoitureComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'director-list-cars', component: DirectorListCarsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'comptable-list-cars', component: ComptableListCarsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },



      /***----Finance------****/

      { path: 'finance-menu-param', component: FinanceMenuParamComponent, canActivate: [AuthGuard] },

      { path: 'type-beneficiaire', component: TypeBeneficiaireComponent, canActivate: [AuthGuard] },

      { path: 'type-depense', component: TypeDepenseComponent, canActivate: [AuthGuard] },

      { path: 'branche-one', component: BrancheOneComponent, canActivate: [AuthGuard] },

      { path: 'branche-two', component: BrancheTwoComponent, canActivate: [AuthGuard] },

      { path: 'type-facture', component: TypeFactureComponent, canActivate: [AuthGuard] },

      { path: 'projet-prog', component: ProjetProgComponent, canActivate: [AuthGuard] },

      { path: 'facture-add', component: FactureAddComponent, canActivate: [AuthGuard] },

      { path: 'facture-list-comptable', component: FactureListComptableComponent, canActivate: [AuthGuard] },

      { path: 'facture-list-directeur', component: FactureListDirecteurComponent, canActivate: [AuthGuard] },
  
      { path: 'accepted-facture', component: AcceptedFactureComponent, canActivate: [AuthGuard] },

      { path: 'main-not-accepted', component: MainNotAcceptedComponent, canActivate: [AuthGuard] },

      { path: 'main-ready-payement', component: MainReadyPayementComponent, canActivate: [AuthGuard] },

      { path: 'creance-financire-add', component: CreanceFinancireAddComponent, canActivate: [AuthGuard] },

      { path: 'creance-financire-list', component: CreanceFinancireListComponent, canActivate: [AuthGuard] },

      { path: 'menu-ready-payement', component: MenuReadyPayementComponent, canActivate: [AuthGuard] },

      { path: 'menu-not-accepted', component: MenuNotAcceptedComponent, canActivate: [AuthGuard] },

      { path: 'main-accepted', component: MainAcceptedComponent, canActivate: [AuthGuard]/*, data: { permittedRoles: ['DIRECTORGENERAL'] }*/ },

      { path: 'maenu-accepted', component: MaenuAcceptedComponent, canActivate: [AuthGuard] },

      { path: 'cre-finan-add', component: CreFinanAddComponent, canActivate: [AuthGuard] },

      { path: 'cre-finan-list-employee', component: CreFinanListEmployeeComponent, canActivate: [AuthGuard] },

      { path: 'cre-finan-list-director', component: CreFinanListDirectorComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORADMN', 'DIRECTORETAB', 'DIRECTORGENERAL'] } },

      { path: 'cre-finan-list-accepted', component: CreFinanListAcceptedComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] } },

      { path: 'cre-finan-list-comptable', component: CreFinanListComptableComponent, canActivate: [AuthGuard] },

      { path: 'avance-add', component: AvanceAddComponent, canActivate: [AuthGuard] },

      { path: 'avance-list-e', component: AvanceListEComponent, canActivate: [AuthGuard] },

      { path: 'avance-list-c', component: AvanceListCComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] }   },

      { path: 'avance-list-d', component: AvanceListDComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL'] } },

      { path: 'avance-list-not-accepted', component: AvanceListNotAcceptedComponent, canActivate: [AuthGuard] },

      { path: 'recep-cheque-add', component: RecepChequeAddComponent, canActivate: [AuthGuard] },

      { path: 'recep-cheque-list', component: RecepChequeListComponent, canActivate: [AuthGuard] },


                           /********** Events Two***********/

      { path: 'event-two-add', component: EventTwoAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },

      { path: 'event-two-detail', component: EventTwoDetailComponent, canActivate: [AuthGuard] },

      { path: 'event-two-detail/:id', component: EventTwoDetailComponent, canActivate: [AuthGuard] },

      { path: 'event-two-gallery', component: EventTwoGalleryComponent, canActivate: [AuthGuard] },

      { path: 'event-two-gallery/:id', component: EventTwoGalleryComponent, canActivate: [AuthGuard] },

      { path: 'event-two-list', component: EventTwoListComponent, canActivate: [AuthGuard] },

      { path: 'crud-events-two', component: CrudEventsTwoComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },

      { path: 'crud-news', component: CrudNewsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'EMPLOYEE', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },
 


                           /***********  Dons Pages   ***********/
      { path: 'recue-dons-add', component: RecueDonsAddComponent, canActivate: [AuthGuard] },

      { path: 'recue-dons-list', component: RecueDonsListComponent, canActivate: [AuthGuard] },

      { path: 'payement-reception-add', component: PayementReceptionAddComponent, canActivate: [AuthGuard] },

      { path: 'payement-reception-list', component: PayementReceptionListComponent, canActivate: [AuthGuard] },
      
      { path: 'proj-dons', component: ProjDonsComponent, canActivate: [AuthGuard] },

      { path: 'dons-reports', component: DonsReportsComponent, canActivate: [AuthGuard] },

                           /************* Reports ********************/
 
        { path: 'dotation-menu', component: DotationMenuComponent, canActivate: [AuthGuard] },
      { path: 'recu-emp-date', component: RecuEmpDateComponent, canActivate: [AuthGuard] },

      { path: 'revenus-emp-date-month', component: RevenusEmpDateMonthComponent, canActivate: [AuthGuard] },

      { path: 'revenus-emp-date', component: RevenusEmpDateComponent, canActivate: [AuthGuard] },

      { path: 'recu-date', component: RecuDateComponent, canActivate: [AuthGuard] },

      { path: 'recu-emp-periode', component: RecuEmpPeriodeComponent, canActivate: [AuthGuard] },

      { path: 'recu-proj-date', component: RecuProjDateComponent, canActivate: [AuthGuard] },

      { path: 'recu-proj-priod', component: RecuProjPriodComponent, canActivate: [AuthGuard] },

      { path: 'recu-nb-date', component: RecuNbDateComponent, canActivate: [AuthGuard] },

      { path: 'recu-nb-period', component: RecuNbPeriodComponent, canActivate: [AuthGuard] },

      { path: 'revenus-emp-month', component: RevenusEmpMonthComponent, canActivate: [AuthGuard] },

      { path: 'revenus-month', component: RevenusMonthComponent, canActivate: [AuthGuard] },

      { path: 'revenus-period', component: RevenusPeriodComponent, canActivate: [AuthGuard] },

      { path: 'revenus-emp-period', component: RevenusEmpPeriodComponent, canActivate: [AuthGuard] },

  
                 /**********************   Formation   ***************************/
   
      { path: 'formation-add', component: FormationAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'RESSOURCEHUMAINE'] } },

      { path: 'formation-list', component: FormationListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'RESSOURCEHUMAINE'] }},

      { path: 'formation-show', component: FormationShowComponent, canActivate: [AuthGuard] },

      { path: 'specialite', component: SpecialiteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'RESSOURCEHUMAINE'] } },

      { path: 'menu-formation', component: MenuFormationComponent, canActivate: [AuthGuard] },

      { path: 'demande-formation-add', component: DemandeFormationAddComponent, canActivate: [AuthGuard] },

      { path: 'demande-formation-add/:id', component: DemandeFormationAddComponent, canActivate: [AuthGuard] },

      { path: 'demande-formation-lis', component: DemandeFormationLisComponent, canActivate: [AuthGuard] },

      { path: 'demande-formation-list-rh', component: DemandeFormationListRhComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] } },

      { path: 'demande-formation-list-c', component: DemandeFormationListCComponent, canActivate: [AuthGuard] },

      { path: 'demande-formation-listdir', component: DemandeFormationListdirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORADMN', 'DIRECTORETAB', 'DIRECTORGENERAL'] } },

      { path: 'new-formation-request-add', component: NewFormationRequestAddComponent, canActivate: [AuthGuard] },

      { path: 'new-formation-request-list', component: NewFormationRequestListComponent , canActivate: [AuthGuard] },

      { path: 'my-formation', component: MyFormationComponent, canActivate: [AuthGuard] },

      { path: 'my-equipement', component: MyEquipementComponent, canActivate: [AuthGuard] },

      { path: 'formationexists-listdir', component: FormationexistsListdirComponent , canActivate: [AuthGuard] },


                   /**************  Services ******************/

      { path: 'maitenance-request-add', component: MaitenanceRequestAddComponent, canActivate: [AuthGuard] },

      { path: 'maitenance-request-list', component: MaitenanceRequestListComponent, canActivate: [AuthGuard] },

      { path: 'maitenance-request-mecanical-list', component: MaitenanceRequestMecanicalListComponent, canActivate: [AuthGuard] },

      { path: 'main-services-page', component: MainServicesPageComponent, canActivate: [AuthGuard] },

      { path: 'employee-maint-request-list', component: EmployeeMaintRequestListComponent, canActivate: [AuthGuard] },

      { path: 'panne', component: PanneComponent, canActivate: [AuthGuard] },

                     /************* Supp Heure *************/

      { path: 'supp-heure-add', component: SuppHeureAddComponent, canActivate: [AuthGuard] },

      { path: 'supp-heure-list', component: SuppHeureListComponent, canActivate: [AuthGuard] },

      { path: 'demande-supp-heure-list', component: DemandeSuppHeureListComponent, canActivate: [AuthGuard] },

      { path: 'demande-supp-heure-add', component: DemandeSuppHeureAddComponent, canActivate: [AuthGuard] },

      { path: 'demande-supp-heure-listcreator', component: DemandeSuppHeureListcreatorComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] }},

      { path: 'demande-supp-heure-list-director', component: DemandeSuppHeureListDirectorComponent, canActivate: [AuthGuard] },
      { path: 'demande-formation-user-add', component: DemandeFormationUserAddComponent, canActivate: [AuthGuard] },
     


      { path: 'menu-supp-heure', component: MenuSuppHeureComponent, canActivate: [AuthGuard] },

                   /************** Files Ogr ****************/
 
      { path: 'nom-file-org', component: NomFileOrgComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'filesorg-add', component: FilesorgAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'filesorg-lis', component: FilesorgLisComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'filesorg-menu', component: FilesorgMenuComponent, canActivate: [AuthGuard] },

      { path: 'files-employee', component: FilesEmployeeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

               /****************** Attestation Travail ****************/

      { path: 'attestation-travail-add', component: AttestationTravailAddComponent, canActivate: [AuthGuard] },

      { path: 'attestation-travail-lis', component: AttestationTravailLisComponent, canActivate: [AuthGuard] },

      { path: 'attestation-travail-rh-list', component: AttestationTravailRhListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] }},

                /***************** Transfert Interne *********************/

      { path: 'transfert-interne-add', component: TransfertInterneAddComponent, canActivate: [AuthGuard] },

      { path: 'transfert-interne-show', component: TransfertInterneShowComponent, canActivate: [AuthGuard] },

      { path: 'transfert-interne-list', component: TransfertInterneListComponent, canActivate: [AuthGuard] },

                    /************* Reception Equipement ***********/

      { path: 'reception-equipement-add', component: ReceptionEquipementAddComponent, canActivate: [AuthGuard] },
      { path: 'supp-equipement', component: SuppEquipementComponent, canActivate: [AuthGuard] },

      { path: 'reception-equipement-list', component: ReceptionEquipementListComponent, canActivate: [AuthGuard] },

      { path: 'reception-equipement-list-rh', component: ReceptionEquipementListRhComponent, canActivate: [AuthGuard] },
      { path: 'decision-list', component: DecisionListComponent, canActivate: [AuthGuard] },

    /***********   Creation Travail **************/

      { path: 'creation-add', component: CreationAddComponent, canActivate: [AuthGuard] },

      { path: 'creation-list', component: CreationListComponent, canActivate: [AuthGuard] },

      { path: 'creation-list-rh', component: CreationListRhComponent, canActivate: [AuthGuard] },

      { path: 'creation-list-dir', component: CreationListDirComponent, canActivate: [AuthGuard] },

      { path: 'creation-list-dir-g', component: CreationListDirGComponent, canActivate: [AuthGuard] },

      { path: 'files-crud-employee', component: FilesCrudEmployeeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },


    /************************* Projet ************************/
      { path: 'projet-add', component: ProjetAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'PROJPRIV'] }},
      { path: 'projet-add2', component: ProjetAdd2Component, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'PROJPRIV'] } },

      { path: 'projet-list', component: ProjetListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'PROJPRIV'] }},

      { path: 'projet-details', component: ProjetDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'PROJPRIV'] }},

      { path: 'projet-details/:id', component: ProjetDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'PROJPRIV'] } },

      { path: 'projet-edit', component: ProjetEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'PROJPRIV'] } },
      { path: 'projet-edit/:id', component: ProjetEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'PROJPRIV'] } },

      { path: 'projet-menu', component: ProjetMenuComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'PROJPRIV'] }},

      { path: 'projet-listing-menu', component: ProjetListingMenuComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'PROJPRIV'] } },

      { path: 'projet-compte', component: ProjetCompteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] }},

      { path: 'projet-org-supp', component: ProjetOrgSuppComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'PROJPRIV'] }},

      { path: 'projet-class', component: ProjetClassComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'PROJPRIV'] } },

      { path: 'projet-pay-activite', component: ProjetPayActiviteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'PROJPRIV'] } },

      { path: 'projet-pay-type', component: ProjetPayTypeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'PROJPRIV'] }},

    /******** Finance2 **************/

      { path: 'comptes-list', component: ComptesListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },

      { path: 'etat-comptes-add', component: EtatComptesAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTOR', 'SECRETAIRE', 'PARTRESP'] } },

      { path: 'edit-etat-compte', component: EditEtatCompteComponent, canActivate: [AuthGuard] },

      { path: 'etat-compte-settings', component: EtatCompteSettingsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] }},

      { path: 'service-banque-add', component: ServiceBanqueAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTOR', 'SECRETAIRE','PARTRESP'] }  },

      { path: 'service-banque-lis', component: ServiceBanqueLisComponent, canActivate: [AuthGuard] },

      { path: 'menu-compte', component: MenuCompteComponent, canActivate: [AuthGuard] },

      { path: 'menu-settings-compte', component: MenuSettingsCompteComponent, canActivate: [AuthGuard],data: { permittedRoles: ['ADMINISTRATEUR'] }},
      { path: 'menu-settings-compte/:id', component: MenuSettingsCompteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },



    /*************   Suplies And Cars  *****************/
      { path: 'supplies-add', component: SuppliesAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'RESSOURCEHUMAINE'] }  },

      { path: 'supplies-list', component: SuppliesListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'RESSOURCEHUMAINE'] } },
      { path: 'gestion-suuplies', component: GestionSuupliesComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'RESSOURCEHUMAINE'] } },

      { path: 'supplies-edit', component: SuppliesEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'RESSOURCEHUMAINE'] }},
      { path: 'supplies-edit/:id', component: SuppliesEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'RESSOURCEHUMAINE'] } },

    /************************ Cheques ****************************/

      { path: 'chequec-add', component: ChequecAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'BOXPRIV'] } },

      { path: 'chequec-lis', component: ChequecLisComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'BOXPRIV'] } },

      { path: 'chequec-edit', component: ChequecEditComponent, canActivate: [AuthGuard] },
      { path: 'chequec-edit/:id', component: ChequecEditComponent, canActivate: [AuthGuard]},

      { path: 'chequec-details', component: ChequecDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] } },

      { path: 'chequec-details/:id', component: ChequecDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'CONSEILADMIN', 'SUPCONSEILADMIN', 'DIRECTOR', 'PARTRESP', 'PARTNORMAL', 'RESP', 'RESPFINANCE', 'SECRETAIRE'] }},

      { path: 'pay-chequec-add', component: PayChequecAddComponent, canActivate: [AuthGuard] },

      { path: 'pay-chequec-lis', component: PayChequecLisComponent, canActivate: [AuthGuard] },

      { path: 'pay-chequec-detail', component: PayChequecDetailComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'BOXPRIV'] } },

      { path: 'pay-chequec-detail/:id', component: PayChequecDetailComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'BOXPRIV'] }},

      { path: 'pay-chequec-edit', component: PayChequecEditComponent, canActivate: [AuthGuard] },
      { path: 'pay-chequec-edit/:id', component: PayChequecEditComponent, canActivate: [AuthGuard] },

      { path: 'menu-cheque', component: MenuChequeComponent, canActivate: [AuthGuard] },

      { path: 'cheque-pay-list-accept', component: ChequePayListAcceptComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL'] } },

      { path: 'cheque-pay-list-pay', component: ChequePayListPayComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'BOXPRIV'] } },

      { path: 'chequeclasse', component: ChequeclasseComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] }},


    /******** Salaire *****************/

      { path: 'salaire-add', component: SalaireAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTOR', 'SECRETAIRE','PARTRESP'] } },

      { path: 'salaire-menu1', component: SalaireMenu1Component, canActivate: [AuthGuard] },

      { path: 'salaire-menu2', component: SalaireMenu2Component, canActivate: [AuthGuard] },

      { path: 'salaire-list-details/:mois', component: SalaireListDetailsComponent, canActivate: [AuthGuard] },

      { path: 'salaire-list-global', component: SalaireListGlobalComponent, canActivate: [AuthGuard] },

      { path: 'salaire-details', component: SalaireDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'salaire-details/:id', component: SalaireDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

    /********* User Service Part 2  ***********/

      { path: 'demission-add', component: DemissionAddComponent, canActivate: [AuthGuard] },

      { path: 'salaire-report-add', component: SalaireReportAddComponent, canActivate: [AuthGuard] },

      { path: 'salaire-report-print', component: SalaireReportPrintComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] } },

      { path: 'demissio-list', component: DemissioListComponent, canActivate: [AuthGuard] },

      { path: 'demissio-listdir', component: DemissioListdirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORADMN', 'DIRECTORETAB', 'DIRECTORGENERAL','RESSOURCEHUMAINE'] }  },

    

      { path: 'plaint-add', component: PlaintAddComponent, canActivate: [AuthGuard] },

      { path: 'plaint-list', component: PlaintListComponent, canActivate: [AuthGuard] },

      { path: 'plaint-listdir', component: PlaintListdirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV','DOTPRIV'] }  },

      { path: 'plaint-edit', component: PlaintEditComponent, canActivate: [AuthGuard] },

      { path: 'plaint-edit/:id', component: PlaintEditComponent, canActivate: [AuthGuard] },

      { path: 'permoission-edit', component: PermoissionEditComponent, canActivate: [AuthGuard] },

      { path: 'permoission-edit/:id', component: PermoissionEditComponent, canActivate: [AuthGuard] },

      { path: 'demission-edit', component: DemissionEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] }},

      { path: 'demission-edit/:id', component: DemissionEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] }},
 
      { path: 'residence-add', component: ResidenceAddComponent, canActivate: [AuthGuard] },

      { path: 'residence-list', component: ResidenceListComponent, canActivate: [AuthGuard] },
      { path: 'residence-edit', component: ResidenceEditComponent, canActivate: [AuthGuard] },
      { path: 'residence-edit/:id', component: ResidenceEditComponent, canActivate: [AuthGuard] },

      { path: 'residence-list-dir', component: ResidenceListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] } },

      { path: 'experience-add', component: ExperienceAddComponent, canActivate: [AuthGuard] },

      { path: 'experience-print', component: ExperiencePrintComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL'] }  },

      { path: 'langue-ev', component: LangueEvComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'tache-global-details', component: TacheGlobalDetailsComponent, canActivate: [AuthGuard]},
      { path: 'tache-global-details/:id', component: TacheGlobalDetailsComponent, canActivate: [AuthGuard]},
      { path: 'tache-received-details', component: TacheReceivedDetailsComponent, canActivate: [AuthGuard] },
      { path: 'tache-received-details/:id', component: TacheReceivedDetailsComponent, canActivate: [AuthGuard] },

      { path: 'tache-arecevoir-details', component: TacheARecevoirDetailsComponent, canActivate: [AuthGuard]},
      { path: 'tache-arecevoir-details/:id', component: TacheARecevoirDetailsComponent, canActivate: [AuthGuard] },


      //locataire 2

      { path: 'locataire-dot-add', component: LocataireDotAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV','LOCPRIV'] }},

      { path: 'locataire-dot-details', component: LocataireDotDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV', 'LOCPRIV']  }},

      { path: 'locataire-dot-details/:id', component: LocataireDotDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV', 'LOCPRIV']  } },

      { path: 'locataire-dot-edit', component: LocataireDotEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV', 'LOCPRIV']  } },
      { path: 'locataire-dot-edit/:id', component: LocataireDotEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV', 'LOCPRIV']  } },

      { path: 'locataire-dot-list', component: LocataireDotListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV', 'LOCPRIV'] } },

      //Task 2

      { path: 'notiftache', component: NotiftacheComponent, canActivate: [AuthGuard] },

      { path: 'timelinetache', component: TimelinetacheComponent, canActivate: [AuthGuard] },

      { path: 'timelinetache/:id', component: TimelinetacheComponent, canActivate: [AuthGuard] },

      { path: 'task-list-admin', component: TaskListAdminComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] }  },

      { path: 'task-edit-admin', component: TaskEditAdminComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'task-edit-admin/:id', component: TaskEditAdminComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'user-roles-list', component: UserRolesListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'user-roles-details', component: UserRolesDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'user-roles-edit', component: UserRolesEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'user-roles-edit/:id', component: UserRolesEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'tasks-in-progress', component: TasksInProgressComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORADMN'] } },

      { path: 'tasks-not-done', component: TasksNotDoneComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORADMN'] } },

      { path: 'adding-transactions-page', component: AddingTransactionsPageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'COMADPRIV'] } },

      { path: 'transaction-global-r', component: TransactionGlobalRComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PARTNORMAL', 'RESPFINANCE'] } },

      { path: 'transaction-global-e', component: TransactionGlobalEComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PARTNORMAL', 'RESPFINANCE'] } },

      { path: 'transaction-global-i', component: TransactionGlobalIComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PARTNORMAL', 'RESPFINANCE'] } },

      {path: 'menutr', component: MenutrComponent , canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR','PARTNORMAL','RESPFINANCE'] } },


    /****** Maintenance ******* */
      { path: 'ticket-edit', component: TicketEditComponent, canActivate: [AuthGuard]},

      { path: 'ticket-list', component: TicketListComponent, canActivate: [AuthGuard] },

      { path: 'ticket-list-client', component: TicketListClientComponent, canActivate: [AuthGuard] },

      { path: 'ticket-list-agent', component: TicketListAgentComponent },

      { path: 'ticke-employee-add', component: TickeEmployeeAddComponent, canActivate: [AuthGuard] },

      { path: 'ticket-detail-agent', component: TicketDetailAgentComponent },

      { path: 'page-frwarded-to-ticket-list-for-agent-code', component: PageFrwardedToTicketListForAgentCodeComponent },

      { path: 'ticket-detail-client', component: TicketDetailClientComponent, canActivate: [AuthGuard]},
      { path: 'ticket-detail-client/:id', component: TicketDetailClientComponent, canActivate: [AuthGuard]},

      /********** ,Demands Pages *************** */

      { path: 'demands-director', component: DemandsDirectorComponent, canActivate: [AuthGuard]},

      { path: 'demands-rh', component: DemandsRHComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] }},

      { path: 'demands-finance', component: DemandsFinanceComponent, canActivate: [AuthGuard] },

      { path: 'permession-list-rh', component: PermessionListRHComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] }},

      { path: 'equipement-list-rh', component: EquipementListRHComponent , canActivate: [AuthGuard]},

      { path: 'plaint-list-rh', component: PlaintListRHComponent, canActivate: [AuthGuard] },

      { path: 'plaint-list-dir-g', component: PlaintListDirGComponent , canActivate: [AuthGuard]},


      /******* Msg Interne **********/

      { path: 'msg-interne-add', component: MsgInterneAddComponent, canActivate: [AuthGuard] },

      { path: 'msg-interne-list', component: MsgInterneListComponent, canActivate: [AuthGuard] },

      { path: 'msg-interne-details', component: MsgInterneDetailsComponent, canActivate: [AuthGuard] },

      { path: 'msg-interne-details/:id', component: MsgInterneDetailsComponent, canActivate: [AuthGuard] },


    /*********** Ticket 2 ******************/

      { path: 'ticket2-add', component: Ticket2AddComponent, canActivate: [AuthGuard] },

      { path: 'ticket2-details', component: Ticket2DetailsComponent, canActivate: [AuthGuard] },
      { path: 'ticket2-details/:id', component: Ticket2DetailsComponent, canActivate: [AuthGuard] },

      { path: 'ticket2-list', component: Ticket2ListComponent, canActivate: [AuthGuard] },

      { path: 'ticket2-list-etab', component: Ticket2ListEtabComponent, canActivate: [AuthGuard] },

      { path: 'ticket2-list-admin', component: Ticket2ListAdminComponent, canActivate: [AuthGuard] },

      { path: 'ticket2-list-user', component: Ticket2ListUserComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'TECHPRIV'] } },

      { path: 'ticket2-my-list', component: Ticket2MyListComponent, canActivate: [AuthGuard] },

      { path: 'ticket2-edit', component: Ticket2EditComponent, canActivate: [AuthGuard] },
      { path: 'ticket2-edit/:id', component: Ticket2EditComponent, canActivate: [AuthGuard] },

      { path: 'ticket2-etat', component: Ticket2EtatComponent, canActivate: [AuthGuard] },

      { path: 'ticket2-menu', component: Ticket2MenuComponent, canActivate: [AuthGuard] },


    /******************* OrgPart *******************/
  
      { path: 'org-part-add', component: OrgPartAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'org-part-details', component: OrgPartDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'org-part-details/:id', component: OrgPartDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'org-part-list', component: OrgPartListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'org-part-edit', component: OrgPartEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },

      { path: 'org-part-menu', component: OrgPartMenuComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR'] } },


    /************** Gest Ben ***********************/

      { path: 'type-rev-ben-crud', component: TypeRevBenCrudComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] } },

      { path: 'type-maison-crud', component: TypeMaisonCrudComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] } },

      { path: 'type-droit-crud', component: TypeDroitCrudComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] } },

      { path: 'type-ben-crud', component: TypeBenCrudComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] }},

      { path: 'crud-gest-ben-menu', component: CrudGestBenMenuComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] }},

      { path: 'gest-ben-edit-chercheur', component: GestBenEditChercheurComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] } },
      { path: 'gest-ben-edit-chercheur/:id', component: GestBenEditChercheurComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] }},

      { path: 'gest-ben-list-chercheur', component: GestBenListChercheurComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] }},

      { path: 'gest-ben-menu-chercheur', component: GestBenMenuChercheurComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] } },

      { path: 'gest-ben-list-dir', component: GestBenListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] }},

      { path: 'dem-dir-menu', component: DemDirMenuComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] } },

      { path: 'gest-ben-add', component: GestBenAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] } },

      { path: 'gest-ben-edit', component: GestBenEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] }},
      { path: 'gest-ben-edit/:id', component: GestBenEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] }},

      { path: 'gest-ben-detail', component: GestBenDetailComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] }},
      { path: 'gest-ben-detail/:id', component: GestBenDetailComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] } },

      { path: 'gest-ben-list-accepte', component: GestBenListAccepteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] } },

      { path: 'gest-ben-list-refuse', component: GestBenListRefuseComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] } },

      { path: 'menu-gest-ben-add', component: MenuGestBenAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'PROJBENPRIV', 'BENPRIV'] } },

    /******* Gestion de Stock  **************/

      { path: 'add-stock', component: AddStockComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'edit-stock', component: EditStockComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'list-stock', component: ListStockComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'details-stock', component: DetailsStockComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },
      { path: 'details-stock/:id', component: DetailsStockComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'details-type-stock', component: DetailsTypeStockComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },
      { path: 'details-type-stock/:id', component: DetailsTypeStockComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'list-type-stock', component: ListTypeStockComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'edit-type-stock', component: EditTypeStockComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'add-type-stock', component: AddTypeStockComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'menu-stockage-settings', component: MenuStockageSettingsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'add-stockage', component: AddStockageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'edit-stockage', component: EditStockageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},
      { path: 'edit-stockage/:id', component: EditStockageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'list-stockage', component: ListStockageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'details-stockage', component: DetailsStockageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},
      { path: 'details-stockage/:id', component: DetailsStockageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'add-pay-directe', component: AddPayDirecteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'e-dit-pay-directe', component: EDitPayDirecteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },
      { path: 'e-dit-pay-directe/:id', component: EDitPayDirecteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'details-pay-directe', component: DetailsPayDirecteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},
      { path: 'details-pay-directe/:id', component: DetailsPayDirecteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'list-pay-directe', component: ListPayDirecteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'list-creator-pay-directe', component: ListCreatorPayDirecteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'list-dir-pay-directe', component: ListDirPayDirecteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'add-ordre-pay', component: AddOrdrePayComponent, canActivate: [AuthGuard]},

      { path: 'edit-ordre-pay', component: EditOrdrePayComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },
      { path: 'edit-ordre-pay/:id', component: EditOrdrePayComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'details-ordre-pay', component: DetailsOrdrePayComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },
      { path: 'details-ordre-pay/:id', component: DetailsOrdrePayComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'list-ordre-pay', component: ListOrdrePayComponent, canActivate: [AuthGuard] },

      { path: 'list-resp-ordre-pay', component: ListRespOrdrePayComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'list-admin-ordre-pay', component: ListAdminOrdrePayComponent, canActivate: [AuthGuard] },

      { path: 'list-dir-ordre-pay', component: ListDirOrdrePayComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'list-ben-pay-stockage', component: ListBenPayStockageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'details-ben-pay-stockage', component: DetailsBenPayStockageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },
      { path: 'details-ben-pay-stockage/:id', component: DetailsBenPayStockageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] }},

      { path: 'menu-stockage1', component: MenuStockage1Component, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'menu-stockage2', component: MenuStockage2Component, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'home-stockage', component: HomeStockageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

    /*********** Orphelin **************/

      { path: 'menu-settings-orphelin', component: MenuSettingsOrphelinComponent, canActivate: [AuthGuard] },

      { path: 'main-menu-orphelin', component: MainMenuOrphelinComponent, canActivate: [AuthGuard] },

      { path: 'matieres-orphelin', component: MatieresOrphelinComponent, canActivate: [AuthGuard] },

      { path: 'maladie-orphelin', component: MaladieOrphelinComponent, canActivate: [AuthGuard] },

      { path: 'talent-orphelin', component: TalentOrphelinComponent, canActivate: [AuthGuard] },

      { path: 'lives-with-orphelin', component: LivesWithOrphelinComponent, canActivate: [AuthGuard] },

      { path: 'orphelin-add', component: OrphelinAddComponent, canActivate: [AuthGuard] },

      { path: 'orphelin-edit', component: OrphelinEditComponent, canActivate: [AuthGuard] },
      { path: 'orphelin-edit/:id', component: OrphelinEditComponent, canActivate: [AuthGuard] },

      { path: 'orphelin-details', component: OrphelinDetailsComponent, canActivate: [AuthGuard] },
      { path: 'orphelin-details/:id', component: OrphelinDetailsComponent, canActivate: [AuthGuard] },

      { path: 'orphelin-list', component: OrphelinListComponent, canActivate: [AuthGuard] },

      { path: 'subvention-orphelin', component: SubventionOrphelinComponent, canActivate: [AuthGuard] },
 
      { path: 'dotation-orphelin', component: DotationOrphelinComponent, canActivate: [AuthGuard] },

      { path: 'organisme-orphelin', component: OrganismeOrphelinComponent, canActivate: [AuthGuard] },

      { path: 'parente-orphelin', component: ParenteOrphelinComponent, canActivate: [AuthGuard] },

    /**********Pointage *********************/

      { path: 'pointage-presence-add', component: PointagePresenceAddComponent, canActivate: [AuthGuard] },

      { path: 'pointage-quitter-add', component: PointageQuitterAddComponent, canActivate: [AuthGuard] },

      { path: 'pointage-add', component: PointageAddComponent, canActivate: [AuthGuard] },

      { path: 'pointage-list', component: PointageListComponent, canActivate: [AuthGuard] },

      { path: 'pointage-user-list', component: PointageUserListComponent, canActivate: [AuthGuard] },

      { path: 'pointage-director-list', component: PointageDirectorListComponent, canActivate: [AuthGuard] },

    /************Parrainage *************/

        { path: 'menu-solde', component: MenuSoldeComponent, canActivate: [AuthGuard] },

      { path: 'menu-tuteur', component: MenuTuteurComponent, canActivate: [AuthGuard] },

      { path: 'menu-parrainage', component: MenuParrainageComponent, canActivate: [AuthGuard] },

      { path: 'add-parrainage', component: AddParrainageComponent, canActivate: [AuthGuard] },
      { path: 'add-parrainage/:id', component: AddParrainageComponent, canActivate: [AuthGuard] },

      { path: 'edit-parrainage', component: EditParrainageComponent, canActivate: [AuthGuard] },
      { path: 'edit-parrainage/:id', component: EditParrainageComponent, canActivate: [AuthGuard] },

      { path: 'list-parrainage', component: ListParrainageComponent, canActivate: [AuthGuard] },

      { path: 'details-parrainage', component: DetailsParrainageComponent, canActivate: [AuthGuard] },
      { path: 'details-parrainage/:id', component: DetailsParrainageComponent, canActivate: [AuthGuard] },

      { path: 'add-solde', component: AddSoldeComponent, canActivate: [AuthGuard] },
      { path: 'add-solde/:id', component: AddSoldeComponent, canActivate: [AuthGuard] },

      { path: 'edit-solde', component: EditSoldeComponent, canActivate: [AuthGuard] },
      { path: 'edit-solde/:id', component: EditSoldeComponent, canActivate: [AuthGuard] },

      { path: 'details-solde', component: DetailsSoldeComponent, canActivate: [AuthGuard] },
      { path: 'details-solde/:id', component: DetailsSoldeComponent, canActivate: [AuthGuard] },

      { path: 'list-solde', component: ListSoldeComponent, canActivate: [AuthGuard] },

      { path: 'add-tuteur', component: AddTuteurComponent, canActivate: [AuthGuard] },

      { path: 'edit-tuteur', component: EditTuteurComponent, canActivate: [AuthGuard] },
      { path: 'edit-tuteur/:id', component: EditTuteurComponent, canActivate: [AuthGuard] },

      { path: 'details-tuteur', component: DetailsTuteurComponent, canActivate: [AuthGuard] },
      { path: 'details-tuteur/:id', component: DetailsTuteurComponent, canActivate: [AuthGuard] },

      { path: 'list-tuteur', component: ListTuteurComponent, canActivate: [AuthGuard] },

    /******Projet Org **/

      { path: 'menu-projet-org1', component: MenuProjetOrg1Component, canActivate: [AuthGuard] },


      { path: 'menu-projet-org2', component: MenuProjetOrg2Component, canActivate: [AuthGuard] },

      { path: 'add-projet-client', component: AddProjetClientComponent, canActivate: [AuthGuard] },

      { path: 'list-projet-client', component: ListProjetClientComponent, canActivate: [AuthGuard] },

      { path: 'add-projet-org', component: AddProjetOrgComponent, canActivate: [AuthGuard] },

      { path: 'list-projet-org', component: ListProjetOrgComponent, canActivate: [AuthGuard] },

      { path: 'edit-projet-org', component: EditProjetOrgComponent, canActivate: [AuthGuard] },
      { path: 'edit-projet-org/:id', component: EditProjetOrgComponent, canActivate: [AuthGuard] },

      { path: 'details-projet-org', component: DetailsProjetOrgComponent, canActivate: [AuthGuard] },
      { path: 'details-projet-org/:id', component: DetailsProjetOrgComponent, canActivate: [AuthGuard] },

      { path: 'list-projet-org-closed', component: ListProjetOrgClosedComponent, canActivate: [AuthGuard] },

      { path: 'list-projet-org-opened', component: ListProjetOrgOpenedComponent, canActivate: [AuthGuard] },

      { path: 'list-projet-org-worked', component: ListProjetOrgWorkedComponent, canActivate: [AuthGuard] },

      { path: 'list-projet-org-activated', component: ListProjetOrgActivatedComponent, canActivate: [AuthGuard] },

      { path: 'list-projet-org-not-activated', component: ListProjetOrgNotActivatedComponent, canActivate: [AuthGuard] },

    /***********Pointage Via Empreinte **********/

      { path: 'add-pointage-emp', component: AddPointageEmpComponent, canActivate: [AuthGuard] },

      { path: 'details-pointage-emp', component: DetailsPointageEmpComponent, canActivate: [AuthGuard] },

      { path: 'details-pointage-emp/:id', component: DetailsPointageEmpComponent, canActivate: [AuthGuard] },

      { path: 'edit-pointage-emp', component: EditPointageEmpComponent, canActivate: [AuthGuard] },

      { path: 'edit-pointage-emp/:id', component: EditPointageEmpComponent, canActivate: [AuthGuard] },

      { path: 'list-pointage-emp', component: ListPointageEmpComponent, canActivate: [AuthGuard] },

      { path: 'user-list-pointage-emp', component: UserListPointageEmpComponent, canActivate: [AuthGuard] },

      { path: 'menu-pointage-emp', component: MenuPointageEmpComponent, canActivate: [AuthGuard] },

      //Conge


      { path: 'dem-conge-normal', component: DemCongeNormalComponent, canActivate: [AuthGuard] },

      { path: 'dem-conge-urgent', component: DemCongeUrgentComponent, canActivate: [AuthGuard] },

      { path: 'dem-conge-exceptionnel', component: DemCongeExceptionnelComponent, canActivate: [AuthGuard] },

      { path: 'dem-conge-travail', component: DemCongeTravailComponent, canActivate: [AuthGuard] },

      { path: 'dem-conge-maladie', component: DemCongeMaladieComponent, canActivate: [AuthGuard] },

      { path: 'dem-conge-haj', component: DemCongeHajComponent, canActivate: [AuthGuard] },

      { path: 'dem-conge-devoir', component: DemCongeDevoirComponent, canActivate: [AuthGuard] },

      { path: 'dem-conge-maternite', component: DemCongeMaterniteComponent, canActivate: [AuthGuard] },

      { path: 'dem-conge-marriage', component: DemCongeMarriageComponent, canActivate: [AuthGuard] },

      { path: 'dem-conge-nouveau-ne', component: DemCongeNouveauNeComponent, canActivate: [AuthGuard] },

      { path: 'dem-conge-deces', component: DemCongeDecesComponent, canActivate: [AuthGuard] },

      { path: 'dem-conge-forgeron', component: DemCongeForgeronComponent, canActivate: [AuthGuard] },

      { path: 'dem-conge-menu', component: DemCongeMenuComponent, canActivate: [AuthGuard] },

  { path: 'main-ready-avance', component: MainReadyAvanceComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] } },

    /**** Assistance ***/
      { path: 'dem-assistance-add', component: DemAssistanceAddComponent, canActivate: [AuthGuard] },

      { path: 'dem-assistance-list-user', component: DemAssistanceListUserComponent, canActivate: [AuthGuard] },

      { path: 'dem-assistance-listdir', component: DemAssistanceListdirComponent, canActivate: [AuthGuard] },

      { path: 'dem-assistance-listdirfin', component: DemAssistanceListdirfinComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] }},

      { path: 'dem-assistance-listetabfin', component: DemAssistanceListetabfinComponent, canActivate: [AuthGuard] },

      { path: 'dem-assistance-listerh', component: DemAssistanceListerhComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] }},



      /****** Media Center ***********/

      //Interview


      { path: 'interview-add', component: InterviewAddComponent, canActivate: [AuthGuard] },

      { path: 'interview-edit', component: InterviewEditComponent, canActivate: [AuthGuard] },
      { path: 'interview-edit/:id', component: InterviewEditComponent, canActivate: [AuthGuard] },

      { path: 'interview-details', component: InterviewDetailsComponent, canActivate: [AuthGuard] },
      { path: 'interview-details/:id', component: InterviewDetailsComponent, canActivate: [AuthGuard] },

      { path: 'interview-list', component: InterviewListComponent, canActivate: [AuthGuard] },

      { path: 'interview-list-creator', component: InterviewListCreatorComponent, canActivate: [AuthGuard] },

      { path: 'interview-list-users', component: InterviewListUsersComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'interview-menu-settings', component: InterviewMenuSettingsComponent, canActivate: [AuthGuard] },

      { path: 'interview-menu-users', component: InterviewMenuUsersComponent, canActivate: [AuthGuard] },

      { path: 'type-interview', component: TypeInterviewComponent, canActivate: [AuthGuard] },

      { path: 'meadia-center-demands-add-user', component: MeadiaCenterDemandsAddUserComponent, canActivate: [AuthGuard] },

      { path: 'meadia-center-demands-list-user', component: MeadiaCenterDemandsListUserComponent, canActivate: [AuthGuard] },

      { path: 'meadia-center-demands-list-dir', component: MeadiaCenterDemandsListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'meadia-center-demands-add-dir', component: MeadiaCenterDemandsAddDirComponent, canActivate: [AuthGuard] },

      { path: 'cadeaux-add', component: CadeauxAddComponent, canActivate: [AuthGuard] },

      { path: 'cadeaux-list', component: CadeauxListComponent, canActivate: [AuthGuard] },

      { path: 'cadeaux-list-dir', component: CadeauxListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'cadeaux-list-user', component: CadeauxListUserComponent, canActivate: [AuthGuard] },

      { path: 'cadeaux-list-etab', component: CadeauxListEtabComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] } },

      { path: 'cadeaux-occasion-crud', component: CadeauxOccasionCrudComponent, canActivate: [AuthGuard] },

      { path: 'cadeaux-honor-crud', component: CadeauxHonorCrudComponent, canActivate: [AuthGuard] },

      { path: 'exthechnique-add', component: ExthechniqueAddComponent, canActivate: [AuthGuard] },

      { path: 'exthechnique-list-user', component: ExthechniqueListUserComponent, canActivate: [AuthGuard] },

      { path: 'exthechnique-list-dir', component: ExthechniqueListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'exthechnique-list-etab', component: ExthechniqueListEtabComponent, canActivate: [AuthGuard] },

      { path: 'type-exthechnique-crud', component: TypeExthechniqueCrudComponent, canActivate: [AuthGuard] },

      { path: 'recording-archive-add', component: RecordingArchiveAddComponent, canActivate: [AuthGuard] },

      { path: 'recording-archive-list-user', component: RecordingArchiveListUserComponent, canActivate: [AuthGuard] },

      { path: 'recording-archive-list-dir', component: RecordingArchiveListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'recording-archive-list-etab', component: RecordingArchiveListEtabComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'SERPRIV'] } },

      { path: 'type-recording-archive-crud', component: TypeRecordingArchiveCrudComponent, canActivate: [AuthGuard] },

      { path: 'rendonne-add', component: RendonneAddComponent, canActivate: [AuthGuard] },

      { path: 'rendonne-list-dir', component: RendonneListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'rendonne-list-user', component: RendonneListUserComponent, canActivate: [AuthGuard] },

      { path: 'rendonne-list-etab', component: RendonneListEtabComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DOTPRIV', 'LOCPRIV'] } },

      { path: 'type-rendonne-crud', component: TypeRendonneCrudComponent, canActivate: [AuthGuard] },

      { path: 'film-add', component: FilmAddComponent, canActivate: [AuthGuard] },

      { path: 'film-edity', component: FilmEdityComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] } },
      { path: 'film-edity/:id', component: FilmEdityComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] } },

      { path: 'film-details', component: FilmDetailsComponent, canActivate: [AuthGuard] },
      { path: 'film-details/:id', component: FilmDetailsComponent, canActivate: [AuthGuard] },

      { path: 'film-list-user', component: FilmListUserComponent, canActivate: [AuthGuard] },

      { path: 'film-list-dir', component: FilmListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'film-list-etab', component: FilmListEtabComponent, canActivate: [AuthGuard] },

      { path: 'film-type-crud', component: FilmTypeCrudComponent, canActivate: [AuthGuard] },

      { path: 'occasion-soiree-add', component: OccasionSoireeAddComponent, canActivate: [AuthGuard] },

      { path: 'occasion-soiree-edit', component: OccasionSoireeEditComponent, canActivate: [AuthGuard] },
      { path: 'occasion-soiree-edit/:id', component: OccasionSoireeEditComponent, canActivate: [AuthGuard] },

      { path: 'occasion-soiree-details', component: OccasionSoireeDetailsComponent, canActivate: [AuthGuard] },
      { path: 'occasion-soiree-details/:id', component: OccasionSoireeDetailsComponent, canActivate: [AuthGuard] },

      { path: 'occasion-soiree-list-user', component: OccasionSoireeListUserComponent, canActivate: [AuthGuard] },

      { path: 'occasion-soiree-list-dir', component: OccasionSoireeListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'occasion-soiree-list-etab', component: OccasionSoireeListEtabComponent, canActivate: [AuthGuard] },

      { path: 'occasion-soiree-type-crud', component: OccasionSoireeTypeCrudComponent, canActivate: [AuthGuard] },

      { path: 'partage-media-add', component: PartageMediaAddComponent, canActivate: [AuthGuard] },

      { path: 'partage-media-edit', component: PartageMediaEditComponent, canActivate: [AuthGuard] },
      { path: 'partage-media-edit/:id', component: PartageMediaEditComponent, canActivate: [AuthGuard] },

      { path: 'partage-media-detail', component: PartageMediaDetailComponent, canActivate: [AuthGuard] },
      { path: 'partage-media-detail/:id', component: PartageMediaDetailComponent, canActivate: [AuthGuard] },

      { path: 'partage-media-list-user', component: PartageMediaListUserComponent, canActivate: [AuthGuard] },

      { path: 'partage-media-list-dir', component: PartageMediaListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] }},

      { path: 'partage-media-list-etab', component: PartageMediaListEtabComponent, canActivate: [AuthGuard] },

      { path: 'partage-media-type-crud', component: PartageMediaTypeCrudComponent, canActivate: [AuthGuard] },

      { path: 'visite-add', component: VisiteAddComponent, canActivate: [AuthGuard] },

      { path: 'visite-list', component: VisiteListComponent, canActivate: [AuthGuard] },

      { path: 'visite-list-user', component: VisiteListUserComponent, canActivate: [AuthGuard] },

      { path: 'visite-list-dir', component: VisiteListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'visite-list-etab', component: VisiteListEtabComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'visite-edit', component: VisiteEditComponent, canActivate: [AuthGuard] },
      { path: 'visite-edit/:id', component: VisiteEditComponent, canActivate: [AuthGuard] },

      { path: 'visite-details', component: VisiteDetailsComponent, canActivate: [AuthGuard] },
      { path: 'visite-details/:id', component: VisiteDetailsComponent, canActivate: [AuthGuard] },

      { path: 'visite-type-crud', component: VisiteTypeCrudComponent, canActivate: [AuthGuard] },
      { path: 'visite-type-crud/:id', component: VisiteTypeCrudComponent, canActivate: [AuthGuard] },


      { path: 'montage-add', component: MontageAddComponent, canActivate: [AuthGuard] },

      { path: 'montage-list-user', component: MontageListUserComponent, canActivate: [AuthGuard] },

      { path: 'montage-list-dir', component: MontageListDirComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'montage-list-employee', component: MontageListEmployeeComponent, canActivate: [AuthGuard] },

      { path: 'montage-list-etab', component: MontageListEtabComponent, canActivate: [AuthGuard] },

      { path: 'montage-edit', component: MontageEditComponent, canActivate: [AuthGuard] },
      { path: 'montage-editt/:id', component: MontageEditComponent, canActivate: [AuthGuard] },

      { path: 'montage-details', component: MontageDetailsComponent, canActivate: [AuthGuard] },
      { path: 'montage-details/:id', component: MontageDetailsComponent, canActivate: [AuthGuard] },

      { path: 'montage-employee-recep', component: MontageEmployeeRecepComponent, canActivate: [AuthGuard] },
      { path: 'montage-employee-recep/:id', component: MontageEmployeeRecepComponent, canActivate: [AuthGuard] },

      { path: 'montage-employee-add-files', component: MontageEmployeeAddFilesComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV', 'BOXPRIV', 'EVFINPRIV','RHPRIV'] }},
      { path: 'montage-employee-add-files/:id', component: MontageEmployeeAddFilesComponent, canActivate: [AuthGuard] },

      { path: 'design-add', component: DesignAddComponent, canActivate: [AuthGuard] },
  
      { path: 'design-details', component: DesignDetailsComponent, canActivate: [AuthGuard] },
      { path: 'design-details/:id', component: DesignDetailsComponent, canActivate: [AuthGuard] },

      { path: 'design-edit', component: DesignEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] } },
      { path: 'design-edit/:id', component: DesignEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] } },

      { path: 'design-list-recep', component: DesignListRecepComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },
      { path: 'design-list-recep/:id', component: DesignListRecepComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV', 'MEDIACENTERPRIV'] } },

      { path: 'design-list-creator', component: DesignListCreatorComponent, canActivate: [AuthGuard] },

      { path: 'design-list-employee', component: DesignListEmployeeComponent, canActivate: [AuthGuard] },

      { path: 'design-list-etab', component: DesignListEtabComponent, canActivate: [AuthGuard] },


      /**** Transfert Service *****/

      { path: 'formation-etab-list', component: FormationEtabListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] }},

      { path: 'formation-rhlist', component: FormationRHListComponent, canActivate: [AuthGuard] },

      { path: 'sup-heure-rhlist', component: SupHeureRHListComponent, canActivate: [AuthGuard] },

      { path: 'sup-heure-etab-list', component: SupHeureEtabListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] } },

      { path: 'travail-etab-list', component: TravailEtabListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'COMPTAPRIV'] }},

      { path: 'travail-rhlist', component: TravailRHListComponent, canActivate: [AuthGuard] },

      { path: 'avance-rhlist', component: AvanceRHListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV', 'RHPRIV'] } },

      { path: 'avance-etab-list', component: AvanceEtabListComponent, canActivate: [AuthGuard] },

/****** Musulman Part  *****/

      { path: 'add-musulman', component: AddMusulmanComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DAWAAPRIV', 'MUSPRIV'] }},

      { path: 'edit-musulman', component: EditMusulmanComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DAWAAPRIV', 'MUSPRIV'] } },
      { path: 'edit-musulman/:id', component: EditMusulmanComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DAWAAPRIV', 'MUSPRIV'] }},

      { path: 'details-musulman', component: DetailsMusulmanComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DAWAAPRIV', 'MUSPRIV'] } },
      { path: 'details-musulman/:id', component: DetailsMusulmanComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DAWAAPRIV', 'MUSPRIV'] } },

      { path: 'menu-musulman', component: MenuMusulmanComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DAWAAPRIV', 'MUSPRIV'] } },

      { path: 'list-musulman', component: ListMusulmanComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DAWAAPRIV', 'MUSPRIV'] } },

      /* Retrait */ 

      { path: 'menu-retrait', component: MenuRetraitComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV', 'EVFINPRIV','FINPRIV'] }},

      { path: 'menu-retrait-general', component: MenuRetraitGeneralComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV', 'EVFINPRIV'] }},

      { path: 'menu-retrait-espece', component: MenuRetraitEspeceComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV', 'EVFINPRIV'] }},

      { path: 'menu-retrait-cheque', component: MenuRetraitChequeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV', 'EVFINPRIV'] } },

      { path: 'cheque-retrait-add', component: ChequeRetraitAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV', 'EVFINPRIV'] } },

      { path: 'cheque-retrait-edit', component: ChequeRetraitEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV', 'EVFINPRIV'] } },
      { path: 'cheque-retrait-edit/:id', component: ChequeRetraitEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV', 'EVFINPRIV'] }},

      { path: 'cheque-retrait-details', component: ChequeRetraitDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV', 'EVFINPRIV'] } },
      { path: 'cheque-retrait-details/:id', component: ChequeRetraitDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV','EVFINPRIV'] }},

      { path: 'cheque-retrait-list-active', component: ChequeRetraitListActiveComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV','EVFINPRIV'] } },

      { path: 'cheque-retrait-list-tribuche', component: ChequeRetraitListTribucheComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV','EVFINPRIV'] } },

      { path: 'cheque-retrait-list-general', component: ChequeRetraitListGeneralComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV','EVFINPRIV'] } },

      { path: 'espece-retrait-add', component: EspeceRetraitAddComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV','EVFINPRIV'] } },

      { path: 'espece-retrait-list', component: EspeceRetraitListComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV','EVFINPRIV'] } },

      { path: 'espece-retrait-list-active', component: EspeceRetraitListActiveComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV','EVFINPRIV'] } },

      { path: 'espece-retrait-list-tribuche', component: EspeceRetraitListTribucheComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV','EVFINPRIV'] } },

      { path: 'espece-retrait-edit', component: EspeceRetraitEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV','EVFINPRIV'] } },
      { path: 'espece-retrait-edit/:id', component: EspeceRetraitEditComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV','EVFINPRIV'] } },

      { path: 'espece-retrait-details', component: EspeceRetraitDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV','EVFINPRIV'] } },
      { path: 'espece-retrait-details/:id', component: EspeceRetraitDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV','EVFINPRIV'] } },


/** Notif Text ***/

     { path: 'notif-text-crud', component: NotifTextCrudComponent , canActivate: [AuthGuard] },

      { path: 'adress-mac-add', component: AdressMacAddComponent, canActivate: [AuthGuard] },

      { path: 'adress-mac-list', component: AdressMacListComponent, canActivate: [AuthGuard] },

      { path: 'adress-mac-edit', component: AdressMacEditComponent, canActivate: [AuthGuard] },
      { path: 'adress-mac-edit/:id', component: AdressMacEditComponent, canActivate: [AuthGuard] },

      { path: 'adress-mac-details/:id', component: AdressMacDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRPRIV', 'RETPRIV', 'EVFINPRIV'] } },
      { path: 'adress-mac-details', component: AdressMacDetailsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'MEDIAPRIV'] }},

    /** Cheque New **/

      { path: 'new-cheque-list-dir-directe', component: NewChequeListDirDirecteComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORETAB','DIRECTORETAB'] }},

      { path: 'new-cheque-list-etab-fin', component: NewChequeListEtabFinComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'COMPTAPRIV'] } },

      { path: 'new-cheque-list-dir-fin', component: NewChequeListDirFinComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'FINPRIV'] } },

      { path: 'new-cheque-list-dir-general', component: NewChequeListDirGeneralComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL'] } },

      { path: 'new-cheque-list-box-men', component: NewChequeListBoxMenComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'BOXPRIV'] } },

      { path: 'new-cheque-list-payee', component: NewChequeListPayeeComponent, canActivate: [AuthGuard], data: { permittedRoles: ['ADMINISTRATEUR', 'BOXPRIV'] } },

      { path: 'new-cheque-menu-dir', component: NewChequeMenuDirComponent, canActivate: [AuthGuard]},

      { path: 'new-cheque-menu-dir-g', component: NewChequeMenuDirGComponent, canActivate: [AuthGuard]},

      { path: 'new-cheque-menu-dir-fin', component: NewChequeMenuDirFinComponent, canActivate: [AuthGuard] },

      { path: 'new-cheque-menu-etab-fin', component: NewChequeMenuEtabFinComponent, canActivate: [AuthGuard]},

      { path: 'new-cheque-menu-bon-men', component: NewChequeMenuBonMenComponent, canActivate: [AuthGuard]},

      { path: 'new-cheque-menu-payee', component: NewChequeMenuPayeeComponent, canActivate: [AuthGuard] },

      /*****New Pages ** /
       *
       */

      { path: 'activitee-add', component: ActiviteeAddComponent , canActivate: [AuthGuard] },

{ path: 'activitee-list', component: ActiviteeListComponent , canActivate: [AuthGuard] },

{ path: 'activitee-edit', component: ActiviteeEditComponent , canActivate: [AuthGuard] },
{ path: 'activitee-edit/:id', component: ActiviteeEditComponent , canActivate: [AuthGuard] },

{ path: 'activitee-detail', component: ActiviteeDetailComponent, canActivate: [AuthGuard] },
{ path: 'activitee-detail/:id', component: ActiviteeDetailComponent , canActivate: [AuthGuard] },

{ path: 'type-activitee', component: TypeActiviteeComponent , canActivate: [AuthGuard] },

{ path: 'menu-activitee', component: MenuActiviteeComponent , canActivate: [AuthGuard] },

{ path: 'type-transaction', component: TypeTransactionComponent, canActivate: [AuthGuard] },

{ path: 'musu-women-add', component: MusuWomenAddComponent , canActivate: [AuthGuard] },

{ path: 'musu-women-list', component: MusuWomenListComponent , canActivate: [AuthGuard] },

{ path: 'musu-women-edit', component: MusuWomenEditComponent , canActivate: [AuthGuard] },
{ path: 'musu-women-edit/:id', component: MusuWomenEditComponent, canActivate: [AuthGuard] },

{ path: 'musu-women-details', component: MusuWomenDetailsComponent, canActivate: [AuthGuard] },
{ path: 'musu-women-details/:id', component: MusuWomenDetailsComponent , canActivate: [AuthGuard] },

{ path: 'musu-women-menu', component: MusuWomenMenuComponent , canActivate: [AuthGuard] },

{ path: 'type-recrutement', component: TypeRecrutementComponent , canActivate: [AuthGuard] },

    /*** Changer Rib **/

      { path: 'change-rib-add', component: ChangeRibAddComponent, canActivate: [AuthGuard] },

      { path: 'change-rib-user-list', component: ChangeRibUserListComponent, canActivate: [AuthGuard] },

      { path: 'change-rib-rh-list', component: ChangeRibRhListComponent, canActivate: [AuthGuard] },

    /**** Rapport ******/

      { path: 'activitee-rap-dawaa-homme', component: ActiviteeRapDawaaHommeComponent, canActivate: [AuthGuard] },
 
      { path: 'activitee-rap-dawaawomen', component: ActiviteeRapDawaawomenComponent, canActivate: [AuthGuard] },

      { path: 'rap-women', component: RapWomenComponent, canActivate: [AuthGuard] },

      { path: 'rap-men', component: RapMenComponent, canActivate: [AuthGuard] },

   { path: 'type-activite-for-womens', component: TypeActiviteForWomensComponent , canActivate: [AuthGuard] },
   { path: 'activite-for-womens', component: ActiviteForWomensComponent, canActivate: [AuthGuard] },
   { path: 'activite-for-womens-list', component: ActiviteForWomensListComponent, canActivate: [AuthGuard] },
   { path: 'activite-for-womens-menus', component: ActiviteForWomensMenusComponent, canActivate: [AuthGuard] },

    /** Config System **/

      { path: 'config-front-system-crud', component: ConfigFrontSystemCrudComponent, canActivate: [AuthGuard] },

      { path: 'config-front-system-details', component: ConfigFrontSystemDetailsComponent, canActivate: [AuthGuard] },
      { path: 'config-front-system-details/:id', component: ConfigFrontSystemDetailsComponent, canActivate: [AuthGuard] },

    /***** Menus **/

      { path: 'dotation-dem-menu', component: DotationDemMenuComponent, canActivate: [AuthGuard] },

      { path: 'dotation-dem-user-show-menu', component: DotationDemUserShowMenuComponent, canActivate: [AuthGuard] },
      { path: 'dotation-for-settings-menu', component: DotationForSettingsMenuComponent, canActivate: [AuthGuard] },

    /** Decision **/

      { path: 'decision-user-menu', component: DecisionUserMenuComponent , canActivate: [AuthGuard] },

      { path: 'decision-dir-menu', component: DecisionDirMenuComponent , canActivate: [AuthGuard] },

      { path: 'alarme-add', component: AlarmeAddComponent, canActivate: [AuthGuard] },
      { path: 'alarme-add/:id', component: AlarmeAddComponent, canActivate: [AuthGuard] },

      { path: 'alarme-list', component: AlarmeListComponent, canActivate: [AuthGuard] },

      { path: 'attetion-add', component: AttetionAddComponent, canActivate: [AuthGuard] },
      { path: 'attetion-add/:id', component: AttetionAddComponent, canActivate: [AuthGuard] },

      { path: 'attetion-lis', component: AttetionLisComponent, canActivate: [AuthGuard] },

      { path: 'decisif-add', component: DecisifAddComponent, canActivate: [AuthGuard] },
      { path: 'decisif-add/:id', component: DecisifAddComponent, canActivate: [AuthGuard] },

      { path: 'decisif-list-dir', component: DecisifListDirComponent, canActivate: [AuthGuard] },

      { path: 'decisif-list-user', component: DecisifListUserComponent, canActivate: [AuthGuard] },

      { path: 'decisif-details', component: DecisifDetailsComponent, canActivate: [AuthGuard] },
      { path: 'decisif-details/:id', component: DecisifDetailsComponent, canActivate: [AuthGuard] },

      { path: 'decisif-edit', component: DecisifEditComponent, canActivate: [AuthGuard] },
      { path: 'decisif-edit/:id', component: DecisifEditComponent, canActivate: [AuthGuard] },

      { path: 'commun-details', component: CommunDetailsComponent, canActivate: [AuthGuard] },
      { path: 'commun-details/:id', component: CommunDetailsComponent, canActivate: [AuthGuard] },
      
      { path: 'commun-edit', component: CommunEditComponent, canActivate: [AuthGuard] },
      { path: 'commun-edit/:id', component: CommunEditComponent, canActivate: [AuthGuard] },

     { path: 'decision-demission-add', component: DecisionDemissionAddComponent, canActivate: [AuthGuard] },
     { path: 'decision-demission-add/:id', component: DecisionDemissionAddComponent, canActivate: [AuthGuard] },

     { path: 'decision-demission-list', component: DecisionDemissionListComponent, canActivate: [AuthGuard] },

      { path: 'rabattre-add', component: RabattreAddComponent, canActivate: [AuthGuard] },
      { path: 'rabattre-add/:id', component: RabattreAddComponent, canActivate: [AuthGuard] },

      { path: 'rabattre-list', component: RabattreListComponent, canActivate: [AuthGuard] },
      { path: 'menu-decision-list', component: MenuDecisionListComponent, canActivate: [AuthGuard] },

      { path: 'attention-report', component: AttentionReportComponent, canActivate: [AuthGuard] },
      { path: 'attention-report/:id', component: AttentionReportComponent, canActivate: [AuthGuard] },


      { path: 'rabattre-report', component: RabattreReportComponent , canActivate: [AuthGuard] },
      { path: 'rabattre-report/:id', component: RabattreReportComponent , canActivate: [AuthGuard] },

      { path: 'decissive-report', component: DecissiveReportComponent, canActivate: [AuthGuard] },
      { path: 'decissive-report/:id', component: DecissiveReportComponent, canActivate: [AuthGuard] },

      /** All Tickets **/
       { path: 'tickets-comments', component: TicketsCommentsComponent, canActivate: [AuthGuard] },
       { path: 'all-tickets', component: AllTicketsComponent, canActivate: [AuthGuard] },

    /** Stockage Add */

      { path: 'retyour-stock-add', component: RetyourStockAddComponent, canActivate: [AuthGuard] },

      { path: 'home-menu-stockage-service', component: HomeMenuStockageServiceComponent, canActivate: [AuthGuard] },

      { path: 'retyour-stock-edit', component: RetyourStockEditComponent, canActivate: [AuthGuard] },
      { path: 'retyour-stock-edit/:id', component: RetyourStockEditComponent, canActivate: [AuthGuard] },

      { path: 'retyour-stock-list', component: RetyourStockListComponent, canActivate: [AuthGuard] },

      { path: 'retyour-stock-details', component: RetyourStockDetailsComponent, canActivate: [AuthGuard] },
      { path: 'retyour-stock-details/:id', component: RetyourStockDetailsComponent, canActivate: [AuthGuard] },

    /**** All Demands  **/

      {
        path: 'all-demands', component: AllDemandsComponent, canActivate: [AuthGuard], data: {
          permittedRoles: ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORETAB', 'DIRECTORADMN', 'RESSOURCEHUMAINE', 'RESPFINANCE', 'DAWAAPRIV', 'DOTPRIV', 'FINPRIV','DIRPRIV'] }},

    /****** TechDemands**/
 
      { path: 'type-dem-tech-crud', component: TypeDemTechCrudComponent , canActivate: [AuthGuard] },
      { path: 'menu-dir-dem-tech', component: MenuDirDemTechComponent, canActivate: [AuthGuard] },
      { path: 'menu-user-dem-tech', component: MenuUserDemTechComponent, canActivate: [AuthGuard] },
      { path: 'dem-tech-add-user', component: DemTechAddUserComponent, canActivate: [AuthGuard] },
      { path: 'dem-tech-list-user', component: DemTechListUserComponent, canActivate: [AuthGuard] },
      { path: 'dem-tech-list-dirr', component: DemTechListDirrComponent, canActivate: [AuthGuard] },
      { path: 'dem-tech-edit', component: DemTechEditComponent, canActivate: [AuthGuard] },
      { path: 'dem-tech-edit/:id', component: DemTechEditComponent , canActivate: [AuthGuard] },
      { path: 'dem-tech-details', component: DemTechDetailsComponent , canActivate: [AuthGuard] },
      { path: 'dem-tech-details/:id', component: DemTechDetailsComponent, canActivate: [AuthGuard] },

    /** Service Vente **/
      { path: 'service-vente-add', component: ServiceVenteAddComponent, canActivate: [AuthGuard] },
      { path: 'service-vente-list', component: ServiceVenteListComponent, canActivate: [AuthGuard] },
      { path: 'service-vente-list-fin', component: ServiceVenteListFinComponent, canActivate: [AuthGuard] },
      { path: 'service-vente-list-dot', component: ServiceVenteListDotComponent, canActivate: [AuthGuard] },
      { path: 'crud-type-service-vente', component: CrudTypeServiceVenteComponent, canActivate: [AuthGuard] },
/** Events Report **/

      { path: 'events-report', component: EventsReportComponent, canActivate: [AuthGuard] },

    /**** Activite Types ***/


       { path: 'activite-dawa-add', component: ActiviteDawaAddComponent , canActivate: [AuthGuard] },

      { path: 'activite-dawa-list', component: ActiviteDawaListComponent, canActivate: [AuthGuard] },

      { path: 'dawaa-menu', component: DawaaMenuComponent, canActivate: [AuthGuard] },

      { path: 'activite-compagne-add', component: ActiviteCompagneAddComponent, canActivate: [AuthGuard] },

      { path: 'activite-compagne-list', component: ActiviteCompagneListComponent, canActivate: [AuthGuard] },

      { path: 'activite-compagne-menu', component: ActiviteCompagneMenuComponent, canActivate: [AuthGuard] },

      { path: 'activite-education-add', component: ActiviteEducationAddComponent, canActivate: [AuthGuard] },

      { path: 'activite-education-list', component: ActiviteEducationListComponent, canActivate: [AuthGuard] },

      { path: 'education-menu', component: EducationMenuComponent, canActivate: [AuthGuard] },

      { path: 'activite-immigration-add', component: ActiviteImmigrationAddComponent, canActivate: [AuthGuard] },

      { path: 'activite-immigration-list', component: ActiviteImmigrationListComponent, canActivate: [AuthGuard] },

      { path: 'immigration-menu', component: ImmigrationMenuComponent, canActivate: [AuthGuard] },

      { path: 'activite-prepa-add', component: ActivitePrepaAddComponent, canActivate: [AuthGuard] },

      { path: 'activite-prepa-list', component: ActivitePrepaListComponent, canActivate: [AuthGuard] },

      { path: 'prepa-menu', component: PrepaMenuComponent, canActivate: [AuthGuard] },

      { path: 'activite-type-prepa', component: ActiviteTypePrepaComponent, canActivate: [AuthGuard] },

      { path: 'type-activitee-immigration', component: TypeActiviteeImmigrationComponent, canActivate: [AuthGuard] },

      { path: 'type-activitee-education', component: TypeActiviteeEducationComponent, canActivate: [AuthGuard] },

      { path: 'type-activitee-dawaa', component: TypeActiviteeDawaaComponent, canActivate: [AuthGuard] },

      { path: 'type-activitee-compagne', component: TypeActiviteeCompagneComponent, canActivate: [AuthGuard] },

      { path: 'activite-dawa-elec-add', component: ActiviteDawaElecAddComponent, canActivate: [AuthGuard] },

      { path: 'activite-dawa-elec-list', component: ActiviteDawaElecListComponent, canActivate: [AuthGuard] },

      { path: 'dawa-elec-menu', component: DawaElecMenuComponent, canActivate: [AuthGuard] },

      { path: 'type-dawa-elec', component: TypeDawaElecComponent, canActivate: [AuthGuard] },


    /** Demande Voiture **/

    { path: 'demande-voiture-add', component: DemandeVoitureAddComponent , canActivate: [AuthGuard] },
    { path: 'demande-voiture-list-user', component: DemandeVoitureListUserComponent, canActivate: [AuthGuard] },
      { path: 'demande-voiture-list-dir', component: DemandeVoitureListDirComponent, canActivate: [AuthGuard] },
      { path: 'main-accepted-avance', component: MainAcceptedAvanceComponent, canActivate: [AuthGuard] },

    /**All Maintenance  **/
 
      { path: 'all-maintenance-add', component: AllMaintenanceAddComponent, canActivate: [AuthGuard] },

      { path: 'all-maintenance-list', component: AllMaintenanceListComponent, canActivate: [AuthGuard] },

      { path: 'all-maintenance-list-user', component: AllMaintenanceListUserComponent, canActivate: [AuthGuard] },

      { path: 'all-maintenance-list-dirr', component: AllMaintenanceListDirrComponent, canActivate: [AuthGuard] },

      { path: 'all-maintenance-list-employee', component: AllMaintenanceListEmployeeComponent, canActivate: [AuthGuard] },

      { path: 'all-maintenance-type-crud', component: AllMaintenanceTypeCrudComponent, canActivate: [AuthGuard] },

    /**** Historique *****/

       { path: 'histo-conges', component: HistoCongesComponent , canActivate: [AuthGuard] },
      { path: 'histo-permission', component: HistoPermissionComponent, canActivate: [AuthGuard] },
      { path: 'histo-equi', component: HistoEquiComponent, canActivate: [AuthGuard] },
      { path: 'histo-slaire', component: HistoSlaireComponent, canActivate: [AuthGuard] },
      { path: 'histo-residence', component: HistoResidenceComponent, canActivate: [AuthGuard] },
      { path: 'histo-recrutement', component: HistoRecrutementComponent, canActivate: [AuthGuard] },
      { path: 'histo-pay-cheque', component: HistoPayChequeComponent, canActivate: [AuthGuard] },
      { path: 'histo-cre-finance', component: HistoCreFinanceComponent, canActivate: [AuthGuard] },
      { path: 'histo-formation', component: HistoFormationComponent, canActivate: [AuthGuard] },
      { path: 'histo-demission', component: HistoDemissionComponent, canActivate: [AuthGuard] },
      { path: 'histo-plaint', component: HistoPlaintComponent, canActivate: [AuthGuard] },
      { path: 'histo-ticket-employee', component: HistoTicketEmployeeComponent, canActivate: [AuthGuard] },
      { path: 'histo-avance', component: HistoAvanceComponent, canActivate: [AuthGuard] },
      { path: 'histo-maintenance', component: HistoMaintenanceComponent, canActivate: [AuthGuard] },
      { path: 'histo-heure-supp', component: HistoHeureSuppComponent, canActivate: [AuthGuard] },
      { path: 'histo-emploi', component: HistoEmploiComponent, canActivate: [AuthGuard] },
      { path: 'histo-attestation', component: HistoAttestationComponent, canActivate: [AuthGuard] },
      { path: 'histo-assistance', component: HistoAssistanceComponent, canActivate: [AuthGuard] },
      { path: 'histo-change-rib', component: HistoChangeRibComponent, canActivate: [AuthGuard] },
      { path: 'histo-voiture', component: HistoVoitureComponent, canActivate: [AuthGuard] },
      { path: 'histo-maintenance-voiture', component: HistoMaintenanceVoitureComponent, canActivate: [AuthGuard] },
      { path: 'histo-stockage', component: HistoStockageComponent, canActivate: [AuthGuard] },
      { path: 'histo-vente', component: HistoVenteComponent, canActivate: [AuthGuard] },
      { path: 'histo-tech', component: HistoTechComponent, canActivate: [AuthGuard] },
      { path: 'histo-all-maintenance', component: HistoAllMaintenanceComponent, canActivate: [AuthGuard] },
      { path: 'histo-menus', component: HistoMenusComponent, canActivate: [AuthGuard] },

    ])
  ],/*,  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  } ,*/
  providers: [UserServiceService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    EvaluationService,
    PrivilegesService,
    CommentaireService,
    EtablissementService,
    AdministrationService,
    TypeDotationService,
    EtatDotationService,
    AgenceImmobService,
    TypeUniteService,
    EtatUniteService,
    ServiceRevenusService,
    UniteService,
    LocataireService,
    DepotRevenusService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
