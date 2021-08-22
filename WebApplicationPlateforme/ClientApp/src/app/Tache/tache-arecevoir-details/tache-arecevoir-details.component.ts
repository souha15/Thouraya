import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { TacheService } from '../../shared/Services/Taches/tache.service';
import { ToastrService } from 'ngx-toastr';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { Tache } from '../../shared/Models/Taches/tache.model';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { PiecesJointes } from '../../shared/Models/Taches/pieces-jointes.model';
import { TacheProcessService } from '../../shared/Services/Taches/tache-process.service';
import { TacheProcess } from '../../shared/Models/Taches/tache-process.model';
import { TacheNotifService } from '../../shared/Services/Taches/tache-notif.service';
import { TacheNotif } from '../../shared/Models/Taches/tache-notif.model';

@Component({
  selector: 'app-tache-arecevoir-details',
  templateUrl: './tache-arecevoir-details.component.html',
  styleUrls: ['./tache-arecevoir-details.component.css']
})
export class TacheARecevoirDetailsComponent implements OnInit {


  private routeSub: Subscription;
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  displayUrl;
  constructor(private UserService: UserServiceService,
    private tacheService: TacheService,
    private toastr: ToastrService,
    public serviceupload: UploadDownloadService,
    private route: ActivatedRoute,
    private procTacheService: TacheProcessService,
    private notiftaskService: TacheNotifService,
  ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();
    this.getFilesTask();
  }


  // Get Task

  ev: Tache = new Tache();
  Id: number;
  retarde: string;
  redorgreen: boolean = false;
  notiftask: TacheNotif = new TacheNotif();
  notiftaskList: TacheNotif[] = [];
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.tacheService.GetById(this.Id).subscribe(res => {
        this.ev = res
        if (this.calculateDiff(this.ev.date) > +this.ev.delai) {
          this.retarde = "متاخرة"
          this.redorgreen = true;
        } else {
          this.retarde = this.ev.etat;
          this.redorgreen = false;
        }

        this.notiftaskService.ListTache().subscribe(res => {
          this.notiftaskList = res;
          this.notiftaskList.forEach(item => {
            if (item.idTache == this.ev.id) {
              this.notiftask = item
         
            }
          })
        })
      })
    });



  }

  //Calculate difference Date
  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
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

  //get files
  FilesImg: PiecesJointes[] = [];
  FilesG: PiecesJointes[] = [];
  nbfi: boolean = false;
  getFilesTask() {
    this.serviceupload.getall().subscribe(res => {
      this.FilesG = res
      this.FilesImg = this.FilesG.filter(item => item.idTache == this.Id)
      if (this.FilesImg.length != 0) {
        this.nbfi = true;
      }
    })
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

  testyrec: boolean = true;
  tp: TacheProcess = new TacheProcess();
  date = new Date().toLocaleDateString();
  chageetat() {

    if (this.retarde == "في الإنتظار") {
      this.ev.etat = "تحت الإجراء"
      this.ev.affectedName = this.UserIdConnected;
      this.ev.Attribut1 = this.UserNameConnected;
      this.tacheService.PutObservableE(this.ev).subscribe(
        res => {
          this.toastr.success(' تم إستلام المهمة', 'إستلام المهمة')
          this.testyrec = false;
          this.tp.idtache = this.ev.id;
          this.tp.date = this.date;
          this.tp.affectationtype = this.ev.atous;
          this.tp.nomuseraff = this.UserNameConnected;
          this.tp.iduseraffected = this.UserIdConnected;
          this.tp.etataff = "تم الإستلام";
          this.getIdUrl();
          this.procTacheService.CreateTache(this.tp).subscribe(res => {

          })

          this.notiftask.nomCreator = "1";
          this.notiftaskService.PutObservableE(this.notiftask).subscribe(res => {

          }
          )
        },
        err => {
          this.toastr.warning("فشل في إستلام المهمة", 'إستلام المهمة')
        }
      )
    } else {
      this.toastr.warning("فشل في إستلام المهمة", 'إستلام المهمة')
    }
  }


}
