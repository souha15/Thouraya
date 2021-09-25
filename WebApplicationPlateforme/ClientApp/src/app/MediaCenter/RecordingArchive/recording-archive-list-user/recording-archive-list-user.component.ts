import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { RecordingArchive } from '../../../shared/Models/MediaCenter/RecordingArchive/recording-archive.model';
import { RecordingArchiveService } from '../../../shared/Services/MediaCenter/RecordingArchive/recording-archive.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recording-archive-list-user',
  templateUrl: './recording-archive-list-user.component.html',
  styleUrls: ['./recording-archive-list-user.component.css']
})
export class RecordingArchiveListUserComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: RecordingArchiveService) { }

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
    this.menuSettings.GetRecording().subscribe(res => {
      this.settingList = res;
    })
  }

  /* Demand List */

  DemandListGlobal: RecordingArchive[] = [];
  DemandList: RecordingArchive[] = [];
  GetDemandList() {
    this.demService.ListRecordingArchive().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList = this.DemandListGlobal.filter(item => item.idUserCreator == this.UserId)

    })
  }

  /* Populate Form */

  dem: RecordingArchive = new RecordingArchive();
  populateForm(dem: RecordingArchive) {
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
      this.demService.DeleteRecordingArchive(Id)
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
