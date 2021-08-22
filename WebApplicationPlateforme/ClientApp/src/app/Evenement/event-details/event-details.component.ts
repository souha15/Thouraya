import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
import { OutilsEventService } from '../../shared/Services/Evenements/outils-event.service';
import { OutilsEvent } from '../../shared/Models/Evenements/outils-event.model';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { PiecesJointesEv } from '../../shared/Models/Evenements/pieces-jointes-ev.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { Chart } from 'node_modules/chart.js'
import { BeneficiaireEvent } from '../../shared/Models/Evenements/beneficiaire-event.model';
import { BeneficiareEventService } from '../../shared/Services/Evenements/beneficiare-event.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { letterSpacing } from 'html2canvas/dist/types/css/property-descriptors/letter-spacing';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment.prod';
import { EntrerDansIslamService } from '../../shared/Services/Evenements/entrer-dans-islam.service';
import { EntrerDansIslam } from '../../shared/Models/Evenements/entrer-dans-islam.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  private routeSub: Subscription;
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  displayUrl;
  constructor(private route: ActivatedRoute,
  
    private UserService: UserServiceService,
    private router: Router,
    private mediaService: MediaService,
    private outilService: OutilsEventService,
    private participationService: ParticipantService,
    private depenseService: DepenseService,
    private BeneficiareEventService: BeneficiareEventService,
    private eventService: EvenementService,
    private enterInIslam: EntrerDansIslamService,
    public serviceupload: UploadDownloadService,) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
 
  }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();
    this.getDepenseList();
    this.getPartList();
    this.getMediaList();
    this.getOutilsList();
    this.getFiles();
    this.openPath();
    this.getBen();
    this.getdep();
    this.getPr();
    this.getEntrerIslam();

  }


  replacing(text: string):string {

    return text.replace(" ", "  ");
  }
  // Get User Connected
  path2: string = 'xvM3h1pBncA';
  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      if (this.ev.idUserCreator == this.UserIdConnected) {
        this.edit = true;

      }
    })
  }

  //Entrer dans Islam
  entrerlis: EntrerDansIslam[] = [];
  entrerlis1: EntrerDansIslam[] = [];
  getEntrerIslam() {
    this.enterInIslam.List().subscribe(res => {
      this.entrerlis1 = res
      this.entrerlis = this.entrerlis1.filter(item => item.idEvent == this.eventId)
    })
  }

  FilesList: PiecesJointesEv[] = [];
  FilesVid: PiecesJointesEv[] = [];
  FilesVid1: PiecesJointesEv[] = [];
  FilesImg: PiecesJointesEv[] = [];
  FilesImg1: PiecesJointesEv[] = [];
  FilesVoc: PiecesJointesEv[] = [];
  FilesVoc1: PiecesJointesEv[] = [];
  id;
  getFiles() {
    this.serviceupload.SearchEv().subscribe(res => {
      this.FilesList = res
      this.FilesVid = this.FilesList.filter(item => item.idEvent == this.eventId && item.type == "vid");
      this.FilesVid.forEach(item => {
        this.pathvid = item.path

         this.id = this.pathvid.match(/(^|=|\/)([0-9A-Za-z_-]{11})(\/|&|$|\?|#)/)[2]


      })
      this.FilesImg = this.FilesList.filter(item => item.idEvent == this.eventId && item.type !="vid")
      this.FilesVoc = this.FilesList.filter(item => item.idEvent == this.eventId && item.type == "voc")
    })
  }

  downloadImg() {
    this.FilesImg.forEach(item => {
      this.download(item.path)
    })
  }

  downloadVoc() {
    this.FilesVoc.forEach(item => {
      this.download(item.path)
    })
  }

  openPath() {
    this.FilesVid.forEach(item => {
      this.pathvid = item.path
      console.log(this.pathvid)
    })
  }
  //get the id in Url

  eventId: number;
  ev: Evenement = new Evenement();
  edit: boolean=false;
  pathvid: string;
  bo: boolean = false;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.eventId = params['id']

      this.eventService.GetById(this.eventId).subscribe(res => {
        this.ev = res

        if (this.ev.localisation != null) {
          this.bo = true;
        } else
          this.bo = false

      })
    });



  }



