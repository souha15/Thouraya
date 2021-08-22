import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { ResidenceService } from '../../shared/Services/User Services/residence.service';
import { Residence } from '../../shared/Models/User Services/residence.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-residence-edit',
  templateUrl: './residence-edit.component.html',
  styleUrls: ['./residence-edit.component.css']
})
export class ResidenceEditComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private residenceService: ResidenceService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getIdUrl();

  }

  eventId: number
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.eventId = params['id']

      this.residenceService.GetById(this.eventId).subscribe(res => {
        this.rs = res

      })
    });
  }

  //Get UserConnected

  rs: Residence = new Residence();


  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    this.rs.datenereg = this.date;
    this.residenceService.PutObservableE(this.rs).subscribe(
      res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        form.resetForm();
      },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }
    )
  }
}
