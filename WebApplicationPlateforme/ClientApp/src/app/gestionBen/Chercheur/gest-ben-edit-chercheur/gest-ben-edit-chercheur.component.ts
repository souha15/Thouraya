import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { GestBenService } from '../../../shared/Services/GestBen/gest-ben.service';
import { GestBen } from '../../../shared/Models/GestBen/gest-ben.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { FamilleService } from '../../../shared/Services/GestBen/famille.service';
import { Famille } from '../../../shared/Models/GestBen/famille.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SettingsBenService } from '../../../shared/Services/GestBen/settings-ben.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { RevenusBenService } from '../../../shared/Services/GestBen/revenus-ben.service';
import { RevenusBen } from '../../../shared/Models/GestBen/revenus-ben.model';
import { ResidanceService } from '../../../shared/Services/GestBen/residance.service';
import { ResidanceBen } from '../../../shared/Models/GestBen/residance-ben.model';
import { CompteBenService } from '../../../shared/Services/GestBen/compte-ben.service';
import { CompteBen } from '../../../shared/Models/GestBen/compte-ben.model';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../../shared/path-shared.service';
import { FilesBenService } from '../../../shared/Services/GestBen/files-ben.service';
import { FilesBen } from '../../../shared/Models/GestBen/files-ben.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gest-ben-edit-chercheur',
  templateUrl: './gest-ben-edit-chercheur.component.html',
  styleUrls: ['./gest-ben-edit-chercheur.component.css']
})
export class GestBenEditChercheurComponent implements OnInit {
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  private routeSub: Subscription;
  constructor(private benService: GestBenService,
    private UserService: UserServiceService,
    private familleService: FamilleService,
    private toastr: ToastrService,
    private settingsService: SettingsBenService,
    private revBenService: RevenusBenService,
    private residanceService: ResidanceService,
    private compteService: CompteBenService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    private filesService: FilesBenService,
    private route: ActivatedRoute,
  ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUsersList();
    this.getUserConnected();
    this.getSettings();
    this.getFiles();
    this.getFiles2();
    this.getCompte();
    this.getResidance();
    this.getRevenus();
    this.getFamille();
  }


  //get the id in Url

