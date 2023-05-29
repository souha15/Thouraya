import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TacheService } from '../../../../shared/Services/Taches/tache.service';
import { Tache } from '../../../../shared/Models/Taches/tache.model';
import { ConfigSystemFrontservice } from '../../../../shared/Services/ConfigSystemShowing/config-front-system.service';
import { ConfigFrontSystem } from '../../../../shared/Models/ConfigSystemShowing/config-front-system.model';

@Component({
  selector: 'app-print-tasks-report-dir',
  templateUrl: './print-tasks-report-dir.component.html',
  styleUrls: ['./print-tasks-report-dir.component.css']
})
export class PrintTasksReportDirComponent implements OnInit {
  private routeSub: Subscription;

  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private tasksService: TacheService,
    private configService: ConfigSystemFrontservice,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetIcons();
    this.route.params.subscribe(p => {

      if (p.datedeb != null && p.datefin) {
        this.tasksService.ListTache().subscribe(res => {
          this.allTasks = res;

          this.allTasks.forEach(item => {
            if (this.TestBetweenTwoDate(p.datedeb, p.datefin, item.date)) {
              this.taskList.push(item);
            }
          })
        });
      } else if (p.id != null) {
        this.tasksService.SearchByEmployee(p.id).subscribe(res => {
          this.taskList = res;
        });
      } else {
        this.tasksService.ListTache().subscribe(res => {
          this.taskList = res;
        });
      }
    });
  }
  taskList: Tache[] = [];
  allTasks: Tache[] = [];

  TestBetweenTwoDate(DateDeb, DateFin, dateEnreg): boolean {
    if (DateDeb != null && DateFin != null) {
      var from = new Date(DateDeb);
      var to = new Date(DateFin);
      var date = new Date(dateEnreg);
      if (from <= date && to >= date) {
        return true
      } else {
        return false
      }
    } else {
      return false;
    }

  }

  icons: ConfigFrontSystem = new ConfigFrontSystem();
  GetIcons() {
    this.configService.GetById(1).subscribe(res => {
      this.icons = res;
    })
  }


  p: Number = 1;
  count: Number = 5;


  path: string;
  public print() {
    var data = document.getElementById('htmlData');
    // data.style.display = "block";
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      // data.style.display = "none"
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "TasksReport" + ".pdf"
      pdf.save(this.path); // Generated PDF
    });
  }
}
