import { Component, OnInit } from '@angular/core';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-type-facture',
  templateUrl: './type-facture.component.html',
  styleUrls: ['./type-facture.component.css']
})
export class TypeFactureComponent implements OnInit {



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
    this.allDotation = this.tblService.GetTfacture();
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.tblService.DeleteTfacture(Id)
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
    this.tblService.EditTfacture().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("تم التحديث  بنجاح", "نجاح");
        this.ShowDotations();
        this.msg = "  تم التحديث بنجاح"

        this.succ = true;
        this.failed = false;
      },
      err => {
        console.log(err);
        this.toastr.warning('لم يتم التحديث ', ' فشل');
        this.msg = "  فشل عند التحديث"

        this.failed = true;
        this.succ = false;
      }
    )
  }

  // Insert

  dotation: TbListening = new TbListening();

  insertRecord(form: NgForm) {
    this.tblService.PostTfacture().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.ShowDotations();
        this.succ = true;
        this.failed = false;


        this.msg = "  تمت الإضافة بنجاح"
      },
      err => {
        console.log(err);
        this.toastr.warning('لم تتم الإضافة', ' فشل');
        this.failed = true;
        this.succ = false;

        this.msg = " فشل عند الإضافة"
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



