import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { AdministrationService } from '../../../shared/Services/Administration/administration.service';
import { ToastrService } from 'ngx-toastr';
import { ReceptionEquipementService } from '../../../shared/Services/ServiceRh/reception-equipement.service';
import { ReceptionEquipement } from '../../../shared/Models/ServiceRh/reception-equipement.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';


@Component({
  selector: 'app-reception-equipement-list',
  templateUrl: './reception-equipement-list.component.html',
  styleUrls: ['./reception-equipement-list.component.css']
})
export class ReceptionEquipementListComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private adminService: AdministrationService,
    private toastr: ToastrService,
    private trinService: ReceptionEquipementService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getUsersList();
    this.getCreance();
    this.resetForm();
  }


  iduser: string;
  admin: string;
  getUserNom(event) {
    this.iduser = event.target.value;
    this.UserService.GetUserById(this.iduser).subscribe(res => {
      this.trinService.formData.username = res.fullName;
      this.trinService.formData.admin = res.nomAdministration;
      this.admin = res.nomAdministration;

    })
  }

  UserList: UserDetail[] = [];
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UserList = res
    })
  }

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })
  }


  factList: ReceptionEquipement[] = [];
  GfactList: ReceptionEquipement[] = [];

  getCreance() {
    this.trinService.Get().subscribe(res => {
      this.GfactList = res;
      this.factList = this.GfactList.filter(item => item.idUserCreator == this.UserIdConnected)
    })

  }

  //Populate Form 
  factId: number
  fact: ReceptionEquipement = new ReceptionEquipement();
  date = new Date().toLocaleDateString();
  populateForm(facture: ReceptionEquipement) {
    this.trinService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }

  updateRecord(form: NgForm) {

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
      username: '',
      userId: '',
      admin: '',
      daterecep: '',
      equi: '',
      quantite: '',
      typeEqui: '',
      etatEqui: '',
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
