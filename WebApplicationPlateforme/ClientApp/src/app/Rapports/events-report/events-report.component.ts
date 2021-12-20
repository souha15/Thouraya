import { Component, OnInit } from '@angular/core';
import { EvenementService } from '../../shared/Services/Evenements/evenement.service';
import { Evenement } from '../../shared/Models/Evenements/evenement.model';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';

@Component({
  selector: 'app-events-report',
  templateUrl: './events-report.component.html',
  styleUrls: ['./events-report.component.css']
})
export class EventsReportComponent implements OnInit {

  constructor(private eventService: EvenementService,
    private tbLService: TbListeningService,) { }

  ngOnInit(): void {
    this.GetList();
    this.getDataTbL();
  }





  //Search

  private selectedLink: string = "classe";
  search: string;
  setradio(e: string): void {

    this.selectedLink = e;
    if (this.selectedLink == "classe") {
      this.search = "classe"
    }

    if (this.selectedLink == "event") {
      this.search = "event"
    }

    if (this.selectedLink == "date") {
      this.search = "date"
    }
  }


  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }


  // Classe Search 
  classList: TbListening[] = [];

  getDataTbL() {

    this.tbLService.GetC().subscribe(res => {
      this.classList = res
    });

  }

  classe: string;
  getClasse(event) {
    this.classe = event.target.value
  }

  projet: string;

  getProjet(event) {
    this.projet = event.target.value
  }

  dateDeb: string;
  dateFin: string;
  getDateDeb(event) {
    this.dateDeb = event.target.value
  }

  getDateFin(event) {
    this.dateFin = event.target.value
  }

  EvList: Evenement[] = [];
  EvListG: Evenement[] = [];
  GetList() {
    this.eventService.List().subscribe(res => {
      this.EvListG = res

    },
      err => {

      })
  }


  EvListFiltred: Evenement[] = [];
  SearchByClasse() {
    this.EvListFiltred = [];
    this.eventService.List().subscribe(res => {
      this.EvList = res
      this.EvListFiltred = this.EvList.filter(item => item.classe = this.classe);

    },
      err => {

      })
  }

  SearchByProjet() {
    this.EvListFiltred = [];
    this.eventService.List().subscribe(res => {
      this.EvList = res
      this.EvListFiltred = this.EvList.filter(item => item.projet = this.projet);

    },
      err => {

      })
  }


  SearchByDate() {
    this.EvListFiltred = [];
    this.eventService.List().subscribe(res => {
      this.EvList = res
      this.EvListFiltred = this.EvList.filter(item => Date.parse(item.datetime) >= Date.parse(this.dateDeb) && Date.parse(item.datetime) <= Date.parse(this.dateFin) );

    },
      err => {

      })
  }
}
