import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { FilesActiviteeService } from '../../../shared/Services/NewServicesForDawa/files-activitee.service';

@Component({
  selector: 'app-type-activitee-education',
  templateUrl: './type-activitee-education.component.html',
  styleUrls: ['./type-activitee-education.component.css']
})
export class TypeActiviteeEducationComponent implements OnInit {



  constructor(private tblService: FilesActiviteeService,
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
    this.allDotation = this.tblService.GetE();
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.tblService.DeleteE(Id)
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

  updateRecord(form: NgForm) {
    this.tblService.EditE().subscribe(
      res => {
        this.succ = true;
        this.failed = false;
        this.resetForm(form);
        this.toastr.success("تم التحديث  بنجاح", "نجاح");
        this.ShowDotations();

      },
      err => {
        this.failed = true;
        this.succ = false;
        console.log(err);
        this.toastr.warning('لم يتم التحديث ', ' فشل');

      }
    )
  }

  // Insert
  succ: boolean = false;
  failed: boolean = false;
  dotation: TbListening = new TbListening();

  insertRecord(form: NgForm) {
    this.tblService.PostE().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.ShowDotations();
      },
      err => {
        this.failed = true;
        this.succ = false;
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
