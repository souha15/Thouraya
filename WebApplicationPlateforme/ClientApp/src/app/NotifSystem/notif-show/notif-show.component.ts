import { Component, OnInit } from '@angular/core';
import { NotifService } from '../../shared/Services/NotifSystem/notif.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Notif } from '../../shared/Models/NotifSystem/notif.model';
import { Router } from '@angular/router';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { SignalRService, AutomaticNotification } from '../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-notif-show',
  templateUrl: './notif-show.component.html',
  styleUrls: ['./notif-show.component.css']
})
export class NotifShowComponent implements OnInit {

  constructor(private notifService: SignalRService,
    private UserService: UserServiceService,
    private router: Router,) { }

  ngOnInit(): void {
    this.getUserConnected();
  }
  
  UserIdConnected: string;
  UserNameConnected: string;
  ListUnreadServices: AutomaticNotification[] = [];
  ListUnreadDotations: AutomaticNotification[] = [];
  ListUnreadMedia: AutomaticNotification[] = [];
  user: UserDetail = new UserDetail();
  async getUserConnected(): Promise<any>  {
    this.user = await this.UserService.getUserConnected();

    this.UserIdConnected = this.user.id;
    this.UserNameConnected = this.user.fullName;
    this.notifService.GetUnreadServicesNotificationByUser(this.UserIdConnected).subscribe(res => {
      this.ListUnreadServices = res;
   
    })
    this.notifService.GetUnreadMediaNotificationByUser(this.UserIdConnected).subscribe(res => {
      this.ListUnreadMedia = res;

    })
    this.notifService.GetUnreadDotationsNotificationByUser(this.UserIdConnected).subscribe(res => {
      this.ListUnreadDotations = res;

    })
  }

  notif: AutomaticNotification = new AutomaticNotification();
  id: number;
  updateNotif(item: AutomaticNotification) {
    this.notif = Object.assign({}, item);
    this.notif.vu = "1"
    this.notifService.UpdateNotif(this.notif).subscribe(res => {
      

    })
  }
  //id: number;
  //notif: Notif = new Notif();
  //populateForm(notif: Notif) {
  //  this.notifService.formData = Object.assign({}, notif)
  //  this.notif = Object.assign({}, notif);
  //  this.notif.readUnread = "1"
  //  this.notifService.PutObservable(this.notif).subscribe(res => {

  //    if (this.notif.serviceName == "طلب سلفة " && this.notif.serviceId == 1) {
  //      this.router.navigate(['/avance-list-d'])
  //    }

  //    else if (this.notif.serviceName == "طلب إستقالة " && this.notif.serviceId == 1) {

  //      this.router.navigate(['/demissio-listdir'])
  //    }
  //    else if (this.notif.serviceName == "طلب  تسديد مستحقات مالية" && this.notif.serviceId == 4) {
  //      this.router.navigate(['/salaire-menu2'])
  //    }

    
  //    else if (this.notif.serviceName == "طلب استحداث وظيفة" && this.notif.serviceId == 2) {
  //      this.router.navigate(['/creation-list-dir-g'])
  //    }
  //    else if (this.notif.serviceName == "طلب إجازة" && this.notif.serviceId == 3) {
  //      this.router.navigate(['/validate-conge'])
  //    }

  //    else if (this.notif.serviceName == "طلب إجازة" && this.notif.serviceId == 5) {
  //      this.router.navigate(['/salaire-report-print'])
  //    }

  //    else if (this.notif.serviceName == "طلب إجازة" && this.notif.serviceId == 6) {
  //      this.router.navigate(['/rh-conge-list'])
  //    }

  //    else if (this.notif.serviceName == "طلب دورة تدريبية" && this.notif.serviceId == 3) {
  //      this.router.navigate(['/my-priv-list'])
  //    }

  //    else if (this.notif.serviceName == "طلب استحداث وظيفة" && this.notif.serviceId == 3) {
  //      this.router.navigate(['/priv-list-rh'])
  //    }

  //    else if (this.notif.serviceName == "طلب عهدة" && this.notif.serviceId == 4) {
  //      this.router.navigate(['/equipement-list-rh'])
  //    }

  //    else if (this.notif.serviceName == "طلب إذن" && this.notif.serviceId == 6) {
  //      this.router.navigate(['/permession-list-rh'])
  //    }

  //    else if (this.notif.serviceName == "طلب ساعات إضافية" && this.notif.serviceId == 6) {
  //      this.router.navigate(['/demande-supp-heure-listcreator'])
  //    }
  //    else if (this.notif.serviceName == "طلب انهاء عقد" && this.notif.serviceId == 6) {
  //      this.router.navigate(['/demission-edit'])
  //    }
  //    else if (this.notif.serviceName == "طلب المستحقات المالية" && this.notif.serviceId == 6) {
  //      this.router.navigate(['/cre-finan-list-accepted'])
  //    }

  //    else if (this.notif.serviceName == "طلب دورة تدريبية" && this.notif.serviceId == 6) {
  //      this.router.navigate(['/demande-formation-list-rh'])
  //    }

  //    else if (this.notif.serviceName == "طلب سلفة" && this.notif.serviceId == 5) {
  //      this.router.navigate(['/avance-list-c'])
  //    }

  //    else if (this.notif.serviceName == "طلب سلفة" && this.notif.serviceId == 3) {
  //      this.router.navigate(['/main-ready-avance'])
  //    }

  //    else if (this.notif.serviceName == "طلب ساعات إضافية" && this.notif.serviceId == 3) {
  //      this.router.navigate(['/priv-list-dir'])
  //    }

  //    else if (this.notif.serviceName == "طلب استحداث وظيفة" && this.notif.serviceId == 1) {
  //      this.router.navigate(['/creation-list-dir-g'])
  //    }

  //    else if (this.notif.serviceName == "طلب المستحقات المالية" && this.notif.serviceId == 1) {
  //        this.router.navigate(['/cre-finan-list-director'])
  //    }

  //    else if (this.notif.serviceName == "طلب صرف شيك") {
  //        this.router.navigate(['/new-cheque-list-dir-directe'])
  //    }

  //    else if (this.notif.serviceName == "طلب صرف شيك" && this.notif.serviceId == 5) {
  //        this.router.navigate(['/new-cheque-list-etab-fin'])
  //    }

  //    else if (this.notif.serviceName == "طلب صرف شيك" && this.notif.serviceId == 3) {
  //        this.router.navigate(['/new-cheque-list-dir-fin'])
  //    }

  //    else if (this.notif.serviceName == "طلب صرف شيك" && this.notif.serviceId == 1) {
  //        this.router.navigate(['/new-cheque-list-dir-general'])
  //    }

  //    else if (this.notif.serviceName == "طلب صرف شيك" && this.notif.serviceId == 7) {
  //      this.router.navigate(['/new-cheque-list-box-men'])
  //    }
     

  //    else {
  //      this.router.navigate(['/menurequests'])
  //    }
  //  })
  //}
}
