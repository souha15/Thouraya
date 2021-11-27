import { Component, OnInit, Injectable } from '@angular/core';
import { Retrait } from '../../../shared/Models/Retrait/retrait.model';
import { RetraitService } from '../../../shared/Services/Retrait/retrait.service';
import { TypeDonsRetraitService } from '../../../shared/Services/Retrait/type-dons-retrait.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { ListeningProjetService } from '../../../shared/Services/Projets/listening-projet.service';
import { ToastrService } from 'ngx-toastr';
import { EtatListCompte } from '../../../shared/Models/Comptes/etat-list-compte.model';
import { GestBenService } from '../../../shared/Services/GestBen/gest-ben.service';
import { GestBen } from '../../../shared/Models/GestBen/gest-ben.model';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import {
  NgbDateStruct, NgbCalendar, NgbCalendarIslamicUmalqura, NgbDatepickerI18n, NgbDate
} from '@ng-bootstrap/ng-bootstrap';

import { TranslationWidth } from '@angular/common';

const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
  'ذو القعدة', 'ذو الحجة'];

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {

  getWeekdayShortName(weekday: number): string {
    return WEEKDAYS[weekday - 1];
  }
  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }

  getWeekdayLabel(weekday: number, width?: TranslationWidth) {
    return WEEKDAYS[weekday - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}


@Component({
  selector: 'app-cheque-retrait-add',
  templateUrl: './cheque-retrait-add.component.html',
  styleUrls: ['./cheque-retrait-add.component.css'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n }
  ]
})
export class ChequeRetraitAddComponent implements OnInit {

  model: NgbDateStruct;
  model1: NgbDateStruct;
  constructor(private retraitService: RetraitService,
    private benService: GestBenService,
    private tbService: TypeDonsRetraitService,
    private tblService: ListeningProjetService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getBanque();
    this.getListing();
    this.getBen();
  }

  onDateSelect(date: NgbDate) {

    var day: string = date.day.toString()
    var month: string = date.month.toString()
    var year: string = date.year.toString()
    this.retrait.datedebuthij = year + "-" + month + "-" + day;

  }

  onDateSelect2(date2: NgbDate) {
    var day: string = date2.day.toString()
    var month: string = date2.month.toString()
    var year: string = date2.year.toString()
    this.retrait.datefinhij = year + "-" + month + "-" + day;
  }
  /* Get User Connected*/

  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })
  }

  /* Get Ben List*/
  benList: GestBen[] = [];
  getBen() {
    this.benService.ListGestBen().subscribe(res => {
      this.benList = res;
    }
      )
  }
/*** Get Listing */

  tbl: TbListening[] = [];

  getListing() {
    this.tbService.List().subscribe(res => {
      this.tbl =res
    })
  }

/* Get Banque */

  ListB: EtatListCompte[] = [];
  getBanque() {
    this.tblService.GetCompte().subscribe(res => {
      this.ListB = res;
    })
  }
  // Old Or new Locataire
  //Test Type Transaction Particulier ou bien Organisation

  private selectedLink: string = "newone";

  setradio(e: string): void {

    this.selectedLink = e;
    if (this.selectedLink == "newone") {
      this.retrait.typeRetrait = "بنكي"
    }

    if (this.selectedLink == "oldone") {
      this.retrait.typeRetrait = "يدوي"
    }


  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }


  // Old Or new Locataire
  //Test Type Transaction Particulier ou bien Organisation

  private selectedLink1: string = "mil";
  mil: boolean = false;
  hij: boolean = false;
  setradio1(e: string): void {

    this.selectedLink1 = e;
    if (this.selectedLink1 == "mil") {
      this.mil = true
      this.hij = false;
    }

    if (this.selectedLink1 == "hij") {
      this.hij = true;
      this.mil=false
    }


  }

  /*** Add  Retrait **/
  retrait: Retrait = new Retrait();
  date = new Date().toLocaleDateString();
  isValidFormSubmitted = false;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    } else {

      this.isValidFormSubmitted = true;
      this.retrait.etat = "في الإنتظار";
      this.retrait.dateenreg = this.date;
      this.retrait.userNameCreator = this.UserNameConnected;
      this.retrait.idUserCreator = this.UserIdConnected;

      this.retraitService.Create(this.retrait).subscribe(res => {
        form.resetForm();

        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
      },
        err => {
          console.log(err);
          this.toastr.warning('لم تتم الإضافة', ' فشل');
      })
    }
  }
}
