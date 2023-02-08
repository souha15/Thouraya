import { Component, OnInit } from '@angular/core';
import { RecrutementService } from '../../../shared/Services/Rh/recrutement.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Recrutement } from '../../../shared/Models/RH/recrutement.model';
@Component({
  selector: 'app-recrutement-list',
  templateUrl: './recrutement-list.component.html',
  styleUrls: ['./recrutement-list.component.css']
})
export class RecrutementListComponent implements OnInit {

  constructor(private congeService: RecrutementService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
    this.resetForm();
    this.UserList();
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

  congeList: Recrutement[] = [];
  filtredCongeList: Recrutement[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item => item.idUserCreator == this.UserIdConnected)
    })
  }


  //get Remplaçant Name
  rempl: string
  getRemplacant(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.rempl = res.fullName

    })
  }

  //Delete Conge

  delete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.congeService.Delete(id)
        .subscribe(res => {
          this.CongeList();
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
  congeId: number;
  onSubmit(form: NgForm) {
    this.updateRecord(form)
  }

  conge: Recrutement = new Recrutement();
  updateRecord(form: NgForm) {
    this.conge = Object.assign(this.conge, form.value);
    this.congeId = this.conge.id;
    console.log(this.conge.attribut3)
    this.congeService.formData.nomremplacant = this.rempl
    if (this.conge.userEtat1 == "في الإنتظار") {
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
      this.toastr.error('لقد تمت الموافقة على طلب الإنتداب', ' لم يتم التحديث');
    } if (this.conge.etat == 'رفض') {
      this.toastr.error('لقد تم رفض طلب الإنتداب', ' لم يتم التحديث');
    }
  }


  populateForm(conge: Recrutement) {
    this.congeService.formData = Object.assign({}, conge)
    this.congeId = conge.id

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
      nomremplacant: this.rempl,
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
      etat: '',
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
