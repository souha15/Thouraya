import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PrivilegesService } from '../../shared/Services/User/privileges.service';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { EtablissementService } from '../../shared/Services/Etablissement/etablissement.service';
import { RoleService } from '../../shared/Services/User/role.service';
import { Etablissement } from '../../shared/Models/Etablissement/etablissement.model';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { PrivilegesDetail } from '../../shared/Models/User/privileges-detail.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-user-updating',
  templateUrl: './user-updating.component.html',
  styleUrls: ['./user-updating.component.css']
})
export class UserUpdatingComponent implements OnInit {
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private administrationservice: AdministrationService,
    private etablissementservice: EtablissementService,
    private RolesService: RoleService,
    public serviceupload: UploadDownloadService, ) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getIdUrl();
    this.GetAdmninstrativeList();
    this.getUsersList();
    this.resetForm();
    this.getFiles();
   
  }
  UsersList: UserDetail[] = [];
 
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersList = res
    })

  }
  dirname: string;
  findnum(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.UserService.formData.directeur = res.fullName
    })
  }

  //get id in URl
  UserId: string;
  user: UserDetail = new UserDetail();
  roleslist: any = [];
  testrole: boolean = false;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.UserId = params['id'];
      this.UserService.GetUserById(this.UserId).subscribe(res => {
        this.user = res
        this.UserService.formData = Object.assign({}, this.user);

        this.UserService.getUserRoles(this.user.id).subscribe(res => {
          this.roleslist = res;
          this.roleslist.forEach(item => {
            if (item == "PARTNORMAL" || item == "RESPFINANCE" || item =="STAGIAIRE") {
              this.testrole = true;
            } else { this.testrole = false; }
            console.log(this.testrole)
          })
        })
      })
    });
  }
  onsubmit(form: NgForm) {
    this.UserService.EditUser().subscribe(res => {
      this.toastr.success("تم تحديث المستخدم", "تحديث")
      this.resetForm();

    },
      err => {
        this.toastr.success("فشل تحديث المستخدم", "فشل")
      })
    //  this.updateRecord(form);
  }

  //Administration Liste

  AdministrationList: Administration[] = [];

  GetAdmninstrativeList() {
    this.administrationservice.ListAdministration().subscribe(res => {
      this.AdministrationList = res
    })
  }
  //Administration test
  bossId: number = null;
  nomAdministration: string;
  position: string;
  dir: string;
  administartion: Administration = new Administration();
  admintest(event) {

    this.bossId = event.target.value;
    this.administrationservice.GetById(+this.bossId).subscribe(res => {

      this.administartion = res
      this.nomAdministration = res.nom;
      this.UserService.formData.nomAdministration = res.nom
    })


  }
  // Type Presence
  typepresence: boolean = false;
  typePresence(event) {
    if (event.target.value == "جزئي") {
      this.typepresence = true
    } else
      this.typepresence = false;
  }
  //Get User Id

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
      soldeconge:'',
      daterectrutement:'',
      etatuser:  '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',
     

    }
  }


  public files: string[];

  //get List of Files

  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data

      }
    );

  }

  //Get file name for Database

  GetFileName() {
    let sa: string;
    let s: any;
    let finalres: any;
    let i: number = 0;
    let tlistnew: any[] = [];
    for (var k = 0; k < this.files.length; k++) {
      sa = <string>this.files[k]
      s = sa.toString().split('uploads\\,', sa.length - 1);
      finalres = s.toString().split('uploads\\', sa.length - 1);

      tlistnew[i] = finalres[1]
      i++;

    }


  }

  //Upload

  //Save it ToDatabase
  path: string;
  Idtransaction: number;
  url: any;
  file: any;
  fileslist: string[] = [];
  public upload(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist.push(this.file.name);
      this.fileslist.forEach(item => {
        this.path = item;

      })
      this.UserService.formData.photo = this.path;
    }
  }

}
