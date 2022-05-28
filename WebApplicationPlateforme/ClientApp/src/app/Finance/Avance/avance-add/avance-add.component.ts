import { Component, OnInit } from '@angular/core';
import { AvanceService } from '../../../shared/Services/Finance/avance.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Avance } from '../../../shared/Models/Finance/avance.model';
import { NgForm } from '@angular/forms';
import { AdministrationService } from '../../../shared/Services/Administration/administration.service';
import { EtablissementService } from '../../../shared/Services/Etablissement/etablissement.service';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';

@Component({
  selector: 'app-avance-add',
  templateUrl: './avance-add.component.html',
  styleUrls: ['./avance-add.component.css']
})
export class AvanceAddComponent implements OnInit {

  constructor(private avanceService: AvanceService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private adminService: AdministrationService,
    private depService: EtablissementService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }
  nom: string;     
  UserIdConnected: string;
  UserNameConnected: string;
  notif: Notif = new Notif();
  dirID: string;
  adminId: number = 28;
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.av.idUserCreator = res.id;
      this.av.userNameCreator = res.fullName;
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.nom = res.nomAdministration
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "طلب إستقالة  من الموظف  " + res.fullName
      this.notif.serviceName = "طلب إستقالة "
      this.notif.readUnread = "0";
      this.notif.serviceId = 1;
      this.av.attribut3 = "32618446-df21-4ca1-b366-f639f41a7a7c";
      this.av.attribut4 = "د. محمد بن إبراهيم عوض الصواط ";
      this.notif.userReceiverId = "32618446-df21-4ca1-b366-f639f41a7a7c";
      this.notif.userReceiverName = "د. محمد بن إبراهيم عوض الصواط ";


    })
  }

  av: Avance = new Avance();
  idf: number;
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  dateTime = new Date();
  onSubmit(form: NgForm) {
    this.av.dateenreg = this.date;
    this.av.attribut2 = "في الإنتظار";
    this.av.etatC = "في الإنتظار";
    this.av.etatD = "في الإنتظار"
    this.av.attribut5 = "في الإنتظار"
    this.av.etatetab = "في الإنتظار"
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true;
      this.avanceService.Add(this.av).subscribe(
        res => {
          this.notifService.Add(this.notif).subscribe(res => {
          
          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
            form.resetForm();
          })
        },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        }

      )
    }
  }
}
