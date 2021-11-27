import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Exthechnique } from '../../../shared/Models/MediaCenter/ExtensionTechnique/exthechnique.model';
import { NgForm } from '@angular/forms';
import { ExthechniqueService } from '../../../shared/Services/MediaCenter/ExtensionTechnique/exthechnique.service';

@Component({
  selector: 'app-exthechnique-add',
  templateUrl: './exthechnique-add.component.html',
  styleUrls: ['./exthechnique-add.component.css']
})
export class ExthechniqueAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private exthService: ExthechniqueService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.typeExthechniqueList();
  }

   /** Get User Connected **/

  UserId: string;
  UserName: string;
  idEtab: number = null;
  nomEtab: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.UserId = res.id;
      this.UserName = res.fullName;

      if (res.idDepartement != null) {
      this.idEtab = res.idDepartement;
        this.nomEtab = res.nomDepartement; 1
      }
    })

  }

  /** Get Type ExThechnique **/

  settingList: TbListening[] = [];

  typeExthechniqueList() {
    this.menuSettings.GetTypeExthechnique().subscribe(res => {
      this.settingList = res;
    })
  }

  /** OnSubmit **/

  exth: Exthechnique = new Exthechnique();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;
      this.exth.dateenreg = this.date;
      this.exth.diretat = "في الانتظار";
      this.exth.idUserCreator = this.UserId;
      this.exth.userNameCreator = this.UserName;
      if (this.idEtab != null) {
      this.exth.etabid = this.idEtab.toString();
        this.exth.etabnom = this.nomEtab;
      }
      this.exthService.CreateExthechnique(this.exth).subscribe(res => {
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
        this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
      })
    }
  }
}
