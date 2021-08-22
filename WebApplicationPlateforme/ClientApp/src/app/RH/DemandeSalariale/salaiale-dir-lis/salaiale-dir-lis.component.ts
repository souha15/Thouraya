import { Component, OnInit } from '@angular/core';
import { DemandeSalarialeService } from '../../../shared/Services/Rh/demande-salariale.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { DemandeSalariale } from '../../../shared/Models/RH/demande-salariale.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-salaiale-dir-lis',
  templateUrl: './salaiale-dir-lis.component.html',
  styleUrls: ['./salaiale-dir-lis.component.css']
})
export class SalaialeDirLisComponent implements OnInit {

  constructor(private congeService: DemandeSalarialeService,
    private toastr: ToastrService,
    private UserService: UserServiceService, ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
    this.resetForm();
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
    })

  }

  congeList: DemandeSalariale[] = [];
  filtredCongeList: DemandeSalariale[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item =>item.etat == "في الانتظار")
    })
  }

  perc: string;

  percentageetat(event) {
    this.perc = event.target.value;
    if (this.perc == "موافق") {
      this.congeService.formData.etat = "50%"
    }
  }

  per: DemandeSalariale = new DemandeSalariale();

  populateForm(conge: DemandeSalariale) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
  }

  date = new Date().toLocaleDateString();
  conge: DemandeSalariale = new DemandeSalariale();

  updateRecord(form: NgForm) {

    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.etatdate = this.date;
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
      type: '',
      date: '',
      langue: '',
      organisme: '',
      attribut1: '',
      attribut2: '',
      dateenreg: '',
      dirnom: '',
      dirid: '',
      etatdate: '',
      etat: '',
      userNameCreator: '',
      idUserCreator: '',

    }
  }
}

