import { Component, OnInit } from '@angular/core';
import { ServiceBanqueService } from '../../shared/Services/Comptes/service-banque.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ServiceBanque } from '../../shared/Models/Comptes/service-banque.model';
import { NgForm } from '@angular/forms';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { EtatCompte } from '../../shared/Models/Comptes/etat-compte.model';
import { EtatCompteService } from '../../shared/Services/Comptes/etat-compte.service';
import { ListeningProjetService } from '../../shared/Services/Projets/listening-projet.service';
import { EtatListCompte } from '../../shared/Models/Comptes/etat-list-compte.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-service-banque-add',
  templateUrl: './service-banque-add.component.html',
  styleUrls: ['./service-banque-add.component.css']
})
export class ServiceBanqueAddComponent implements OnInit {

  constructor(private banqueService: ServiceBanqueService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private etatCompteService: TbListeningService,
    private ComptesListService: ListeningProjetService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getComptesList();
  }

  // Get Etat Compte Lis

  cptList: EtatListCompte[] = [];

  getComptesList() {
    this.ComptesListService.GetCompte().subscribe(res => {
      this.cptList = res
    })
  }

  // get Bank info
  bankid: number;
  numCompte: string;
  bankTest(event) {
    this.bankid = +event.target.value;
    this.ComptesListService.GetByIdCompte(this.bankid).subscribe(res => {
      this.bs.type = res.type;
      this.bs.numCompte = res.numCompte
      this.numCompte = res.numCompte
      this.bs.banque = res.type + '-' +res.nom
    })
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

  //Create Service Banque

  bs: ServiceBanque = new ServiceBanque();
  bs2: ServiceBanque = new ServiceBanque();

  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {

    this.bs.idUserCreator = this.UserIdConnected;
    this.bs.creatorName = this.UserNameConnected;
    this.bs.attibut1 = this.date;

    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }


    else {
      this.isValidFormSubmitted = true;
      this.banqueService.Add(this.bs).subscribe(
        (res: any) => {
          this.bs2 = res;
          form.resetForm();
          this.toastr.success("تم تسجيل  بنجاح", " تسجيل ");
          this.numCompte=""
            this.isValidFormSubmitted = false;
        },
        err => {
          this.toastr.error("فشل تسجيل ", " تسجيل ")
        }

      )

    }

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
      this.path = "BankServices" + this.bs2.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    }

    );

  }
}
