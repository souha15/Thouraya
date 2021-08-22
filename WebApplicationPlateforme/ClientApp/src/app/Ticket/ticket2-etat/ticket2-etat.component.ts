import { Component, OnInit } from '@angular/core';
import { Ticket2Service } from '../../shared/Services/Ticket2/ticket2.service';
import { Ticket2 } from '../../shared/Models/Ticket2/ticket2.model';

@Component({
  selector: 'app-ticket2-etat',
  templateUrl: './ticket2-etat.component.html',
  styleUrls: ['./ticket2-etat.component.css']
})
export class Ticket2EtatComponent implements OnInit {

  constructor(private ticketService: Ticket2Service,) { }

  ngOnInit(): void {
    this.getEtatTicket();
  }

  ticList: Ticket2[] = [];
  ticListReceived: Ticket2[] = [];
  ticListWait: Ticket2[] = [];
  ticListClose: Ticket2[] = [];
  nbReceived: number = 0;
  nbColse: number = 0;
  nbWait: number = 0;

  getEtatTicket() {
    this.ticketService.ListTicket2().subscribe(res => {
      this.ticList = res
      this.ticListClose = this.ticList.filter(item => item.etat == "مغلقة")
      this.nbColse = this.ticListClose.length;
      this.ticListWait = this.ticList.filter(item => item.etat == "مرسلة")
      this.nbWait = this.ticListWait.length;
      this.ticListReceived = this.ticList.filter(item => item.etat == "تم الإستلام")
      this.nbReceived = this.ticListReceived.length;
    })
  }
}
