import { Component, OnInit } from '@angular/core';
import { VoitureService } from '../../shared/Services/voiture/voiture.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Voiture } from '../../shared/Models/voiture/voiture.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {

  constructor(
    private recpService: VoitureService,
    private UserService: UserServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected();
  
    this.getrecpList();
    this.resetForm();
  }

  factList: Voiture[] = [];
  getrecpList() {
    this.recpService.Get().subscribe(res => {
      this.factList = res
    })
  }

  UserIdConnected: string;
  UserNameConnected: string;
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }

  factId: number;
  fact: Voiture = new Voiture();
  populateForm(facture: Voiture) {
    this.recpService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
   
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.updateRecord(form)
    }
  }

  factur: Voiture = new Voiture();

  updateRecord(form: NgForm) {
    this.factur = Object.assign(this.factur, form.value);
    this.factId = this.factur.id;

    this.recpService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')

      this.resetForm();
      this.getrecpList();
    },
      err => {
        this.toastr.error(' لم يتم التحديث ', ' فشل');
      }
    )

  }


  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.recpService.formData = {
      id: null,
      matricule: '',
      num: '',
      marque: '',
      model: '',
      genre: '',
      datefinforme: '',
      recepeteur: '',
      datefinassurance: '',
      idrecepteur: '',


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

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.recpService.Delete(Id)
        .subscribe(res => {
          this.getrecpList()
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
