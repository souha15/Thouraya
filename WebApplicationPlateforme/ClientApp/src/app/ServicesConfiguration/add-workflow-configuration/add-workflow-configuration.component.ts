import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { WorkFlowServiceService  } from '../../shared/Services/ServicesConfiguration/work-flow-service.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ServiceWorkFlow } from '../../shared/Services/ServicesConfiguration/service-work-flow.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-workflow-configuration',
  templateUrl: './add-workflow-configuration.component.html',
  styleUrls: ['./add-workflow-configuration.component.css']
})
export class AddWorkflowConfigurationComponent implements OnInit {

  constructor(private WorkFolwService: WorkFlowServiceService,
    private userService: UserServiceService,
    private toastr: ToastrService) { }

  ShowFilter = false;
  limitSelection = false;
  roles = [];
  selectedItems = [];
  dropdownSettings: any = {};

  ngOnInit(): void {
    this.roles = [
      ({ id: 'DIRECTORGENERAL', text: 'المدير التنفيذي' }),
      ({ id: 'DIRECTORADMN', text: 'مدير ادارة' }),
      ({ id: 'DIRECTORETAB', text: 'مدير قسم' }),
      ({ id: 'DIRDIRECTE', text: 'المدير المباشر' }),
      ({ id: 'FINPRIV', text: 'مدير ادارة  المالية' }),
      ({ id: 'DOTPRIV', text: 'مدير ادارة الأوقاف' }),
      ({ id: 'RHPRIV', text: 'مدير الموارد البشرية' }),
      ({ id: 'COMPTAPRIV', text: 'الحسابات' }),
      ({id: 'BOXPRIV', text: 'الصندوق' }),
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 8,
      searchPlaceholderText: 'بحث',
      allowSearchFilter: true,
    };
    
  }


  selecteditems = [];
  itemselected= []
  onItemSelect(item:any) {
    this.selecteditems.push({id:item.id,text:item.text});
  }

  allselecteditems = [];
  onSelectAll(items: any) {
    this.allselecteditems.push(items);
  }

  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  public onFilterChange(item: any) {
    console.log(item);
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }

  nbRoles: number;

