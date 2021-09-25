import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ExthechniqueService } from '../../../shared/Services/MediaCenter/ExtensionTechnique/exthechnique.service';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Exthechnique } from '../../../shared/Models/MediaCenter/ExtensionTechnique/exthechnique.model';
@Component({
  selector: 'app-exthechnique-list-user',
  templateUrl: './exthechnique-list-user.component.html',
  styleUrls: ['./exthechnique-list-user.component.css']
})
export class ExthechniqueListUserComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: ExthechniqueService ) { }

  ngOnInit(): void {
    this.typeList();
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

  /** Get Type List **/

  settingList: TbListening[] = [];

  typeList() {
    this.menuSettings.GetTypeExthechnique().subscribe(res => {
      this.settingList = res;
    })
  }

/* Demand List */

  DemandListGlobal: Exthechnique[] = [];
  DemandList: Exthechnique[] = [];
  GetDemandList() {
    this.demService.ListExthechnique().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList = this.DemandListGlobal.filter(item => item.idUserCreator == this.UserId)

    })
  }

/* Populate Form */

  dem: Exthechnique = new Exthechnique();
  populateForm(dem: Exthechnique) {
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
      this.demService.PutObservableE(this.dem).subscribe(res => {
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
      this.demService.DeleteExthechnique(Id)
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
