import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { RecueDonsService } from '../../../shared/Services/Dons/recue-dons.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { PathSharedService } from '../../../shared/path-shared.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { RecueDons } from '../../../shared/Models/Dons/recue-dons.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recue-dons-list',
  templateUrl: './recue-dons-list.component.html',
  styleUrls: ['./recue-dons-list.component.css']
})
export class RecueDonsListComponent implements OnInit {

  filter;
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private factureService: RecueDonsService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private tblService: TbListeningService,
    private rootUrl: PathSharedService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient, ) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getUserConnected();
    this.usersListGet();
    this.getTbl();
    this.getFiles();
    this.resetForm();
    this.getFactures();
  }


  factList: RecueDons[] = [];
  getFactures() {
    this.factureService.Get().subscribe(res => {
      this.factList = res
    })
  }

  pd: TbListening[] = [];
  getTbl() {
    this.tblService.GetProjetDons().subscribe(res => {
      this.pd = res
    })
  }

  usersList: UserDetail[] = [];
  usersListGet() {
    this.UserService.GetUsersList().subscribe(res => {
      this.usersList = res;
    })
  }

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })
  }


  factId: number
  fact: RecueDons = new RecueDons();
  pathurl: string;
  populateForm(facture: RecueDons) {
    this.factureService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    this.pathurl = "/uploads/" + this.fact.photoRecue
  }

  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();


  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.updateRecord(form)
    }
  }


  factur: RecueDons = new RecueDons();

  updateRecord(form: NgForm) {

    this.factur = Object.assign(this.factur, form.value);
    this.factId = this.factur.id;
    this.factureService.formData.attribut5 = this.date;
    this.factureService.formData.attribut3 = this.UserIdConnected;
    this.factureService.formData.attribut4 = this.UserNameConnected;
    
    this.fileslist.forEach(item => {
      this.factureService.formData.photoRecue = item;
    })
      this.factureService.Edit().subscribe(res => {


        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.serviceupload.refreshListf();
        this.resetForm();
        this.getFactures();
        this.files1 = [];
      },
        err => {
          this.toastr.error(' لم يتم التحديث  ', ' فشل');
        }


      )
  
  }


  // Files Section

  onSelect(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  //Files

  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;

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
    /* if (event.addedFiles && event.addedFiles.length > 0) {
       this.file = event.addedFiles;
       console.log(this.file)
   
    *     this.file = event.addedFiles
       console.log(this.file)
    */
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      console.log(this.file)
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

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.factureService.formData = {
      id: null,
      prix: '',
      numMachine: '',
      numOperation: '',
      dateOperation: '',
      projet: '',
      req: '',
      photoRecue: '',      
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',

    }
  }


  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.factureService.Delete(Id)
        .subscribe(res => {
          this.getFactures();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }
}
