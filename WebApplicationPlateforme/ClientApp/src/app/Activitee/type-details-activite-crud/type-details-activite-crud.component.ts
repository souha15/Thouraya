import { Component, OnInit } from '@angular/core';
import { ActiviteeService } from '../../shared/Services/NewServicesForDawa/activitee.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-type-details-activite-crud',
  templateUrl: './type-details-activite-crud.component.html',
  styleUrls: ['./type-details-activite-crud.component.css']
})
export class TypeDetailsActiviteCrudComponent implements OnInit {



  constructor(private tblService: ActiviteeService,
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
    this.allDotation = this.tblService.ListTypeDetail();
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.tblService.DeleteTypeDetail(Id)
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
    this.tblService.formDataTypeDetail = {
      id: 0,
      nom: '',

    }
  }

  //PopulateForm

  populateForm(dotation: TbListening) {
    this.tblService.formDataTypeDetail = Object.assign({}, dotation);

  }

  //Edit

  updateRecord(form: NgForm) {
    this.tblService.EditTypeDetail().subscribe(
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

  dotation: TbListening = new TbListening();

  insertRecord(form: NgForm) {
    this.tblService.PostTypeDetail().subscribe(
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
    if (this.tblService.formDataTypeDetail.id == 0)
      this.insertRecord(form);
    else  //update
      this.updateRecord(form);
  }

}
