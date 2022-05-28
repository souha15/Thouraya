import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { MontageService } from '../../../shared/Services/MediaCenter/Montage/montage.service';
import { EtablissementService } from '../../../shared/Services/Etablissement/etablissement.service';
import { Montage } from '../../../shared/Models/MediaCenter/Montage/montage.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Etablissement } from '../../../shared/Models/Etablissement/etablissement.model';

@Component({
  selector: 'app-histo-montage',
  templateUrl: './histo-montage.component.html',
  styleUrls: ['./histo-montage.component.css']
})
export class HistoMontageComponent implements OnInit {



  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: MontageService,
    private etabService: EtablissementService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.GetDemandList();
  }

  p: Number = 1;
  count: Number = 5;

  /** Get User Connected **/

  UserId: string;
  UserName: string;
  idEtab: number;
  nomEtab: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.UserId = res.id;
      this.UserName = res.fullName;
      this.idEtab = res.idDepartement;
      this.nomEtab = res.nomDepartement;
    })

  }


  /* Demand List */

  DemandListGlobal: Montage[] = [];
  DemandList: Montage[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandList = res;

    })
  }

  /* Populate Form */

  dem: Montage = new Montage();
  oc: boolean = false;
  ho: boolean = false;
  populateForm(dem: Montage) {
    this.dem = Object.assign({}, dem);
    this.getEtabList();
    this.getUsersList();
  }

  /* Edit*/

  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.dem.nomdir = this.UserName;
      this.dem.iddir = this.UserId;
      this.dem.datedir = this.date;
      this.dem.etat = "مرسلة"
      this.demService.PutObservable(this.dem).subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        form.resetForm();
        this.GetDemandList();

      },
        err => {
          this.toastr.error(' لم يتم التحديث  ', ' فشل');
        })
    }
  }

  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.demService.Delete(id)
        .subscribe(res => {
          this.GetDemandList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');
          }
        )

    }

  }
  employee: boolean = false;
  etab: boolean = false;
  transfererA(event) {
    if (event.target.value == "موظف") {
      this.employee = true;
      this.dem.transfertEmployee = "1";

      this.dem.dattransfertEmployee = this.date;
    } else {
      this.employee = false;
    }

    if (event.target.value == "قسم") {
      this.etab = true;
      this.dem.transfertAdmin = "1"
      this.dem.datetransfertAdmin = this.date;
    } else {
      this.etab = false;
    }
  }


  getEtabName(event) {

    this.etabService.GetById(+event.target.value).subscribe(res => {
      this.dem.etabnom = res.nom
    })
  }


  getEmployeeName(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.dem.nomEmp = res.fullName;
    })

  }


  etabList: Etablissement[] = [];
  getEtabList() {
    this.etabService.ListEtablissement().subscribe(res => {
      this.etabList = res;
    })
  }

  employeeList: UserDetail[] = [];
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.employeeList = res;
    })
  }

}
