import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { DesignImpressionService } from '../../../shared/Services/MediaCenter/ImpressionDesign/design-impression.service';
import { TypeImpressionService } from '../../../shared/Services/MediaCenter/ImpressionDesign/type-impression.service';
import { DesignImpression } from '../../../shared/Models/MediaCenter/ImpressionDesign/design-impression.model';
import { NgForm } from '@angular/forms';
import { TypeImpression } from '../../../shared/Models/MediaCenter/ImpressionDesign/type-impression.model';

@Component({
  selector: 'app-design-add',
  templateUrl: './design-add.component.html',
  styleUrls: ['./design-add.component.css']
})
export class DesignAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: DesignImpressionService,
    private typeService: TypeImpressionService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

/**** Selected Type Event ***/

  typeSelected: string;
  elec: boolean = false;
  bruch: boolean = false;
  imp: boolean = false;
  rap: boolean = false;
  ban: boolean = false;
  dip: boolean = false;
  drou: boolean = false;
  autre: boolean = false;

  getTypeSelected(event) {
    if (event.target.value == "0") {

      this.typeSelected = "تصميم للنشر الإلكتروني فقط";
      this.elec = true;
      this.bruch = false;
      this.imp = false;
      this.rap = false;
      this.ban = false;
      this.dip = false;
      this.drou = false;
      this.autre = false;
      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "1") {

      this.typeSelected = "تصميم وطباعة بروشور";
      this.bruch = true;
      this.elec = false;
      this.imp = false;
      this.rap = false;
      this.ban = false;
      this.dip = false;
      this.drou = false;
      this.autre = false;

      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "2") {

      this.typeSelected = "تصميم وطباعة استندات";
      this.imp = true;
      this.bruch = false;
      this.elec = false;
      this.rap = false;
      this.ban = false;
      this.dip = false;
      this.drou = false;
      this.autre = false;

      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "3") {

      this.typeSelected = "تصميم وطباعة تقرير"
      this.rap = true;
      this.imp = false;
      this.bruch = false;
      this.elec = false;
      this.ban = false;
      this.dip = false;
      this.drou = false;
      this.autre = false;

      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "4") {

      this.typeSelected = "تصميم وطباعة بنر واللوحات"
      this.ban = true;
      this.rap = false;
      this.imp = false;
      this.bruch = false;
      this.elec = false;
      this.dip = false;
      this.drou = false;
      this.autre = false;
      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "5") {

      this.typeSelected = "تصميم وطباعة الشهادات"
      this.dip = true;
      this.ban = false;
      this.rap = false;
      this.imp = false;
      this.bruch = false;
      this.elec = false;
      this.drou = false;
      this.autre = false;
      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "6") {

      this.typeSelected = "تصميم وطباعة الدروع"
      this.drou = true;
      this.dip = false;
      this.ban = false;
      this.rap = false;
      this.imp = false;
      this.bruch = false;
      this.elec = false;
      this.autre = false;
    
      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "7") {

      this.typeSelected = "أخرى"
      this.autre = true;
      this.drou = false;
      this.dip = false;
      this.ban = false;
      this.rap = false;
      this.imp = false;
      this.bruch = false;
      this.elec = false;

      this.dem.nomdesign = this.typeSelected;

    }
  }


  TypeImp: TypeImpression = new TypeImpression();
  TypeImpList: TypeImpression[] = [];
  i: number = 0;
  TypeImpTest: boolean = false;

  add() {
    this.TypeImpTest = true;
    this.TypeImpList[this.i] = this.TypeImp;
    this.TypeImp = new TypeImpression();
    this.i = this.i + 1;
  }

  del(dp, i) {
    this.TypeImpList.splice(this.TypeImpList.indexOf(dp), 1);
    this.i = this.i - 1
    this.TypeImp = new TypeImpression();
  }
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


  /** OnSubmit **/

  dem: DesignImpression = new DesignImpression();
  dem2: DesignImpression = new DesignImpression();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;
      this.dem.attribut2 = this.typeSelected;
      this.dem.dateenreg = this.date;
      this.dem.etat = "في الانتظار";
      this.dem.idUserCreator = this.UserId;
      this.dem.userNameCreator = this.UserName;
      this.dem.etabid = this.idEtab.toString();
      this.dem.etabnom = this.nomEtab;
      this.demService.Create(this.dem).subscribe(res => {
        this.dem2 = res
        for (let i = 0; i < this.TypeImpList.length; i++) {
          this.TypeImp = this.TypeImpList[i]
          this.TypeImp.idImpression = this.dem2.id;
          this.typeService.Create(this.TypeImp).subscribe(res => {

          },
            err => {
              this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
            })
        }
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
        this.TypeImpList.splice(0, this.TypeImpList.length)
        this.TypeImpList = [];
        this.TypeImpTest = false;
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }
}