  getDropDownSettings(event) {

    this.nbRoles = +event.target.value;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 8,
      searchPlaceholderText: 'بحث',
      allowSearchFilter: true,
      limitSelection: this.nbRoles
    };
  }
  wf: ServiceWorkFlow = new ServiceWorkFlow();

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

  }

  serviceId: number;
  getServiceId(event) {
    let service = event.target.value;
    
    if (service == "إجازة") { this.wf.serviceId == 1; this.serviceId =1 }
    else if (service == "إذن") { this.wf.serviceId == 2; this.serviceId =2}
    else if (service == "عهدة") { this.wf.serviceId == 3; this.serviceId =3 }
    else if (service == "دورة تدريبية") { this.wf.serviceId == 4; this.serviceId =4}
    else if (service == "مستحقات مالية") { this.wf.serviceId == 5; this.serviceId =5}
    else if (service == "تجديد إقامة") { this.wf.serviceId == 6; this.serviceId =6}
    else if (service == "ساعات إضافية") { this.wf.serviceId == 7; this.serviceId =7}
    else if (service == "استحداث وظيفة") { this.wf.serviceId == 8; this.serviceId =8 }
    else if (service == "صرف شيك") { this.wf.serviceId == 9; this.serviceId =9}
    else if (service == "سلفة") { this.wf.serviceId == 10; this.serviceId =10 }
    else if (service == "إستقالة") { this.wf.serviceId == 11; this.serviceId =11}
    else if (service == "شكوى") { this.wf.serviceId == 12; this.serviceId =12}
    else if (service == "بطاقة موظف") { this.wf.serviceId == 13; this.serviceId =13 }
    else if (service == "صيانة/دعم فني") { this.wf.serviceId == 14; this.serviceId =14 }
    else if (service == "شهادة عمل") { this.wf.serviceId == 15; this.serviceId =15}
    else if (service == "مباشرة عمل") { this.wf.serviceId == 16; this.serviceId =16}
    else if (service == "تعديل حساب بنكي") { this.wf.serviceId == 17; this.serviceId =17}
    else if (service == "مشهد براتب") { this.wf.serviceId == 18; this.serviceId =18 }
    else if (service == "انتداب") { this.wf.serviceId == 19; this.serviceId = 19 }
    this.WorkFolwService.TestIfServiceExist(this.serviceId).subscribe(res => {
      if (res == true) {
        this.exist = true;
      } else {
        this.exist = false;
      }
    })

  }
  exist:boolean =  false;
  isValidFormSubmitted = false;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else if (this.selecteditems.length < this.nbRoles) {
      this.isValidFormSubmitted = false;
      this.toastr.error(" يجب عليك تحديد" + this.nbRoles + ' أطراف')
    } else if (this.exist) {
      this.isValidFormSubmitted = false;
      this.toastr.error("تم تسجيل هذه الخدمة مسبقا الرجاء التوجه للتعديل ")
    }
    else {

      this.isValidFormSubmitted = true;

      if (this.nbRoles == 1) {
        this.wf.roleId1 = this.selecteditems[0].id;
        this.wf.roleName1 = this.selecteditems[0].text;
        this.wf.roleRang1 = 1
      }
      else if (this.nbRoles == 2) {
        
          this.wf.roleId1 = this.selecteditems[0].id;
          this.wf.roleName1 = this.selecteditems[0].text;
          this.wf.roleRang1 = 1
          this.wf.roleId2 = this.selecteditems[1].id;
          this.wf.roleName2 = this.selecteditems[1].text;
          this.wf.roleRang2 = 2
        
      } else if (this.nbRoles ==3) {
        for (let i = 0; i < this.nbRoles; i++) {
          this.wf.roleId1 = this.selecteditems[0].id;
          this.wf.roleName1 = this.selecteditems[0].text;
          this.wf.roleRang1 = 1
          this.wf.roleId2 = this.selecteditems[1].id;
          this.wf.roleName2 = this.selecteditems[1].text;
          this.wf.roleRang2 = 2
          this.wf.roleId3 = this.selecteditems[2].id;
          this.wf.roleName3 = this.selecteditems[2].text;
          this.wf.roleRang3 = 3
        }
      } else if (this.nbRoles ==4) {
        for (let i = 0; i < this.nbRoles; i++) {
          this.wf.roleId1 = this.selecteditems[0].id;
          this.wf.roleName1 = this.selecteditems[0].text;
          this.wf.roleRang1 = 1
          this.wf.roleId2 = this.selecteditems[1].id;
          this.wf.roleName2 = this.selecteditems[1].text;
          this.wf.roleRang2 = 2
          this.wf.roleId3 = this.selecteditems[2].id;
          this.wf.roleName3 = this.selecteditems[2].text;
          this.wf.roleRang3 = 3
          this.wf.roleId4 = this.selecteditems[3].id;
          this.wf.roleName4 = this.selecteditems[3].text;
          this.wf.roleRang4 = 4
        }
      } else if (this.nbRoles ==5) {
        for (let i = 0; i < this.nbRoles; i++) {
          this.wf.roleId1 = this.selecteditems[0].id;
          this.wf.roleName1 = this.selecteditems[0].text;
          this.wf.roleRang1 = 1
          this.wf.roleId2 = this.selecteditems[1].id;
          this.wf.roleName2 = this.selecteditems[1].text;
          this.wf.roleRang2 = 2
          this.wf.roleId3 = this.selecteditems[2].id;
          this.wf.roleName3 = this.selecteditems[2].text;
          this.wf.roleRang3 = 3
          this.wf.roleId4 = this.selecteditems[3].id;
          this.wf.roleName4 = this.selecteditems[3].text;
          this.wf.roleRang4 = 4
          this.wf.roleId5 = this.selecteditems[4].id;
          this.wf.roleName5 = this.selecteditems[4].text;
          this.wf.roleRang5= 5
        }
      } else if (this.nbRoles ==6) {
        for (let i = 0; i < this.nbRoles; i++) {
          this.wf.roleId1 = this.selecteditems[0].id;
          this.wf.roleName1 = this.selecteditems[0].text;
          this.wf.roleRang1 = 1
          this.wf.roleId2 = this.selecteditems[1].id;
          this.wf.roleName2 = this.selecteditems[1].text;
          this.wf.roleRang2 = 2
          this.wf.roleId3 = this.selecteditems[2].id;
          this.wf.roleName3 = this.selecteditems[2].text;
          this.wf.roleRang3 = 3
          this.wf.roleId4 = this.selecteditems[3].id;
          this.wf.roleName4 = this.selecteditems[3].text;
          this.wf.roleRang4 = 4
          this.wf.roleId5 = this.selecteditems[4].id;
          this.wf.roleName5 = this.selecteditems[4].text;
          this.wf.roleRang5 = 5
          this.wf.roleId6 = this.selecteditems[5].id;
          this.wf.roleName6 = this.selecteditems[5].text;
          this.wf.roleRang6 = 6
        }
      } else if (this.nbRoles ==7) {
        for (let i = 0; i < this.nbRoles; i++) {
          this.wf.roleId1 = this.selecteditems[0].id;
          this.wf.roleName1 = this.selecteditems[0].text;
          this.wf.roleRang1 = 1
          this.wf.roleId2 = this.selecteditems[1].id;
          this.wf.roleName2 = this.selecteditems[1].text;
          this.wf.roleRang2 = 2
          this.wf.roleId3 = this.selecteditems[2].id;
          this.wf.roleName3 = this.selecteditems[2].text;
          this.wf.roleRang3 = 3
          this.wf.roleId4 = this.selecteditems[3].id;
          this.wf.roleName4 = this.selecteditems[3].text;
          this.wf.roleRang4 = 4
          this.wf.roleId5 = this.selecteditems[4].id;
          this.wf.roleName5 = this.selecteditems[4].text;
          this.wf.roleRang5 = 5
          this.wf.roleId6 = this.selecteditems[5].id;
          this.wf.roleName6 = this.selecteditems[5].text;
          this.wf.roleRang6 = 6
          this.wf.roleId7 = this.selecteditems[6].id;
          this.wf.roleName7 = this.selecteditems[6].text;
          this.wf.roleRang7 = 7
        }
      } else if (this.nbRoles ==8) {
        for (let i = 0; i < this.nbRoles; i++) {
          this.wf.roleId1 = this.selecteditems[0].id;
          this.wf.roleName1 = this.selecteditems[0].text;
          this.wf.roleRang1 = 1
          this.wf.roleId2 = this.selecteditems[1].id;
          this.wf.roleName2 = this.selecteditems[1].text;
          this.wf.roleRang2 = 2
          this.wf.roleId3 = this.selecteditems[2].id;
          this.wf.roleName3 = this.selecteditems[2].text;
          this.wf.roleRang3 = 3
          this.wf.roleId4 = this.selecteditems[3].id;
          this.wf.roleName4 = this.selecteditems[3].text;
          this.wf.roleRang4 = 4
          this.wf.roleId5 = this.selecteditems[4].id;
          this.wf.roleName5 = this.selecteditems[4].text;
          this.wf.roleRang5 = 5
          this.wf.roleId6 = this.selecteditems[5].id;
          this.wf.roleName6 = this.selecteditems[5].text;
          this.wf.roleRang6 = 6
          this.wf.roleId7 = this.selecteditems[6].id;
          this.wf.roleName7 = this.selecteditems[6].text;
          this.wf.roleRang7 = 7
          this.wf.roleId8 = this.selecteditems[7].id;
          this.wf.roleName8 = this.selecteditems[7].text;
          this.wf.roleRang8 = 8
        }
      }
      this.wf.serviceId = this.serviceId;
      this.WorkFolwService.Add(this.wf).subscribe(res => {
        form.resetForm();
        this.toastr.success("نجاح إضافة سير إجراء الخدمات", "نجاح");
        this.itemselected = [];
        this.selecteditems = [];
      }, err => {
          this.toastr.error("فشل إضافة سير إجراء الخدمات", "فشل");
      })
    }
  }
}
