import { Component, OnInit } from '@angular/core';
import { CreationTravailDemandeService } from '../../../shared/Services/ServiceRh/creation-travail-demande.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CrationTravailDemande } from '../../../shared/Models/ServiceRh/cration-travail-demande.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-creation-add',
  templateUrl: './creation-add.component.html',
  styleUrls: ['./creation-add.component.css']
})
export class CreationAddComponent implements OnInit {

  constructor(
    private ctService: CreationTravailDemandeService,
    private UserService: UserServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  dir: string;
  dirid: string;
  position: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.dir = res.directeur;
      this.dirid = res.attribut1;
      this.position = res.position;
    })
  }

  ct: CrationTravailDemande = new CrationTravailDemande();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.ct.dateenreg = this.date;
      this.ct.etat = 'في الإنتظار';
      this.ct.etatdg = "في الإنتظار";
      this.ct.etatdir = "في الإنتظار";
      this.ct.etatrh = "في الإنتظار";
      this.ct.iddir = this.dirid;
      this.ct.nomdir = this.dir;
      this.ct.titreposte = this.position;
      this.ct.idUserCreator = this.UserIdConnected;
      this.ct.userNameCreator = this.UserNameConnected;

      this.ctService.Add(this.ct).subscribe(res => {
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
