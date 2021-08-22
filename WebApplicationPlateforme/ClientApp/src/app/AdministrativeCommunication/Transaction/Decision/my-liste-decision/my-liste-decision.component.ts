import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { DecisionTwoService } from '../../../../shared/Services/ServiceRh/decision-two.service';
import { DecisionTwo } from '../../../../shared/Models/ServiceRh/decision-two.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-my-liste-decision',
  templateUrl: './my-liste-decision.component.html',
  styleUrls: ['./my-liste-decision.component.css']
})
export class MyListeDecisionComponent implements OnInit {

  filter
  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private trinService: DecisionTwoService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();
    this.resetForm();
  }

  decision: string = "داخلي";
  test(event) {
    this.decision = event.target.value
  }

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;


    })

  }


  factList: DecisionTwo[] = [];
  GfactList: DecisionTwo[] = [];

  getCreance() {
    this.trinService.Get().subscribe(res => {
      this.GfactList = res;
      this.factList = this.GfactList.filter(item => item.idUserCreator == this.UserIdConnected)
    })

  }

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


  updateRecord(form: NgForm) {
    this.trinService.formData.decision = this.decision;
    this.trinService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.resetForm();
      this.getCreance();
    },
      err => {
        this.toastr.error(' لم يتم التحديث  ', ' فشل');
      }


    )

  }

  isValidFormSubmitted = false;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.updateRecord(form)
    }

  }
  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.trinService.formData = {
      id: null,
      type: '',
      decision: '',
      titre: '',
      detail: '',
      org: '',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',
    }
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.trinService.Delete(Id)
        .subscribe(res => {
          this.getCreance();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }

}
