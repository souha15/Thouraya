import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { ServiceVenteervice } from '../../shared/Services/ServiceVente/service-vente.service';
import { TypeTypeServiceVenteservice } from '../../shared/Services/ServiceVente/type-service-vente.service';
import { OffreVenteService } from '../../shared/Services/ServiceVente/offre-vente.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { PathSharedService } from '../../shared/path-shared.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ServiceVente } from '../../shared/Models/ServiceVente/service-vente.model';
import { NgForm } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { OffreVente } from '../../shared/Models/ServiceVente/offre-vente.model';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
@Component({
  selector: 'app-service-vente-list-dot',
  templateUrl: './service-vente-list-dot.component.html',
  styleUrls: ['./service-vente-list-dot.component.css']
})
export class ServiceVenteListDotComponent implements OnInit {
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @Input() public fileName: string;
  constructor(private demService: ServiceVenteervice,
    private typeService: TypeTypeServiceVenteservice,
    private offreService: OffreVenteService,
    private toastr: ToastrService,
    private rootUrl: PathSharedService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
  ) {
  this.uploadStatuss = new EventEmitter<ProgressStatus>();
  this.downloadStatus = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getList();
    this.getUserConnected();
    this.getFiles();
    this.getTypeService();
  }
  p: Number = 1;
  count: Number = 5;

  demList1: ServiceVente[] = [];
  demList: ServiceVente[] = [];
  getList() {
    this.demService.Get().subscribe(res => {
      this.demList = res
     //this.demList = this.demList1.filter(item => item.etatdot !='done')
    })
}

  populateForm(dem: ServiceVente) {
    this.demService.formData = Object.assign({}, dem)
    this.dem = Object.assign({}, dem);
    this.offreService.Get().subscribe(res => {
      this.lf = res
      this.lf1 = this.lf.filter(item => item.type == "التسعيرة الأولى" && item.idVente == this.dem.id)
      this.lf2 = this.lf.filter(item => item.type == "التسعيرة الثانية" && item.idVente == this.dem.id)
      this.lf3 = this.lf.filter(item => item.type == "التسعيرة الثالثة" && item.idVente == this.dem.id)
    })

  }

  //Get Type Data

  typeList: TbListening[] = [];
  getTypeService() {
    this.typeService.Get().subscribe(res => {
      this.typeList = res;
    });
  }
  // Get User Connected

  adminId: number;
  admin: string;
  userName: string;
  userId: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.userId = res.id;
      this.userName = res.fullName;
      if (res.idAdministration != null) {
        this.adminId = res.idAdministration
        this.admin = res.nomAdministration
      }


    })

  }

  dem: ServiceVente = new ServiceVente();
  isValidFormSubmitted = false;
  path: string;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {
      this.isValidFormSubmitted = true
      this.dem.etatdot = "done"
      //this.dem.etatdot = "في الإنتظار"
      this.dem.datedot = this.date
      this.dem.iddot = this.userId;
      this.dem.nomdot = this.userName;
      this.toastr.success("تمت الإضافة بنجاح", "نجاح");
      this.demService.PutObservableE(this.dem).subscribe(res => {
        
        this.fileslist1.forEach(item => {
          this.pj.path = item;

          this.pj.idVente = this.dem.id;
          this.pj.type = "التسعيرة الأولى"
          this.offreService.Add(this.pj)
            .subscribe(res => {
            });
        })
       
        
          this.fileslist2.forEach(item => {
            this.pj.path = item;

            this.pj.idVente = this.dem.id;
            this.pj.type = "التسعيرة الثانية"
            this.offreService.Add(this.pj)
              .subscribe(res => {
              });
          })
      
      
          this.fileslist3.forEach(item => {
            this.pj.path = item;
            this.pj.idVente = this.dem.id;
            this.pj.type = "التسعيرة الثالثة"
            this.offreService.Add(this.pj)
              .subscribe(res => {
              });
          })
     

        this.getList();
        this.files1 = [];
        this.files2 = [];
        this.files3 = [];
        form.resetForm();

      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل");
        })
    }
  }
  //GetFiles
  lf1: OffreVente[] = [];
  lf2: OffreVente[] = [];
  lf3: OffreVente[] = [];
  lf: OffreVente[] = [];

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



  onSelect1(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove1(event) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  onSelect2(event) {
    //console.log(event);
    this.files2.push(...event.addedFiles);
  }

  onRemove2(event) {
    console.log(event);
    this.files2.splice(this.files2.indexOf(event), 1);
  }

  onSelect3(event) {
    //console.log(event);
    this.files3.push(...event.addedFiles);
  }

  onRemove3(event) {
    console.log(event);
    this.files3.splice(this.files3.indexOf(event), 1);
  }

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
  files1: File[] = [];
  files2: File[] = [];
  files3: File[] = [];
  url: any;
  file: any;
  fileslist1: string[] = [];
  fileslist2: string[] = [];
  fileslist3: string[] = [];
  public pj: OffreVente = new OffreVente();
  public upload1(event) {
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
      this.fileslist1.push(this.file.name);
      console.log(this.fileslist1)
    }
  }

  public upload2(event) {
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
  
      this.fileslist2.push(this.file.name);
      console.log(this.fileslist2)

    }
  }

  public upload3(event) {

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
      this.fileslist3.push(this.file.name);

    }
  }
}
