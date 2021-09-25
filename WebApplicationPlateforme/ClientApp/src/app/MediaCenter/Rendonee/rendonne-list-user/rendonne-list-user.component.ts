import { Component, OnInit } from '@angular/core';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { RendoneeService } from '../../../shared/Services/MediaCenter/Rendonee/rendonee.service';
import { Rendonne } from '../../../shared/Models/MediaCenter/Rendonee/rendonne.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rendonne-list-user',
  templateUrl: './rendonne-list-user.component.html',
  styleUrls: ['./rendonne-list-user.component.css']
})
export class RendonneListUserComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: RendoneeService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.SettingsList();
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

  /** Get Type ExThechnique **/

  settingList: TbListening[] = [];


  SettingsList() {
    this.menuSettings.GetTypeRendo().subscribe(res => {
      this.settingList = res;
    })

  }


  /* Populate Form */

  dem: Rendonne = new Rendonne();

  populateForm(dem: Rendonne) {
    this.dem = Object.assign({}, dem);
  }



  /* Demand List */

  DemandListGlobal: Rendonne[] = [];
  DemandList: Rendonne[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList = this.DemandListGlobal.filter(item => item.idUserCreator == this.UserId)

    })
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
