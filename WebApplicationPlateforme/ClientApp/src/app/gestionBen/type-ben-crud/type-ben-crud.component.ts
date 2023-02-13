import { Component, OnInit } from '@angular/core';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';
import { SettingsBenService } from '../../shared/Services/GestBen/settings-ben.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-type-ben-crud',
  templateUrl: './type-ben-crud.component.html',
  styleUrls: ['./type-ben-crud.component.css']
})
export class TypeBenCrudComponent implements OnInit {

  constructor(private tblService: SettingsBenService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ShowDotations();
    this.resetForm();
  }

  // Type Dotation List

  private _allDotations: Observable<TbListening[]>;
  public get allDotation(): Observable<TbListening[]> {
    return this._allDotations;
  }

  public set allDotation(value: Observable<TbListening[]>) {
    this._allDotations = value;


  }

  ShowDotations() {
    this.allDotation = this.tblService.GetTBen();
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.tblService.DeleteTBen(Id)
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
      nom: '',

    }
  }

  //PopulateForm

  populateForm(dotation: TbListening) {
    this.tblService.formData = Object.assign({}, dotation);

  }

  //Edit
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  updateRecord(form: NgForm) {
    this.tblService.EditTBen().subscribe(
      res => {
        this.resetForm(form);
        this.succ = true;
        this.failed = false;
        this.msg = "  تم التحديث بنجاح"
        this.toastr.success("تم التحديث  بنجاح", "نجاح");
        this.ShowDotations();

      },
      err => {
        console.log(err);
        this.failed = true;
        this.succ = false;
        this.msg = "  فشل عند التحديث"
        this.toastr.warning('لم يتم التحديث ', ' فشل');

      }
    )
  }

  // Insert

  dotation: TbListening = new TbListening();

  insertRecord(form: NgForm) {
    this.tblService.PostTBen().subscribe(
      res => {
        this.resetForm(form);
        this.succ = true;
        this.failed = false;
        this.msg = "  تمت الإضافة بنجاح"
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.ShowDotations();
      },
      err => {
        this.failed = true;
        this.succ = false;
        this.msg = " فشل عند الإضافة"
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
