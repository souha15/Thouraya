import { Component, OnInit } from '@angular/core';
import { NotifTextService } from '../../shared/Services/NotificationSettings/notif-text.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NotifText } from '../../shared/Models/NotificationSettings/notif-text.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-notif-text-crud',
  templateUrl: './notif-text-crud.component.html',
  styleUrls: ['./notif-text-crud.component.css']
})
export class NotifTextCrudComponent implements OnInit {


  constructor(private tblService: NotifTextService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ShowDotations();
    this.resetForm();
  }

  // Type Dotation List

  private _allDotations: Observable<NotifText[]>;
  public get allDotation(): Observable<NotifText[]> {
    return this._allDotations;
  }

  public set allDotation(value: Observable<NotifText[]>) {
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
      text:'',
    }
  }

  //PopulateForm

  populateForm(dotation: NotifText) {
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

  dotation: NotifText = new NotifText();

  insertRecord(form: NgForm) {
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
