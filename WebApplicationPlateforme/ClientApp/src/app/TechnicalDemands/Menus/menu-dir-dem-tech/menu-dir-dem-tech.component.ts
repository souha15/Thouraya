import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { ConfigFrontSystem } from '../../../shared/Models/ConfigSystemShowing/config-front-system.model';
import { ConfigSystemFrontservice } from '../../../shared/Services/ConfigSystemShowing/config-front-system.service';
@Component({
  selector: 'app-menu-dir-dem-tech',
  templateUrl: './menu-dir-dem-tech.component.html',
  styleUrls: ['./menu-dir-dem-tech.component.css']
})
export class MenuDirDemTechComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private UserService: UserServiceService,
    private configService: ConfigSystemFrontservice,) { }

  ngOnInit(): void {
    this.GetIcons();
    this.getUserConnected();

    const datePipe = new DatePipe('en-Us');
    this.today = datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  icons: ConfigFrontSystem = new ConfigFrontSystem();
  GetIcons() {
    this.configService.GetById(1).subscribe(res => {
      this.icons = res;
    })
  }

  today; 


  user: UserDetail = new UserDetail();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.user = res

    })

  }

  path: string;
  public print() {
    if (this.user != null) {
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
        this.path = "Salary" + ".pdf"
        pdf.save(this.path); // Generated PDF

      }

      );
    }
  }
}
