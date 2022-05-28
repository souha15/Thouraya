import { Component, OnInit } from '@angular/core';
import { DemandeTicketService } from '../../../shared/Services/Rh/demande-ticket.service';
import { DemandeTicket } from '../../../shared/Models/RH/demande-ticket.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-ticket-employee',
  templateUrl: './histo-ticket-employee.component.html',
  styleUrls: ['./histo-ticket-employee.component.css']
})
export class HistoTicketEmployeeComponent implements OnInit {

  constructor(private congeService: DemandeTicketService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.CongeList();
    this.resetForm();
  }

  congeList: DemandeTicket[] = [];
  filtredCongeList: DemandeTicket[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
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


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.congeService.Delete(id)
        .subscribe(res => {
          this.CongeList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');
          }
        )

    }

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
