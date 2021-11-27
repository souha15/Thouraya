import { Component, OnInit, Injectable, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { TranslationWidth } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Decisif } from '../../../shared/Models/Decisions/decisif.model';
import { DecisifsService } from '../../../shared/Services/Decisions/decisifs.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-decisif-details',
  templateUrl: './decisif-details.component.html',
  styleUrls: ['./decisif-details.component.css']
})
export class DecisifDetailsComponent implements OnInit {
  private routeSub: Subscription;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private toastr: ToastrService,
    private decService: DecisifsService,
    private route: ActivatedRoute,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getIdUrl();
  }

  Id: number = 0;
  edit: boolean = false;
  dem: Decisif = new Decisif();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']
  
        this.decService.GetById(this.Id).subscribe(res => {
          this.dem = res;
        })
  
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
      this.path = "Decision" + ".pdf"
      pdf.save(this.path); // Generated PDF
    });
  }
}
