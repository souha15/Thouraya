import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { PathSharedService } from '../../shared/path-shared.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { RepairRequestService } from '../../shared/Services/voiture/repair-request.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { RepairRequest } from '../../shared/Models/voiture/repair-request.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comptable-list-cars',
  templateUrl: './comptable-list-cars.component.html',
  styleUrls: ['./comptable-list-cars.component.css']
})
export class ComptableListCarsComponent implements OnInit {

  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  filter;
  constructor(private rootUrl: PathSharedService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private recpService: RepairRequestService,
    private UserService: UserServiceService,
    private toastr: ToastrService) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.getFiles();
    this.getrecpList();
    this.resetForm();
  }

  GfactList: RepairRequest[] = [];
  factList: RepairRequest[] = [];
  getrecpList() {
    this.recpService.Get().subscribe(res => {
      this.GfactList = res
      this.factList = this.GfactList.filter(item => item.etat == "معتمدة")
    })
  }
  UserIdConnected: string;
  UserNameConnected: string;
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }

  factId: number;
  fact: RepairRequest = new RepairRequest();
  populateForm(facture: RepairRequest) {
    this.recpService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);

  }

  getBack() {
    this.fact.etat = "تم الصرف"
    this.fact.etatrh = "تم الصرف"
    this.fact.daterh = this.date;
    this.fact.idrh = this.UserIdConnected;
    this.fact.nomrh = this.UserNameConnected;
    this.recpService.PutObservableE(this.fact).subscribe(res => {
      this.getrecpList();
      this.toastr.success("تم صرف طلب صيانة السيارة بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم صرف طلب صيانة السيارة', ' فشل');
      })


  }

  //Download

  public download(filepath) {
    this.downloadStatus.emit({ status: ProgressStatusEnum.START });
    this.serviceupload.downloadFile(filepath).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            this.downloadStatus.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
            break;
          case HttpEventType.Response:
            this.downloadStatus.emit({ status: ProgressStatusEnum.COMPLETE });
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = filepath;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        this.downloadStatus.emit({ status: ProgressStatusEnum.ERROR });
      }
    );
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.recpService.formData = {
      id: null,
      matricule: '',
      type: '',
      daterepair: '',
      prix1: '',
      prix2: '',
      prix3: '',
      panne: '',
      iddir: '',
      idrh: '',
      nomdir: '',
      nomrh: '',
      datedir: '',
      daterh: '',
      etat: '',
      etatdir: '',
      etatrh: '',
      req: '',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',
      idvoiture: null,

    }
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.recpService.Delete(Id)
        .subscribe(res => {
          this.getrecpList()
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }


  }

  public files: string[];
  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data

      }
    );

  }


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
}
