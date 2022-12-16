import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../../shared/Services/Rh/conge.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import { Permission } from '../../../shared/Models/RH/permission.model';
import { PermissionService } from '../../../shared/Services/Rh/permission.service';
import { PermissionU } from '../../../shared/Models/User Services/permission-u.model';
import { PermissionUService } from '../../../shared/Services/User Services/permission-u.service';
@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent implements OnInit {
  filter;
  constructor(private congeService: PermissionUService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.resetForm();
  }
  p: Number = 1;
  count: Number = 5;

  //Get Users List
  user: UserDetail[] = [];
  UserList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.user = res;
    })
  }

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  userc: UserDetail = new UserDetail();

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.congeService.geByUser(this.UserIdConnected).subscribe(res => {
        this.filtredCongeList = res
      })
    })

  }

  //Get Conge Demand Lis

  congeList: PermissionU[] = [];
  filtredCongeList: PermissionU[] = [];
  CongeList() {
    this.congeService.geByUser(this.UserIdConnected).subscribe(res => {
      this.filtredCongeList = res
    })
  }

  //Edit Administration
  congeId: number;
  onSubmit(form: NgForm) { 
    this.updateRecord(form)
  }

  conge: PermissionU = new PermissionU();
  date = new Date().toLocaleDateString();
  updateRecord(form: NgForm) {

    if (this.congeService.formData.etat == "في الانتظار") {
      this.congeService.Edit().subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.resetForm();
        this.CongeList();
      },
        err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');
        }


      )
    } if (this.congeService.formData.etat == 'موافق') {
      this.toastr.error('لقد تمت الموافقة على طلب الإذن', ' لم يتم التحديث');
    } if (this.congeService.formData.etat == 'رفض') {
      this.toastr.error('لقد تم رفض طلب الإذن', ' لم يتم التحديث');
    }
  }


  populateForm(conge: PermissionU) {
    this.congeService.formData = Object.assign({}, conge)
    this.congeId = conge.id
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      date: '',
      type: '',
      autre: '',
      heuredeb: '',
      heurefin: '',
      raison: '',
      etat: '',
      etatdir: '',
      etatrh: '',
      iddir: '',
      idrh: '',
      nomrh: '',
      nomdir: '',
      datedir: '',
      daterh: '',
      creatorName: '',
      datenereg: '',
      attibut1: '',
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      idUserCreator: '',
      userName1: '', userId1: '', userEtat1: '', userDate1: '',
      userName2: '', userId2: '', userEtat2: '', userDate2: '',
      userName3: '', userId3: '', userEtat3: '', userDate3: '',
      userName4: '', userId4: '', userEtat4: '', userDate4: '',
      userName5: '', userId5: '', userEtat5: '', userDate5: '',
      userName6: '', userId6: '', userEtat6: '', userDate6: '',
      userName7: '', userId7: '', userEtat7: '', userDate7: '',
      userName8: '', userId8: '', userEtat8: '', userDate8: '',

    }
  }
}
