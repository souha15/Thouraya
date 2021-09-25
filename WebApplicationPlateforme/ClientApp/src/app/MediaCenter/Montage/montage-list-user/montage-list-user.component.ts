import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Montage } from '../../../shared/Models/MediaCenter/Montage/montage.model';
import { MontageService } from '../../../shared/Services/MediaCenter/Montage/montage.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-montage-list-user',
  templateUrl: './montage-list-user.component.html',
  styleUrls: ['./montage-list-user.component.css']
})
export class MontageListUserComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: MontageService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.GetDemandList();
  }

  p: Number = 1;
  count: Number = 5;

  /** Get User Connected **/

  UserId: string;
  UserName: string;
  idEtab: number;
  nomEtab: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.UserId = res.id;
      this.UserName = res.fullName;
      this.idEtab = res.idDepartement;
      this.nomEtab = res.nomDepartement;
    })

  }


  /* Demand List */

  DemandListGlobal: Montage[] = [];
  DemandList: Montage[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList = this.DemandListGlobal.filter(item => item.idUserCreator == this.UserId)

    })
  }

  /* Populate Form */

  dem: Montage = new Montage();
  oc: boolean = false;
  ho: boolean = false;
  populateForm(dem: Montage) {
    this.dem = Object.assign({}, dem);

  }

  /* Edit*/

  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.demService.PutObservable(this.dem).subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        form.resetForm();
        this.GetDemandList();

      },
        err => {
          this.toastr.error(' لم يتم التحديث  ', ' فشل');
        })
    }
  }

  /*Delete*/
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.demService.Delete(Id)
        .subscribe(res => {
          this.GetDemandList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }

  }


}
