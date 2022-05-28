import { Component, OnInit } from '@angular/core';
import { PermissionUService } from '../../../shared/Services/User Services/permission-u.service';
import { PermissionU } from '../../../shared/Models/User Services/permission-u.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-permission',
  templateUrl: './histo-permission.component.html',
  styleUrls: ['./histo-permission.component.css']
})
export class HistoPermissionComponent implements OnInit {

  constructor(private congeService: PermissionUService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.CongeList();
    this.resetForm();
  }
  p: Number = 1;
  count: Number = 5;

  congeList: PermissionU[] = [];
  filtredCongeList: PermissionU[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }



  per: PermissionU = new PermissionU();
  val: string;
  test0: boolean = false;
  test50: boolean = false;
  test100: boolean = false;
  populateForm(conge: PermissionU) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
    if (this.per.etatdir == "موافق") {
      this.test100 = false;
      this.test0 = false;
      this.test50 = true;
      this.val = "50%"
    }

    if (this.per.etatdir == "في الانتظار") {
      this.val= "0%"
      this.test100 = false;
      this.test0 = true;
      this.test50 = false;
    }

    if (this.per.etat == "موافق") {
      this.test100 = true;
      this.val = "100%"
      this.test0 = false;
      this.test50 =false
    }
  }


  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  date = new Date().toLocaleDateString();
  conge: PermissionU = new PermissionU();

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
  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      date: '',
      type: '',
      autre: '',
      heuredeb: '',
      heurefin: '',
      raison: '',
      etat: '',
      etatdir: '',
      etatrh: '',
      iddir: '',
      idrh: '',
      nomrh: '',
      nomdir: '',
      datedir: '',
      daterh: '',
      creatorName: '',
      datenereg: '',
      attibut1: '',
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      idUserCreator: '',

    }
  }
}
