import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { EvenementService } from '../../shared/Services/Evenements/evenement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from '../../shared/Models/Evenements/evenement.model';
import { MediaService } from '../../shared/Services/Evenements/media.service';
import { ParticipantService } from '../../shared/Services/Evenements/participant.service';
import { DepenseService } from '../../shared/Services/Evenements/depense.service';
import { Participant } from '../../shared/Models/Evenements/participant.model';
import { Media } from '../../shared/Models/Evenements/media.model';
import { Depenses } from '../../shared/Models/Evenements/depenses.model';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { UsersListComponent } from '../../User/users-list/users-list.component';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';

import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { PiecesJointesEv } from '../../shared/Models/Evenements/pieces-jointes-ev.model';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';

@Component({
  selector: 'app-medias-c',
  templateUrl: './medias-c.component.html',
  styleUrls: ['./medias-c.component.css']
})
export class MediasCComponent implements OnInit {
  private routeSub: Subscription;

  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  constructor(private route: ActivatedRoute,
    private UserService: UserServiceService,
    private router: Router,
    private mediaService: MediaService,
    private participationService: ParticipantService,
    private depenseService: DepenseService,
    private eventService: EvenementService,
    private tbLService: TbListeningService,
    public serviceupload: UploadDownloadService,  
    public participantService: ParticipantService,
    private toastr: ToastrService,
    private http: HttpClient, 
    private rootUrl: PathSharedService) { this.downloadStatus = new EventEmitter<ProgressStatus>();  }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();
    this.getDepenseList();
    this.getPartList();
    this.getMediaList();
    this.participantList();
    this.depensesList();
    this.getDataTbL();
    this.getAllPj();
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

  //get the id in Url

  eventId: number;
  ev: Evenement = new Evenement();
  edit: boolean = false;
  depl: Depenses[] = [];
  deplF: Depenses[] = [];
  parl: Participant[] = [];
  parlF: Participant[] = [];
  medial: Media[] = [];
  medialF: Media[] = [];
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.eventId = params['id']

      this.eventService.GetById(this.eventId).subscribe(res => {
        this.ev = res

        this.depenseService.List().subscribe(res => {
          this.depl = res
          this.deplF = this.depl.filter(item => item.idEvent == this.ev.id)
        })

        this.participantService.List().subscribe(res => {
          this.parl = res
          this.parlF = this.parl.filter(item => item.idEvent == this.ev.id)
        })

        this.mediaService.GetM().subscribe(res => {
          this.medial = res
          this.medialF = this.medial.filter(item => item.idEvent == this.ev.id)
        })

      })
    });


  }


  // Participant Service

  ParListF: Participant[] = []
  ParList: Participant[] = []

  getPartList() {
    this.participationService.List().subscribe(res => {
      this.ParList = res
      this.ParListF = this.ParList.filter(item => item.idEvent == this.eventId)
    })

  }

  // Media List

  MediaListF: Media[] = [];
  MediaList: Media[] = [];
  mediafb: string;
  mediay: string;
  mediainsta: string;
  mediatwit: string;

  getMediaList() {
    this.mediaService.GetM().subscribe(res => {
      this.MediaList = res

      this.MediaListF = this.MediaList.filter(item => item.idEvent == this.eventId)

      this.MediaListF.forEach(item => {

        if (item.nom == 'الانستقرام') {
          this.mediainsta = item.path

        }

        if (item.nom == 'الفيسبوك') {
          this.mediafb = item.path

        }

        if (item.nom == 'اليوتيوب') {
          this.mediay = item.path

        }

        if (item.nom == 'تويتر') {

          this.mediatwit = item.path

        }
      })
    })

  }

  //Depense Service

  DepListF: Depenses[] = [];
  DepList: Depenses[] = [];

  getDepenseList() {
    this.depenseService.List().subscribe(res => {
      this.DepList = res

      this.DepListF = this.DepList.filter(item => item.idEvent == this.eventId)
    })
  }

  // Les Tables de listening

  beneficiaireList: TbListening[] = [];
  tacheEvList: TbListening[] = [];
  outilsList: TbListening[] = [];
  mediaList: TbListening[] = [];
  classList: TbListening[] = [];
  activityList: TbListening[] = [];

  getDataTbL() {
    this.tbLService.GetA().subscribe(res => {
      this.activityList = res
    });

    this.tbLService.GetB().subscribe(res => {
      this.beneficiaireList = res
    });

    this.tbLService.GetC().subscribe(res => {
      this.classList = res
    });

    this.tbLService.GetM().subscribe(res => {
      this.mediaList = res
    });

    this.tbLService.GetO().subscribe(res => {
      this.outilsList = res
    });

    this.tbLService.GetT().subscribe(res => {
      this.tacheEvList = res
    });


  }

  parttList: Participant[] = [];
  participantList() {
    this.participantService.List().subscribe(res => {
      this.parttList = res
    })
  }

  depensesLis: Depenses[] = [];
  depensesList() {
    this.depenseService.List().subscribe(res => {
      this.depensesLis = res
    })
  }


  par: Participant = new Participant();
  parlis: Participant[] = [];
  partest: boolean = false;
  i = 0;
  addpart() {
    this.partest = true
    this.parlis[this.i] = this.par
    this.par = new Participant();
    this.i = this.i + 1

  }


  dep: Depenses = new Depenses();
  deplis: Depenses[] = [];
  deptest: boolean = false;
  j = 0;
  depadd() {
    this.deptest = true;
    this.deplis[this.j] = this.dep
    this.dep = new Depenses();
    this.j = this.j + 1
    console.log(this.deplis)
  }

  media: Media = new Media();
  medialis: Media[] = [];
  mediatest: boolean = false;
  k = 0;
  mediaadd() {
    this.mediatest = true;
    this.medialis[this.k] = this.media
    this.media = new Media();
    this.k = this.k + 1
    console.log(this.medialis)
  }

  //Edit
  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();
 
  onSubmit(form: NgForm) {

    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    } else {
      this.isValidFormSubmitted = true;

      this.eventService.PutObservableTr(this.ev).subscribe(
        res => {
          this.toastr.success("تم التسجيل بنجاح", "نجاح")
          form.resetForm();
          this.deptest = false;
          this.partest = false;
          this.mediatest = false;
          this.deplF.length = 0;
          this.parlF.length = 0;
          this.medialF.length = 0;
        },
        err => {
          this.toastr.error("فشل في التسجيل", "فشل")
        }
      )
    }
  }

  //Files
  listPj: PiecesJointesEv[] = [];
  listPjFiltred: PiecesJointesEv[] = [];
  vid: boolean;
  voc: boolean;
  img: boolean;
  getAllPj() {
    this.serviceupload.SearchEv().subscribe(res => {
      this.listPj = res
      this.listPjFiltred = this.listPj.filter(item => item.idEvent == this.ev.id)
      this.listPjFiltred.forEach(item => {
        if (item.type == "voc") {
          this.voc = true;
        }
        if (item.type == "img") {
          this.img = true;
        }
        if (item.type == "vid") {
          this.vid = true;
        }
      })
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


  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
