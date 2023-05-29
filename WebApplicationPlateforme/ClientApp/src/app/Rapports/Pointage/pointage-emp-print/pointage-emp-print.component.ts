import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PointageEmp } from '../../../shared/Models/VointageViaEmp/pointage-emp.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { PointageEmpEmpService } from '../../../shared/Services/PointageViaEmp/pointage-emp.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigSystemFrontservice } from '../../../shared/Services/ConfigSystemShowing/config-front-system.service';
import { ConfigFrontSystem } from '../../../shared/Models/ConfigSystemShowing/config-front-system.model';
@Component({
  selector: 'app-pointage-emp-print',
  templateUrl: './pointage-emp-print.component.html',
  styleUrls: ['./pointage-emp-print.component.css']
})
export class PointageEmpPrintComponent implements OnInit {
  private routeSub: Subscription;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private UserService: UserServiceService,
    private pointageService: PointageEmpEmpService,
    private configService: ConfigSystemFrontservice,
    private route: ActivatedRoute) { }

  usersList: UserDetail[] = [];
  userNumList: any[] = [];
  monthList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,];
  ngOnInit(): void {
    this.GetIcons();
    this.UserService.GetUsersList().subscribe(res => {
      this.usersList = res;
      this.usersList.forEach(item => {
        this.userNumList.push(item.num);
      });
    });


    this.pointageService.Get().subscribe(res => {

      this.pointList2 = res;

      this.route.params.subscribe(p => {
        if (p.id != null) {
          if (this.userNumList.includes(p.id)) {
            this.pointList = this.pointList2.filter(item => item.numEmp == p.id);
          } else if (this.monthList.includes(+p.id)) {
            this.pointList2.forEach(item => {
              var d1 = item.date.split("/").reverse().join("-");
              var d2 = new Date(d1);

              let month = d2.getMonth() + 1;

              if (month == p.id) {
                this.pointList.push(item)
              }
            })
          } else {
            this.pointList2.forEach(item => {
              var d1 = item.date.split("/").reverse().join("-");
              var d2 = p.id.split("/").reverse().join("/");
              if (d1 == d2) {
                this.pointList.push(item)
              }
            })
          }
        }

      });
    });
  }
  pointList2: PointageEmp[] = [];
  pointList: PointageEmp[] = [];
  icons: ConfigFrontSystem = new ConfigFrontSystem();
  GetIcons() {
    this.configService.GetById(1).subscribe(res => {
      this.icons = res;
    })
  }

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
      this.path = "PointageEmpReport" + ".pdf"
      pdf.save(this.path); // Generated PDF
    });
  }
}
