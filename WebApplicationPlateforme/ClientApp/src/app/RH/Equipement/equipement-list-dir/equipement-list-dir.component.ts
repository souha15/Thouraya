import { Component, OnInit } from '@angular/core';
import { EquipementService } from '../../../shared/Services/Rh/equipement.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Equipement } from '../../../shared/Models/RH/equipement.model';
import { NgForm } from '@angular/forms';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
@Component({
  selector: 'app-equipement-list-dir',
  templateUrl: './equipement-list-dir.component.html',
  styleUrls: ['./equipement-list-dir.component.css']
})
export class EquipementListDirComponent implements OnInit {


  constructor(private congeService: EquipementService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private tblService: TbListeningService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
    this.resetForm();

    
  }
  p: Number = 1;
  count: Number = 5;
  notif: Notif = new Notif();
  dateTime = new Date();
  onSubmit(form: NgForm) {
    this.updateRecord(form)
  }

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  userc: UserDetail = new UserDetail();

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = " تمت الموافقة على طلب عهدة  من قبل" + ' ' + res.fullName
      this.notif.serviceName = "طلب عهدة"
      this.notif.readUnread = "0";
      this.notif.serviceId = 4;
      this.UserService.GetAdminDirProj().subscribe(resDir => {
        this.notif.userReceiverId = resDir.id;
        this.notif.userReceiverName = resDir.fullName;
      })
    })

  }



  //Get Conge Demand Lis

  congeList: Equipement[] = [];
  filtredCongeList: Equipement[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item => item.iddir == this.UserIdConnected && item.etatdir =="في الانتظار")
    })
  }


  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  conge: Equipement = new Equipement();
  date = new Date().toLocaleDateString();

  updateRecord(form: NgForm) {
    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.datedir = this.date;
    //this.congeService.formData.attribut2 = this.etat;
    this.congeService.Edit().subscribe(res => {
      this.notifService.Add(this.notif).subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.resetForm();
        this.CongeList();
      })
    
      },
        err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');
        }


      )

  }

  per: Equipement = new Equipement();
  populateForm(conge: Equipement) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)


  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      type: '',
      nom: '',
      email: '',
      tel: '',
      transfert: '',
      remarque: '',
      etatdir: '',
      date: '',
      datedir: '',
      iddir: '',
      nomdir: '',
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
}
