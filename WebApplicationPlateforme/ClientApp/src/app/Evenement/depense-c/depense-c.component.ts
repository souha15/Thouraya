import { Component, OnInit } from '@angular/core';
import { DepenseService } from '../../shared/Services/Evenements/depense.service';
import { ToastrService } from 'ngx-toastr';
import { Depenses } from '../../shared/Models/Evenements/depenses.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';

@Component({
  selector: 'app-depense-c',
  templateUrl: './depense-c.component.html',
  styleUrls: ['./depense-c.component.css']
})
export class DepenseCComponent implements OnInit {


  constructor(private tblService: TbListeningService,
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
    this.allDotation = this.tblService.GetDepEvent();
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.tblService.DeleteDep(Id)
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
      nom:'',

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
    this.tblService.EditDep().subscribe(
      res => {
        this.succ = true;
        this.failed = false;
        this.msg = "  تم التحديث بنجاح"
        this.resetForm(form);
        this.toastr.success("تم التحديث  بنجاح", "نجاح");
        this.ShowDotations();

      },
      err => {
        this.failed = true;
        this.succ = false;
        this.msg = "  فشل عند التحديث"
        console.log(err);
        this.toastr.warning('لم يتم التحديث ', ' فشل');

      }
    )
  }

  // Insert

  dotation: TbListening = new TbListening();

  insertRecord(form: NgForm) {
    this.tblService.PostDep().subscribe(
      res => {
        this.succ = true;
        this.failed = false;
        this.msg = "  تمت الإضافة بنجاح"
        this.resetForm(form);
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


