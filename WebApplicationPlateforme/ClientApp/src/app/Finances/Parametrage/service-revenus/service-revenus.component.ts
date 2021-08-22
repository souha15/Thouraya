import { Component, OnInit } from '@angular/core';
import { ServiceRevenusService } from '../../../shared/Services/Dotations/service-revenus.service';
import { ToastrService } from 'ngx-toastr';
import { ServicesRevenus } from '../../../shared/Models/Dotations/services-revenus.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-service-revenus',
  templateUrl: './service-revenus.component.html',
  styleUrls: ['./service-revenus.component.css']
})
export class ServiceRevenusComponent implements OnInit {

  constructor(private dotationService: ServiceRevenusService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ShowDotations();
    this.resetForm();
  }

  // Type Dotation List

  private _allDotations: Observable<ServicesRevenus[]>;
  public get allDotation(): Observable<ServicesRevenus[]> {
    return this._allDotations;
  }

  public set allDotation(value: Observable<ServicesRevenus[]>) {
    this._allDotations = value;


  }

  ShowDotations() {
    this.allDotation = this.dotationService.GetDotation();
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.dotationService.Delete(Id)
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
    this.dotationService.formData = {
      id: 0,
      nom: '',
      description: '',
      prix:'',

    }
  }

  //PopulateForm

  populateForm(dotation: ServicesRevenus) {
    this.dotationService.formData = Object.assign({}, dotation);

  }

  //Edit

  updateRecord(form: NgForm) {
    this.dotationService.Edit().subscribe(
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

  dotation: ServicesRevenus = new ServicesRevenus();

  insertRecord(form: NgForm) {
    this.dotationService.Post().subscribe(
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
    if (this.dotationService.formData.id == 0)
      this.insertRecord(form);
    else  //update
      this.updateRecord(form);
  }
}
