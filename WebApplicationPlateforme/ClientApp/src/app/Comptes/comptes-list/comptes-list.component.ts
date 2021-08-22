import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EtatCompteService } from '../../shared/Services/Comptes/etat-compte.service';
import { EtatCompte } from '../../shared/Models/Comptes/etat-compte.model';
import { ToastrService } from 'ngx-toastr';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { FilesEtatCompteService } from '../../shared/Services/Comptes/files-etat-compte.service';
import { FilesEtatCompte } from '../../shared/Models/Comptes/files-etat-compte.model';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-comptes-list',
  templateUrl: './comptes-list.component.html',
  styleUrls: ['./comptes-list.component.css']
})
export class ComptesListComponent implements OnInit {
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  constructor(private CompteService: EtatCompteService,
    private toastr: ToastrService,
    private serviceupload: UploadDownloadService,
    private filesService: FilesEtatCompteService,
    private UserService: UserServiceService,) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {

    this.getComteList();
    this.getFiles();
    this.getUserConnected();

  }
  UserIdConnected: string;
  UserNameConnected: string;
  roleslist: any = [];
  testrole: boolean = false;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;
        this.roleslist.forEach(item => {
          if (item == "ADMINISTRATEUR" || item == "SECRETAIRE") {
            this.testrole = true;
          } else this.testrole = false;
        })
        console.log(this.testrole)
      })
    })

  }
  p: Number = 1;
  count: Number = 5;
  //getFilesList()
  filelist: FilesEtatCompte[] = []
  fileslistF: FilesEtatCompte[] = []

  cptLis: EtatCompte[] = [];
  getComteList() {
    this.CompteService.Get().subscribe(res => {
      this.cptLis = res
    })
  }


  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.CompteService.Delete(Id)
        .subscribe(res => {
          this.getComteList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }

  details: EtatCompte = new EtatCompte();
  populateForm(edittache: EtatCompte) {
    this.CompteService.formData = Object.assign({}, edittache)
    this.details = Object.assign({}, edittache);
    this.filesService.Get().subscribe(res => {
      this.fileslistF = res
      this.filelist = this.fileslistF.filter(item => item.idCompte == this.details.id)


    })
  }


  downloadVoc() {
    this.filelist.forEach(item => {
      this.download(item.path)
    })
  }


  //get List of Files
  public files: string[];
  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data

      }
    );

  }

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

}
