import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../../shared/Services/ServiceRh/formation.service';
import { Formation } from '../../../shared/Models/ServiceRh/formation.model';


@Component({
  selector: 'app-formation-show',
  templateUrl: './formation-show.component.html',
  styleUrls: ['./formation-show.component.css']
})
export class FormationShowComponent implements OnInit {

  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
    this.getFormList();
  }

  formList: Formation[] = [];
  getFormList() {
    this.formationService.Get().subscribe(res => {
      this.formList = res;
    })
  }



}
