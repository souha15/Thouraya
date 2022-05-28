import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { ServiceVenteervice } from '../../shared/Services/ServiceVente/service-vente.service';
import { TypeTypeServiceVenteservice } from '../../shared/Services/ServiceVente/type-service-vente.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceVente } from '../../shared/Models/ServiceVente/service-vente.model';
import { NgForm } from '@angular/forms';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-service-vente-add',
  templateUrl: './service-vente-add.component.html',
  styleUrls: ['./service-vente-add.component.css']
})
export class ServiceVenteAddComponent implements OnInit {

  constructor(private demService: ServiceVenteervice,
    private typeService: TypeTypeServiceVenteservice,
    private toastr: ToastrService,
    private UserService: UserServiceService

    ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getTypeService();
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
        this.adminId= res.idAdministration
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
      this.dem.etat = "في الإنتظار"
      this.dem.etatdot = "في الإنتظار"
      this.dem.etatfin = "في الإنتظار"
      this.dem.dateenreg = this.date

      this.dem.idUserCreator = this.userId;
      this.dem.userNameCreator = this.userName;
      if (this.adminId != null) {
        this.dem.adminId = this.adminId
        this.dem.admin = this.admin
      }
      this.demService.Add(this.dem).subscribe(
        res => {
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
         
          this.toastr.error("لا يمنك إضافة أكثر من طلبين شراء في الشهر الواحد", "فشل في التسجيل");
        })
    }
  }


}

