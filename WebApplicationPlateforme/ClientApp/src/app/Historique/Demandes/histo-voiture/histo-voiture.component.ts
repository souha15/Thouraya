import { Component, OnInit } from '@angular/core';
import { DemandeVoitureService } from '../../../shared/Services/DemandeVoiture/demande-voiture.service';
import { DemandeVoiture } from '../../../shared/Models/DemandeVoiture/demande-voiture.model';
import { Voiture } from '../../../shared/Models/voiture/voiture.model';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { VoitureService } from '../../../shared/Services/voiture/voiture.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-histo-voiture',
  templateUrl: './histo-voiture.component.html',
  styleUrls: ['./histo-voiture.component.css']
})
export class HistoVoitureComponent implements OnInit {

  constructor(private demService: DemandeVoitureService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private voitureService: VoitureService,) { }

  ngOnInit(): void {
    this.getDemList();
  }

  p: Number = 1;
  count: Number = 5;

  List: DemandeVoiture[] = []


  getDemList() {
    this.demService.Get().subscribe(res => {
      this.List = res
    })
  }
  dem: DemandeVoiture = new DemandeVoiture();
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
  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  onSubmit(form: NgForm) {

    this.dem.datedot = this.date
    this.demService.PutObservableE(this.dem).subscribe(res => {
      this.getDemList();
      this.toastr.success("تم التحديث  بنجاح", "نجاح");
    },
      err => {
        this.toastr.error("فشل تحديث الطلب ", " تحديث الطلب")
      })
  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.demService.Delete(id)
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
}
