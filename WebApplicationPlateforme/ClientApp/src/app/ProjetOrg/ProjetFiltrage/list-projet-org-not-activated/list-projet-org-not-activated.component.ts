import { Component, OnInit } from '@angular/core';
import { ProjetOrgService } from '../../../shared/Services/ProjetOrg/projet-org.service';
import { ProjetOrg } from '../../../shared/Models/ProjetOrg/projet-org.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-projet-org-not-activated',
  templateUrl: './list-projet-org-not-activated.component.html',
  styleUrls: ['./list-projet-org-not-activated.component.css']
})
export class ListProjetOrgNotActivatedComponent implements OnInit {


  constructor(private projetService: ProjetOrgService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getList();
  }


  p: Number = 1;
  count: Number = 5;
  EvList2: ProjetOrg[] = [];
  EvList: ProjetOrg[] = [];
  getList() {
    this.projetService.Get().subscribe(res => {
      this.EvList2 = res
      this.EvList = this.EvList2.filter(item => item.etat == "غير مفعلة")
    })
  }

  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';

  onSubmit(form: NgForm) {
    this.projetService.PutObservableE(this.pr).subscribe(res => {
      this.succ = true;
      this.failed = false;
      this.msg = "  تم التحديث بنجاح"
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.getList();
      form.resetForm
    },
      err => {
        this.failed = true;
        this.succ = false;
        this.msg = "  فشل عند التحديث"
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      })
  }
  pr: ProjetOrg = new ProjetOrg();
  populateForm(conge: ProjetOrg) {
    this.pr = Object.assign({}, conge)
  }
}
