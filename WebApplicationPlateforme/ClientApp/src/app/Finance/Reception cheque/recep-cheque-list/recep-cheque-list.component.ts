import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PathSharedService } from '../../../shared/path-shared.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ReceptionChequeService } from '../../../shared/Services/Finance/reception-cheque.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { ToastrService } from 'ngx-toastr';
import { PiecesJointesRecepCheque } from '../../../shared/Models/Finance/pieces-jointes-recep-cheque.model';
import { NgForm } from '@angular/forms';
import { RecepCheque } from '../../../shared/Models/Finance/recep-cheque.model';

@Component({
  selector: 'app-recep-cheque-list',
  templateUrl: './recep-cheque-list.component.html',
  styleUrls: ['./recep-cheque-list.component.css']
})
export class RecepChequeListComponent implements OnInit {

  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  filter;
  constructor(private rootUrl: PathSharedService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private recpService: ReceptionChequeService,
    private UserService: UserServiceService,
    private toastr: ToastrService)
  { this.downloadStatus = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getrecpList();
    this.getUserConnected();
    this.getAllPj();
    this.resetForm();

  }

  factList: RecepCheque[] = [];
  getrecpList() {
    this.recpService.Get().subscribe(res => {
      this.factList=res
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
  fact: RecepCheque = new RecepCheque();
  populateForm(facture: RecepCheque) {
    this.recpService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    this.listPjFiltred = this.listPj.filter(item => item.idRC == this.factId)
  }


  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.updateRecord(form)
    }
  }

  factur: RecepCheque = new RecepCheque();

  updateRecord(form: NgForm) {
    this.factur = Object.assign(this.factur, form.value);
    this.factId = this.factur.id;

    this.recpService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
  
      this.resetForm();
      this.getrecpList();
    },
      err => {
        this.toastr.error(' لم يتم التحديث ', ' فشل');
      }
    )

  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.recpService.formData = {
      id: null,
      datecheque: '',
      dateAjout: '',
      numCheque: '',
      propCheque: '',
      livreur: '',
      prix: '',
      prixEcriture: '',
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

  //Get the list of files

  listPj: PiecesJointesRecepCheque[] = [];
  listPjFiltred: PiecesJointesRecepCheque[] = [];

  getAllPj() {
    this.serviceupload.SearchReceptionCheque().subscribe(res => {
      this.listPj = res
      this.listPjFiltred = this.listPj.filter(item => item.idRC == this.factId)
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
}
