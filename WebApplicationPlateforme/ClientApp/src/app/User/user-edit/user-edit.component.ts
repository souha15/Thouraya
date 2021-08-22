import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { EtablissementService } from '../../shared/Services/Etablissement/etablissement.service';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { RoleService } from '../../shared/Services/User/role.service';
import { Etablissement } from '../../shared/Models/Etablissement/etablissement.model';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private administrationservice: AdministrationService,
    private etablissementservice: EtablissementService,
    private RolesService: RoleService,
    public serviceupload: UploadDownloadService, ) { }

  ngOnInit(): void {
    this.getIdUrl();
    this.resetForm();
 
      this.GetEtablisssementList();
this.GetAdmninstrativeList();

  }


//Calcul Salsire Net
SalaireNet: boolean = false;
salaireNet: number = 0;
typeQualification: string;
CalculSalaire() {
  this.salaireNet = (this.salaire + this.indem + this.autreInd) - this.assurance
  this.typeQualification = this.salaireNet.toString();
  //this.UserService.formData.typeQualification = this.typeQualification
}


salaire: number;
getSalaire(event) {
  this.salaire = +event.target.value;
  if (this.salaire != null && this.indem != null && this.autreInd != null && this.assurance != null) {
    this.SalaireNet = true;
    this.CalculSalaire();
  } else {
    this.SalaireNet = false;
  }
}

assurance: number;
getAssurance(event) {
  this.assurance = +event.target.value;
  if (this.salaire != null && this.indem != null && this.autreInd != null && this.assurance != null) {
    this.SalaireNet = true;
    this.CalculSalaire();
  } else {
    this.SalaireNet = false;
  }
}

autreInd: number
getAuteIndemnite(event) {
  this.autreInd = +event.target.value;
  if (this.salaire != null && this.indem != null && this.autreInd != null && this.assurance != null) {
    this.SalaireNet = true;
    this.CalculSalaire();
  } else {
    this.SalaireNet = false;
  }
}

indem: number;
getIndemnite(event) {
  this.indem = +event.target.value;
  if (this.salaire != null && this.indem != null && this.autreInd != null && this.assurance != null) {
    this.SalaireNet = true;
    this.CalculSalaire();
  } else {
    this.SalaireNet = false;
  }
}
// Type Presence
typepresence: boolean = false;
typePresence(event) {
  if (event.target.value == "جزئي") {
    this.typepresence = true
  } else
    this.typepresence = false;
}
//Get User Connected
usernamecr: string;
idusercr: string;
date = new Date().toLocaleDateString();
getUserConnected() {

  this.UserService.getUserProfileObservable().subscribe(res => {

    this.usernamecr = res.fullName;
    this.idusercr = res.id

  })

}

//GetUserId
username: string;
usernameid: string;

findid(event) {

  this.username = event.target.value;
  this.UserService.GetUserByUserName2(this.username).subscribe(res => {
    this.usernameid = res.id;

  })
}
// Get Etablissement List

EtablissementList: Etablissement[] = [];

GetEtablisssementList() {
  this.etablissementservice.ListEtablissement().subscribe(res => {
    this.EtablissementList = res

  })

}

// convert id Etablissement
ConvertedEtabId: number;
selectInput1(event) {
  let selected = event.target.value;
  if (selected) {

    return parseInt(selected)

  } else {
    return parseInt(selected)
  }
}

// convert idAdmnistration
ConvertedId: number;
selectInput2(event) {
  let selected = event.target.value;
  if (selected) {
    return parseInt(selected)
  } else {
    return parseInt(selected)
  }
}

//Administration Liste

AdministrationList: Administration[] = [];

GetAdmninstrativeList() {
  this.administrationservice.ListAdministration().subscribe(res => {
    this.AdministrationList = res
  })
}
x: any
selectInput4(event) {
  this.x = event.target.value;
}
//Get Users List
UsersList: UserDetail[] = [];
getUsersList() {
  this.UserService.GetUsersList().subscribe(res => {
    this.UsersList = res
  })

}


// Get Roles List

roles: any[];

getRoles() {
  this.RolesService.getAllRoles().subscribe(
    (data: any) => {
      data.forEach(obj => obj.selected = false);
      this.roles = data;


    }

  )


}

//Administration test
bossId: number = null;
boss: string;
selectedEtab: boolean = false;
etabList: Etablissement[] = [];
etabListAd: Etablissement[] = [];
etabFinder: boolean = false;
adFinder: boolean = false;
nomAdministration: string;
nomDepartement: string;
position: string;
directoretab: string;
directorad: string
dir: string;

administartion: Administration = new Administration();

  //Create Number


  user: UserDetail = new UserDetail();
  userId: string;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id']

      this.UserService.GetUserById(this.userId).subscribe(res => {
        this.user = res
        this.UserService.formData = Object.assign({}, this.user);

      })
    });
  }

  updateRecord(form: NgForm) {

    this.UserService.EditUser().subscribe(res => {
      this.toastr.success("تم تحديث المستخدم", "تحديث")
      this.resetForm();

    })
  }



  onsubmit(form: NgForm) {
  //  this.updateRecord(form);
    this.toastr.success("تم تحديث المستخدم", "تحديث")
  }
  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.UserService.formData = {
      id: '',
      userName: '',
      email: '',
      Password: '',
      registreCivil: '',
      FullNameEnglish: '',
      fullName: '',
      adresse: '',
      PhoneNumber: '',
      tel: '',
      statut: '',
      nationalite: '',
      religion: '',
      sexe: '',
      dateNaissance: '',
      lieuNaissance: '',
      passeport: '',
      typeSang: '',
      num: '',
      emploi: '',
      rang: '',
      typeEmploi: '',
      nomAdministration: '',
      nomDepartement: '',
      unite: '',
      qualification: '',
      typeQualification: '',
      faculteEcole: '',
      dateQualification: '',
      specialite: '',
      paysetude: '',
      mention: '',
      classement: '',
      degre: '',
      salaire: '',
      indemnite: '',
      autreIndemnite: '',
      heureArrive: '',
      heureDepart: '',
      photo: '',
      idAdministration: null,
      idDepartement: null,
      directeur: '',
      position: '',
      attribut1: '',
      attribut6: '',
      attribut5: '',
      attribut4: '',
      attribut3: '',
      attribut2: '',
      soldeconge: '',
      daterectrutement: '',
      etatuser: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',
    }
  }
}
