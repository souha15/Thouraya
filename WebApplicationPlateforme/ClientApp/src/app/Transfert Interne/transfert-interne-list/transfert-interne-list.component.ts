import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { TransfertInterne } from '../../shared/Models/ServiceRh/transfert-interne.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TransfertInterneService } from '../../shared/Services/ServiceRh/transfert-interne.service';

@Component({
  selector: 'app-transfert-interne-list',
  templateUrl: './transfert-interne-list.component.html',
  styleUrls: ['./transfert-interne-list.component.css']
})
export class TransfertInterneListComponent implements OnInit {
  filter;
  constructor(private UserService: UserServiceService,
    private adminService: AdministrationService,
    private toastr: ToastrService,
    private trinService: TransfertInterneService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getUsersList();
    this.getAdministrationList();
    this.getCreance();
    this.resetForm();
  }


  iduser: string;

  getUserNom(event) {
    this.iduser = event.target.value;
    this.UserService.GetUserById(this.iduser).subscribe(res => {
      this.trinService.formData.employe = res.fullName
    })
  }

  adminid: number;
  getAdminNom(event) {
    this.adminid = +event.target.value;
    this.adminService.GetById(+this.adminid).subscribe(res => {
      this.trinService.formData.administration = res.nom
    })
  }

  UserList: UserDetail[] = [];
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UserList = res
    })
  }

  adminList: Administration[] = [];
  getAdministrationList() {
    this.adminService.ListAdministration().subscribe(res => {
      this.adminList = res;
    })
  }

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.trinService.formData.idUserCreator = res.id;
      this.trinService.formData.userNameCreator = res.fullName
      this.trinService.formData.dateenreg = this.date

    })

  }


  factList: TransfertInterne[] = [];
  GfactList: TransfertInterne[] = [];

  getCreance() {
    this.trinService.Get().subscribe(res => {
      this.factList = res;
    })

  }

  //Populate Form 
  factId: number
  fact: TransfertInterne = new TransfertInterne();
  date = new Date().toLocaleDateString();
  populateForm(facture: TransfertInterne) {
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
      administration: '',
      numtransafert: '',
      employe: '',
      bureau: '',
      idadmin: '',
      nomadmin: '',
      idemploye: '',
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
