import { Component, OnInit } from '@angular/core';
import { CreationTravailDemandeService } from '../../../shared/Services/ServiceRh/creation-travail-demande.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CrationTravailDemande } from '../../../shared/Models/ServiceRh/cration-travail-demande.model';
import { NgForm } from '@angular/forms';
import { AdministrationService } from '../../../shared/Services/Administration/administration.service';
import { Administration } from '../../../shared/Models/Administration/administration.model';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';

@Component({
  selector: 'app-creation-add',
  templateUrl: './creation-add.component.html',
  styleUrls: ['./creation-add.component.css']
})
export class CreationAddComponent implements OnInit {

  constructor(
    private ctService: CreationTravailDemandeService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private adminService: AdministrationService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  dir: string;
  dirid: string;
  position: string;
  admindir: string;
  nom: string;
  notif: Notif = new Notif();
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.position = res.position;
      this.nom = res.nomAdministration
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "طلب استحداث وظيفة من الموظف  " + res.fullName
      this.notif.serviceName = "طلب استحداث وظيفة"
      this.notif.readUnread = "0";
      this.notif.serviceId = 2;
      this.UserService.getAdminDir(res.id).subscribe(resDir => {
        if (resDir != null) {
          this.ct.iddir = resDir.id;
          this.ct.nomdir = resDir.fullName;
          this.notif.userReceiverId = resDir.attribut1;
          this.notif.userReceiverName = resDir.directeur;
        }


      })


    })
  }

  ct: CrationTravailDemande = new CrationTravailDemande();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();

  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.ct.dateenreg = this.date;
      this.ct.etat = 'في الإنتظار';
      this.ct.etatdg = "في الإنتظار";
      this.ct.etatdir = "في الإنتظار";
      this.ct.etatrh = "في الإنتظار";
      this.ct.titreposte = this.position;
      this.ct.idUserCreator = this.UserIdConnected;
      this.ct.userNameCreator = this.UserNameConnected;

      this.ctService.Add(this.ct).subscribe(res => {
 
        this.notifService.Add(this.notif).subscribe(res => {
       
        form.resetForm();
          this.toastr.success("تم التسجيل  بنجاح", " تسجيل ");
        })
      },
        err => {
          this.toastr.error("فشل التسجيل  الطلب", " تسجيل ")
        }
      )
    }
  }
}
