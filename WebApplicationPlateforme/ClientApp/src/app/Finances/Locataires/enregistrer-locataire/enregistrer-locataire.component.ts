import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LocataireService } from '../../../shared/Services/Dotations/locataire.service';
import { ToastrService } from 'ngx-toastr';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Locataire } from '../../../shared/Models/Dotations/locataire.model';
import { NgForm } from '@angular/forms';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../../shared/path-shared.service';
import { PiecesJointesLocataire } from '../../../shared/Models/Dotations/pieces-jointes-locataire.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
@Component({
  selector: 'app-enregistrer-locataire',
  templateUrl: './enregistrer-locataire.component.html',
  styleUrls: ['./enregistrer-locataire.component.css']
})
export class EnregistrerLocataireComponent implements OnInit {

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
    private toastr: ToastrService) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
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

  LocatList: Locataire[] = [];
  LocatListf: Locataire[] = [];
  cin: string;
  cinexist: boolean;
  testcin(event){
    this.cin = event.target.value;
    this.cin.toString();
    this.locataireService.Get().subscribe(res => {
      this.LocatList = res
      this.LocatListf = this.LocatList.filter(item => item.cin == this.cin)
      if (this.LocatListf.length == 0) {
        this.cinexist = true

      } else
      {
      this.cinexist = false
      }
    })
 
}

  //Create Locataire

  locataire: Locataire = new Locataire();
  locataireI: Locataire = new Locataire();
  Createdlocataire: Locataire = new Locataire();
  date = new Date().toLocaleDateString();

  locataireId: number;
  locatairenom: string;
  isValidFormSubmitted = false;
  onSubmit(form: NgForm) {
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

              this.locataireI.id = this.locataire.id
              this.locataireI.adresse = this.locataire.adresse
              this.locataireI.nom = this.locataire.nom
              this.locataire.tel = this.locataire.tel
              this.locataireI.cin = this.locataire.cin
              this.locataireI.nationnalite = this.locataire.nationnalite
              this.locataireI.profession = this.locataire.profession
              this.toastr.success("تمت الإضافة بنجاح", "نجاح");

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

  //Impression

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
      this.path = "Locataire" + this.locataire.nom + ".pdf"
      pdf.save(this.path); // Generated PDF

    });

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

  onDelete(dp, i) {
    this.fileslist.splice(this.fileslist.indexOf(dp), 1);
  }


}
