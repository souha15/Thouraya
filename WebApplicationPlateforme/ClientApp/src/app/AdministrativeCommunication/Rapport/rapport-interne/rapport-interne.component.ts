import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TransactionService } from '../../../shared/Services/AdministrativeCommunication/transaction.service';
import { AdministrationService } from '../../../shared/Services/Administration/administration.service';
import { ProprietaireService } from '../../../shared/Services/AdministrativeCommunication/proprietaire.service';
import { OrganismeService } from '../../../shared/Services/AdministrativeCommunication/organisme.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Proprietaire } from '../../../shared/Models/AdministrativeCommunication/proprietaire.model';
import { Organisme } from '../../../shared/Models/AdministrativeCommunication/organisme.model';
import { Transaction } from '../../../shared/Models/AdministrativeCommunication/transaction.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-rapport-interne',
  templateUrl: './rapport-interne.component.html',
  styleUrls: ['./rapport-interne.component.css']
})
export class RapportInterneComponent implements OnInit {


  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private transactionService: TransactionService,
    private admnistrationService: AdministrationService,
    private proprietaireService: ProprietaireService,
    private organismeService: OrganismeService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.GetPropList();
    this.GetOrganismeList();
  }

  //User Connected

  UserIdConnected: string;
  UserNameConnected: string;


  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(
      res => {
        this.UserIdConnected = res.id;
        this.UserNameConnected = res.fullName;
      })

  }


  //get Organisme List

  ListOrg: Organisme[] = [];

  GetOrganismeList() {
    this.organismeService.List().subscribe(res => {
      this.ListOrg = res

    }

    )
  }

  //get Proprietaire List

  ListProp: Proprietaire[] = [];

  GetPropList() {
    this.proprietaireService.List().subscribe(res => {
      this.ListProp = res
    })
  }


  //Listing


  trList: Transaction[] = [];
  trListG: Transaction[] = [];
  trListF: Transaction[] = [];

  listTr() {
    if (this.testor) {
      this.trListF.length = 0
      this.transactionService.ListI().subscribe(res => {
        this.trListG = res
        this.trListF = this.trListG.filter(item => item.idOrg == +this.idor)
        this.testor = true;
        this.testprop = true;
        this.testaffected = true;
        this.testenregdef = true;
        this.testenregtemp = true;
        this.testmytr = true;
      })
    }

    if (this.testmytr) {
      this.trListF.length = 0
      this.transactionService.ListI().subscribe(res => {
        this.trListG = res
        this.trListF = this.trListG.filter(item => item.idUserCreator == this.UserIdConnected)
        this.testor = true;
        this.testprop = true;
        this.testaffected = true;
        this.testenregdef = true;
        this.testenregtemp = true;
        this.testmytr = true;

      })
    }

    if (this.testprop) {
      this.trListF.length = 0
      this.transactionService.ListI().subscribe(res => {
        this.trListG = res
        this.trListF = this.trListG.filter(item => item.idProp == +this.idprop)
        this.testor = true;
        this.testprop = true;
        this.testaffected = true;
        this.testenregdef = true;
        this.testenregtemp = true;
        this.testmytr = true;
      })
    }

    if (this.testenregtemp) {
      this.trListF.length = 0
      this.transactionService.ListI().subscribe(res => {
        this.trListG = res
        this.trListF = this.trListG.filter(item => item.attribut6 == "حفظ مؤقت")
        this.testor = true;
        this.testprop = true;
        this.testaffected = true;
        this.testenregdef = true;
        this.testenregtemp = true;
        this.testmytr = true;

      })
    }

    if (this.testenregdef) {
      this.trListF.length = 0
      this.transactionService.ListI().subscribe(res => {
        this.trListG = res
        this.trListF = this.trListG.filter(item => item.attribut6 == "حفظ نهائي")
        this.testor = true;
        this.testprop = true;
        this.testaffected = true;
        this.testenregdef = true;
        this.testenregtemp = true;
        this.testmytr = true;

      })
    }
  }

  //Test for disabling inputs

  testor: boolean = true;
  idor: number;
  testOr(event) {
    this.idor = event.target.value;
    if (event.target.value != null) {
      this.testor = true;
      this.testprop = false;
      this.testaffected = false;
      this.testenregdef = false;
      this.testenregtemp = false;
      this.testmytr = false;
    }
  }

  testprop: boolean = true;
  idprop: number;
  testProp(event) {
    this.idprop = event.target.value;
    if (event.target.value != null) {
      this.testor = false;
      this.testprop = true;
      this.testaffected = false;
      this.testenregdef = false;
      this.testenregtemp = false;
      this.testmytr = false;
    }
  }

  testmytr: boolean = true;

  testMyTr(event) {
    if (event.target.value != null) {
      this.testor = false;
      this.testprop = false;
      this.testaffected = false;
      this.testenregdef = false;
      this.testenregtemp = false;
      this.testmytr = true;
    }
  }

  testenregtemp: boolean = true;
  testEnregTemp(event) {
    if (event.target.value != null) {
      this.testor = false;
      this.testprop = false;
      this.testaffected = false;
      this.testenregdef = false;
      this.testenregtemp = true;
      this.testmytr = false;
    }
  }

  testaffected: boolean = true;
  testAffected(event) {
    if (event.target.value != null) {
      this.testor = false;
      this.testprop = false;
      this.testaffected = true;
      this.testenregdef = false;
      this.testenregtemp = false;
      this.testmytr = false;
    }
  }

  testenregdef: boolean = true;
  testEnregDef(event) {
    if (event.target.value != null) {
      this.testor = false;
      this.testprop = false;
      this.testaffected = false;
      this.testenregdef = true;
      this.testenregtemp = false;
      this.testmytr = false;
    }
  }

  path: string;
  public openPDF() {

    var data = document.getElementById('htmlData');

    html2canvas(data).then(canvas => {
      // Few necessary setting options

      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "Report" + ".pdf"
      pdf.save(this.path); // Generated PDF

    });

  }
}

