import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { SupplieService } from '../../shared/Services/Supplies/supplie.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { FilesSupplie } from '../../shared/Models/Supplies/files-supplie.model';
import { Supplie } from '../../shared/Models/Supplies/supplie.model';
import { NgForm } from '@angular/forms';
import { GestionSuppService } from '../../shared/Services/Supplies/gestion-supp.service';
import { GestionSupp } from '../../shared/Models/Supplies/gestion-supp.model';

@Component({
  selector: 'app-supplies-add',
  templateUrl: './supplies-add.component.html',
  styleUrls: ['./supplies-add.component.css']
})
export class SuppliesAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private suppService: SupplieService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    private toastr: ToastrService,
    private gestionSupService: GestionSuppService) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.getsupp();
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }

  //get supp

  suppList: GestionSupp[] = [];
  getsupp() {
    this.gestionSupService.Get().subscribe(res => {
      this.suppList = res
    })
  }

  quatite: number=0;
  sudata: boolean = false;
  supi: string
  ges: GestionSupp = new GestionSupp();
  suppEv(event) {
    this.sudata = true;
      this.gestionSupService.GetById(+event.target.value).subscribe(res => {
        this.sup.categ = res.sup;
        this.ges = res;
      this.supi = res.sup;
      this.quatite = +res.quanitite;
      
    })
  }

  quantitesaisie: number;
  good: boolean=false;
  q: number = 0;
  nvquantite(event) {
    this.good = true;
    this.quantitesaisie = +event.target.value
    this.q= this.quatite - this.quantitesaisie;

  }
  // Create Supplie

  sup: Supplie = new Supplie();
  sup2: Supplie = new Supplie();
  attachments: File[] = [];
  cptId: number;
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {

    this.sup.idUserCreator = this.UserIdConnected;
    this.sup.userNameCreator = this.UserNameConnected;
    this.sup.dateenreg = this.date;

    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }


    else {
      this.isValidFormSubmitted = true;
      console.log(this.quatite)
      console.log(this.q)
      if (this.q >= 0) {
        this.suppService.Add(this.sup).subscribe(
          (res: any) => {
            this.sup2 = res;
            this.cptId = this.sup2.id;

            // Files

            this.pj.idSupplie = this.cptId;
            let path = this.rootUrl.getPath();
            this.fileslist.forEach(item => {
              this.pj.path = item;
              console.log(item)
              this.http.post(path + '/FilesSupplies', this.pj)
                .subscribe(res => {
                  this.serviceupload.refreshList();
                  this.GetFileName();
                });
            })

            this.ges.quanitite = this.q.toString();
            this.gestionSupService.PutObservableE(this.ges).subscribe(res => {

            })
            this.files1 = [];
            this.good = false;
            this.sudata = false;
            form.resetForm();
            this.toastr.success("تم تسجيل  بنجاح", " تسجيل ");
            this.isValidFormSubmitted = false;
          },
          err => {
            this.toastr.error("فشل تسجيل ", " تسجيل ")
          }

        )
    }else {
        this.toastr.error("تثبت من الكمية ", " تسجيل ")
    }

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
  public pj: FilesSupplie = new FilesSupplie();
  public pjs: FilesSupplie[];
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
