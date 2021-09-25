import { Component, OnInit } from '@angular/core';
import { DemissionService } from '../../shared/Services/User Services/demission.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Demissioon } from '../../shared/Models/User Services/demissioon.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-experience-print',
  templateUrl: './experience-print.component.html',
  styleUrls: ['./experience-print.component.css']
})
export class ExperiencePrintComponent implements OnInit {

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
      this.filtredCongeList = this.congeList.filter(item => item.attibut1 == this.UserIdConnected && item.attribut3 == 'في الانتظار')
    })
  }

  per: Demissioon = new Demissioon();
  populateForm(conge: Demissioon) {
    this.demService.formData = Object.assign({}, conge)
    this.per = Object.assign({}, conge)

  }

  date = new Date().toLocaleDateString();

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }
  updateRecord(form: NgForm) {
    this.per.attribut4 = this.date;
    this.per.attribut3 = this.etat;

    this.demService.PutObservableE(this.per).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.CongeList();
      form.resetForm();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )

  }

  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }


  p: Number = 1;
  count: Number = 5;
}
