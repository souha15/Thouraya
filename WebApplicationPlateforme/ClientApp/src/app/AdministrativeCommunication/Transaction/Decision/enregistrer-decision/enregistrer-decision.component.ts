import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { DecisionTwoService } from '../../../../shared/Services/ServiceRh/decision-two.service';
import { DecisionTwo } from '../../../../shared/Models/ServiceRh/decision-two.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-enregistrer-decision',
  templateUrl: './enregistrer-decision.component.html',
  styleUrls: ['./enregistrer-decision.component.css']
})
export class EnregistrerDecisionComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private trinService: DecisionTwoService) { }

  ngOnInit(): void {
    this.getUserConnected();
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
      this.de.idUserCreator = res.id;
      this.de.userNameCreator = res.fullName;

    })

  }

  de: DecisionTwo = new DecisionTwo();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.de.dateenreg = this.date;
      this.de.decision = this.decision

      this.trinService.Add(this.de).subscribe(res => {
        form.resetForm();
        this.toastr.success("تم التسجيل  بنجاح", " تسجيل ");
      },
        err => {
          this.toastr.error("فشل التسجيل  الطلب", " تسجيل ")
        }
      )
    }
  }

}
