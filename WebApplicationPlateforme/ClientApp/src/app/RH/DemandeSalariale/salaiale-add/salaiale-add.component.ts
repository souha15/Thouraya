import { Component, OnInit } from '@angular/core';
import { DemandeTicket } from '../../../shared/Models/RH/demande-ticket.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { DemandeSalariale } from '../../../shared/Models/RH/demande-salariale.model';
import { NgForm } from '@angular/forms';
import { DemandeSalarialeService } from '../../../shared/Services/Rh/demande-salariale.service';

@Component({
  selector: 'app-salaiale-add',
  templateUrl: './salaiale-add.component.html',
  styleUrls: ['./salaiale-add.component.css']
})
export class SalaialeAddComponent implements OnInit {

  constructor(private congeService: DemandeSalarialeService,
    private UserService: UserServiceService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  soldeconge: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.conge.dirnom = res.directeur;
      this.conge.dirid = res.attribut1;
      this.conge.userNameCreator = res.fullName;
      this.conge.idUserCreator = res.id;

    })

  }






  //Conge Submit
  conge: DemandeSalariale = new DemandeSalariale();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    this.conge.dateenreg = this.date;
    this.conge.etat ="في الانتظار"
    this.conge.date = this.date;
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true

  

      this.congeService.Add(this.conge).subscribe(
          res => {
            this.toastr.success("تمت الإضافة بنجاح", "نجاح");
            form.resetForm();

          },
          err => {
            this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
          })
      }

    }



  }

