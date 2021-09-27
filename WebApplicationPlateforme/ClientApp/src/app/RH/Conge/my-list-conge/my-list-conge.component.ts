import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../../shared/Services/Rh/conge.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Conge } from '../../../shared/Models/RH/conge.model';
import { NgForm } from '@angular/forms';
import { SoldeCongeService } from '../../../shared/Services/Rh/solde-conge.service';
import { SoldeConge } from '../../../shared/Models/RH/solde-conge.model';

@Component({
  selector: 'app-my-list-conge',
  templateUrl: './my-list-conge.component.html',
  styleUrls: ['./my-list-conge.component.css']
})
export class MyListCongeComponent implements OnInit {

  filter;
  constructor(private congeService: CongeService,
    private toastr: ToastrService,
    private soldeService: SoldeCongeService,
    private UserService: UserServiceService,
    

  ) { }
  p: Number = 1;
  count: Number = 5;
  ngOnInit(): void {
    this.getUserConnected();
    this.resetForm();
    this.CongeList();
    this.UserList();
  }

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
  solde: SoldeConge = new SoldeConge();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.soldeService.GetSolde(this.UserIdConnected).subscribe(res => {
        this.solde = res;

      })
    })

  }



  //Get Conge Demand Lis

  congeList: Conge[] = [];
  filtredCongeList: Conge[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item => item.idUserCreator == this.UserIdConnected)

      this.filtredCongeList.forEach(item => {
        if (item.transferera != null) {

          if (item.transferera == "1") {

            item.attribut2 = item.etatetab

          } else if (item.transferera == "2") {
            item.attribut2 = item.etatrh
          } else {
            if (item.etatrh == "موافق" && item.etatetab == "موافق") {
              item.attribut2 = "موافق"
            } else if (item.etatrh == "رفض" || item.etatetab == "رفض") {
              item.attribut2 = "رفض"
            } else if (item.etatrh == "في الانتظار" || item.etatetab == null) {
              item.attribut2 ="في الانتظار"
            }
          }
        }

      })
    })
  }





  //Edit Administration
  congeId: number;
  onSubmit(form: NgForm) {
    this.updateRecord(form)
  }

  getRemplacant(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.conge.nomremplacant = res.fullName

    })
  }
  conge: Conge = new Conge();
  updateRecord(form: NgForm) {
  
      this.congeService.PutObservableE(this.conge).subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        form.resetForm();
        this.CongeList();
      },
        err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');
        }


      )
    
  }


  populateForm(conge: Conge) {
    this.congeService.formData = Object.assign({}, conge)
    this.congeId = conge.id
    this.conge = Object.assign({}, conge);
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      transferera: '',
      transfereretab: '',
      transfertrh: '',
      transfertdeux: '',
      datetransfert: '',
      idtrh: '',
      idtetab: '',
      nomtrh: '',
      nomtetab: '',
      etatrh: '',
      etatetab: '',
      daterh: '',
      dateetab: '',
      tran1: '',
      tran2: '',
      tran3: '',
      tran4: '',
      tran5: '',
      tran6: '',
      datedebut: '',
      datefin: '',
      duree: '',
      tel: '',
      type: '',
      adr: '',
      idremplacant: '',
      nomremplacant: '',
      etat: '',
      etatd: '',
      directeurid: '',
      directeurnom: '',
      rhid: '',
      rhnom: '',
      dated: '',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',

    }
  }


  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {

        this.congeService.Delete(Id)
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
}

