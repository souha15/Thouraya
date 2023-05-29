import { Component, OnInit } from '@angular/core';
import { RetraitService } from '../../../shared/Services/Retrait/retrait.service';
import { GestBenService } from '../../../shared/Services/GestBen/gest-ben.service';
import { TypeDonsRetraitService } from '../../../shared/Services/Retrait/type-dons-retrait.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { GestBen } from '../../../shared/Models/GestBen/gest-ben.model';
import { Retrait } from '../../../shared/Models/Retrait/retrait.model';

@Component({
  selector: 'app-retrait-report',
  templateUrl: './retrait-report.component.html',
  styleUrls: ['./retrait-report.component.css']
})
export class RetraitReportComponent implements OnInit {

  constructor(private retraitService: RetraitService,
    private benService: GestBenService,
    private tbService: TypeDonsRetraitService,
  ) { }

  ngOnInit(): void {
    this.getListing();
    this.getBen();
    this.getAllTaskList();
  }

  //Radio Button 

  private selectedLink: string;
  search: string;
  setsearch(event): void {

    this.selectedLink = event.target.value;
    if (this.selectedLink == "all") {
      this.search = "all"
    } if (this.selectedLink == "ben") {
      this.search = "ben"
    }

    if (this.selectedLink == "typeRetrait") {
      this.search = "typeRetrait"
    }

    if (this.selectedLink == "typeDons") {
      this.search = "typeDons"
    }
    if (this.selectedLink == "etat") {
      this.search = "etat"
    } if (this.selectedLink == "date") {
      this.search = "date"
    }
  }


  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }
  /*** Get Listing */

  tbl: TbListening[] = [];

  getListing() {
    this.tbService.List().subscribe(res => {
      this.tbl = res
    })
  }

  /* Get Ben List*/
  BenList: GestBen[] = [];
  getBen() {
    this.benService.ListGestBen().subscribe(res => {
      this.BenList = res;
    }
    )
  }


  allRetrait: Retrait[] = [];
  getAllTaskList() {
    this.retraitService.List().subscribe(res => {
      this.allRetrait = res;
    })
  }

  retraitList: Retrait[] = [];
  GetMediaList() {
    this.retraitList = [];
    if (this.isSelected('all')) {
      this.retraitService.List().subscribe(res => {
        this.retraitList = res;
      })
    }
   else if (this.isSelected('typeRetrait') && this.Retrait != null) {
      this.retraitService.SearchBytypeRetrait(this.Retrait).subscribe(res => {
        this.retraitList = res;
      })
    } else if (this.isSelected('ben') && this.Ben != null) {
      this.retraitService.SearchByBen(this.Ben).subscribe(res => {
        this.retraitList = res;
      })
    } else if (this.isSelected('typeDons') && this.Dons != null) {
      this.retraitService.SearchBytypeDons(this.Dons).subscribe(res => {
        this.retraitList = res;
      })
    }
    else if (this.isSelected('etat') && this.Etat != null) {
      this.retraitService.SearchByEtat(this.Etat).subscribe(res => {
        this.retraitList = res;
      })
    } else {
      if (this.DateDeb != null && this.DateFin != null) {

        this.allRetrait.forEach(item => {
          if (item.datedebutmiledi == this.DateDeb && item.datefinmiledi == this.DateFin) {
            this.retraitList.push(item);
          }
        })


      } else {
       
        this.failed = true;
        this.msg = "يرجى ملء تاريخ البدء وتاريخ الانتهاء"
      }
    }

  }
  msg: string;
  failed: boolean = false;
  TestBetweenTwoDate(datedeb,datefin): boolean {
    if (this.DateDeb != null && this.DateFin != null) {
      var from = new Date(this.DateDeb);
      var to = new Date(this.DateFin);
      var dateDeb = new Date(datedeb);
      var dateFin = new Date(datefin);
      if (from == dateDeb && to == dateFin) {
        return true
      } else {
        return false
      }
    } else {
      return false;
    }

  }
  Ben: string;
  Retrait: string;

  GetBen(event) {
    this.Ben = event.target.value;

  }

  getRetrait(event) {
    this.Retrait = event.target.value;

  }
  Dons: string;
  getDons(event) {
    this.Dons = event.target.value;

  }

  Etat: string;
  getEtat(event) {
    this.Etat = event.target.value;

  }

  DateDeb: string;
  getDateDeb(event) {
    this.DateDeb = event.target.value;
  }

  DateFin: string;
  getDateFin(event) {
    this.DateFin = event.target.value;
  }
}
