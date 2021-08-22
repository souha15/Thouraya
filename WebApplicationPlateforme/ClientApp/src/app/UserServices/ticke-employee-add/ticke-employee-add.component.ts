import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { DemandeTicketService } from '../../shared/Services/Rh/demande-ticket.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { DemandeTicket } from '../../shared/Models/RH/demande-ticket.model';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-ticke-employee-add',
  templateUrl: './ticke-employee-add.component.html',
  styleUrls: ['./ticke-employee-add.component.css']
})
export class TickeEmployeeAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private congeService: DemandeTicketService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    public serviceupload: UploadDownloadService, ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getUserConnected();
    this.getFiles();
  }

  conge: DemandeTicket = new DemandeTicket();

  date = new Date().toLocaleDateString();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.conge.dirnom = res.directeur;
      this.conge.dirid = res.attribut1;
      this.conge.userNameCreator = res.fullName;
      this.conge.idUserCreator = res.id;
      this.conge.nom = res.fullName;
      this.conge.num = res.num;
      this.conge.place = res.classement;
      this.conge.regcivil = res.registreCivil;
      this.conge.titre = res.position;

    })

  }

  onSubmit() {
    this.conge.dateenreg = this.date;
    this.conge.etat = "في الانتظار";
    this.conge.photosPath = this.path;
    this.fileslist.forEach(item => {
      this.path = item;
      if (this.path != null) {
        this.pathurl = "/uploads/" + this.path;
        this.photoexit = true
      } else {
        this.photoexit = false;
      }

      this.congeService.Add(this.conge).subscribe(res => {
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        }
      )
    })
  }


  photoexit: boolean = false;
  path: string;

  public files: string[];
  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
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

  pathurl: string;
}
