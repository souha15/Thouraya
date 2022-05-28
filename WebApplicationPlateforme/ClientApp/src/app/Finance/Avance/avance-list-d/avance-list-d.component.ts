import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { AvanceService } from '../../../shared/Services/Finance/avance.service';
import { Avance } from '../../../shared/Models/Finance/avance.model';
import { NgForm } from '@angular/forms';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';

@Component({
  selector: 'app-avance-list-d',
  templateUrl: './avance-list-d.component.html',
  styleUrls: ['./avance-list-d.component.css']
})
export class AvanceListDComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private avanceService: AvanceService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getDep();

  }
  p: Number = 1;
  count: Number = 5;
  UserIdConnected: string;
  UserNameConnected: string;

  notif: Notif = new Notif();
  dateTime = new Date();

  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = " تمت الموافقة على طلب سلفة  من قبل" + ' ' + res.fullName
      this.notif.serviceName = "طلب سلفة"
      this.notif.readUnread = "0";
      this.notif.serviceId = 5;
      this.UserService.GetEtabFin().subscribe(resDir => {
        this.notif.userReceiverId = resDir.id;
        this.notif.userReceiverName = resDir.fullName;
      })

    })
  }

  factList: Avance[] = [];
  GfactList: Avance[] = [];
  getDep() {
    this.avanceService.Get().subscribe(res => {
      this.GfactList = res;
      this.factList = this.GfactList.filter(item => item.etatD == "في الإنتظار")
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
    //this.fact.attribut2 = "موافقة"
    this.fact.etatD = "موافقة"
    this.fact.dateD = this.date;
    this.fact.idD = this.UserIdConnected
    this.fact.idC = this.UserNameConnected;


    this.fact.idD = this.UserIdConnected;
    this.fact.nomD = this.UserNameConnected;
    this.avanceService.PutObservableE(this.fact).subscribe(res => {
      this.notifService.Add(this.notif).subscribe(res => {
        this.getDep();
        this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
      })

    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }
  refuse() {


    if (this.raisonRefus != null) {
      this.fact.raisonRefusD = this.raisonRefus;
      this.fact.attribut2 = "رفض"
      this.fact.etatD = "رفض"
      this.fact.dateD = this.date;
      this.fact.idD = this.UserIdConnected
      this.fact.idC = this.UserNameConnected;


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

}

