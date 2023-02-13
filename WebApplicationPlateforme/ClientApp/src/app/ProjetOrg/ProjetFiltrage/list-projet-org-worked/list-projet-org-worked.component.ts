import { Component, OnInit } from '@angular/core';
import { ProjetOrgService } from '../../../shared/Services/ProjetOrg/projet-org.service';
import { ProjetOrg } from '../../../shared/Models/ProjetOrg/projet-org.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-projet-org-worked',
  templateUrl: './list-projet-org-worked.component.html',
  styleUrls: ['./list-projet-org-worked.component.css']
})
export class ListProjetOrgWorkedComponent implements OnInit {


  constructor(private projetService: ProjetOrgService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getList();
  }


  p: Number = 1;
  count: Number = 5;
  EvList: ProjetOrg[] = [];
  EvList2: ProjetOrg[] = [];
  getList() {
    this.projetService.Get().subscribe(res => {
      this.EvList2 = res
      this.EvList = this.EvList2.filter(item => item.etat =="تحت الإنجاز")
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
