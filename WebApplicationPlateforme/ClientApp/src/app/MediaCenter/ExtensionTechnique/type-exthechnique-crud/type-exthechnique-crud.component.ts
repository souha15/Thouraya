import { Component, OnInit } from '@angular/core';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-type-exthechnique-crud',
  templateUrl: './type-exthechnique-crud.component.html',
  styleUrls: ['./type-exthechnique-crud.component.css']
})
export class TypeExthechniqueCrudComponent implements OnInit {


  constructor(private tblService: TblSettingsMediaCenterService,
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
    this.allDotation = this.tblService.GetTypeExthechnique();
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.tblService.DeleteTypeExthechnique(Id)
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
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  populateForm(dotation: TbListening) {
    this.tblService.formData = Object.assign({}, dotation);

  }

  //Edit

  updateRecord(form: NgForm) {
    this.tblService.EditTypeExthechnique().subscribe(
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
    this.tblService.PostTypeExthechnique().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.succ = true;
        this.failed = false;


        this.msg = "  تمت الإضافة بنجاح"
        this.ShowDotations();
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
