import { Component, OnInit } from '@angular/core';
import { PermissionUService } from '../../shared/Services/User Services/permission-u.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { PermissionU } from '../../shared/Models/User Services/permission-u.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-permession-list-rh',
  templateUrl: './permession-list-rh.component.html',
  styleUrls: ['./permession-list-rh.component.css']
})
export class PermessionListRHComponent implements OnInit {

  filter;
  constructor(private congeService: PermissionUService,
    private toastr: ToastrService,
    private UserService: UserServiceService, ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
    this.resetForm();
  }

  p: Number = 1;
  count: Number = 5;

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
    })

  }

  congeList: PermissionU[] = [];
  filtredCongeList: PermissionU[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item => item.etatrh == "في الانتظار" && item.etatdir =="موافق")
    })
  }
  per: PermissionU = new PermissionU();

  populateForm(conge: PermissionU) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
  }


  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  date = new Date().toLocaleDateString();
  conge: PermissionU = new PermissionU();

  updateRecord(form: NgForm) {

    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.etat = this.etat;
    this.congeService.formData.daterh = this.date;
    this.congeService.formData.idrh = this.UserIdConnected;
    this.congeService.formData.nomrh = this.UserNameConnected;
    this.congeService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.resetForm();
      this.CongeList();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )

  }

  onSubmit(form: NgForm) {

    this.updateRecord(form)
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
