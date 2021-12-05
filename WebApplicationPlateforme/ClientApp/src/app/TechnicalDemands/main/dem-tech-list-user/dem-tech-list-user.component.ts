import { Component, OnInit } from '@angular/core';
import { TechDemService } from '../../../shared/Services/TechnicalDemands/tech-dem.service';
import { TypeTechDemService } from '../../../shared/Services/TechnicalDemands/type-tech-dem.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { AdministrationService } from '../../../shared/Services/Administration/administration.service';
import { TechDem } from '../../../shared/Models/TechnicalDemands/tech-dem.model';
import { NgForm } from '@angular/forms';
import { Administration } from '../../../shared/Models/Administration/administration.model';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';

@Component({
  selector: 'app-dem-tech-list-user',
  templateUrl: './dem-tech-list-user.component.html',
  styleUrls: ['./dem-tech-list-user.component.css']
})
export class DemTechListUserComponent implements OnInit {


  constructor(private demTechService: TechDemService,
    private demTypeService: TypeTechDemService,
    private UserService: UserServiceService,
    private adminService: AdministrationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getDemList();
    this.getAdminList();
    this.getServices()
  }
  p: Number = 1;
  count: Number = 5;

  List: TechDem[]=[]
  List2: TechDem[] = []

  getDemList() {
    this.demTechService.List().subscribe(res => {
      this.List2 = res
      this.List = this.List2.filter(item => item.idUserCreator == this.UserIdConnected)
    })
  }
  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserNameConnected = res.fullName;
      this.UserIdConnected = res.id;

    })

  }

  adminList: Administration[] = [];
  getAdminList() {
    this.adminService.ListAdministration().subscribe(res => {
      this.adminList = res
    })
  }
  populateForm(dem: TechDem) {
    this.demTechService.formData = Object.assign({}, dem)
    this.dem = Object.assign({}, dem);

    if (this.dem.typedem == "أخرى") {
      this.autre = true;
      this.video = false;
      this.prog = false;
      this.imprimante = false
    } else {
      this.autre = false;
    }
    if (this.dem.typedem == "تشغيل جهاز الفيديو كونفرنس") {
      this.video = true;
      this.autre = false;
      this.prog = false;
      this.imprimante = false
    } else {
      this.video = false;
    }
    if (this.dem.typedem == "تنصيب برنامج") {
      this.prog = true;
      this.autre = false;
      this.video = false;

      this.imprimante = false
    } else {
      this.prog = false;
    }
    if (this.dem.typedem == "تعريف طابعة" || this.dem.typedem == "تعريف آلة تصوير" || this.dem.typedem == "تعريف ماسح ضوئي"
      || this.dem.typedem == 'صيانة جهاز طابعة' || this.dem.typedem == 'صيانة آلة تصوير') {
      this.imprimante = true;
      this.prog = false;
      this.autre = false;
      this.video = false;
    } else {

      this.imprimante = false
    }

  }
  autre: boolean = false;
  video: boolean = false;
  prog: boolean = false;
  imprimante: boolean = false;
  getService(event) {
    if (this.dem.typedem == "أخرى") {
      this.autre = true;
      this.video = false;
      this.prog = false;
      this.imprimante = false
    } else {
      this.autre = false;
    }
    if (this.dem.typedem == "تشغيل جهاز الفيديو كونفرنس") {
      this.video = true;
      this.autre = false;
      this.prog = false;
      this.imprimante = false
    } else {
      this.video = false;
    }
    if (this.dem.typedem == "تنصيب برنامج") {
      this.prog = true;
      this.autre = false;
      this.video = false;

      this.imprimante = false
    } else {
      this.prog = false;
    }
    if (this.dem.typedem == "تعريف طابعة" || this.dem.typedem == "تعريف آلة تصوير" || this.dem.typedem == "تعريف ماسح ضوئي"
      || this.dem.typedem == 'صيانة جهاز طابعة' || this.dem.typedem == 'صيانة آلة تصوير') {
      this.imprimante = true;
      this.prog = false;
      this.autre = false;
      this.video = false;
    } else {

      this.imprimante = false
    }
  }
  typeList: TbListening[] = [];
  getServices() {
    this.demTypeService.List().subscribe(res => {
      this.typeList = res
    })
  }

  dem: TechDem = new TechDem();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {

    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }
    else {
      this.isValidFormSubmitted = true;
      this.demTechService.PutObservableE(this.dem).subscribe(res => {

        this.toastr.success("تم تحديث الطلب   بنجاح", " تحديث الطلب  ");
        form.resetForm();
        this.getDemList();
      },
        err => {
          this.toastr.error("فشل تحديث الطلب ", " تحديث الطلب")
        })
    }
  }

  onDelete(Id) {
    if (this.dem.etat == "في الإنتظار") {
      if (confirm('Are you sure to delete this record ?')) {
        this.demTechService.Delete(Id)
          .subscribe(res => {
            this.getDemList();
            this.toastr.success("تم الحذف  بنجاح", "نجاح");
          },

            err => {
              console.log(err);
              this.toastr.warning('لم يتم الحذف  ', ' فشل');

            }
          )

      }
    }
    else {
      this.toastr.error(' لم يتم التحديث الطلب تحت الإجرء   ', ' فشل');
    }
  }
}
