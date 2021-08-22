import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { ChequeCService } from '../../../shared/Services/Cheques/cheque-c.service';
import { PayChequeService } from '../../../shared/Services/Cheques/pay-cheque.service';
import { ListeningProjetService } from '../../../shared/Services/Projets/listening-projet.service';
import { ChequesC } from '../../../shared/Models/Cheques/cheques-c.model';
import { ToastrService } from 'ngx-toastr';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PayChequesC } from '../../../shared/Models/Cheques/pay-cheques-c.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { FilesProjetService } from '../../../shared/Services/Projets/files-projet.service';
import { FilesChequesC } from '../../../shared/Models/Cheques/files-cheques-c.model';
import { FilesChequeService } from '../../../shared/Services/Cheques/files-cheque.service';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { Chart } from 'node_modules/chart.js'
@Component({
  selector: 'app-chequec-details',
  templateUrl: './chequec-details.component.html',
  styleUrls: ['./chequec-details.component.css']
})
export class ChequecDetailsComponent implements OnInit {

  private routeSub: Subscription;
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private chequeService: ChequeCService,
    private articleService: PayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private fileschequeService: FilesChequeService,
    private toastr: ToastrService,
    public serviceupload: UploadDownloadService,
  ) { this.downloadStatus = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getIdUrl();
    this.getPaycheque();
    this.getFilesChe();
  }

  //get the id in Url

  id: number;
  details: ChequesC = new ChequesC();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id']

      this.chequeService.GetById(this.id).subscribe(res => {
        this.details = res

      })
    });


  }

  filesc: FilesChequesC[] = [];
  tfilesc: FilesChequesC[] = [];

  getFilesChe() {
    this.fileschequeService.Get().subscribe(res => {
      this.tfilesc = res
      this.filesc = this.tfilesc.filter(item => item.idCheque == this.id)
    })
  }

  paycList: PayChequesC[] = [];
  paycList2: PayChequesC[] = [];
  nb: number;
  prix: number;
  Labels: string[] = [];
  ChartData: number[] = [];
  chart = [];
  chartData = [];
  getPaycheque() {
    this.articleService.Get().subscribe(res => {
      this.paycList2 = res
      this.paycList = this.paycList2.filter(item => item.idCheque == this.id)


      this.paycList.forEach(item => {

        this.prix = +item.prix;
        this.ChartData.push(this.prix)
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
              label: 'بنود الصرف',
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
  //impression tr
  path: string;
  printtest: boolean= true;
  public print() {
    this.printtest = false;
    var data = document.getElementById('htmlData');
    // data.style.display = "block";
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      //  data.style.display = "none"
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "Cheque" + this.details.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    }

    );

  }


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
