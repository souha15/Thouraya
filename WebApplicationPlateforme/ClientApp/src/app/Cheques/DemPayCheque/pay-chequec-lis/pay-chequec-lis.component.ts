import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PathSharedService } from '../../../shared/path-shared.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { ChequeCService } from '../../../shared/Services/Cheques/cheque-c.service';
import { ChequesC } from '../../../shared/Models/Cheques/cheques-c.model';
import { NgForm } from '@angular/forms';
import { PayChequeService } from '../../../shared/Services/Cheques/pay-cheque.service';
import { PayChequesC } from '../../../shared/Models/Cheques/pay-cheques-c.model';
import { FilesChequesC } from '../../../shared/Models/Cheques/files-cheques-c.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { ListeningProjetService } from '../../../shared/Services/Projets/listening-projet.service';
import { EtatListCompte } from '../../../shared/Models/Comptes/etat-list-compte.model';
import { DemPayChequeService } from '../../../shared/Services/Cheques/dem-pay-cheque.service';
import { ArticlePayChequeService } from '../../../shared/Services/Cheques/article-pay-cheque.service';
import { FilesPayChequesC } from '../../../shared/Models/Cheques/files-pay-cheques-c.model';
import { ArticlePayCheque } from '../../../shared/Models/Cheques/article-pay-cheque.model';
import { DemPayCheque } from '../../../shared/Models/Cheques/dem-pay-cheque.model';
import { Administration } from '../../../shared/Models/Administration/administration.model';
import { AdministrationService } from '../../../shared/Services/Administration/administration.service';

@Component({
  selector: 'app-pay-chequec-lis',
  templateUrl: './pay-chequec-lis.component.html',
  styleUrls: ['./pay-chequec-lis.component.css']
})
export class PayChequecLisComponent implements OnInit {
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private demandeService: DemPayChequeService,
    private articleService: ArticlePayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private UserService: UserServiceService,
    private adminService: AdministrationService,
    private toastr: ToastrService,
    public serviceupload: UploadDownloadService, ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getUserConnected();
    this.getDemPayList();
    this.getAdminList();
    this.getFiles();
  }
  adminList: Administration[] = [];
  getAdminList() {
    this.adminService.ListAdministration().subscribe(res => {
      this.adminList = res
    })
  }
  // Get User Connected
  p: Number = 1;
  count: Number = 5;
  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }


  //Get Dem pay ListProject
  dem1: DemPayCheque[] = [];
  dem2: DemPayCheque[] = [];
  arlis: ArticlePayCheque[] = [];
  arlis2: ArticlePayCheque[] = [];
  getDemPayList() {
    this.demandeService.Get().subscribe(res => {
      this.dem1 = res
      this.dem2 = this.dem1.filter(item => item.demandeur == this.UserNameConnected || item.creatorName == this.UserNameConnected)

      return this.dem2.sort((a, b) => new Date(a.dateEntre).getTime() - new Date(b.dateEntre).getTime())
    })
  }


  //PopulateForm
  per: DemPayCheque = new DemPayCheque();
  per1: DemPayCheque = new DemPayCheque();
  raistest: boolean = false

  populateForm(conge: DemPayCheque) {
    this.per = Object.assign({}, conge)
    this.articleService.Get().subscribe(res => {
      this.arlis2 = res;
      this.arlis = this.arlis2.filter(item => item.idDem == this.per.id)  
    })
  }


  //Delete

  onDelete(Id) {
    this.demandeService.GetById(Id).subscribe(res => {
      this.per1 =res
    if (this.per1.etatgeneral == 'في الإنتظار') {
      if (confirm('Are you sure to delete this record ?')) {
        this.demandeService.Delete(Id)
          .subscribe(res => {
            this.getDemPayList();
            this.toastr.success("تم الحذف  بنجاح", "نجاح");
          },

            err => {
              console.log(err);
              this.toastr.warning('لم يتم الحذف  ', ' فشل');

            }
          )

      }
    } else {
      this.toastr.warning('لم يتم الحذف الطلب تحت الإجراء  ', ' فشل');
    }
    })
  }


/**** Retour Part ***/

  showForm: boolean = false;
  testRetour(event) {
    if (event.target.value == "مسترجع") {
      this.showForm = true
    } else {
      this.showForm = false;
    }
  }

  onSubmit(form: NgForm) {
    this.demandeService.PutObservableE(this.per).subscribe(res => {
      this.toastr.success("تم التسجيل بنجاح", "نجاح")
      this.getDemPayList();
      form.resetForm();
      this.files1=[];

    }, err => {
        this.toastr.error("  فشل في تسجيل ا الإستلام أو التسليم"
          , "فشل")
    })
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
      this.per.fileRetour = this.file.name;
    }
  }

}
