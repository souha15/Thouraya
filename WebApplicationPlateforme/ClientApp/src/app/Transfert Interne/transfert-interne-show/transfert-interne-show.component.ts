import { Component, OnInit } from '@angular/core';
import { TransfertInterneService } from '../../shared/Services/ServiceRh/transfert-interne.service';
import { TransfertInterne } from '../../shared/Models/ServiceRh/transfert-interne.model';

@Component({
  selector: 'app-transfert-interne-show',
  templateUrl: './transfert-interne-show.component.html',
  styleUrls: ['./transfert-interne-show.component.css']
})
export class TransfertInterneShowComponent implements OnInit {

  constructor(private trService: TransfertInterneService) { }

  ngOnInit(): void {
    this.getlist()
  }

  list: TransfertInterne[] = [];
  getlist() {
    this.trService.Get().subscribe(res => {
      this.list = res
    })
  }

}
