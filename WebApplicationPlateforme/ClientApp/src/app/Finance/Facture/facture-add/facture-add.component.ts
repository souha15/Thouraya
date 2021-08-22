import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { FactureService } from '../../../shared/Services/Finance/facture.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Facture } from '../../../shared/Models/Finance/facture.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { PiecesJointesFacture } from '../../../shared/Models/Finance/pieces-jointes-facture.model';
import { PathSharedService } from '../../../shared/path-shared.service';
import { BrancheOneService } from '../../../shared/Services/Finance/branche-one.service';
import { BrancheTwoService } from '../../../shared/Services/Finance/branche-two.service';
import { BrancheOne } from '../../../shared/Models/Finance/branche-one.model';
import { BrancheTwo } from '../../../shared/Models/Finance/branche-two.model';

@Component({
  selector: 'app-facture-add',
  templateUrl: './facture-add.component.html',
  styleUrls: ['./facture-add.component.css']
})
export class FactureAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private UserService: UserServiceService,
    private tblService: TbListeningService,
    private factureService: FactureService,
    private boneService: BrancheOneService,
    private btwoService: BrancheTwoService,
    public serviceupload: UploadDownloadService,
    private toastr: ToastrService,
    private rootUrl: PathSharedService,
    private http: HttpClient,
  ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.gettbl();
    this.getUserConnected();
    this.getFiles();
  }

  FtypeFacture: TbListening[] = [];
  typeFacture: TbListening[] = [];
  brancheOne: BrancheOne[] = [];
  FbrancheOne: BrancheOne[] = [];
  FbrancheTwo: BrancheTwo[] = [];
  brancheTwo: BrancheTwo[] = [];

  bO: number;
  TestBO(event) {
    this.bO = event.target.value;
    this.boneService.GetByIdBo(+this.bO).subscribe(res => {
      this.facture.brancheone = res.nom
    })

    this.btwoService.GetBt().subscribe(res => {
      this.FbrancheTwo = res
      this.brancheTwo = this.FbrancheTwo.filter(item => item.idBOne == +this.bO)
 
    })
  }

  typeF: number;
  typeTest(event) {
    this.typeF = event.target.value;
    this.tblService.GetByIdTfacture(+this.typeF).subscribe(res => {
      this.facture.categorie = res.nom      
    })
 
    this.boneService.GetBo().subscribe(res => {
      this.FbrancheOne = res
      this.brancheOne = this.FbrancheOne.filter(item => item.idTF == +this.typeF)
    })

  }


  gettbl() {
    this.tblService.GetTfacture().subscribe(res => {
      this.typeFacture = res;
    })

  }

  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.facture.idUserCreator = res.id;
      this.facture.usernamecreator = res.fullName;
      this.facture.userNameCreator = res.fullName;

      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }

  facture: Facture = new Facture();
  idf: number;
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    this.facture.attribut2 ="غير معتمدة"
    this.facture.dateenreg = this.date;
    this.facture.etat = "غير معتمدة";
    this.facture.etatPayemeent = "لم يتم الصرف";
    this.facture.etatdirector = "غير جاهزة للصرف";
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.factureService.Add(this.facture).subscribe(
        
        res => {
          this.idf=res.id

          this.pj.idUserCreator = this.facture.idUserCreator;
          this.pj.date = this.date;
          this.pj.creatorName = this.facture.userNameCreator
          this.pj.idCF = this.idf
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
          this.files1 = [];
          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
          form.resetForm();
        },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
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
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

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
}
