import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProjetOrgService } from '../../../shared/Services/ProjetOrg/projet-org.service';
import { ClientProjetClientOrgService } from '../../../shared/Services/ProjetOrg/client-projet-org.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { FilsProjetFilesOrgService } from '../../../shared/Services/ProjetOrg/fils-projet-org.service';
import { ProjetClient } from '../../../shared/Models/ProjetOrg/projet-client.model';
import { OuvrierProjetOuvrierOrgService } from '../../../shared/Services/ProjetOrg/ouvrier-projet-org.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../../shared/path-shared.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { ProjetFiles } from '../../../shared/Models/ProjetOrg/projet-files.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { NgForm } from '@angular/forms';
import { ProjetOrg } from '../../../shared/Models/ProjetOrg/projet-org.model';
import { ProjetOuvrier } from '../../../shared/Models/ProjetOrg/projet-ouvrier.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Projet } from '../../../shared/Models/Projet/projet.model';
@Component({
  selector: 'app-add-projet-org',
  templateUrl: './add-projet-org.component.html',
  styleUrls: ['./add-projet-org.component.css']
})
export class AddProjetOrgComponent implements OnInit {


  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private projetService: ProjetOrgService,
    private clientService: ClientProjetClientOrgService,
    private UserService: UserServiceService,
    private filesService: FilsProjetFilesOrgService,
    private ouvrierService: OuvrierProjetOuvrierOrgService,
    private toastr: ToastrService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    public serviceupload: UploadDownloadService, ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  num: number = 0;



  ngOnInit(): void {
    this.getUserConnected();

    this.getUsersList();
    this.getCltList();
    this.num = Math.floor(Math.random() * (99999 - 1000)) + 1000;
    this.pr.num = this.num.toString();
    this.getFiles();
  }

  // Get Client List

  cltList: ProjetClient[] = [];
  getCltList() {
    this.clientService.Get().subscribe(res => {
      this.cltList = res;
    })
  }


  //get Clt By Id
  getClt(event) {
    this.clientService.GetById(+event.target.value).subscribe(res => {
      this.pr.nomClient = res.nom
    })
  }
  //Get User Connected
  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  //Get Users Lis
  ouvrierList: UserDetail[] = [];
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.ouvrierList = res
    })
  }

  getDir(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.pr.nomDir = res.fullName
    })
  }

  //Ouvrier List
  ouvList: ProjetOuvrier[] = [];
  ouvList2: ProjetOuvrier[] = [];

  getOuvrier(event) {

    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.ouv.nomUser = res.fullName
    })

  }
   /*
  addOuvi() {
    this.ouvTest = true;
    this.ouvList[this.i] = this.ouvi
    this.ouvi = new ProjetOuvrier();
    this.i = this.i + 1;

  }

  del(dp, i) {
    this.ouvList.splice(this.ouvList.indexOf(dp), 1);
    this.i = this.i - 1
    this.ouvi = new ProjetOuvrier();

  }


  j = 0;
  addFile() {
    this.filetest = true
    this.filelist[this.j] = this.pjf
    console.log(this.pjf)
    this.pjf = new ProjetFiles();
    this.j = this.j + 1;

  }


  del9(dp, i) {
    this.filelist.splice(this.filelist.indexOf(dp), 1)
    this.j = this.j - 1;
    this.pjf = new ProjetFiles();
  }

*/
  j = 0;
  FileTest: boolean = false;
  addFile() {
    this.FileTest = true;
    this.filelist[this.j] = this.pj
    this.pj = new ProjetFiles();
    this.j = this.j+1
  }

  del9(dp, i) {
    this.filelist.splice(this.filelist.indexOf(dp), 1)
    this.j = this.j - 1;
    this.pj = new ProjetFiles();
  }
  OuvrierList: ProjetOuvrier[] = [];
  OuvrierList2: ProjetOuvrier[] = [];
  OuvTest: Boolean = false;
  i = 0;
  ouv: ProjetOuvrier = new ProjetOuvrier();
  addOuv() {
    this.OuvTest = true;
    this.OuvrierList[this.i] = this.ouv;
    console.log(this.ouvrierList)
    this.ouv = new ProjetOuvrier();
    this.i = this.i +1 
  }

  del(dp, i) {
    this.OuvrierList.splice(this.OuvrierList.indexOf(dp), 1);
    this.i = this.i - 1
    this.ouv = new ProjetOuvrier();

  }

  //Submit projet

  pr: ProjetOrg = new ProjetOrg();
  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();
  prCreated: ProjetOrg = new ProjetOrg();
  path: string;
  id: number;
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    } else {
      this.isValidFormSubmitted = true;
      this.pr.datenereg = this.date;
      this.pr.creatorName = this.UserNameConnected;
      this.pr.idUserCreator = this.UserIdConnected;
      this.pr.etat ="غير مفعلة"
      this.projetService.Add(this.pr).subscribe(res => {
        this.prCreated = res
        this.id = res.id

        if (this.OuvTest) {
          for (let i = 0; i < this.OuvrierList.length; i++) {
            this.ouv = this.OuvrierList[i];
            this.ouv.idprojet = this.id
            this.ouv.nomProjet = this.prCreated.nom
            this.ouvrierService.Add(this.ouv).subscribe(res => {

            },
              err => {
                this.toastr.error("  فشل في تسجيل    فريق المشروع", "فشل")
              })

          }
        }
        if (this.FileTest) {
          for (let j = 0; j < this.filelist.length; j++) {
            this.pj = this.filelist[j]
            this.pj.idprojet = this.id
            this.filesService.Add(this.pj).subscribe(res => {

            },
              err => {
                this.toastr.error("  فشل في تسجيل المستندات", "فشل")
              })
          }
        
        }


        this.toastr.success("تم التسجيل بنجاح", "نجاح")
        form.resetForm();
        this.OuvTest = false;
        this.OuvrierList.splice(0, this.OuvrierList.length)
        this.FileTest = false;
        this.filelist.splice(0, this.filelist.length)

      },
        err => {
          console.log(err)
      })
    }
  }


  //Files
  public pj: ProjetFiles = new ProjetFiles();

  public pjs: ProjetFiles[];


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

  url: any;
  file1: any;
  fileslist1: string[] = [];
  filelist: ProjetFiles[] = [];

  filetest: boolean = false;
  public upload1(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file1 = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file1).subscribe(
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
      this.fileslist1.push(this.file1.name);
   //   this.filelist.push(this.file1.name)
      this.pj.pathc = this.file1.name
    }
  }


}
