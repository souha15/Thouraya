import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { EtablissementService } from '../../../shared/Services/Etablissement/etablissement.service';
import { AdministrationService } from '../../../shared/Services/Administration/administration.service';
import { MacAddressTableService } from '../../../shared/Services/Pointage/mac-address-table.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Etablissement } from '../../../shared/Models/Etablissement/etablissement.model';
import { Administration } from '../../../shared/Models/Administration/administration.model';
import { MacAddressTable } from '../../../shared/Models/Pointage/mac-address-table.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-adress-mac-add',
  templateUrl: './adress-mac-add.component.html',
  styleUrls: ['./adress-mac-add.component.css']
})
export class AdressMacAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private macService: MacAddressTableService) { }

  ngOnInit(): void {
    this.getMacList();
    this.getUsersList();

  }
  p: Number = 1;
  count: Number = 5;
  /* Get Users List*/
  UsersList: UserDetail[] = [];
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersList = res;
    })
  }
  /**Get Mac Adrress List*/
  macList: MacAddressTable[] = [];
  getMacList() {
    this.macService.List().subscribe(res => {
      this.macList =res
    })
  }
  userId: string;
  getUserName(event) {
    this.userId = event.target.value;
    this.UserService.GetUserById(this.userId).subscribe(res => {
      this.mac.userName = res.fullName
     
      if (res.idDepartement != null) {
        this.mac.etabId = res.idDepartement
        this.mac.etabName = res.nomDepartement
      } else {
        this.mac.etabId = 0
        this.mac.etabName = ""
      }
      if (res.idAdministration != null) {
        this.mac.adminName = res.nomAdministration;
        this.mac.adminId = res.idAdministration
      } else {
        this.mac.adminName =""
        this.mac.adminId = 0
      }
  
 
     
    })
  }

  //PopulateForm

  populateForm(conge: MacAddressTable) {
    this.mac = Object.assign({}, conge)
    this.macService.formData = Object.assign({}, conge)
  }

  mac: MacAddressTable = new MacAddressTable();
  add(form: NgForm) {
    this.macService.Add(this.mac).subscribe(res => {
      this.getMacList();
      form.resetForm();
      this.mac = new MacAddressTable();
      this.toastr.success("تمت الإضافة بنجاح", "نجاح");
    }, err => {
        this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
    })
  }
  update(form: NgForm) {
    this.macService.PutObservableE(this.mac).subscribe(res => {
      this.getMacList();
      form.resetForm();
      this.mac = new MacAddressTable();
      this.toastr.success("تمت الإضافة بنجاح", "نجاح");
    }, err => {
      this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
    })
  }
  onSubmit(form: NgForm) {
    if (this.mac.id == null) {
      this.add(form)
    } else {
      this.update(form)
    }
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.macService.Delete(Id)
        .subscribe(res => {
          this.getMacList();
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
