import { Component, OnInit } from '@angular/core';
import { DemandeVoitureService } from '../../shared/Services/DemandeVoiture/demande-voiture.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { VoitureService } from '../../shared/Services/voiture/voiture.service';
import { Voiture } from '../../shared/Models/voiture/voiture.model';
import { DemandeVoiture } from '../../shared/Models/DemandeVoiture/demande-voiture.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-demande-voiture-list-dir',
  templateUrl: './demande-voiture-list-dir.component.html',
  styleUrls: ['./demande-voiture-list-dir.component.css']
})
export class DemandeVoitureListDirComponent implements OnInit {

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
      this.List = this.List2.filter(item => item.etat == "في الانتظار")
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
  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  onSubmit(form: NgForm) {
    this.dem.iddot = this.UserIdConnected;
    this.dem.namedot = this.UserNameConnected
    this.dem.datedot = this.date
    this.demService.PutObservableE(this.dem).subscribe(res => {
      this.getDemList();
      this.toastr.success("تم الحذف  بنجاح", "نجاح");
    },
      err => {
        this.toastr.error("فشل تحديث الطلب ", " تحديث الطلب")
      })
  }
}
