import { Component, OnInit } from '@angular/core';
import { DemandeTicketService } from '../../../shared/Services/Rh/demande-ticket.service';
import { DemandeTicket } from '../../../shared/Models/RH/demande-ticket.model';

@Component({
  selector: 'app-histo-ticket-employee',
  templateUrl: './histo-ticket-employee.component.html',
  styleUrls: ['./histo-ticket-employee.component.css']
})
export class HistoTicketEmployeeComponent implements OnInit {

  constructor(private congeService: DemandeTicketService,) { }

  ngOnInit(): void {
    this.CongeList();
  }

  congeList: DemandeTicket[] = [];
  filtredCongeList: DemandeTicket[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }

  per: DemandeTicket = new DemandeTicket();

  populateForm(conge: DemandeTicket) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
  }

}
