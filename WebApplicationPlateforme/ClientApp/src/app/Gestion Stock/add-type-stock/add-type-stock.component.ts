import { Component, OnInit } from '@angular/core';
import { UniteTypeStockService } from '../../shared/Services/Gsetion Stock/unite-type-stock.service';
import { ToastrService } from 'ngx-toastr';
import { TypeStockService } from '../../shared/Services/Gsetion Stock/type-stock.service';
import { TypeStock } from '../../shared/Models/Gestion Stock/type-stock.model';
import { Observable } from 'rxjs';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-add-type-stock',
  templateUrl: './add-type-stock.component.html',
  styleUrls: ['./add-type-stock.component.css']
})
export class AddTypeStockComponent implements OnInit {

  constructor(private tblService: UniteTypeStockService,
    private toastr: ToastrService,
    private typeStockService: TypeStockService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.ShowDotations();
    this.getTbl();
    this.resetForm();
    this.getUserConnected();
  }

  //Get Data 

  private _allDotations: Observable<TypeStock[]>;
  public get allDotation(): Observable<TypeStock[]> {
    return this._allDotations;
  }

  public set allDotation(value: Observable<TypeStock[]>) {
    this._allDotations = value;


  }

  ShowDotations() {
    this.allDotation = this.typeStockService.ListTypeStock();
  }

  //get TblListenig

  tbl: TbListening[] = [];
  getTbl() {
    this.tblService.ListTbListening().subscribe(res => {
      this.tbl = res
    })
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.typeStockService.DeleteTypeStock(Id)
        .subscribe(res => {
          this.ShowDotations();
          this.resetForm();
          this.getUserConnected();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }

  //Reset Form
  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.typeStockService.formData = {
      id: 0,
      nom: '',
      unite: '',
      num: '',
      prix: '',
      tot: '',
      attribut1:0,
      attribut7: 0,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',

    }
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.typeStockService.formData.idUserCreator = res.id;
      this.typeStockService.formData.userNameCreator = res.fullName;

    })

  }

  //PopulateForm

  populateForm(dotation:  TypeStock) {
    this.typeStockService.formData = Object.assign({}, dotation);
    this.getUserConnected();
  }

  //Edit

  updateRecord(form: NgForm) {
    this.typeStockService.EditTypeStock().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("تم التحديث  بنجاح", "نجاح");
        this.ShowDotations();
        this.getUserConnected();
      },
      err => {
        console.log(err);
        this.toastr.warning('لم يتم التحديث ', ' فشل');

      }
    )
  }


  insertRecord(form: NgForm) {
    this.typeStockService.post().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.ShowDotations();
        this.getUserConnected();
      },
      err => {
        console.log(err);
        this.toastr.warning('لم تتم الإضافة', ' فشل');
      }
    )
  }

  // Add and Update
  onSubmit(form: NgForm) {
    if (this.typeStockService.formData.id == 0)
      this.insertRecord(form);
    else  //update
      this.updateRecord(form);
  }
}
