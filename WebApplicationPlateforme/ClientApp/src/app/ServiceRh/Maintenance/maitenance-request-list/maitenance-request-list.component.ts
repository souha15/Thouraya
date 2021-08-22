import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { MaintenanceRequestService } from '../../../shared/Services/ServiceRh/maintenance-request.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { PrivilegesService } from '../../../shared/Services/User/privileges.service';
import { PathSharedService } from '../../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { MaintenanceRequest } from '../../../shared/Models/ServiceRh/maintenance-request.model';
import { NgForm } from '@angular/forms';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';

@Component({
  selector: 'app-maitenance-request-list',
  templateUrl: './maitenance-request-list.component.html',
  styleUrls: ['./maitenance-request-list.component.css']
})
export class MaitenanceRequestListComponent implements OnInit {
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private mnService: MaintenanceRequestService,
    private toastr: ToastrService,
    private tblService: TbListeningService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private privilegesService: PrivilegesService,
    private http: HttpClient,
    private rootUrl: PathSharedService
  ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }
  ngOnInit(): void {

    this.getUserConnected();
    this.getpannelist();
    this.getFiles();
    this.resetForm();
    this.getCreance();


  }


  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }

  //Get Panne Lists

  panneList: TbListening[] = [];
  getpannelist() {
    this.tblService.GetP().subscribe(res => {
      this.panneList = res
    }
    )
  }

  //editing Facture
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

  //Populate Form 
  factId: number
  fact: MaintenanceRequest = new MaintenanceRequest();
  etatok: boolean;
  cheque: boolean = false;
  banque: boolean = false;
  populateForm(facture: MaintenanceRequest) {
    this.mnService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);

    if (this.fact.etat == "في الإنتظار") {
      this.etatok = false;
    } else
      this.etatok = true
  }
  factList: MaintenanceRequest[] = [];
  GfactList: MaintenanceRequest[] = [];

  getCreance() {
    this.mnService.Get().subscribe(res => {
      this.GfactList = res;

      this.factList = this.GfactList.filter(item => item.idUserCreator == this.UserIdConnected)

    })

  }

  factur: MaintenanceRequest = new MaintenanceRequest();

  updateRecord(form: NgForm) {

    this.factur = Object.assign(this.factur, form.value);
    this.factId = this.factur.id;

    if (this.mnService.formData.etat == "في الإنتظار") {
      this.fileslist.forEach(item => {
        this.mnService.formData.photoPanne = item;
      })
      this.mnService.Edit().subscribe(res => {


        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.serviceupload.refreshListf();
        this.files1 = [];
        this.resetForm();
        this.getCreance();
      },
        err => {
          this.toastr.error(' لم يتم التحديث  ', ' فشل');
        }


      )
    } else {
      this.toastr.error(' لم يتم التحديث ', ' فشل');
    }
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.mnService.formData = {
      id: null,
      typePanne: '',
      panne: '',
      categoriePanne: '',
      detail: '',
      photoPanne: '',
      idmec: '',
      nommec: '',
      etatmec: '',
      datemec: '',
      etat: '',
      tarnsid: '',
      transnom: '',
      datetrans: '',
      etattrans: '',
      typedemande: '',
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

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.mnService.Delete(Id)
        .subscribe(res => {
          this.getCreance();
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


