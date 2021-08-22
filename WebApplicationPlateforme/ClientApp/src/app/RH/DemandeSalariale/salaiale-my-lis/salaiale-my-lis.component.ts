import { Component, OnInit } from '@angular/core';
import { DemandeSalarialeService } from '../../../shared/Services/Rh/demande-salariale.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { DemandeSalariale } from '../../../shared/Models/RH/demande-salariale.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-salaiale-my-lis',
  templateUrl: './salaiale-my-lis.component.html',
  styleUrls: ['./salaiale-my-lis.component.css']
})
export class SalaialeMyLisComponent implements OnInit {

  constructor(private congeService: DemandeSalarialeService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }


  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
    this.resetForm();
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

  congeList: DemandeSalariale[] = [];
  filtredCongeList: DemandeSalariale[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item => item.idUserCreator == this.UserIdConnected)
    })
  }

  //Edit Administration
  congeId: number;
  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }
  date = new Date().toLocaleDateString();
  conge: DemandeSalariale = new DemandeSalariale();
  updateRecord(form: NgForm) {
    
    this.conge = Object.assign(this.conge, form.value);
    console.log(this.conge);
    this.congeId = this.conge.id;
    this.congeService.formData.etatdate = this.date;
    if (this.conge.etat == "في الانتظار") {
      this.congeService.Edit().subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.resetForm();
        this.CongeList();
      },
        err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');
        }


      )
    } if (this.conge.etat == 'موافق') {
      this.toastr.error('لقد تمت الموافقة على طلب  مشهد براتب', ' لم يتم التحديث');
    } if (this.conge.etat == 'رفض') {
      this.toastr.error('لقد تم رفض طلب  مشهد براتب', ' لم يتم التحديث');
    }
  }


  populateForm(conge: DemandeSalariale) {
    this.congeService.formData = Object.assign({}, conge)
    this.congeId = conge.id

  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      type: '',
      date: '',
      langue: '',
      organisme: '',
      attribut1: '',
      attribut2: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',
      dirnom: '',
      dirid: '',
      etat: '',
      etatdate: '',

    }
  }
}

