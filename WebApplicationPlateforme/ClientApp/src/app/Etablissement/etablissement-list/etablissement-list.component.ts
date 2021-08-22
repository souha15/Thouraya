import { Component, OnInit } from '@angular/core';
import { Etablissement } from '../../shared/Models/Etablissement/etablissement.model';
import { EtablissementService } from '../../shared/Services/Etablissement/etablissement.service';
import { Observable } from 'rxjs';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';

@Component({
  selector: 'app-etablissement-list',
  templateUrl: './etablissement-list.component.html',
  styleUrls: ['./etablissement-list.component.css']
})
export class EtablissementListComponent implements OnInit {

  constructor(private AdministrationService: EtablissementService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private AdministrationS: AdministrationService) { }

ngOnInit(): void {
  this.ShowListAdministration();
  this.resetForm();
  this.getUsersList();
  this.getAdministrationList();
}
  c: Number = 1;
  count: Number = 5;
  //Get Administrations List

  AdministrationList: Administration[] = [];

  getAdministrationList() {
    this.AdministrationS.ListAdministration().subscribe(res => {
      this.AdministrationList = res
    })
  }


  //UsersLIst
  UsersList: UserDetail[] = [];

  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersList = res
    })
  }

  //Tache list
  private _allAdmines: Observable<Etablissement[]>;
  public get allAdmin(): Observable<Etablissement[] > {
  return this._allAdmines;
}

  public set allAdmin(value: Observable<Etablissement[]>) {
  this._allAdmines = value;


}

  ShowListAdministration() {

    this.allAdmin = this.AdministrationService.ListEtablissement();

}

  //Delete Administration

  deleteAdministration(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.AdministrationService.DeleteEtablissement(id)
        .subscribe(res => {
          this.ShowListAdministration();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');
          }
        )

    }

  }

  //Edit Administration
  etaId: number;
  onSubmit(form: NgForm) {
    this.updateRecord(form)
  }

  admin: Etablissement = new Etablissement();
  updateRecord(form: NgForm) {
    this.admin = Object.assign(this.admin, form.value);
    this.etaId = this.admin.id;
    this.AdministrationService.EditEtablissement().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.resetForm();
      this.ShowListAdministration();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )
  }


  populateForm(admin: Etablissement) {
    this.AdministrationService.formData = Object.assign({}, admin)
    this.etaId = admin.id

  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.AdministrationService.formData = {
      id: null,
      nom: '',
      description: '',
      nomDirecteur: '',
      nomAdministration: '',
      idAdministration: null,

    }
  }

  //sorting
  key: string = 'name'; //set default
reverse: boolean = false;
sort(key) {
  this.key = key;
  this.reverse = !this.reverse;
}

//Pagination initialisation
p: number = 1;
}
