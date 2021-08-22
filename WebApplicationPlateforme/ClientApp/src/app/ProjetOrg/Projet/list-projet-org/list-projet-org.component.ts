import { Component, OnInit } from '@angular/core';
import { ProjetOrgService } from '../../../shared/Services/ProjetOrg/projet-org.service';
import { ProjetOrg } from '../../../shared/Models/ProjetOrg/projet-org.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-projet-org',
  templateUrl: './list-projet-org.component.html',
  styleUrls: ['./list-projet-org.component.css']
})
export class ListProjetOrgComponent implements OnInit {

  constructor(private projetService: ProjetOrgService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getList();
  }


  p: Number = 1;
  count: Number = 5;
  EvList: ProjetOrg[] = [];
  getList() {
    this.projetService.Get().subscribe(res => {
      this.EvList = res
    })
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.projetService.Delete(Id)
        .subscribe(res => {
          this.getList();
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
    this.projetService.PutObservableE(this.pr).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.getList();
      form.resetForm
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');})
  }
  pr: ProjetOrg = new ProjetOrg();
  populateForm(conge: ProjetOrg) {
    this.pr = Object.assign({}, conge)
  }
}
