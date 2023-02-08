import { Component, OnInit } from '@angular/core';
import { RecrutementService } from '../../../shared/Services/Rh/recrutement.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Recrutement } from '../../../shared/Models/RH/recrutement.model';

@Component({
  selector: 'app-recrutmenet-dir-list',
  templateUrl: './recrutmenet-dir-list.component.html',
  styleUrls: ['./recrutmenet-dir-list.component.css']
})
export class RecrutmenetDirListComponent implements OnInit {

  constructor(private congeService: RecrutementService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getUserConnected();
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
this.congeService.getDirList(this.UserIdConnected).subscribe(res => {
        this.filtredCongeList = res
    })
    })

  }

  congeList: Recrutement[] = [];
  filtredCongeList: Recrutement[] = [];
  CongeList(id) {
    this.congeService.getDirList(id).subscribe(res => {
      this.filtredCongeList = res
    })
  }

  per: Recrutement = new Recrutement();

  populateForm(conge: Recrutement) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
  }



  perc: string;
 
  percentageetat(event) {
    this.perc = event.target.value;
    if (this.perc == "موافق") {
      this.congeService.formData.attribut3 ="50%"
    }
  }
  date = new Date().toLocaleDateString();
  conge: Recrutement = new Recrutement();

  updateRecord(form: NgForm) {

    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.dated = this.date;
    this.congeService.formData.etatdir = this.perc;
    this.congeService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.resetForm();
      this.CongeList(this.UserIdConnected);
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
      datedebut: '',
      datefin: '',
      dure: '',
      organisme: '',
      idremplacant: '',
      nomremplacant: '',
      tache: '',
      etatdir: '',
      etatrh: '',
      iddir: '',
      idrh: '',
      nomrh: '',
      nomdir: '',
      dated: '',
      daterh: '',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',
      etat:'',
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
