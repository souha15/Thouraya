import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { AvanceService } from '../../../shared/Services/Finance/avance.service';
import { Avance } from '../../../shared/Models/Finance/avance.model';
import { NgForm } from '@angular/forms';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';

@Component({
  selector: 'app-avance-list-c',
  templateUrl: './avance-list-c.component.html',
  styleUrls: ['./avance-list-c.component.css']
})
export class AvanceListCComponent implements OnInit {


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
      this.notif.serviceId = 3;
      this.UserService.getAdminFinDir().subscribe(resDir => {
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
      this.factList = this.GfactList.filter(item => (item.transferera == "1" || item.transferera == "3") || (item.etatC == "في الإنتظار" && item.etatD == "موافقة"))
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

    this.fact.etatC = "موافقة"
    this.fact.attribut2 = "موافقة"
    this.fact.dateC = this.date;
    this.fact.idC = this.UserIdConnected
    this.fact.nomC = this.UserNameConnected;
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
      this.fact.raisonRefusC = this.raisonRefus;
      this.fact.attribut2 = "رفض"
      this.fact.etatC = "رفض"
      this.fact.dateC = this.date;

      this.fact.idC = this.UserIdConnected;
      this.fact.nomC = this.UserNameConnected;


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