  Id: number;
  gest: GestBen = new GestBen();

  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.benService.GetById(this.Id).subscribe(res => {
        this.gest = res

      })
    });

  }

  //get Files
  FilesBen: FilesBen[] = [];
  FilesBenList: FilesBen[] = [];
  file: boolean = false;
  getFiles2() {
    this.filesService.ListFilesBen().subscribe(res => {
      this.FilesBenList = res
      this.FilesBen = this.FilesBenList.filter(item => item.idBen == this.Id)
      if (this.FilesBen.length != 0) {
        this.file = true;
      } else {
        this.file = false;
      }
    })
  }
  del99(Id) {
    this.filesService.DeleteFilesBen(Id).subscribe(res => {
      this.getFiles2();
    })
  }
  //get Residance

  ResiBenList: ResidanceBen[] = [];
  ResiList: ResidanceBen[] = [];
  residance: boolean = false;
  getResidance() {
    this.residanceService.ListResidanceBen().subscribe(res => {
      this.ResiBenList = res
      this.ResiList = this.ResiBenList.filter(item => item.idBen == this.Id)
      if (this.ResiList.length != 0) {
        this.residance = true;
      } else {
        this.residance = false;
      }
    })
  }

  del22(Id) {
    this.residanceService.DeleteResidanceBen(Id).subscribe(res => {
      this.getResidance();
    })
  }

  // get Revenus

  RevBenList: RevenusBen[] = [];
  RevBen: RevenusBen[] = [];
  revenus: boolean = false;
  getRevenus() {

    this.revBenService.ListRevenusBen().subscribe(res => {
      this.RevBenList = res
      this.RevBen = this.RevBenList.filter(item => item.idBen == this.Id)
      if (this.RevBen.length != 0) {
        this.revenus = true;
      }
      else {
        this.revenus = false;
      }
    })
  }

  del33(Id) {
    this.revBenService.DeleteRevenusBen(Id).subscribe(res => {
      this.getRevenus()
    })
  }

  // get Famille

  FamilleBenList: Famille[] = [];
  FamilleBen: Famille[] = [];
  famille: boolean = false;

  getFamille() {
    this.familleService.ListFamille().subscribe(res => {
      this.FamilleBenList = res
      this.FamilleBen = this.FamilleBenList.filter(item => item.idBen == this.Id)
      if (this.FamilleBen.length != 0) {
        this.famille = true;
      } else {
        this.famille = false;
      }
    })
  }

  del11(Id) {
    this.familleService.DeleteFamille(Id).subscribe(res => {
      this.getFamille();
    })
  }


  //Get Compte

  CompteBenList: CompteBen[] = [];
  CompteBen: CompteBen[] = [];
  compte: boolean = false;
  getCompte() {
    this.compteService.ListCompteBen().subscribe(res => {
      this.CompteBenList = res
      this.CompteBen = this.CompteBenList.filter(item => item.idBen == this.Id)
      if (this.CompteBen.length != 0) {
        this.compte = true
      } else {
        this.compte = false;
      }
    })
  }

  del44(Id) {
    this.compteService.DeleteCompteBen(Id).subscribe(res => {
      this.getCompte();
    })
  }

  //Get User Connected
  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  // Type Ben

  private selectedLink: string = "directe";

  setradio(e: string): void {

    this.selectedLink = e;
    if (this.selectedLink == "chercheur") {
      this.gest.typeEnreg = "ارسال الى الباحث "
    }

    if (this.selectedLink == "accept") {
      this.gest.typeEnreg = "طلب اعتماد التسجيل "
    }

    if (this.selectedLink == "directe") {
      this.gest.typeEnreg = "مباشر "
    }


  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }

  //Cin Test Event
  gestList: GestBen[] = [];
  gestListF: GestBen[] = [];
  exist: boolean = false;
  cintest(event) {
    this.benService.ListGestBen().subscribe(res => {
      this.gestList = res
      this.gestListF = this.gestList.filter(item => item.numCin == event.target.value)
      if (this.gestListF.length != 0) {
        this.exist = true;
      } else {
        this.exist = false;
      }
    })
  }


  //Get Users List

  UserList: UserDetail[] = [];
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UserList = res;
    })
  }


  //Get Chercher Name
  cherName(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.gest.nomchercheur = res.fullName
    })
  }


  // get settings tables

  typeben: TbListening[] = [];
  bankList: TbListening[] = [];
  maisonList: TbListening[] = [];
  revbenList: TbListening[] = [];
  getSettings() {

    //Type Ben

    this.settingsService.GetTBen().subscribe(res => {
      this.typeben = res;
    })

    // Banque

    this.settingsService.GetTD().subscribe(res => {
      this.bankList = res;
    })

    // Type Maison 

    this.settingsService.GetTM().subscribe(res => {
      this.maisonList = res;
    })

    //rev Ben List

    this.settingsService.GetTR().subscribe(res => {
      this.revbenList = res;
    })

  }
  //Famille

  getdateNais(event) {
    this.fm.dateNais = event.target.value
  }

  fm: Famille = new Famille();
  fmList: Famille[] = [];
  fmList2: Famille[] = [];
  j = 0;
  fmtest: boolean;
  addfm() {
    this.fmtest = true;
    this.fmList[this.j] = this.fm
    this.fm = new Famille();
    this.j = this.j + 1;
  }

  del1(dp, i) {
    //this.benList.splice(i, 1)
    this.fmList.splice(this.fmList.indexOf(dp), 1);
    this.j = this.j - 1
    this.fm = new Famille();

  }


  // Residance 

  resi: ResidanceBen = new ResidanceBen();
  resiList: ResidanceBen[] = [];
  resiList2: ResidanceBen[] = [];
  i = 0;
  resitest: boolean;
  addResi() {
    this.resitest = true;
    this.resiList[this.i] = this.resi
    this.resi = new ResidanceBen();
    this.i = this.i + 1;
  }

  del2(dp, i) {

    this.resiList.splice(this.resiList.indexOf(dp), 1);
    this.i = this.i - 1
    this.resi = new ResidanceBen();

  }


  //Location Test
  loc: boolean = false;
  location(event) {
    if (event.target.value == "ايجار") {
      this.loc = true
    } else {
      this.loc = false;
    }
  }

  //Revenus Ben

  rev: RevenusBen = new RevenusBen();
  revList: RevenusBen[] = [];
  revList2: RevenusBen[] = [];
  k = 0;
  revtest: boolean;
  addRev() {
    this.revtest = true;
    this.revList[this.k] = this.rev
    this.rev = new RevenusBen();
    this.k = this.k + 1;
  }

  del3(dp, i) {

    this.revList.splice(this.revList.indexOf(dp), 1);
    this.k = this.k - 1
    this.rev = new RevenusBen();

  }


  //Compte Banquaire

  cp: CompteBen = new CompteBen();
  cpList: CompteBen[] = [];
  cpList2: CompteBen[] = [];
  q = 0;
  cptest: boolean;
  addCp() {
    this.cptest = true;
    this.cpList[this.q] = this.cp
    this.cp = new CompteBen();
    this.q = this.q + 1;
  }

  del4(dp, i) {

    this.cpList.splice(this.cpList.indexOf(dp), 1);
    this.q = this.q - 1
    this.cp = new CompteBen();

  }

  //onSubmit
  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    } else {

      this.isValidFormSubmitted = true;


      this.benService.PutObservableE(this.gest).subscribe(res => {

        //Famille Add
        if (this.fmtest) {
          for (let i = 0; i < this.fmList.length; i++) {

            this.fm = this.fmList[i]
            this.fm.idBen = this.Id
            this.fm.idUserCreator = this.UserIdConnected;
            this.fm.userNameCreator = this.UserNameConnected;
            this.fm.dateenreg = this.date;
            this.familleService.CreateFamille(this.fm).subscribe(res => {
              this.fmList2[i] = res

            },
              err => {
                this.toastr.error("  فشل في تسجيل	 ", "فشل")
              })
          }
        }

        //Residance Add
        if (this.resitest) {
          for (let i = 0; i < this.resiList.length; i++) {

            this.resi = this.resiList[i]
            this.resi.idBen = this.Id
            this.resi.idUserCreator = this.UserIdConnected;
            this.resi.userNameCreator = this.UserNameConnected;
            this.residanceService.CreateResidanceBen(this.resi).subscribe(res => {
              this.resiList2[i] = res

            },
              err => {
                this.toastr.error("  فشل في تسجيل	 ", "فشل")
              })
          }
        }

        //Rev Add

        if (this.revtest) {
          for (let i = 0; i < this.revList.length; i++) {

            this.rev = this.revList[i]
            this.rev.idBen = this.Id
            this.rev.idUserCreator = this.UserIdConnected;
            this.rev.userNameCreator = this.UserNameConnected;
            this.revBenService.CreateRevenusBen(this.rev).subscribe(res => {
              this.revList2[i] = res

            },
              err => {
                this.toastr.error("  فشل في تسجيل	 ", "فشل")
              })
          }
        }

        //Compte Banquaiure Add
        if (this.cptest) {
          for (let i = 0; i < this.cpList.length; i++) {

            this.cp = this.cpList[i]
            this.cp.idBen = this.Id
            this.cp.idUserCreator = this.UserIdConnected;
            this.cp.userNameCreator = this.UserNameConnected;
            this.compteService.CreateCompteBen(this.cp).subscribe(res => {
              this.cpList2[i] = res

            },
              err => {
                this.toastr.error("  فشل في تسجيل	 ", "فشل")
              })
          }
        }

        this.pj1.idBen = this.Id;
        this.fileslist1.forEach(item => {
          this.pj1.path = item;
          this.filesService.CreateFilesBen(this.pj1).subscribe(res => {

            this.GetFileName();
          })
        });

        this.revList.splice(0, this.revList.length);
        this.cpList.splice(0, this.cpList.length);
        this.resiList.splice(0, this.resiList.length);
        this.fmList.splice(0, this.fmList.length);
        this.FamilleBen = [];
        this.famille = false
        this.RevBen = [];
        this.revenus = false;
        this.residance = false;
        this.ResiList = [];
        this.file = false;
        this.FilesBen = [];
        this.fileslist1 = [];
        this.filetest = false;
        this.fmtest = false;
        this.cptest = false;
        this.resitest = false;
        this.revtest = false;
        form.resetForm();
        this.toastr.success("تم التسجيل بنجاح", "نجاح")

      },
        err => {
          this.toastr.error("  فشل في تسجيل	 ", "فشل")
        }
      )
    }
  }

  envoyer() {
    this.gest.etatchercheur ="مرسلة"
    this.benService.PutObservableE(this.gest).subscribe(res => {
      this.toastr.success("تم الإرسال بنجاح", "نجاح")
    },
      err => {
        this.toastr.error("  فشل في الإرسال 	 ", "فشل")
      }
    )
  }
  //Files
  public pj1: FilesBen = new FilesBen();
  public pjr: FilesBen = new FilesBen();
  public pjrs: FilesBen[];

  public files: string[];

  filelist: FilesBen[] = [];
  filelist2: FilesBen[] = [];
  filesprojet: FilesBen = new FilesBen();
  c: number = 0;
  filetest: boolean = false;

  addfiles() {
    this.filetest = true;
    this.filelist[this.c] = this.filesprojet;
    this.filesprojet = new FilesBen();
    this.c = this.c + 1;
  }

  del9(dp, i) {
    this.filelist.splice(this.filelist.indexOf(dp), 1)
  }
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
  file1: any;
  fileslist1: string[] = [];
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
      console.log(this.fileslist1)
      this.filelist.push(this.file1.name)
      this.filetest = true;
    }
  }

}

