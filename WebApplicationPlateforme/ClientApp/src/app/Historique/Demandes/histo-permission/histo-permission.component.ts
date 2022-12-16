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

  constructor(private permissionService: PermissionUService,
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
    this.permissionService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }



  per: PermissionU = new PermissionU();
  rslt: any;
  populateForm(conge: PermissionU) {
    this.per = Object.assign({}, conge)
    this.permissionService.formData = Object.assign({}, conge)
    this.permissionService.GetPersmissionHistorique(this.per.id).subscribe(res => {
      this.rslt = res.attribut6

    })
  }


  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  date = new Date().toLocaleDateString();
  conge: PermissionU = new PermissionU();

  updateRecord(form: NgForm) {

    this.conge = Object.assign(this.conge, form.value);
    this.permissionService.Edit().subscribe(res => {

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
      this.permissionService.Delete(id)
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
    this.permissionService.formData = {
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
      userName1: '', userId1: '', userEtat1: '', userDate1: '',
      userName2: '', userId2: '', userEtat2: '', userDate2: '',
      userName3: '', userId3: '', userEtat3: '', userDate3: '',
      userName4: '', userId4: '', userEtat4: '', userDate4: '',
      userName5: '', userId5: '', userEtat5: '', userDate5: '',
      userName6: '', userId6: '', userEtat6: '', userDate6: '',
      userName7: '', userId7: '', userEtat7: '', userDate7: '',
      userName8: '', userId8: '', userEtat8: '', userDate8: '',
    }
  }
}
