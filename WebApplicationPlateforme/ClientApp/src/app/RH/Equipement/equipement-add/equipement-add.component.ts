import { Component, OnInit } from '@angular/core';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { EquipementService } from '../../../shared/Services/Rh/equipement.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Equipement } from '../../../shared/Models/RH/equipement.model';
import { NgForm } from '@angular/forms';
import { AdministrationService } from '../../../shared/Services/Administration/administration.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';

@Component({
  selector: 'app-equipement-add',
  templateUrl: './equipement-add.component.html',
  styleUrls: ['./equipement-add.component.css']
})
export class EquipementAddComponent implements OnInit {

  constructor(private tblService: TbListeningService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private equipementService: EquipementService,
    private adminService: AdministrationService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    this.getNomEquipementList();
    this.getTypeEquipementList();
    this.getUserConnected();
  }

  // Get User Connected

  nom: string;
  notif: Notif = new Notif();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      if (res.attribut1 != null) {
        this.equ.nomdir = res.directeur;
        this.equ.iddir = res.attribut1;
        this.notif.userReceiverId = res.attribut1;
        this.notif.userReceiverName = res.directeur;
      }
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "طلب عهدة من الموظف  " + res.fullName
      this.notif.serviceName = "طلب عهدة"
      this.notif.readUnread = "0";
      this.equ.userNameCreator = res.fullName;
      this.equ.idUserCreator = res.id;
      this.nom = "الأوقاف والخدمات";
      this.adminService.GetAdminData(this.nom).subscribe(resp => {

        this.UserService.GetUserByUserName2(resp.nomDirecteur).subscribe(res => {
          this.equ.attribut3 = res.id;
          this.equ.attribut5 = res.fullName;
        })
      })

    })

  }



  //Type Equipement

  typeEquipement: TbListening[] = [];
  getTypeEquipementList() {
    this.tblService.GetE().subscribe(res => {
      this.typeEquipement = res
    })
  }


  //Type Equipement

  nomEquipement: TbListening[] = [];
  getNomEquipementList() {
    this.tblService.GetN().subscribe(res => {
      this.nomEquipement = res
    })
  }

  //Add Equipement
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  equ: Equipement = new Equipement();
  dateTime = new Date();
  onSubmit(form: NgForm) {
    this.equ.etatdir = "في الانتظار";
    this.equ.attribut2 = "في الانتظار";
    this.equ.attribut4 = "في الانتظار";
    this.equ.dateenreg = this.date;
    this.equ.date = this.date;
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true

      this.equipementService.Add(this.equ).subscribe(
        res => {
          this.notif.serviceId = res.id;
          this.notifService.Add(this.notif).subscribe(res => {

          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
            form.resetForm();
          })
        },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }
}
