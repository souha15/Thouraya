import { Component, OnInit } from '@angular/core';
import { ProjetOrgService } from '../../../shared/Services/ProjetOrg/projet-org.service';
import { ProjetOrg } from '../../../shared/Models/ProjetOrg/projet-org.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-projet-org-activated',
  templateUrl: './list-projet-org-activated.component.html',
  styleUrls: ['./list-projet-org-activated.component.css']
})
export class ListProjetOrgActivatedComponent implements OnInit {


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
      this.EvList = this.EvList2.filter(item => item.etat == "مفعلة")
    })
  }

  onSubmit(form: NgForm) {
    this.projetService.PutObservableE(this.pr).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.getList();
      form.resetForm
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      })
  }
  pr: ProjetOrg = new ProjetOrg();
  populateForm(conge: ProjetOrg) {
    this.pr = Object.assign({}, conge)
  }
}
