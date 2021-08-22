import { Component, OnInit } from '@angular/core';
import { SoldeConge } from '../../../shared/Models/RH/solde-conge.model';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SoldeCongeService } from '../../../shared/Services/Rh/solde-conge.service';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-solde-conge',
  templateUrl: './solde-conge.component.html',
  styleUrls: ['./solde-conge.component.css']
})
export class SoldeCongeComponent implements OnInit {


  constructor(private tblService: SoldeCongeService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.ShowDotations();
    this.resetForm();
  }

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;


  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
    
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;


    })

  }
  // Type Dotation List

  private _allDotations: Observable<SoldeConge[]>;
  public get allDotation(): Observable<SoldeConge[]> {
    return this._allDotations;
  }

  public set allDotation(value: Observable<SoldeConge[]>) {
    this._allDotations = value;


  }

  ShowDotations() {
    this.allDotation = this.tblService.Get();
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.tblService.Delete(Id)
        .subscribe(res => {
          this.ShowDotations();
          this.resetForm();
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
    this.tblService.formData = {
      id: 0,
      type: '',
      mois: '',
      annee: '',
      number: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',

    }
  }

  //PopulateForm

  populateForm(dotation: SoldeConge) {
    this.tblService.formData = Object.assign({}, dotation);

  }

  //Edit

  updateRecord(form: NgForm) {
    this.tblService.Edit().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("تم التحديث  بنجاح", "نجاح");
        this.ShowDotations();

      },
      err => {
        console.log(err);
        this.toastr.warning('لم يتم التحديث ', ' فشل');

      }
    )
  }

  // Insert

  dotation: SoldeConge = new SoldeConge();
  date = new Date().toLocaleDateString();
  insertRecord(form: NgForm) {
    this.tblService.formData.userNameCreator = this.UserNameConnected;
    this.tblService.formData.idUserCreator = this.UserIdConnected;
    this.tblService.formData.dateenreg = this.date;

    this.tblService.Post().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.ShowDotations();
      },
      err => {
        console.log(err);
        this.toastr.warning('لم تتم الإضافة', ' فشل');
      }
    )
  }

  // Add and Update
  onSubmit(form: NgForm) {
    if (this.tblService.formData.id == 0)
      this.insertRecord(form);
    else  //update
      this.updateRecord(form);
  }
}
