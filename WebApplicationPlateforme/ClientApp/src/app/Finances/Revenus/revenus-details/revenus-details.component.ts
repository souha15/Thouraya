import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../../shared/path-shared.service';
import { LocataireDotService } from '../../../shared/Services/Dotations/locataire-dot.service';
import { DotationService } from '../../../shared/Services/Dotations/dotation.service';
import { UniteService } from '../../../shared/Services/Dotations/unite.service';
import { ToastrService } from 'ngx-toastr';
import { Dotation } from '../../../shared/Models/Dotations/dotation.model';
import { LocataireDot } from '../../../shared/Models/Dotations/locataire-dot.model';
import { Unite } from '../../../shared/Models/Dotations/unite.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { PiecesJointesLocataireDot } from '../../../shared/Models/Dotations/pieces-jointes-locataire-dot.model';
import { NgForm } from '@angular/forms';
import { PiecesJointesLocataireDotService } from '../../../shared/Services/Dotations/pieces-jointes-locataire-dot.service';
import { FilesUserCin } from '../../../shared/Models/ServiceRh/files-user-cin.model';

@Component({
  selector: 'app-revenus-details',
  templateUrl: './revenus-details.component.html',
  styleUrls: ['./revenus-details.component.css']
})
export class RevenusDetailsComponent implements OnInit {
  private routeSub: Subscription;
  @ViewChild('htmlData') htmlData: ElementRef;
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private route: ActivatedRoute, private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    private locationService: LocataireDotService,
    private dotationService: DotationService,
    private uniteService: UniteService,
    private toastr: ToastrService,
    private filesServiceDot: PiecesJointesLocataireDotService) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>(); }


  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();
    this.DotationList();
    this.UniteListGlobal();
    this.getFiles();
    this.getFilesDot();
  }


  private selectedLink: string = "newone";

  setradio(e: string): void {

    this.selectedLink = e;
    if (this.selectedLink == "newone") {
      this.location.date = "جديد"
    }

    if (this.selectedLink == "oldone") {
      this.location.date = "قديم"
    }


  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }
  //Get location Details

  locId: number;
  location: LocataireDot = new LocataireDot();
  edit: boolean = false;
  pathvid: string;
  bo: boolean = false;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.locId = params['id']
      this.locationService.GetById(this.locId).subscribe(res => {
        this.location = res
      })
    });
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

  //Get DotationList

  dotationList: Dotation[] = [];

  DotationList() {
    this.dotationService.Get().subscribe(res => {
      this.dotationList = res
    })
  }

  // Get Unite List
  UniteListGlobal() {
      this.uniteService.Get().subscribe(res => {
        this.uniteList = res
        //this.uniteList = this.uniteListG.filter(item => { item.idDotation == +this.location.idDotation }) 
      })

    
  }

  uniteListG: Unite[] = [];
  uniteList: Unite[] = [];

  UniteList() {
    if (this.dotationid != null) {
      this.uniteService.Get().subscribe(res => {
        this.uniteListG = res
        if (this.uniteListG.length != 0) {
          this.uniteList = this.uniteListG.filter(item => { item.idDotation == +this.dotationid || item.etat == "مؤجرة" })
        }
      })

    }
  }


  // Get Selected Unite

  isDotationSelected: boolean = false;
  dotationid: string;
  selectInput(event) {
    this.dotationid = event.target.value;
    this.dotationService.GetById(+this.dotationid).subscribe(res => {
      this.location.nomDotation = res.nom


    })
    if (this.dotationid != null) {
      this.uniteService.Get().subscribe(res => {
        this.uniteListG = res
        if (this.uniteListG != null) {
          this.uniteList = this.uniteListG.filter(item => item.idDotation == +this.dotationid)
        }
      })

    }
  }

  //Unite name
  uniteid: string;
  selectInput2(event) {
    this.uniteid = event.target.value;
    this.uniteService.GetById(+this.uniteid).subscribe(res => {
      this.location.nomUnite = res.numRevenus


    })
  }

  //Get Files
  filesCreated: PiecesJointesLocataireDot[] = [];
  filesCreated2: PiecesJointesLocataireDot[] = [];

  getFilesDot() {
    this.filesServiceDot.Get().subscribe(res => {
      this.filesCreated = res
      this.filesCreated2 = this.filesCreated.filter(item => item.idlocation == this.location.id)
      console.log(this.filesCreated2);
      console.log(this.filesCreated)
    })
  }

  deleteFilesDot(Id) {
    this.filesServiceDot.Delete(Id).subscribe(res => {
      this.getFilesDot();
    })
  }

  //Create location
  public pjC: PiecesJointesLocataireDot = new PiecesJointesLocataireDot();
  public pjsC: PiecesJointesLocataireDot[];
  iddot: number;
  idunite: number;
  idloc: number;
  dotationname: string;
  unitename: string;
  locaname: string;
  isValidFormSubmitted1 = false;
  locationId: number;
  unitedit: Unite = new Unite();
  date = new Date().toLocaleDateString();

  onSubmit(form: NgForm) {
    this.location.CreatorName = this.UserNameConnected;
    this.location.idUserCreator = this.UserIdConnected;
    this.location.dateenreg = this.date;
    if (form.invalid) {
      this.isValidFormSubmitted1 = false;

    } else {

      this.isValidFormSubmitted1 = true
      if (this.location.attribut5 == null) {
        this.location.attribut5 = "0";
      }

      this.iddot = this.location.idDotation;
      this.idunite = this.location.idUnite;
      this.locationService.PutObservable(this.location).subscribe(res => {
     
    

        this.dotationService.GetById(this.iddot).subscribe(res => {
          this.dotationname = res.nom;
        })

        this.uniteService.GetById(this.idunite).subscribe(res => {
          this.unitename = res.numRevenus;
          this.unitedit = res
          this.unitedit.etat = "مؤجرة";
          this.uniteService.PutObservable(this.unitedit).subscribe(res => {

          })
        })

        //contrat
        this.pjC.idlocation = this.location.id;
        this.pjC.date = this.date;
        this.pjC.type = "العقد"
        this.fileslist.forEach(item => {
          this.pjC.path = item;
          this.filesServiceDot.Add(this.pjC).subscribe(res => {

          })
        })

        // cin
        this.pjC.type = "الھویة"

        this.fileslist1.forEach(item => {
          this.pjC.path = item;
          this.filesServiceDot.Add(this.pjC).subscribe(res => {

          })
        })

        this.filesCreated2 = [];
        this.fileslist1 = [];
        form.resetForm();
        this.toastr.success("تم التعديل بنجاح", "نجاح");
      },
        err => {
          console.log(err);
          this.toastr.warning('لم تتم تعديل', ' فشل');
        }
      )
    }
  }

  //Delete Files
  onDelete1(dp, i) {
    this.fileslist.splice(this.fileslist.indexOf(dp), 1);
  }

  onDelete2(dp, i) {
    this.fileslist1.splice(this.fileslist1.indexOf(dp), 1);
  }

  //Files


  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: PiecesJointesLocataireDot = new PiecesJointesLocataireDot();
  public pjs: PiecesJointesLocataireDot[];
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
    }
  }
}

