import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CreationTravailDemandeService } from '../../../shared/Services/ServiceRh/creation-travail-demande.service';
import { CrationTravailDemande } from '../../../shared/Models/ServiceRh/cration-travail-demande.model';
import { NgForm } from '@angular/forms';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';

@Component({
  selector: 'app-creation-list-dir',
  templateUrl: './creation-list-dir.component.html',
  styleUrls: ['./creation-list-dir.component.css']
})
export class CreationListDirComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private ctService: CreationTravailDemandeService,
    private notifService: NotifService
  ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();

  }

  UserIdConnected: string;
  UserNameConnected: string;
  position: string
  notif: Notif = new Notif();
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.position = res.position;
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.dateTime.toString();
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = " تمت الموافقة على طلب استحداث وظيفة  من قبل" + ' ' + res.fullName
      this.notif.serviceName = "طلب استحداث وظيفة"
      this.notif.readUnread = "0";
      this.notif.serviceId = 3;
      this.UserService.getAdminFinDir().subscribe(resDir => {
        this.notif.userReceiverId = resDir.id;
        this.notif.userReceiverName = resDir.fullName;
      })
      })

  }


  factList: CrationTravailDemande[] = [];
  GfactList: CrationTravailDemande[] = [];

  getCreance() {
    this.ctService.Get().subscribe(res => {
      this.GfactList = res;

      this.factList = this.GfactList.filter(item => item.etatdg == "في الإنتظار" && item.etatrh == "موافقة")

    })

  }

  date = new Date().toLocaleDateString();
  accept() {
     this.fact.etat = "موافقة"
    this.fact.datedg = this.date;
    this.fact.etatdg = "موافقة"
    this.fact.iddg = this.UserIdConnected;
    this.fact.nomdg = this.UserNameConnected;
    this.ctService.PutObservableE(this.fact).subscribe(res => {
      this.notifService.Add(this.notif).subscribe(res => {
        this.getCreance();
        this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
      })
    
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }


  factId: number
  fact: CrationTravailDemande = new CrationTravailDemande();
  populateForm(facture: CrationTravailDemande) {
    this.ctService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }


  refuse() {
    this.fact.etat = "رفض"
    this.fact.datedg = this.date;
    this.fact.etatdg = "رفض"
    this.fact.iddg = this.UserIdConnected;
    this.fact.nomdg = this.UserNameConnected;

      this.ctService.PutObservableE(this.fact).subscribe(res => {
        this.getCreance();
        this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
      },
        err => {
          this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
        })

  }

}
