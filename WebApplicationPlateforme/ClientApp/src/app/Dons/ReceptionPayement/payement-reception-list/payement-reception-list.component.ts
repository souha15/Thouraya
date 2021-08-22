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
  selector: 'app-payement-reception-list',
  templateUrl: './payement-reception-list.component.html',
  styleUrls: ['./payement-reception-list.component.css']
})
export class PayementReceptionListComponent implements OnInit {


  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private prService: PayementReceptionService,
    private factureService: PayementReceptionService,
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
    this.getFactures();
    this.resetForm();
    this.getFiles();
  }


  //Get TblListing Project

  pd: TbListening[] = [];
  getTbl() {
    this.tblService.GetProjetDons().subscribe(res => {
      this.pd = res
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
 
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })
  }

  //Test for Type Dons

  typedons: string = "تحويل بنكي";




  factId: number
  fact: PayementReception = new PayementReception();
  pathurl: string;
  b: boolean = false;
  c: boolean=false;
  m: boolean = false;
  e: boolean = false;
  populateForm(facture: PayementReception) {
    this.factureService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    this.pathurl = "/uploads/" + this.fact.attribut2

    if (this.fact.typeDons == "تحويل بنكي") {
      this.typedons = "تحويل بنكي"
      this.b=true
    } else if (this.fact.typeDons =="شيك") {
      this.typedons = "شيك"
      this.c = true
    } else if (this.fact.typeDons =="جهاز سحب") {
      this.typedons = "جهاز سحب"
      this.m =true
    } else{
      this.typedons = "نقدي"
      this.e=true
    }
  }



  // Update

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

  factList: PayementReception[] = [];
  getFactures() {
    this.factureService.Get().subscribe(res => {
      this.factList = res
    })
  }

  updateRecord(form: NgForm) {

    this.factureService.formData.attribut5 = this.date;
    this.factureService.formData.attribut3 = this.UserIdConnected;
    this.factureService.formData.attribut4 = this.UserNameConnected;

    this.fileslist.forEach(item => {
      this.factureService.formData.attribut2 = item;
    })
    this.factureService.Edit().subscribe(res => {


      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.serviceupload.refreshListf();
      this.resetForm();
      this.getFactures();
      this.files1 = [];
    },
      err => {
        this.toastr.error(' لم يتم التحديث  ', ' فشل');
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
      this.path = "PayementReception" + this.fact.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    });

  }


  //ResetForm
  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.factureService.formData = {
      id: null,
      idDonneur: null,
      typeDons: '',
      projet: '',
      doneurNom: '',
      prixDons: '',
      delegueNom: '',
      prixDonsEcriture: '',
      dateDons: '',
      req: '',
      tel: '',
      cin: '',
      numOperation: '',
      dateTransfert: '',
      banqueEmis: '',
      banqueRecep: '',
      numOpBanque: '',
      photoBanque: '',
      dateCheque: '',
      numCheque: '',
      nomBanqueCheque: '',
      propCheque: '',
      photoCheque: '',
      dateOperation: '',
      numMachine: '',
      photoDab: '',
      operationDab: '',
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


  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.factureService.Delete(Id)
        .subscribe(res => {
          this.getFactures();
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

