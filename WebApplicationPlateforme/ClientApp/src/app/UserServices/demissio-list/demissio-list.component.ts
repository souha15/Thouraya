import { Component, OnInit } from '@angular/core';
import { DemissionService } from '../../shared/Services/User Services/demission.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Demissioon } from '../../shared/Models/User Services/demissioon.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-demissio-list',
  templateUrl: './demissio-list.component.html',
  styleUrls: ['./demissio-list.component.css']
})
export class DemissioListComponent implements OnInit {

  constructor(private demService: DemissionService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
  }

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;


  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }
  //Get Conge Demand Lis

  congeList: Demissioon[] = [];
  dem: Demissioon = new Demissioon();
  filtredCongeList: Demissioon[] = [];
  CongeList() {
    this.demService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item => item.idUserCreator == this.UserIdConnected)
    })
  }

  populateForm(conge: Demissioon) {
    this.demService.formData = Object.assign({}, conge)
    this.dem = Object.assign({}, conge)
    console.log(this.dem)
  }

  p: Number = 1;
  count: Number = 5;
  onSubmit(form: NgForm) {
    if (this.dem.etat == 'في الانتظار') {
      this.demService.PutObservableE(this.dem).subscribe(
        res => {
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          form.resetForm();
          this.CongeList();
        },
        err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');
        }
      )
    } if (this.dem.etat == 'موافق') {
      this.toastr.error('لقد تمت الموافقة على طلب الإجازة', ' لم يتم التحديث');
    } if (this.dem.etat == 'رفض') {
      this.toastr.error('لقد تم رفض طلب الإجازة', ' لم يتم التحديث');
    }
  }


}
