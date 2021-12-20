import { Component, OnInit } from '@angular/core';
import { DemandeVoitureService } from '../../shared/Services/DemandeVoiture/demande-voiture.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { VoitureService } from '../../shared/Services/voiture/voiture.service';
import { Voiture } from '../../shared/Models/voiture/voiture.model';
import { DemandeVoiture } from '../../shared/Models/DemandeVoiture/demande-voiture.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-demande-voiture-list-user',
  templateUrl: './demande-voiture-list-user.component.html',
  styleUrls: ['./demande-voiture-list-user.component.css']
})
export class DemandeVoitureListUserComponent implements OnInit {

  constructor(private demService: DemandeVoitureService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private voitureService: VoitureService, ) { }

  ngOnInit(): void {
    this.getListVoiture();
    this.getUserConnected();
    this.getDemList();
  }
  p: Number = 1;
  count: Number = 5;

  List: DemandeVoiture[] = []
  List2: DemandeVoiture[] = []

  getDemList() {
    this.demService.Get().subscribe(res => {
      this.List2 = res
      this.List = this.List2.filter(item => item.idUserCreator == this.UserIdConnected)
    })
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

  populateForm(dem: DemandeVoiture) {
    this.demService.formData = Object.assign({}, dem)
    this.dem = Object.assign({}, dem);
  }
  //GetListVoiture
  carsList: Voiture[] = [];
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

    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true

      this.demService.PutObservableE(this.dem).subscribe(
        res => {
          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
          form.resetForm();
          this.getDemList();
        },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }


  onDelete(Id) {
    if (this.dem.etat == "في الانتظار") {
      if (confirm('Are you sure to delete this record ?')) {
        this.demService.Delete(Id)
          .subscribe(res => {
            this.getDemList();
            this.toastr.success("تم الحذف  بنجاح", "نجاح");
          },

            err => {
              console.log(err);
              this.toastr.warning('لم يتم الحذف  ', ' فشل');

            }
          )

      }
    }
    else {
      this.toastr.error(' لم يتم التحديث الطلب تحت الإجرء   ', ' فشل');
    }
  }
}
