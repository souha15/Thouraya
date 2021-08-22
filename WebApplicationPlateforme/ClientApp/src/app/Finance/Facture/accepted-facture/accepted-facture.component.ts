import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Facture } from '../../../shared/Models/Finance/facture.model';
import { FactureService } from '../../../shared/Services/Finance/facture.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../../shared/path-shared.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { PiecesJointesFacture } from '../../../shared/Models/Finance/pieces-jointes-facture.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-accepted-facture',
  templateUrl: './accepted-facture.component.html',
  styleUrls: ['./accepted-facture.component.css']
})
export class AcceptedFactureComponent implements OnInit {
  filter;
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  constructor(private factureService: FactureService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private tblService: TbListeningService,
    private rootUrl: PathSharedService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
  ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.gettbl();
    this.getUserConnected();
    this.getFiles();
    this.getFactures();
    this.getAllPj();
    this.resetForm();

  }

  factList: Facture[] = [];
  GfactList: Facture[] = [];

  getFactures() {
    this.factureService.Get().subscribe(res => {
      this.GfactList = res
      this.factList = this.GfactList.filter(item => item.attribut2 == "جاهزة للصرف")
    })
  }

  typeFacture: TbListening[] = [];
  brancheOne: TbListening[] = [];
  brancheTwo: TbListening[] = [];

  gettbl() {
    this.tblService.GetBo().subscribe(res => {
      this.brancheOne = res

    })

    this.tblService.GetBt().subscribe(res => {
      this.brancheTwo = res
    })

    this.tblService.GetTfacture().subscribe(res => {
      this.typeFacture = res;
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



  //Populate Form 
  factId: number
  fact: Facture = new Facture();
  etatok: boolean;
  populateForm(facture: Facture) {
    this.factureService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    this.listPjFiltred = this.listPj.filter(item => item.idCF == this.factId)

    if (this.fact.attribut2 == "غير معتمدة" || this.fact.attribut2 == "غير جاهزة للصرف" || this.fact.attribut2 == "لم يتم الصرف") {
      this.etatok = false;
    } else
      this.etatok = true;
  }

  //editing Facture

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.updateRecord(form)
    }
  }

  factur: Facture = new Facture();

  updateRecord(form: NgForm) {

    this.factur = Object.assign(this.factur, form.value);
    this.factId = this.factur.id;
    this.factureService.formData.editdate = this.date;
    this.factureService.formData.edituserid = this.UserIdConnected;
    this.factureService.formData.editusernom = this.UserNameConnected;
    console.log(this.factureService.formData.etat)

    if (this.factureService.formData.etat == "غير معتمدة" && this.factureService.formData.idUserCreator == this.UserIdConnected) {
      this.factureService.Edit().subscribe(res => {
        this.pj.idUserCreator = this.factureService.formData.idUserCreator;
        this.pj.date = this.date;
        this.pj.creatorName = this.factureService.formData.userNameCreator
        this.pj.idCF = this.factureService.formData.id
        let path = this.rootUrl.getPath();

        this.fileslist.forEach(item => {
          this.pj.path = item;
          console.log(item)
          this.http.post(path + '/PiecesJointesfs', this.pj)
            .subscribe(res => {
              this.serviceupload.refreshListf();
              this.GetFileName();
            });
        })
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.serviceupload.refreshListf();
        this.resetForm();
        this.getFactures();
      },
        err => {
          this.toastr.error(' لم يتم التحديث  ', ' فشل');
        }


      )
    } else {
      this.toastr.error(' لم يتم التحديث ', ' فشل');
    }
  }


  getBack() {
    this.fact.attribut2 = "تم الصرف"
    this.fact.etatPayemeent = "تم الصرف"
    this.fact.etatPaydate = this.date;
    this.fact.etatuseridPay = this.UserIdConnected;
    this.fact.etatusernomPay = this.UserNameConnected;
    this.factureService.PutObservableE(this.fact).subscribe(res => {
      this.getFactures();
      this.toastr.success("تم صرف الفاتورة بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم صرف الفاتورة', ' فشل');
      })


  }
  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.factureService.formData = {
      id: null,
      prix: '',
      categorie: '',
      brancheone: '',
      branchetwo: '',
      detail: '',
      beneficiaire: '',
      date: '',
      usernamecreator: '',
      type: '',
      etat: '',
      etatUserId: '',
      etatUserNom: '',
      etatdate: '',
      etatdirector: '',
      dateetatdirector: '',
      directorid: '',
      directornom: '',
      etatPayemeent: '',
      etatuseridPay: '',
      etatusernomPay: '',
      etatPaydate: '',
      editdate: '',
      edituserid: '',
      editusernom: '',
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

  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: PiecesJointesFacture = new PiecesJointesFacture();
  public pjs: PiecesJointesFacture[];
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
      console.log(this.fileslist)
    }
  }

  //Get the list of files

  listPj: PiecesJointesFacture[] = [];
  listPjFiltred: PiecesJointesFacture[] = [];

  getAllPj() {
    this.serviceupload.Searchf().subscribe(res => {
      this.listPj = res
      this.listPjFiltred = this.listPj.filter(item => item.idCF == this.factId)
      console.log(this.listPjFiltred)
      console.log(this.factId)
      console.log(this.listPj)
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
      this.factureService.Delete(Id)
        .subscribe(res => {
          this.getFactures()
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
