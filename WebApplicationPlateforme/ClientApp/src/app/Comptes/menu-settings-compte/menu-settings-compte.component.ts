import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { EtatCompte } from '../../shared/Models/Comptes/etat-compte.model';
import { EtatCompteService } from '../../shared/Services/Comptes/etat-compte.service';
import { ListeningProjetService } from '../../shared/Services/Projets/listening-projet.service';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { FilesEtatCompte } from '../../shared/Models/Comptes/files-etat-compte.model';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { EtatListCompte } from '../../shared/Models/Comptes/etat-list-compte.model';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FilesEtatCompteService } from '../../shared/Services/Comptes/files-etat-compte.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-settings-compte',
  templateUrl: './menu-settings-compte.component.html',
  styleUrls: ['./menu-settings-compte.component.css']
})
export class MenuSettingsCompteComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  private routeSub: Subscription;
  constructor(private etatCompteService: TbListeningService,
    private router: Router,
    private route: ActivatedRoute,
    private CompteService: EtatCompteService,
    private ComptesListService: ListeningProjetService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    private toastr: ToastrService,
    private filesService: FilesEtatCompteService)
  { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();
    this.getEtat();
    this.getComptesList();
    this.getFilesList();
  }

  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.cptId = params['id']

      this.CompteService.GetById(this.cptId).subscribe(res => {
        this.cpt = res

      })
    });
  }


  //getFilesList()
  filelist: FilesEtatCompte[]=[]
  fileslistF: FilesEtatCompte[] = []
  bentest: boolean = false;
  getFilesList() {
    this.filesService.Get().subscribe(res => {
      this.fileslistF = res
      this.filelist = this.fileslistF.filter(item => item.idCompte == this.cptId)
      if (this.filelist.length != 0)
        this.bentest = true;

    })

  }

  deleteFiles(Id) {
    this.filesService.Delete(Id).subscribe(res => {
      this.getFilesList();
    })
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


  // Get Etat Compte Lis

  cptList: EtatListCompte[] = [];

  getComptesList() {
    this.ComptesListService.GetCompte().subscribe(res => {
      this.cptList = res
    })
  }

  // Get Etat

  etatList: TbListening[] = [];
  getEtat() {
    this.etatCompteService.GetEtatCompte().subscribe(res => {
      this.etatList = res;
    })
  }



  // get Bank info
  bankid: number;
  numCompte: string;
  bankTest(event) {
    this.bankid = +event.target.value;
    this.ComptesListService.GetByIdCompte(this.bankid).subscribe(res => {
      this.cpt.type = res.type;
      this.cpt.numCompte = res.numCompte
      this.numCompte = res.numCompte
      this.cpt.banque = res.nom
    })
  }
  //Create Etat Compte

  cpt: EtatCompte = new EtatCompte();
  cpt2: EtatCompte = new EtatCompte();
  attachments: File[] = [];
  cptId: number;
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {

    this.cpt.idUserCreator = this.UserIdConnected;
    this.cpt.creatorName = this.UserNameConnected;

    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }


    else {
      this.isValidFormSubmitted = true;
      this.CompteService.PutObservableE(this.cpt).subscribe(
        (res: any) => {
          this.cpt2 = res;


          // Files

          this.pj.idCompte = this.cptId;
          let path = this.rootUrl.getPath();
          this.fileslist.forEach(item => {
            this.pj.path = item;
            console.log(item)
            this.http.post(path + '/FilesEtatComptes', this.pj)
              .subscribe(res => {
                this.serviceupload.refreshList();
                this.GetFileName();
              });
          })

          this.files1 = [];
          this.bentest = false;
          form.resetForm();
          this.toastr.success("تم تسجيل  بنجاح", " تسجيل ");
          this.isValidFormSubmitted = false;
        },
        err => {
          this.toastr.error("فشل تسجيل ", " تسجيل ")
        }

      )

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
  public pj: FilesEtatCompte = new FilesEtatCompte();
  public pjs: FilesEtatCompte[];
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
