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
  selector: 'app-dem-tech-add-user',
  templateUrl: './dem-tech-add-user.component.html',
  styleUrls: ['./dem-tech-add-user.component.css']
})
export class DemTechAddUserComponent implements OnInit {

  constructor(private demTechService: TechDemService,
    private demTypeService: TypeTechDemService,
    private UserService: UserServiceService,
    private adminService: AdministrationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getAdminList();
    this.getServices()
  }

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.dem.userNameCreator = res.fullName;
      this.dem.idUserCreator = res.id;

    })

  }

  adminList: Administration[] = [];
  getAdminList() {
    this.adminService.ListAdministration().subscribe(res => {
      this.adminList = res
    })
  }

  autre: boolean = false;
  video: boolean = false;
  prog: boolean = false;
  imprimante: boolean = false;
  getService(event) {
    if (event.target.value == "أخرى") {
      this.autre = true;
      this.video = false;
      this.prog = false;
      this.imprimante =false
    } else {
      this.autre = false;
    }
    if (event.target.value == "تشغيل جهاز الفيديو كونفرنس") {
      this.video = true;
      this.autre = false;
      this.prog = false;
      this.imprimante = false
    } else {
      this.video = false;
    }
    if (event.target.value == "تنصيب برنامج") {
      this.prog = true;
      this.autre = false;
      this.video = false;

      this.imprimante = false
    } else {
      this.prog = false;
    }
    if (event.target.value == "تعريف طابعة" || event.target.value == "تعريف آلة تصوير" || event.target.value == "تعريف ماسح ضوئي"
      || event.target.value == 'صيانة جهاز طابعة' || event.target.value == 'صيانة آلة تصوير') {
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
      this.typeList=res
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
      this.dem.etat = "في الإنتظار";
      this.dem.dateenreg = this.date;
      this.demTechService.Create(this.dem).subscribe(res =>{

        this.toastr.success("تم تسجيل الطلب   بنجاح", " تسجيل الطلب  ");
            form.resetForm();
      },
    err => {
      this.toastr.error("فشل تسجيل الطلب ", " تسجيل الطلب")
        })
    }
  }
}
