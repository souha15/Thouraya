import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { DecisionTwoService } from '../../../../shared/Services/ServiceRh/decision-two.service';
import { DecisionTwo } from '../../../../shared/Models/ServiceRh/decision-two.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-decision-list',
  templateUrl: './decision-list.component.html',
  styleUrls: ['./decision-list.component.css']
})
export class DecisionListComponent implements OnInit {

  filter;
  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private trinService: DecisionTwoService) { }

  ngOnInit(): void {
    this.getDe1();
    this.getDe2();
    this.getDe3();

  }

  de: DecisionTwo[] = [];
  de1: DecisionTwo[] = [];
  nbd1: number;
  getDe1() {
    this.trinService.Get().subscribe(res => {
      this.de = res
      this.de1 = this.de.filter(item => item.type == "تعميم")
      this.nbd1 = this.de1.length;

    })
  }

  de2: DecisionTwo[] = [];
  nbd2: number;
  getDe2() {
    this.trinService.Get().subscribe(res => {
      this.de = res
      this.de2 = this.de.filter(item => item.type == "قرار")
      this.nbd2 = this.de2.length;
    })
  }

  de3: DecisionTwo[] = [];
  nbd3: number;
  getDe3() {
    this.trinService.Get().subscribe(res => {
      this.de = res
      this.de3 = this.de.filter(item => item.type == "لائحة")
      this.nbd3 = this.de3.length;
    })
  }

  iterne() {

    this.de1 = this.de1.filter(item => item.decision == "داخلي")
    this.de2 = this.de2.filter(item => item.decision == "داخلي")
    this.de3 = this.de3.filter(item => item.decision == "داخلي")

  }

  externe() {

    this.de1 = this.de1.filter(item => item.decision == "خارجي")
    this.de2 = this.de2.filter(item => item.decision == "خارجي")
    this.de3 = this.de3.filter(item => item.decision == "خارجي")
  }

  pres: boolean = false;
  show() {
    this.pres = true;
  }


  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  //Pagination initialisation

  p: number = 1;

  factId: number
  fact: DecisionTwo = new DecisionTwo();
  bb: boolean = false;
  date = new Date().toLocaleDateString();
  populateForm(facture: DecisionTwo) {
    this.trinService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    if (this.fact.decision == 'داخلي')
      this.bb = false;
    else
      this.bb = true;
  }

}
