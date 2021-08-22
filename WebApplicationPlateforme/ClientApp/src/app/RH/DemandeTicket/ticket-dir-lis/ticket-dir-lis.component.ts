import { Component, OnInit } from '@angular/core';
import { DemandeTicketService } from '../../../shared/Services/Rh/demande-ticket.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { DemandeTicket } from '../../../shared/Models/RH/demande-ticket.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-ticket-dir-lis',
  templateUrl: './ticket-dir-lis.component.html',
  styleUrls: ['./ticket-dir-lis.component.css']
})
export class TicketDirLisComponent implements OnInit {

  constructor(private congeService: DemandeTicketService,
    private toastr: ToastrService,
    private UserService: UserServiceService, ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
    this.resetForm();
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
    })

  }

  congeList: DemandeTicket[] = [];
  filtredCongeList: DemandeTicket[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item => item.dirid == this.UserIdConnected && item.etat == "في الانتظار")
    })
  }

  perc: string;

  percentageetat(event) {
    this.perc = event.target.value;
    if (this.perc == "موافق") {
      this.congeService.formData.etat = "50%"
    }
  }

  per: DemandeTicket = new DemandeTicket();

  populateForm(conge: DemandeTicket) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
  }

  date = new Date().toLocaleDateString();
  conge: DemandeTicket = new DemandeTicket();

  updateRecord(form: NgForm) {

    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.etatdate = this.date;
    this.congeService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.resetForm();
      this.CongeList();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )

  }

  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      nom: '',
      titre: '',
      regcivil: '',
      num: '',
      place: '',
      photosPath: '',
      dateenreg: '',
      dirnom: '',
      dirid: '',
      etat: '',
      etatdate: '',
      userNameCreator: '',
      idUserCreator: '',

    }
  }
}

