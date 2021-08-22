import { Component, OnInit } from '@angular/core';
import { DemandeSuppHeure } from '../../../shared/Models/ServiceRh/demande-supp-heure.model';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { DemandeSuppHeureService } from '../../../shared/Services/ServiceRh/demande-supp-heure.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-demande-supp-heure-add',
  templateUrl: './demande-supp-heure-add.component.html',
  styleUrls: ['./demande-supp-heure-add.component.css']
})
export class DemandeSuppHeureAddComponent implements OnInit {

  constructor(private suppheureService: DemandeSuppHeureService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  // Get User Connected


  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.sup.idUserCreator = res.id;
      this.sup.userNameCreator = res.fullName;
      this.sup.iddir = res.attribut1;
      this.sup.nomdir = res.directeur;

    })

  }

  sup: DemandeSuppHeure = new DemandeSuppHeure();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.sup.dateenreg = this.date;
      this.sup.etat = "في الإنتظار";
      this.sup.etatdir = "في الإنتظار";
      this.sup.attribut2 = "في الإنتظار";
      this.suppheureService.Add(this.sup).subscribe(res => {
        form.resetForm();
        this.toastr.success("تم تسجيل  الطلب بنجاح", " تسجيل ");
      },
        err => {
          this.toastr.error("فشل تسجيل  الطلب", " تسجيل ")
        }
      )
    }
  }
}
