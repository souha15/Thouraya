import { Component, OnInit } from '@angular/core';
import { ActiviteeService, ActiviteDetail } from '../../shared/Services/NewServicesForDawa/activitee.service';
import { FilesActiviteeService } from '../../shared/Services/NewServicesForDawa/files-activitee.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { Activite } from '../../shared/Models/NewModelsForDawaa/activite.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-activitee-list',
  templateUrl: './activitee-list.component.html',
  styleUrls: ['./activitee-list.component.css']
})
export class ActiviteeListComponent implements OnInit {

  constructor(private activiteService: ActiviteeService,
    private typeService: FilesActiviteeService,
    private UserService: UserServiceService,
    private toastr: ToastrService) { }

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
    this.getTypeActiviteList();
   this.getActiviteList();

  }
  p: Number = 1;
  count: Number = 5;
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
  UserAsminId:number
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserEtabId = res.idDepartement;
   
    })

  }

  //Get Activité List

  list: Activite[] = [];
  list2: Activite[] = [];
  getActiviteList() {
    this.activiteService.List().subscribe(res => {
      this.list = res;
    })
  }

  //Populate Form
  ListDetail: ActiviteDetail[] = [];
  ListTypeSelected: TbListening[] = [];

  populateForm(conge: Activite) {
    this.activiteService.formData = Object.assign({}, conge)
    this.ac = Object.assign({}, conge);
    this.activiteService.ListDetail().subscribe(res => {

      this.ListDetail = res.filter(item => item.idActivite == this.ac.id)

      //this.ListDetail.forEach(item1 => {
      //  this.ListTypeSelected.push(this.ListType.filter(item => item.nom == item1.details)[0]); 
      //})

      //this.ListTypeSelected.forEach(item => {
      //  this.selecteditems.push({ id: item.id, text: item.nom });
      //})

     
    })
    
  }

  //Get Type Activite List

  typeList: TbListening[] = [];
  getTypeActiviteList() {
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
      this.ac.userNameCreator = this.UserNameConnected;
      this.ac.idUserCreator = this.UserIdConnected;
      this.ac.dateEnreg = this.date;
      this.activiteService.PutObservableE(this.ac).subscribe(
        res => {
     
          this.selecteditems.forEach(item => {
            
            this.acD.details = item.text;
            this.acD.idActivite = this.ac.id

            this.activiteService.CreateDetail(this.acD).subscribe(res => {

            })
          })
          this.getActiviteList();
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          form.resetForm();
        },
        err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');
        }
      )
    }
  }


  //Delete

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {

      this.activiteService.Delete(Id)
        .subscribe(res => {
          this.getActiviteList()
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
