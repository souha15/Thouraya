import { Component, OnInit } from '@angular/core';
import { StockService } from '../../shared/Services/Gsetion Stock/stock.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Stock } from '../../shared/Models/Gestion Stock/stock.model';
import { Observable } from 'rxjs';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  constructor(private stockService: StockService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.ShowDotations();
    this.getUserList();
    this.resetForm();
    this.getUserConnected();
  }


  //Get Data 

  private _allDotations: Observable<Stock[]>;
  public get allDotation(): Observable<Stock[]> {
    return this._allDotations;
  }

  public set allDotation(value: Observable<Stock[]>) {
    this._allDotations = value;


  }

  ShowDotations() {
    this.allDotation = this.stockService.ListStock();
  }


  //get TblListenig

  tbl: UserDetail[] = [];
  getUserList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.tbl = res
    })
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.stockService.DeleteStock(Id)
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

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.stockService.formData.idUserCreator = res.id;
      this.stockService.formData.userNameCreator = res.fullName;

    })

  }

  
  getUser(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.stockService.formData.respNom = res.fullName
      console.log(this.stockService.formData.respNom)
    })
  }

  //PopulateForm

  populateForm(dotation: Stock) {
    this.stockService.formData = Object.assign({}, dotation);
    this.getUserConnected();
  }
  //Edit

  updateRecord(form: NgForm) {
    this.stockService.EditStock().subscribe(
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

  //Reset Form
  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.stockService.formData = {
      id: 0,
      nom: '',
      respId: '',
      respNom: '',
      attribut1: 0,
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

  insertRecord(form: NgForm) {
    this.stockService.post().subscribe(
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
    if (this.stockService.formData.id == 0)
      this.insertRecord(form);
    else  //update
      this.updateRecord(form);
  }

}
