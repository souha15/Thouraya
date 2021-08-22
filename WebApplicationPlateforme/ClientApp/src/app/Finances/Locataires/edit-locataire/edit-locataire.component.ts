import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { LocationService } from '../../../shared/Services/Dotations/location.service';
import { PathSharedService } from '../../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { LocataireService } from '../../../shared/Services/Dotations/locataire.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '../../../shared/Models/Dotations/location.model';
import { Dotation } from '../../../shared/Models/Dotations/dotation.model';
import { Unite } from '../../../shared/Models/Dotations/unite.model';
import { DotationService } from '../../../shared/Services/Dotations/dotation.service';
import { UniteService } from '../../../shared/Services/Dotations/unite.service';
import { Locataire } from '../../../shared/Models/Dotations/locataire.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { PiecesJointesLocataire } from '../../../shared/Models/Dotations/pieces-jointes-locataire.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgForm } from '@angular/forms';
import { ContratLocation } from '../../../shared/Models/Dotations/contrat-location.model';
@Component({
  selector: 'app-edit-locataire',
  templateUrl: './edit-locataire.component.html',
  styleUrls: ['./edit-locataire.component.css']
})
export class EditLocataireComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  filter;

  constructor(private locataireService: LocataireService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    private locationService: LocationService,
    private dotationService: DotationService,
    private uniteService: UniteService,
    private toastr: ToastrService) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.DotationList();
    this.getFiles();

  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;

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
      this.dotationList=res
    })
  }

  // Get Selected Unite

  isDotationSelected: boolean = false;
  dotationid: string;

  selectInput(event) {
    this.dotationid = event.target.value;
    this.dotationService.GetById(+this.dotationid).subscribe(res => {
      this.location.nomdotation=res.nom
  

    })
    if (this.dotationid != null) {
      this.uniteService.Get().subscribe(res => {
        this.uniteListG = res
        if (this.uniteListG != null) {
          this.uniteList = this.uniteListG.filter(item => item.idDotation == +this.dotationid && item.etat != "مؤجرة" )
        }
      })

    }
  }

  uniteid: string;
  selectInput2(event) {
    this.uniteid = event.target.value;
    this.uniteService.GetById(+this.uniteid).subscribe(res => {
      this.location.nomunite = res.numRevenus


    })
  }

  locataireid: string;
  selectInput3(event) {
    this.locataireid = event.target.value;
    this.locataireService.GetById(+this.locataireid).subscribe(res => {
      this.location.locataireName = res.nom


    })
  }
  // Get Unite List

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

  //Locataire List

  locataireList: Locataire[] = [];

  LocataireList() {
    this.locataireService.Get().subscribe(res => {
      this.locataireList = res
    })
  }

  //Test if locataire exists
  cin: string;
  Locataire: Locataire[] = [];
  locexists: boolean = false;
  locenotexit: boolean = false;
  CinTest(event) {
    this.isValidFormSubmitted1 = false;
    this.cin = event.target.value;
    if (this.cin != null) {
      this.locataireService.Get().subscribe(res => {
        this.locataireList = res
        if (this.locataireList.length != 0) {
          this.Locataire = this.locataireList.filter(item => item.cin == this.cin);
          if (this.Locataire.length != 0) {
            console.log(this.Locataire)
            this.locexists = true;
          } 
          
        }
      })
    }

  }


  //Create location
  public pjC: ContratLocation = new ContratLocation();
  public pjsC: ContratLocation[];
  location: Location = new Location();
  locationI: Location = new Location();
  iddot: number;
  idunite: number;
  idloc: number;
  dotationname: string;
  unitename: string;
  locaname: string;
  isValidFormSubmitted1 = false;
  locationId: number;
  unitedit: Unite=new Unite();
  onSubmit(form: NgForm) {
    this.location.creatorName = this.UserNameConnected;
    this.location.idUserCreator = this.UserIdConnected;
    this.location.dateenreg = this.date;
    if (form.invalid) {
      this.isValidFormSubmitted1 = false;

    } else {

      this.isValidFormSubmitted1 = true

      this.locationService.Add(this.location).subscribe(res => {
        this.locationId = res.id
        this.iddot = res.iddotation;
        this.idunite = res.idunite;
        this.idloc = res.idlocataire;

        this.locationI.id = this.location.id;
        this.locationI.datedebutcontrat = this.location.datedebutcontrat;
        this.locationI.creatorName = this.location.creatorName
        this.locationI.dateenreg = this.location.dateenreg
        this.locationI.delaicontrat = this.location.delaicontrat
        this.locationI.iddotation = this.location.iddotation
        this.locationI.idlocataire = this.location.idlocataire
        this.locationI.idunite = this.location.idunite
        this.locationI.idUserCreator = this.location.idUserCreator
        this.locationI.locataireName = this.location.locataireName
        this.locationI.moisdelocation = this.location.moisdelocation
        this.locationI.nomdotation = this.location.nomdotation
        this.locationI.nomunite = this.location.nomunite
        this.locationI.numcontrat = this.location.numcontrat
        this.locationI.prixlocationmois = this.location.prixlocationmois

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

        this.locataireService.GetById(this.idloc).subscribe(res => {
          this.locaname = res.nom
        })


        this.locataireService.GetById
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
   
      
        this.pjC.idlocation = this.locationId;
        console.log(this.locationId)
        this.pjC.date = this.date;
        this.pjC.type = "contrat"
        let path = this.rootUrl.getPath();

        this.fileslist.forEach(item => {
          this.pjC.path = item;
          this.http.post(path + '/contratLocations', this.pjC)
            .subscribe(res => {
              this.serviceupload.refreshListC();
              this.GetFileName();
            });
        })

        form.resetForm();
      },
        err => {
          console.log(err);
          this.toastr.warning('لم تتم الإضافة', ' فشل');
        }
      )
    }
  }


  // Location Files

  onDelete1(dp, i) {
    this.fileslist.splice(this.fileslist.indexOf(dp), 1);
  }


  //Test Cin
  LocatList: Locataire[] = [];
  LocatListf: Locataire[] = [];
  cini: string;
  cinexist: boolean;
  testcin(event) {
    this.cini = event.target.value;
    this.cini.toString();
    this.locataireService.Get().subscribe(res => {
      this.LocatList = res
      this.LocatListf = this.LocatList.filter(item => item.cin == this.cini)
      if (this.LocatListf.length == 0) {
        this.cinexist = true

      } else {
        this.cinexist = false
      }
    })

  }
  //Create Locataire

  locataire: Locataire = new Locataire();
  Createdlocataire: Locataire = new Locataire();
  date = new Date().toLocaleDateString();
  locataireId: number;
  locatairenom: string;
  isValidFormSubmitted = false;
  cint: string;
  onSubmit1(form: NgForm) {
    this.locataire.creatorName = this.UserNameConnected;
    this.locataire.idUserCreator = this.UserIdConnected;
    this.locataire.dateenreg = this.date;

    if (form.invalid) {
      this.isValidFormSubmitted = false;

    } else {
    
      if (this.cinexist) {
          this.isValidFormSubmitted = true
          this.locataireService.Add(this.locataire).subscribe(
            res => {

              this.locataireId = res.id;
              this.locatairenom = res.nom;
              this.cint = res.cin
              this.toastr.success("تمت الإضافة بنجاح", "نجاح");

              this.locataireService.Get().subscribe(res => {
                this.locataireList = res
                this.Locataire = this.locataireList.filter(item => item.cin == this.cint);

                this.locexists = true;
              })
              // Create file
              this.pj.idlocataire = this.locataireId;
              this.pj.nomLocataire = this.locatairenom;
              this.pj.date = this.date;
              this.pj.type = "cin"
              let path = this.rootUrl.getPath();
              this.fileslist.forEach(item => {
                this.pj.path = item;
                this.http.post(path + '/piecesjointesLocataires', this.pj)
                  .subscribe(res => {
                    this.serviceupload.refreshListL();
                    this.GetFileName();
                  });
              })
              form.resetForm();
            },
            err => {
              console.log(err);
              this.toastr.warning('لم تتم الإضافة', ' فشل');
            }
          )
        } else {
          
            this.toastr.warning('لم تتم الإضافة رقم الهوية موجود', ' فشل');
      
        }
    
    }
  }


  //Files


  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: PiecesJointesLocataire = new PiecesJointesLocataire();
  public pjs: PiecesJointesLocataire[];
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


  //DeleteFile

  onDelete(Id) {
    if (confirm('هل أنت متأكد من حذف هذا الملف ?')) {
      this.serviceupload.deletePjL(Id)
        .subscribe(res => {
          this.serviceupload.refreshListL();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }

  //impression
  path: string;
  public openPDF() {

    var data = document.getElementById('htmlData');
    data.style.display = "block";
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      data.style.display = "none"
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "Renting" + this.location.numcontrat + ".pdf"
      pdf.save(this.path); // Generated PDF

    });

  }
}
