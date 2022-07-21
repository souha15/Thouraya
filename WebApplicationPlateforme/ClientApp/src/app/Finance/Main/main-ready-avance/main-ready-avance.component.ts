import { Component, OnInit } from '@angular/core';
import { Avance } from '../../../shared/Models/Finance/avance.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { AvanceService } from '../../../shared/Services/Finance/avance.service';

@Component({
  selector: 'app-main-ready-avance',
  templateUrl: './main-ready-avance.component.html',
  styleUrls: ['./main-ready-avance.component.css']
})
export class MainReadyAvanceComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private avanceService: AvanceService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getDep();

  }
  p: Number = 1;
  count: Number = 5;
  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }

  factList: Avance[] = [];
  GfactList: Avance[] = [];
  getDep() {
    this.avanceService.Get().subscribe(res => {
      this.GfactList = res;
      this.factList = this.GfactList.filter(item => item.etatetab == "في الإنتظار" && item.etatC == "موافقة")
    })
  }

  factId: number
  fact: Avance = new Avance();
  etatok: boolean;
  populateForm(facture: Avance) {
    this.avanceService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);

  }

  raisonRefus: string;
  raison(event) {
    this.raisonRefus = event.target.value;
  }

  date = new Date().toLocaleDateString();
  accept() {
    this.fact.etatetab = "موافقة"
    this.fact.dateetab = this.date;

    this.fact.idtetab = this.UserIdConnected;
    this.fact.nomtetab = this.UserNameConnected;

    this.avanceService.PutObservableE(this.fact).subscribe(res => {
      this.getDep();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }
  refuse() {


    if (this.raisonRefus != null) {
      this.fact.raisonRefusD = this.raisonRefus;
      this.fact.attribut2 = "رفض"
      this.fact.etatetab = "رفض"
      this.fact.dateetab = this.date;
      this.fact.idtetab = this.UserIdConnected
      this.fact.nomtetab = this.UserNameConnected;


      this.avanceService.PutObservableE(this.fact).subscribe(res => {
        this.getDep();
        this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
      },
        err => {
          this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
        })
    } else {
      this.toastr.error('اكتب سبب الرفض ', ' فشل');
    }
  }

  transfererA: string;
  transfertData(event) {
    this.transfererA = event.target.value;
  }

  transferer() {
    this.fact.transferera = this.transfererA;
    this.avanceService.PutObservableE(this.fact).subscribe(res => {
      this.toastr.success("تم  تحويل  الطلب بنجاح", "نجاح");
      this.getDep();
    },
      err => {
        this.toastr.warning('لم يتم  تحويل  الطلب بنجاح', ' فشل');
      })
  }
}
