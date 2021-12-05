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
  selector: 'app-dem-tech-list-dirr',
  templateUrl: './dem-tech-list-dirr.component.html',
  styleUrls: ['./dem-tech-list-dirr.component.css']
})
export class DemTechListDirrComponent implements OnInit {


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

  List2: TechDem[] = []
  List: TechDem[] = []


  getDemList() {
    this.demTechService.List().subscribe(res => {
      this.List2 = res
      this.List = this.List2.filter(item => item.etat == "في الإنتظار")
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
  typeList: TbListening[] = [];
  getServices() {
    this.demTypeService.List().subscribe(res => {
      this.typeList = res
    })
  }

  dem: TechDem = new TechDem();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
    etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  onSubmit(form: NgForm) {
    this.dem.techid = this.UserIdConnected;
    this.dem.technnom = this.UserNameConnected
    this.dem.etatdate = this.date
    this.demTechService.PutObservableE(this.dem).subscribe(res => {
      this.getDemList();
      this.toastr.success("تم الحذف  بنجاح", "نجاح");
    },
      err => {
        this.toastr.error("فشل تحديث الطلب ", " تحديث الطلب")})
  }
}
