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
import { CommentaireService } from '../../shared/Services/Taches/commentaire.service';
import { Commentaire } from '../../shared/Models/Taches/commentaire.model';

@Component({
  selector: 'app-tache-global-details',
  templateUrl: './tache-global-details.component.html',
  styleUrls: ['./tache-global-details.component.css']
})
export class TacheGlobalDetailsComponent implements OnInit {


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
  ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();
    this.getFilesTask();
    this.ListOfComments();
  }


  // Get Task

  ev: Tache = new Tache();
  Id: number;
  retarde: string;
  redorgreen: boolean = false;
  daysleft: string;
  daysleftn: number;
  dayslefttest: boolean = false;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

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
        if (this.ev.etat == "غير منجزة" || this.ev.etat == "منجزة") {
          this.test = false;
        }

      })
    });
  }

  txtMessage: string = '';
  messages = new Array<Commentaire>();
  message: Commentaire = new Commentaire();
  listmessage: Commentaire[] = [];
  //list of comments
  ListOfComments() {
    this.commentsService.CommentsList().subscribe(res => {
      this.listmessage = res;
      console.log(this.listmessage)
      this.messages = this.listmessage.filter(item =>
        item.idTache == this.ev.id
      );
      this.messages.reverse();
      console.log(this.ev.id)
      console.log(typeof this.ev.id)
      console.log(this.messages)
    })


  }


  //Create Comment
  sendMessage(): void {
    if (this.txtMessage) {

      this.message.idTache = this.ev.id;
      this.message.textCommentaire = this.txtMessage;
      this.message.dateTime = new Date();
      this.message.idUser = this.UserIdConnected;
      this.message.nomUser = this.UserNameConnected;
      this.commentsService.CreateComment(this.message).subscribe(res => {

        //   this.messages.push(this.message);
        this.messages.splice(this.messages.length + 1, 0, this.message)
        this.txtMessage = '';
      })


      //this.chatService.sendMessage(this.message);

    }
  }
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


  chageetat() {

    if (this.ev.etat == "غير منجزة") {
      this.ev.etat = "تحت الإجراء"
      this.ev.affectedName = this.UserIdConnected;
      this.ev.Attribut1 = this.UserNameConnected;
      this.tacheService.PutObservableE(this.ev).subscribe(
        res => {
          this.toastr.success(' تم إستلام المهمة', 'إستلام المهمة')

        },
        err => {
          this.toastr.warning("فشل في إستلام المهمة", 'إستلام المهمة')
        }
      )
    } else {
      this.toastr.warning("فشل في إستلام المهمة", 'إستلام المهمة')
    }
  }

  eventdata: string;
  ret: boolean = false;
  dec: boolean = false;
  getetatdata(event) {
    this.eventdata = event.target.value;
    if (this.eventdata == "إعادة") {
      this.ret =true
    } else
      this.ret = false;

    if (this.eventdata == "رفض") {
      this.dec = true;
    } else this.dec = false;

  }

  tp: TacheProcess = new TacheProcess();
  date = new Date().toLocaleDateString();
  test: boolean = true;
  acceptorrefuse() {
    if (this.eventdata == 'قبول') {
      this.ev.etat = "منجزة";

  }else{
      this.ev.etat = "غير منجزة"
    }

    this.ev.creatorName = this.UserNameConnected;
    this.ev.idUserCreator = this.UserIdConnected;
    this.ev.Attribut1 = "مغلقة"
    this.tacheService.PutObservableE(this.ev).subscribe(
      res => {

        this.tp.idtache = this.ev.id;
        this.tp.date = this.date;
        this.tp.affectationtype = this.ev.atous;
        this.tp.nomusercreator = this.UserNameConnected;
        this.tp.idusercreator = this.UserIdConnected;
        this.tp.nomuseraff = this.ev.createur
        this.tp.iduseraffected = this.ev.affectedName
        this.tp.etataff = this.ev.etat
        this.tp.etatuserscreator ="مغلقة"
        this.getIdUrl();
        this.toastr.success(' تم غلق المهمة', 'غلق المهمة')
        this.test = false;
        this.procTacheService.CreateTache(this.tp).subscribe(res => {

        })

      },
      err => {
        this.toastr.warning("فشل في غلق المهمة", 'غلق المهمة')
      }
    )
  }

  retourdata: string;
  getretourdata(event) {
    this.retourdata = event.target.value;
  }

  retour() {
    this.ev.etat = "تحت الإجراء"
    this.ev.Attribut1 ="إعادة"
    this.ev.Attribut3 = this.retourdata;
    this.ev.creatorName = this.UserNameConnected;
    this.ev.idUserCreator = this.UserIdConnected;
    this.tacheService.PutObservableE(this.ev).subscribe(
      res => {

            this.tp.idtache = this.ev.id;
            this.tp.date = this.date;
            this.tp.affectationtype = this.ev.atous;
            this.tp.nomusercreator = this.UserNameConnected;
            this.tp.idusercreator = this.UserIdConnected;
            this.tp.nomuseraff = this.ev.createur
            this.tp.iduseraffected = this.ev.affectedName
            this.tp.etataff = this.ev.etat
        this.tp.etatuserscreator = "إعادة"
        this.tp.raison = this.retourdata
            this.getIdUrl();
            this.toastr.success(' تم إعادة المهمة', 'إعادة المهمة')
            this.test = false;
            this.procTacheService.CreateTache(this.tp).subscribe(res => {

            })

      },
      err => {
        this.toastr.warning("فشل في إعادة المهمة", 'إعادة المهمة')
      }
    )  
  }

  notfinisheddata: string;
  getnotfinished(event) {
    this.notfinisheddata = event.target.value;
  }
  notfinished() {
    this.ev.etat = "غير منجزة"
    this.ev.Attribut1 ="مغلقة"
    this.ev.Attribut3 = this.notfinisheddata;
    this.ev.creatorName = this.UserNameConnected;
      this.ev.idUserCreator = this.UserIdConnected;
    this.tacheService.PutObservableE(this.ev).subscribe(
      res => {

        this.tp.idtache = this.ev.id;
        this.tp.date = this.date;
        this.tp.affectationtype = this.ev.atous;
        this.tp.nomusercreator = this.UserNameConnected;
        this.tp.idusercreator = this.UserIdConnected;
        this.tp.nomuseraff = this.ev.createur
        this.tp.iduseraffected = this.ev.affectedName
        this.tp.etataff = this.ev.etat
        this.tp.etatuserscreator = "غير منجزة"
        this.tp.raison = this.notfinisheddata
        this.getIdUrl();
        this.test = false;
        this.toastr.success(' تم غلق المهمة', 'غلق المهمة')
        this.procTacheService.CreateTache(this.tp).subscribe(res => {

        })
      },
      err => {
        this.toastr.warning("فشل في غلق المهمة", 'غلق المهمة')
      }
    )  
  }
}
