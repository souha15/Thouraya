import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Doneur } from '../../../shared/Models/Dons/doneur.model';
import { NgForm } from '@angular/forms';
import { PayementReception } from '../../../shared/Models/Dons/payement-reception.model';
import { PayementReceptionService } from '../../../shared/Services/Dons/payement-reception.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { DoneurService } from '../../../shared/Services/Dons/doneur.service';
import { PathSharedService } from '../../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { RecueDonsService } from '../../../shared/Services/Dons/recue-dons.service';
import { RecueDons } from '../../../shared/Models/Dons/recue-dons.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-payement-reception-add',
  templateUrl: './payement-reception-add.component.html',
  styleUrls: ['./payement-reception-add.component.css']
})
export class PayementReceptionAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private prService: PayementReceptionService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private tblService: TbListeningService,
    private doneurService: DoneurService,
    private donsService: RecueDonsService,
    private rootUrl: PathSharedService,
    private http: HttpClient,
    public serviceupload: UploadDownloadService, ) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getTbl();
    this.getUserConnected();
    this.usersListGet();
    this.getDonLis();
    this.getFiles();

  }


  //Get TblListing Project

  pd: TbListening[] = [];
  getTbl() {
    this.tblService.GetProjetDons().subscribe(res => {
      this.pd=res
    })
  }

  //Get Users List

  usersList: UserDetail[] = [];
  usersListGet() {
    this.UserService.GetUsersList().subscribe(res => {
      this.usersList = res;
    })
  }


  // Doneur List

  del: Doneur[] = [];
  Fdel: Doneur[] = [];
  getDonLis() {
    this.doneurService.Get().subscribe(res => {
      this.Fdel = res
      this.del = this.Fdel.filter(item => item.type == "par")
    })
  }

  //Get User Conencted

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.pr.idUserCreator = res.id;
      this.pr.userNameCreator = res.fullName;
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })
  }


  //Test for Type Dons

  typedons: string ="تحويل بنكي";

  testdons(event) {
    if (event.target.value == "1") {
      this.typedons = "تحويل بنكي"
    } else if (event.target.value == "2") {
      this.typedons ="شيك"
    } else if (event.target.value == "3") {
      this.typedons = "جهاز سحب"
    } else {
      this.typedons = "نقدي"
    }
    console.log(this.typedons)
  }

  //Test num Operation

  op: string;
  rdList: RecueDons[] = [];
  FrdList: RecueDons[] = [];
  prList: PayementReception[] = [];
  FprList: PayementReception[] = [];
  test: boolean = true;
  testnumOp(event) {
    this.op = event.target.value;
    this.donsService.Get().subscribe(res => {
      this.rdList = res
      this.FrdList = this.rdList.filter(item => item.numOperation == this.op)
      console.log(this.FrdList)
      if (this.FrdList.length > 0) {
        this.test = false
        console.log(this.test)
      } else
        this.test = true
    })

    this.prService.Get().subscribe(res => {
      this.prList = res
      this.FprList = this.prList.filter(item => item.numOperation == this.op)
      if (this.FprList.length > 0) {
        console.log(this.test)
        this.test = false;
      }
    })


  }



  // Create Payement Reception

  pr: PayementReception = new PayementReception();
  prC: PayementReception = new PayementReception();
 
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {
      if (this.test == true) {
        this.isValidFormSubmitted = true
        this.fileslist.forEach(item => {
          this.pr.attribut2 = item;
        })

        this.pr.dateenreg = this.date;
        this.pr.typeDons = this.typedons;
      this.prService.Add(this.pr).subscribe(res => {
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.files1 = [];
        form.resetForm();
        this.prC = res
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
      } else {
        this.toastr.error("رقم العملية موجود من قبل", "فشل في التسجيل")
      }
    }

  }

  //Create Doneur Organisme

  or: Doneur = new Doneur();

  onSubmitOr(form: NgForm) {

    this.or.dateenreg = this.date;
    this.or.idUserCreator = this.UserIdConnected;
    this.or.userNameCreator = this.UserNameConnected;
    this.or.type = "or";
    this.doneurService.Add(this.or).subscribe(res => {
  
      this.toastr.success("تمت الإضافة بنجاح", "نجاح");
      form.resetForm();
    },
      err => {
        this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
      }
    )
  }


  //Get Nom Doneur
  doneur: number;
  donNom(event) {
    this.doneur = event.target.value;
    this.doneurService.GetById(+this.doneur).subscribe(res => {
      this.pr.doneurNom = res.nom + " " + res.prenom
    })
  }

  //Create Donneur Particulier

  par: Doneur = new Doneur();

  onSubmitPar(form: NgForm) {

    this.par.dateenreg = this.date;
    this.par.idUserCreator = this.UserIdConnected;
    this.par.userNameCreator = this.UserNameConnected;
    this.par.type = "par";
    this.doneurService.Add(this.par).subscribe(res => {
      this.toastr.success("تمت الإضافة بنجاح", "نجاح");

      this.getDonLis();
      form.resetForm();
    },
      err => {
        this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
      }
    )
  }


  //Files

  files1: File[] = [];
  onSelect(event) {
    this.files1.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files1.splice(this.files1.indexOf(event), 1);
  }

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


  //Save it ToDatabase

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


  //Prit Pdf
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
      this.path = "PayementReception" + this.prC.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    });

  }
}