/* if (this.ParListF.length != 0) {


   this.Par1 = this.ParListF[0];
   this.Par2 = this.ParListF[1];
   this.Par3 = this.ParListF[2];
 this.Par4 = this.ParListF[3];
 this.Par5 = this.ParListF[4];
 if (this.Par1 != null) {
   this.Part1 =true
 }

 if (this.Par2 != null) {
   this.Part2 = true
 }

 if (this.Par3 != null) {
   this.Part3 = true
 }

 if (this.Par4 != null) {
   this.Part4 = true
 }
 if (this.Par5 != null) {
   this.Part5 = true
 }
}*/
      //
  // Participant Service

  ParListF: Participant[]=[]
  ParList: Participant[] = []
  ParList1: Participant[] = []
  ParList2: Participant[] = []
  Par1: Participant = new Participant();
  Par2: Participant = new Participant();
  Par3: Participant = new Participant();
  Par4: Participant = new Participant();
  Par5: Participant = new Participant();
  Part1: boolean = false;
  Part2: boolean = false;
  Part3: boolean = false;
  Part4: boolean = false;
  Part5: boolean = false;

  t: number = 0;
  getPartList() {
    this.participationService.List().subscribe(res => {
      this.ParList = res
      this.ParListF = this.ParList.filter(item => item.idEvent == this.eventId)

      let nb = Math.floor(this.ParListF.length / 2)
      let nb2 = this.ParListF.length;

      for (let i = 0; i < nb; i++) {
        this.ParList1.push(this.ParListF[i]);
      }
      console.log(this.ParList1)

      for (let j = nb; j < nb2; j++) {

        this.ParList2.push(this.ParListF[j]);
        this.t = this.t + 1;
      }
      console.log(this.ParList2)
    })

  }

  otiList: OutilsEvent[] = [];
  otiList2: OutilsEvent[] = [];
  getOutilsList() {
    this.outilService.List().subscribe(res => {
      this.otiList2 = res
      this.otiList = this.otiList2.filter(item => item.idEvent == this.eventId)
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

  nb: number;
  prix: number;
  Labels: string[]=[];
  ChartData: number[]=[];
  chart = [];
  chartData = [];
  getDepenseList() {
    this.depenseService.List().subscribe(res => {
      this.DepList = res

      this.DepListF = this.DepList.filter(item => item.idEvent == this.eventId)
   
      this.DepListF.forEach(item => {
        this.nb = +item.nombre;
        this.prix = +item.prix;
        this.ChartData.push(this.prix * +item.nombre)
        this.Labels.push(item.type)
        console.log(this.chartData)
      });

      /*  if (this.DepListF.length == 1) {

        }

        if (this.DepListF.length == 2) {

        }

        if (this.DepListF.length == 3) {

        }

        if (this.DepListF.length == 4) {

        }

        if (this.DepListF.length == 5) {
          this.Labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
        }*/
        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: this.Labels,
            datasets: [
              {
                label: 'المصروفات',
                data: this.ChartData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        }); 

      })

  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
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




  // For impression


  benList: BeneficiaireEvent[] = [];
  benList2: BeneficiaireEvent[] = [];
  getBen() {
    this.BeneficiareEventService.List().subscribe(res => {
      this.benList2 = res
      this.benList = this.benList2.filter(item => item.idEvent == this.eventId)
    })
  }

  parlis2: Participant[] = [];
  parlis: Participant[] = [];
  getPr() {
    this.participationService.List().subscribe(res => {
      this.parlis = res
      this.parlis2 = this.parlis.filter(item => item.idEvent == this.eventId)
    })
   
    
  }

  deplis: Depenses[] = [];
  deplis2: Depenses[] = [];
  somme: number=0;
  getdep() {
    this.depenseService.List().subscribe(res => {
      this.deplis = res
      this.deplis2 = this.deplis.filter(item => item.idEvent == this.eventId)

      this.deplis2.forEach(item => {
        let a = +item.prix * +item.nombre
        this.somme = this.somme + +a
        console.log(this.somme)
      })
    })
  }



  //impression tr
  path: string;
  public print() {

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
      this.path = "Events" + this.ev.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    }

    );

  }
}
