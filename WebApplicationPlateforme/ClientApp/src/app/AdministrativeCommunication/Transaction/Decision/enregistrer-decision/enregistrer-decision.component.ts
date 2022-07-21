import { Component, OnInit, ElementRef, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { UserServiceService } from '../../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { DecisionTwoService, FilesDecisionTwoes } from '../../../../shared/Services/ServiceRh/decision-two.service';
import { DecisionTwo } from '../../../../shared/Models/ServiceRh/decision-two.model';
import { NgForm } from '@angular/forms';
import { AdministrationService } from '../../../../shared/Services/Administration/administration.service';
import { EtablissementService } from '../../../../shared/Services/Etablissement/etablissement.service';
import { Administration } from '../../../../shared/Models/Administration/administration.model';
import { UserDetail } from '../../../../shared/Models/User/user-detail.model';
import { DatePipe } from '@angular/common';
import { ProgressStatus } from '../../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../../shared/Services/Taches/upload-download.service';
import { PathSharedService } from '../../../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ProgressStatusEnum } from '../../../../shared/Enum/progress-status-enum.enum';
@Component({
  selector: 'app-enregistrer-decision',
  templateUrl: './enregistrer-decision.component.html',
  styleUrls: ['./enregistrer-decision.component.css']
})
export class EnregistrerDecisionComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private trinService: DecisionTwoService,
    private adminService: AdministrationService,
    public serviceupload: UploadDownloadService,
    private rootUrl: PathSharedService,
    private http: HttpClient, ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getUserConnected();
    this.getUsersList();
    this.getAdminList();
    this.getFiles();
    const datePipe = new DatePipe('en-Us');
    this.today = datePipe.transform(new Date(), 'yyyy-MM-dd');

  }
  today;

  decision: string = "داخلي";
  interne: boolean = false;
  test(event) {
    this.decision = event.target.value
    if (this.decision == "داخلي") {
      this.interne = true;
    } else {
      this.interne = false;
    }
  }
  tous: boolean = false;
  one: boolean = false;
  tousOrOne(event) {
    if (event.target.value == 'الكل') {
      this.tous = true;
      this.tous = false;
      this.de.alladmin = "1";
      this.de.attribut5 = "0"
    } else {
      this.tous = false
      this.one = true;
    }
  }
  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.de.idUserCreator = res.id;
      this.de.userNameCreator = res.fullName;

    })

  }
  emp: boolean = false;
  admin: boolean = false;
  EmployeeAdmin(event) {
    if (event.target.value == "موظف") {
      this.emp = true;
      this.admin = false;
    } else {
      this.emp = false;
      this.admin = true;
      this.de.attribut5="1"
    }
  }
  AdministrationList: Administration[] = [];
  getAdminList() {
    this.adminService.ListAdministration().subscribe(res => {
      this.AdministrationList = res;
    })
  }

  getAdminName(event) {
    this.adminService.GetById(+event.target.value).subscribe(res => {
      this.de.adminnom = res.nom;
    })
  }

  getEmployeeName(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.de.employeenom = res.fullName;
    })
  }

  UserList: UserDetail[] = [];
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UserList = res;
    })
  }

  de: DecisionTwo = new DecisionTwo();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  d2 = new Date().toISOString().slice(0, 10).split("-").reverse().join("/");
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.de.decision = this.decision
      this.trinService.Add(this.de).subscribe(res => {
        form.resetForm();
        this.toastr.success("تم التسجيل  بنجاح", " تسجيل ");
        this.files1 = [];   
        this.fileslist.forEach(item => {
          this.pj.path = item;
          this.pj.idDecision = res.id;
          this.trinService.AddFD(this.pj).subscribe(res => {

          })

        })


      },
        err => {
          this.toastr.error("فشل التسجيل  الطلب", " تسجيل ")
        }
      )
    }
  }


  // Files

  onSelect(event) {

    this.files1.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }


  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: FilesDecisionTwoes = new FilesDecisionTwoes();
  public pjs: FilesDecisionTwoes[];
  //public files: string[];

  //get List of Files
  public files: string[];
  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data

      }
    );

  }


  //Get file name for Database

  GetFileName() {
    let sa: any;
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
  files1: File[] = [];
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
    }
  }
}
