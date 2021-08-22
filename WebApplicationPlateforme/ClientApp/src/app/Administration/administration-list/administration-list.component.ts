import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-administration-list',
  templateUrl: './administration-list.component.html',
  styleUrls: ['./administration-list.component.css']
})
export class AdministrationListComponent implements OnInit {

  constructor(private AdministrationService: AdministrationService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.ShowListAdministration();
    this.resetForm();
    this.getUsersList();
  }

  c: Number = 1;
  count: Number = 5;
  UsersList: UserDetail[] = [];

  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersList = res
    })
  }

  //Tache list
  private _allAdmines: Observable<Administration[]>;
  public get allAdmin(): Observable<Administration[]> {
    return this._allAdmines;
  }

  public set allAdmin(value: Observable<Administration[]>) {
    this._allAdmines = value;


  }

  ShowListAdministration() {

    this.allAdmin = this.AdministrationService.ListAdministration();

  }


  //Delete Administration

  deleteAdministration(id: number) {
  

    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.AdministrationService.DeletAdministration(id)
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
  adminId: number;
  onSubmit(form:NgForm) {
    this.updateRecord(form)
  }

  admin: Administration = new Administration();
  updateRecord(form: NgForm) {
    this.admin = Object.assign(this.admin, form.value);
    this.adminId = this.admin.id;
    this.AdministrationService.EditAdministration().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.resetForm();
      this.ShowListAdministration();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }

    
    )
  }


  populateForm(admin: Administration) {
    this.AdministrationService.formData = Object.assign({}, admin)
    this.adminId = admin.id
   
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.AdministrationService.formData = {
      id: null,
      nom: '',
      description: '',
      nomDirecteur: '',
     
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
