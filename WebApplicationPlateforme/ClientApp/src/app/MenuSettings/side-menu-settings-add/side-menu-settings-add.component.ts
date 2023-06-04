import { Component, OnInit } from '@angular/core';
import { SideMenuMainService } from '../../shared/Services/MenuSettings/side-menu-main.service';
import { SideMenuMain } from '../../shared/Models/MenuSettings/side-menu-main.model';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { EtablissementService } from '../../shared/Services/Etablissement/etablissement.service';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { Etablissement } from '../../shared/Models/Etablissement/etablissement.model';
import { NgForm } from '@angular/forms';
import { SideMenuUnderMain } from '../../shared/Models/MenuSettings/side-menu-under-main.model';
import { SideMenuUnderMainService } from '../../shared/Services/MenuSettings/side-menu-under-main.service';
import { ModuleSideMenuService } from '../../shared/Services/MenuSettings/module-side-menu.service';
import { ToastrService } from 'ngx-toastr';
import { ModuleSideMenu } from '../../shared/Models/MenuSettings/module-side-menu.model';
import { Module } from 'module';

@Component({
  selector: 'app-side-menu-settings-add',
  templateUrl: './side-menu-settings-add.component.html',
  styleUrls: ['./side-menu-settings-add.component.css']
})
export class SideMenuSettingsAddComponent implements OnInit {

  constructor(private mainService: SideMenuMainService,
    private adminService: AdministrationService,
    private etabService: EtablissementService,
    private subService: SideMenuUnderMainService,
    private moduleService: ModuleSideMenuService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetAdminList();
    this.GetEtabList();
    this.GetModulesList();

  }

  // Get Admin List

  adminList: Administration[] = [];

  GetAdminList() {
    this.adminService.ListAdministration().subscribe(res => {
      this.adminList = res;
    })
  }

  // Get Etab List

  etabList: Etablissement[] = [];

  GetEtabList() {
    this.etabService.ListEtablissement().subscribe(res => {
      this.etabList = res; 
    })
  }

  //Get Admin Name

  adminName: string;

  getAdminName(event) {
    this.adminName = event.target.value;
  }

  // Get Dep Name
  depName: string;
  getDepName(event) {
    this.depName = event.target.value;
  }
  //Get Modules
  ModuleList: ModuleSideMenu[] = [];

  GetModulesList() {
    this.moduleService.List().subscribe(res => {
      this.ModuleList = res;
    })
  }
  // Add Main Menu

  main: SideMenuMain = new SideMenuMain();

  nb: number = 0;
  getnbUnderMain(event) {
    this.nb = +event.target.value;
  }

  // Get Module Data
  modul: ModuleSideMenu = new ModuleSideMenu();

  getModuleData(event) {
    this.moduleService.GetById(+event.target.value).subscribe(res => {
      this.modul = res;
    })

  }


  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  showSub: boolean = false; 
  isValidFormSubmitted: boolean = false;
  onSubmit(form: NgForm) {

    if (form.invalid) {
      this.isValidFormSubmitted = false;

    } else {
      this.isValidFormSubmitted = true;
      this.main.nomAdmin = this.adminName;
      this.mainService.Create(this.main).subscribe(res => {
        this.showSub = true;
        this.succ = true;
        this.failed = false;
        this.msg = "  تمت الإضافة بنجاح"
        this.toastr.success("تم التسجيل بنجاح", "نجاح")
      },
        err => {
          this.showSub = false;
          this.failed = true;
          this.succ = false;
          this.msg = " فشل عند الإضافة"
          this.toastr.error("فشل في التسجيل", "فشل");
        })
    }

  }

  // SubMenu 
  isValidFormSubmittedSub: boolean = false;
  sub: SideMenuUnderMain = new SideMenuUnderMain();
  onSubmitSubTitle(formSub: NgForm) {

    if (formSub.invalid) {
      this.isValidFormSubmittedSub = false;

    } else {
      this.isValidFormSubmittedSub = true;
      this.main.nomAdmin = this.adminName;
      this.subService.Create(this.sub).subscribe(res => {
        this.succ = true;
        this.failed = false;
        this.msg = "  تمت الإضافة بنجاح"
        this.toastr.success("تم التسجيل بنجاح", "نجاح")


      }, err => {
          this.failed = true;
          this.succ = false;
          this.msg = " فشل عند الإضافة"
          this.toastr.error("فشل في التسجيل", "فشل");
      })
    }

  }

}
