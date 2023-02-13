import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { EtablissementService } from '../../shared/Services/Etablissement/etablissement.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Ticket2Service } from '../../shared/Services/Ticket2/ticket2.service';
import { FilesTicket2Service } from '../../shared/Services/Ticket2/files-ticket2.service';
import { NotifTicket2Service } from '../../shared/Services/Ticket2/notif-ticket2.service';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { ToastrService } from 'ngx-toastr';
import { Etablissement } from '../../shared/Models/Etablissement/etablissement.model';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import { Ticket2 } from '../../shared/Models/Ticket2/ticket2.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { PathSharedService } from '../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { FilesTicket2 } from '../../shared/Models/Ticket2/files-ticket2.model';
import { NotifTicket2 } from '../../shared/Models/Ticket2/notif-ticket2.model';

@Component({
  selector: 'app-ticket2-add',
  templateUrl: './ticket2-add.component.html',
  styleUrls: ['./ticket2-add.component.css']
})
export class Ticket2AddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private adminService: AdministrationService,
    private etabService: EtablissementService,
    private UserService: UserServiceService,
    private ticketService: Ticket2Service,
    private filesticketService: FilesTicket2Service,
    private notifticketService: NotifTicket2Service,
    private toastr: ToastrService,
    private http: HttpClient,
    public serviceupload: UploadDownloadService,) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getUserConnected();
    this.getAdmin();
    this.getEtab();
    this.getUsers();
    this.getFiles();
  }


  //Get Administration List
  adminList: Administration[] = [];
  getAdmin() {
    this.adminService.ListAdministration().subscribe(res => {
      this.adminList = res
    })
  }

  //Get Etab List
  etabList: Etablissement[] = [];
  getEtab() {
    this.etabService.ListEtablissement().subscribe(res => {
      this.etabList = res;
    })
  }

  //Get Users List
  userList: UserDetail[] = [];
  getUsers() {
    this.UserService.GetUsersList().subscribe(res => {
      this.userList =res
    })
  }

  //get User Connected
  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })
  }

  //get User Name
  getUserName(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.tic.nomuser = res.fullName; 
    })
  }

  // get Admin  Name
  getAdminName(event) {
    this.adminService.GetById(+event.target.value).subscribe(res => {
      this.tic.nomadmin = res.nom;
    })
  }

  //get Etab Name
  getEtabName(event) {
    this.etabService.GetById(+event.target.value).subscribe(res => {
      this.tic.nometab = res.nom
    })
  }

  //To Admin
  ToAdmin: boolean = false;
  Admin() {
    this.tic.attribut1 = "admin"
    this.ToAdmin = true;
    this.ToUser = false;
    this.ToEtab = false;
  }

  //To User
  ToUser: boolean = false;
  User() {
    this.tic.attribut1 = "user"
    this.ToAdmin = false;
    this.ToUser = true;
    this.ToEtab = false;
  }

  //To Etab
  ToEtab: boolean = false;
  Etab() {
    this.tic.attribut1 = "etab"
    this.ToAdmin = false;
    this.ToUser = false;
    this.ToEtab = true;
  }

  // Create Ticket
  tic: Ticket2 = new Ticket2();
  Cretic: Ticket2 = new Ticket2();
  date = new Date().toLocaleDateString();
  isValidFormSubmitted = false;
  notif: NotifTicket2 = new NotifTicket2();

  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';

  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }
    else {
      this.isValidFormSubmitted = true;
      this.tic.date = this.date;
      this.tic.etat = "مرسلة";
      this.tic.etatuserid = this.UserIdConnected;
      this.tic.etatusernom = this.UserNameConnected;
      this.ticketService.CreateTicket2(this.tic).subscribe(
        res => {

          this.Cretic =res
          // Create Files
          this.pj.idTicket = this.Cretic.id

          this.fileslist.forEach(item => {
            this.pj.path = item;
            this.filesticketService.CreateFilesTicket2(this.pj).subscribe(res => {
              this.serviceupload.refreshList();
              this.GetFileName();
            })        
              });

          //Create Notification
         
          this.notif.idTicket = this.Cretic.id;
          this.notif.date = "0"

          if (this.Cretic.attribut1 == "admin") {
            this.notif.idadmin = this.Cretic.idadmin
          } else if (this.Cretic.attribut1 == "user") {
            this.notif.iduser = this.Cretic.iduser
          } else {
            this.notif.idetab = this.Cretic.idetab
          }

          this.notifticketService.CreateNotifTicket2(this.notif).subscribe(res => {

          })

          this.files1 = [];
          form.resetForm();
          this.succ = true;
          this.failed = false;
          this.msg = "  تمت الإضافة بنجاح"
          this.toastr.success("تم التسجيل  بنجاح", " تسجيل ");
          this.isValidFormSubmitted = false;
      },
        err => {
          this.failed = true;
          this.succ = false;
          this.msg = " فشل عند الإضافة"
          this.toastr.error("فشل التسجيل ", " تسجيل ")
        })
    }

  }

  //Files
  files1: File[] = [];
  onSelect(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: FilesTicket2 = new FilesTicket2();
  public pjs: FilesTicket2[];
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
  Idtransaction: number;
  url: any;
  file: any;
  fileslist: string[] = [];
  public upload(event) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                // this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          /// this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist.push(this.file.name);
      console.log(this.fileslist)
    }
  }

}
