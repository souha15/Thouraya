import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { ServiceVenteervice } from '../../shared/Services/ServiceVente/service-vente.service';
import { TypeTypeServiceVenteservice } from '../../shared/Services/ServiceVente/type-service-vente.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceVente } from '../../shared/Models/ServiceVente/service-vente.model';
import { NgForm } from '@angular/forms';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-service-vente-list',
  templateUrl: './service-vente-list.component.html',
  styleUrls: ['./service-vente-list.component.css']
})
export class ServiceVenteListComponent implements OnInit {

  constructor(private demService: ServiceVenteervice,
    private typeService: TypeTypeServiceVenteservice,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getTypeService();
    this.getList();
  }
  p: Number = 1;
  count: Number = 5;

  demList: ServiceVente[] = [];
  demList1: ServiceVente[] = [];
  getList() {
    this.demService.Get().subscribe(res => {
      this.demList1 = res
      this.demList = this.demList1.filter(item => item.idUserCreator == this.userId)

    })
  }

  populateForm(dem: ServiceVente) {
    this.demService.formData = Object.assign({}, dem)
    this.dem = Object.assign({}, dem);

  }

  //Get Type Data

  typeList: TbListening[] = [];
  getTypeService() {
    this.typeService.Get().subscribe(res => {
      this.typeList = res;
    });
  }
  // Get User Connected

  adminId: number;
  admin: string;
  userName: string;
  userId: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userId = res.id;
      this.userName = res.fullName;
      if (res.idAdministration != null) {
        this.adminId = res.idAdministration
        this.admin = res.nomAdministration
      }
    })

  }

  dem: ServiceVente = new ServiceVente();
  isValidFormSubmitted = false;
  path: string;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {
      this.isValidFormSubmitted = true
      this.demService.PutObservableE(this.dem).subscribe(res => {
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.getList();
        form.resetForm();
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل");
        })
    }
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {

      this.demService.Delete(Id)
        .subscribe(res => {
          this.getList();
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
