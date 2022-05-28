import { Component, OnInit } from '@angular/core';
import { EquipementService } from '../../../shared/Services/Rh/equipement.service';
import { Equipement } from '../../../shared/Models/RH/equipement.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-equi',
  templateUrl: './histo-equi.component.html',
  styleUrls: ['./histo-equi.component.css']
})
export class HistoEquiComponent implements OnInit {

  constructor(private congeService: EquipementService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.CongeList();
    this.resetForm();
  }
  p: Number = 1;
  count: Number = 5;
  //Get Conge Demand Lis

  congeList: Equipement[] = [];
  filtredCongeList: Equipement[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }

  per: Equipement = new Equipement();
  val: string;
  test0: boolean = false;
  test50: boolean = false;
  test100: boolean = false;
  populateForm(conge: Equipement) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)

    if (this.per.attribut2 == 'موافق') {
      this.val = '100%'
      this.test100 = true;
      this.test50 = false
      this.test0 = false;
    }

    if (this.per.etatdir == 'في الانتظار') {
      this.val = '0%'
      this.test100 = false;
      this.test50 = false
      this.test0 = true;
    }

    if (this.per.etatdir == "موافق"){
      this.val = '50%'
      this.test100 = false;
      this.test50 = true
      this.test0 = false;
    }
 
  }

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  conge: Equipement = new Equipement();
  date = new Date().toLocaleDateString();

  updateRecord(form: NgForm) {
    this.conge = Object.assign(this.conge, form.value);
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
