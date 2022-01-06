import { Component, OnInit } from '@angular/core';
import { AssistanceService } from '../../../shared/Services/ServiceRh/assistance.service';
import { Assistance } from '../../../shared/Models/ServiceRh/assistance.model';

@Component({
  selector: 'app-histo-assistance',
  templateUrl: './histo-assistance.component.html',
  styleUrls: ['./histo-assistance.component.css']
})
export class HistoAssistanceComponent implements OnInit {

  constructor(private assistanceService: AssistanceService,) { }

  ngOnInit(): void {
    this.getAsList();
  }
  assistanceList: Assistance[] = [];

  p: Number = 1;
  count: Number = 5;
  getAsList() {
    this.assistanceService.Get().subscribe(res => {
      this.assistanceList = res
    })
  }
  assis: Assistance = new Assistance();
  populateForm(assistance: Assistance) {
    this.assis = Object.assign({}, assistance);
  }
}
