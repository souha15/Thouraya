import { Component, OnInit } from '@angular/core';
import { ActiviteeService, ActiviteDetail } from '../../shared/Services/NewServicesForDawa/activitee.service';
import { FilesActiviteeService } from '../../shared/Services/NewServicesForDawa/files-activitee.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { Activite } from '../../shared/Models/NewModelsForDawaa/activite.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-activitee-add',
  templateUrl: './activitee-add.component.html',
  styleUrls: ['./activitee-add.component.css']
})
export class ActiviteeAddComponent implements OnInit {

  constructor(private activiteService: ActiviteeService,
    private typeService: FilesActiviteeService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
     ) { }

  ShowFilter = false;
  limitSelection = false;
  cities = [];
  selectedItems = [];
  dropdownSettings: any = {};
  ListType: TbListening[] = [];
  ngOnInit(): void {
    this.getData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nom',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      searchPlaceholderText: 'بحث',
      allowSearchFilter: true
    };
    this.getUserConnected();
    this.getActiviteList();
  }

  getData() {
    this.activiteService.ListTypeDetail().subscribe(res => {
      this.ListType = res
    })
  }
  selecteditems = [];
  onItemSelect(item: any) {
    this.selecteditems.push({ id: item.id, text: item.nom });
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
  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  UserEtabId: number;
  UserAdminId: number;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserEtabId = res.idDepartement
      this.UserAdminId = res.idAdministration
    })

  }

  //Get Type Activite List

  typeList: TbListening[] = [];
  getActiviteList() {
    this.typeService.GetTalent().subscribe(res => {
      this.typeList = res;
    })
  }

  date = new Date().toLocaleDateString();
  isValidFormSubmitted = false;
  ac: Activite = new Activite();
  acD: ActiviteDetail = new ActiviteDetail();
  id: number;
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    } else {

      this.isValidFormSubmitted = true
      if (this.UserEtabId != null) {
        this.ac.attribut1 = this.UserEtabId.toString();
      }
      if (this.UserAdminId != null) {
        this.ac.attribut2 = this.UserAdminId.toString();
      }
      this.ac.userNameCreator = this.UserNameConnected;
      this.ac.idUserCreator = this.UserIdConnected;
     
      this.ac.dateEnreg = this.date;
      this.activiteService.Create(this.ac).subscribe(
        
        res => {
          this.id = res.id;
          this.selecteditems.forEach(item => {

            this.acD.details = item.text;
            this.acD.idActivite= this.id

          this.activiteService.CreateDetail(this.acD).subscribe(res => {
       
          })
          })
          this.toastr.success('تم التحديث بنجاح', 'نجاح');
          this.selecteditems = [];
          form.resetForm();
        },
        err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');
            }
        
      )
    }
  }

}
