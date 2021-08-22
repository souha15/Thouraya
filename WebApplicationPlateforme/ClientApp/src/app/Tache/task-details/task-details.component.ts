import { Component, OnInit, NgZone, Input, EventEmitter, ElementRef, ViewChild, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tache } from '../../shared/Models/Taches/tache.model';
import { TacheService } from '../../shared/Services/Taches/tache.service';
import { Chart } from 'node_modules/chart.js'
import { Message } from '../../shared/Models/Comments/message.model';
import { Commentaire } from '../../shared/Models/Taches/commentaire.model';
import { CommentaireService } from '../../shared/Services/Taches/commentaire.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { TacheProcessService } from '../../shared/Services/Taches/tache-process.service';
import { TacheProcess } from '../../shared/Models/Taches/tache-process.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { ToastrService } from 'ngx-toastr';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { TacheNotifService } from '../../shared/Services/Taches/tache-notif.service';
import { PiecesJointes } from '../../shared/Models/Taches/pieces-jointes.model';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

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
    private commentsService: CommentaireService,
    private procService: TacheProcessService,
  ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();
    this.getFilesTask();
    this.ListOfComments();
  }

  ev: Tache = new Tache();
  Id: number;
  retarde: string;
  redorgreen: boolean = false;
  daysleft: string;
  daysleftn: number;
  dayslefttest: boolean = false;
  tp: TacheProcess[] = [];
  tp1: TacheProcess[] = [];
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']
      this.procService.ListTache().subscribe(res => {
        this.tp = res
        this.tp1 = this.tp.filter(item => item.idtache == this.Id)
      })
    
      this.tacheService.GetById(this.Id).subscribe(res => {
        this.ev = res

        let date = new Date(this.ev.date)
        let curentdate = new Date();

        // add delai to task date
        let dayleft = date.setDate(date.getDate() + +this.ev.delai);
        let daysleft = new Date(dayleft)

        console.log("daylef" + daysleft)
        // get the diffrence between current date and daylsleft
        var diff = Math.abs(curentdate.getTime() - daysleft.getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

        if (this.calculateDiff(this.ev.date) > +this.ev.delai) {
          this.retarde = "متاخرة"
          this.redorgreen = true;
        } else {
          this.retarde = this.ev.etat;
          this.redorgreen = false;

          if (diffDays >= 0) {
            if (diffDays == 1) {
              this.daysleft = "يوم"
            } else if (diffDays == 2) {
              this.daysleft = "يومان"
            } else if (diffDays == 0) {
              this.daysleft = "0"
            } else {
              this.daysleft = diffDays + "أيام"
            }


            if (+this.ev.delai > diffDays) {
              this.daysleftn = diffDays * 100 / +this.ev.delai
            } else {
              this.daysleftn = +this.ev.delai * 100 / diffDays
            }


            this.dayslefttest = true;
          }


        }
      })
    });

  }

  txtMessage: string = '';
  messages = new Array<Commentaire>();
  message: Commentaire = new Commentaire();
  listmessage: Commentaire[] = [];
  testcomment: boolean = false;
  //list of comments
  ListOfComments() {
    this.commentsService.CommentsList().subscribe(res => {
      this.listmessage = res;

      this.messages = this.listmessage.filter(item =>
        item.idTache == this.ev.id
      );

      this.messages.reverse();

      if (this.messages.length != 0) {
        this.testcomment = true;
      } else
        this.testcomment = false;

    })


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
  getFilesTask() {
    this.serviceupload.getall().subscribe(res => {
      this.FilesG = res
      this.FilesImg = this.FilesG.filter(item => item.idTache == this.Id)
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



}
