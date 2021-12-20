import { Component, OnInit } from '@angular/core';
import { DemandeVoitureService } from '../../shared/Services/DemandeVoiture/demande-voiture.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { VoitureService } from '../../shared/Services/voiture/voiture.service';
import { Voiture } from '../../shared/Models/voiture/voiture.model';
import { DemandeVoiture } from '../../shared/Models/DemandeVoiture/demande-voiture.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-demande-voiture-add',
  templateUrl: './demande-voiture-add.component.html',
  styleUrls: ['./demande-voiture-add.component.css']
})
export class DemandeVoitureAddComponent implements OnInit {

  constructor(private demService: DemandeVoitureService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private voitureService: VoitureService,) { }

  ngOnInit(): void {
    this.getListVoiture();
    this.getUserConnected();
  }


  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;


    })

  }


  //GetListVoiture
  carsList : Voiture[] = [];
  getListVoiture() {
    this.voitureService.Get().subscribe(res => {
      this.carsList = res; 
    })
  }

  //Add demipement
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  dem: DemandeVoiture = new DemandeVoiture();
  onSubmit(form: NgForm) {
    this.dem.etat = "في الانتظار";
    this.dem.userNameCreator = this.UserNameConnected;
    this.dem.idUserCreator = this.UserIdConnected;
    this.dem.dateenreg = this.date;
    this.dem.datedot = this.date;
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true

      this.demService.Add(this.dem).subscribe(
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
