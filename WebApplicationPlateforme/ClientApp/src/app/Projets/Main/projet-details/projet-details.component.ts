import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ListeningProjetService } from '../../../shared/Services/Projets/listening-projet.service';
import { ProjetService } from '../../../shared/Services/Projets/projet.service';
import { PayementProjetService } from '../../../shared/Services/Projets/payement-projet.service';
import { OrgSuppService } from '../../../shared/Services/Projets/org-supp.service';
import { Projet } from '../../../shared/Models/Projet/projet.model';
import { PayementProjet } from '../../../shared/Models/Projet/payement-projet.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { FilesProjet } from '../../../shared/Models/Projet/files-projet.model';
import { FilesProjetService } from '../../../shared/Services/Projets/files-projet.service';
import { RapportProjetService } from '../../../shared/Services/Projets/rapport-projet.service';
import { RapportProjet } from '../../../shared/Models/Projet/rapport-projet.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Chart } from 'node_modules/chart.js'
import { ButProjetService } from '../../../shared/Services/Projets/but-projet.service';
import { ButProjet } from '../../../shared/Models/Projet/but-projet.model';
@Component({
  selector: 'app-projet-details',
  templateUrl: './projet-details.component.html',
  styleUrls: ['./projet-details.component.css']
})
export class ProjetDetailsComponent implements OnInit {

  private routeSub: Subscription;
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(public serviceupload: UploadDownloadService,
    private route: ActivatedRoute,
    private UserService: UserServiceService,
    private router: Router,
    private listeningService: ListeningProjetService,
    private projetService: ProjetService,
    private payService: PayementProjetService,
    private orgSuppService: OrgSuppService,
    private filesProjetService: FilesProjetService,
    private rapportService: RapportProjetService,
    private butService: ButProjetService,
  ) { this.downloadStatus = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();
    //this.getPay();
    this.getBut();
    this.getFiles();
    this.getFiles2();
    this.getDepenseList();
  }


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
  ev: Projet = new Projet();
  edit: boolean = false;
  pathvid: string;
  bo: boolean = false;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.eventId = params['id']

      this.projetService.GetById(this.eventId).subscribe(res => {
        this.ev = res

      })
    });


  }
 
  payList: PayementProjet[] = [];
  payList2: PayementProjet[] = [];
  tot2: number = 0; 
  getPay() {
    this.payService.Get().subscribe(res => {
      this.payList2 = res
      this.payList = this.payList2.filter(item => item.idprojet == this.eventId)
      console.log(this.payList)
      this.payList.forEach(item2 => {
        this.tot2 = this.tot2 + item2.totprix;
        console.log(item2.totprix)
      })
      
    })
  }

  // But Get
  butList: ButProjet[] = [];
  butList2: ButProjet[] = [];
  but: string;
  som: number = 0;
  test: boolean = false;
  getBut() {
    this.butService.Get().subscribe(res => {
      this.butList = res
      this.butList2 = this.butList.filter(item => item.idprojet == this.eventId)
      this.payService.Get().subscribe(res => {
        this.payList2 = res
        this.butList2.forEach(item => {      
          this.som = +item.nbbut * +item.prix
          this.but = item.but
          
          this.payList = this.payList2.filter(item => item.idprojet == this.eventId)
          this.payList.forEach(item2 => {
            this.tot2 = this.tot2 + item2.totprix;
            console.log(item2.totprix)
          })
         /* if (this.payList.length != 0) {
            this.test = true;
          }
          console.log(this.payList)*/
   
         /* for (let i = 0; i < this.payList2.length; i++) {

            if (this.payList2[i].idprojet == this.eventId && this.payList2[i].but == this.but) {
              this.payList.push(this.payList2[i])
            }
          }*/

        })
      
      })
    })

  }


  nb: number;
  prix: number;
  Labels: string[] = [];
  ChartData: number[] = [];
  chart = [];
  chartData = [];
  DepListF: PayementProjet[] = [];
  DepList: PayementProjet[] = [];
  getDepenseList() {
    this.payService.Get().subscribe(res => {
      this.DepList = res

      this.DepListF = this.DepList.filter(item => item.idprojet == this.eventId)

      this.DepListF.forEach(item => {
        this.nb = +item.nb;
        this.prix = +item.prix;
        this.ChartData.push(this.prix)
        this.Labels.push(item.activite)
        console.log(this.chartData)
      });
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.Labels,
          datasets: [
            {
              label: 'النشاط',
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

  FilesList: FilesProjet[] = [];
  FilesList1: RapportProjet[] = [];
  Files1: FilesProjet[] = [];
  Files2: FilesProjet[] = [];
  Files3: FilesProjet[] = [];
  Files4: FilesProjet[] = [];
  Files5: FilesProjet[] = [];
  Files6: RapportProjet[] = [];
  Files7: RapportProjet[] = [];
  getFiles() {
    this.filesProjetService.Get().subscribe(res => {
      this.FilesList = res
      this.Files1 = this.FilesList.filter(item => item.idprojet == this.eventId && item.type == "دراسة المشروع");
      this.Files2 = this.FilesList.filter(item => item.idprojet == this.eventId && item.type == "الإتفاقية");
      this.Files3 = this.FilesList.filter(item => item.idprojet == this.eventId && item.type == "صورة الشيك");
      this.Files4 = this.FilesList.filter(item => item.idprojet == this.eventId && item.type == "سند القبض");
      this.Files5 = this.FilesList.filter(item => item.idprojet == this.eventId && item.type == " كشف الحساب");

    })
  }

  marhali: boolean= false;
  khitami: boolean = false;
  typef: string;
  getFiles2() {
    this.rapportService.Get().subscribe(res => {
      this.FilesList1 = res
      this.Files6 = this.FilesList1.filter(item => item.idprojet == this.eventId);
      if (this.Files6.length != null) {
        this.Files6.forEach(item => {

          if (item.type == "مرحلي") {
            this.dtamar = item.date;
            this.typef = item.type;
          } else {
            this.dtamar = item.date;
            this.typef = item.type;
          }
      
        })
      }
   /*   this.Files6 = this.FilesList1.filter(item => item.idprojet == this.eventId && item.type == "مرحلي");
      if (this.Files6.length != 0) {
        this.marhali = true;
        this.Files6.forEach(item => {
          this.dtamar = item.date;
  
        })
      }

      this.Files7 = this.FilesList1.filter(item => item.idprojet == this.eventId && item.type == "ختامي");
      if (this.Files7.length != 0) {
        this.khitami = true;
        console.log(this.khitami)
        this.Files6.forEach(item => {
          this.dtamar1 = item.date;
          console.log(this.dtamar1)
        })
      }*/

 
    })
  }


  download1() {
    this.Files1.forEach(item => {
      this.download(item.path)
    })
  }
  download2() {
    this.Files2.forEach(item => {
      this.download(item.path)
    })
  }
  download3() {
    this.Files3.forEach(item => {
      this.download(item.path)
    })
  }
  download4() {
    this.Files4.forEach(item => {
      this.download(item.path)
    })
  }
  download5() {
    this.Files5.forEach(item => {
      this.download(item.path)
    })
  }
  dtamar: string='';
  dtamar1: string='';
  download6() {
    this.Files6.forEach(item => {
      this.download(item.path)
  
    })
  }

  download7() {
    this.Files7.forEach(item => {
      this.download(item.path)

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
      this.path = "Projects" + this.ev.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    }

    );

  }
}
