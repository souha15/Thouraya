import { Component, OnInit } from '@angular/core';
import { DepotRevenusService } from '../../../shared/Services/Dotations/depot-revenus.service';
import { ToastrService } from 'ngx-toastr';
import { DepotRevenus } from '../../../shared/Models/Dotations/depot-revenus.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-depot-revenus',
  templateUrl: './depot-revenus.component.html',
  styleUrls: ['./depot-revenus.component.css']
})
export class DepotRevenusComponent implements OnInit {

  constructor(private depotService: DepotRevenusService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ShowDotations();
    this.resetForm();
  }
  // Type Dotation List

  private _allDotations: Observable<DepotRevenus[]>;
  public get allDotation(): Observable<DepotRevenus[]> {
    return this._allDotations;
  }

  public set allDotation(value: Observable<DepotRevenus[]>) {
    this._allDotations = value;


  }

  ShowDotations() {
    this.allDotation = this.depotService.GetDotation();
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.depotService.Delete(Id)
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
    this.depotService.formData = {
      id: 0,
      nom: '',
      description: '',

    }
  }

  //PopulateForm

  populateForm(dotation: DepotRevenus) {
    this.depotService.formData = Object.assign({}, dotation);

  }

  //Edit

  updateRecord(form: NgForm) {
    this.depotService.Edit().subscribe(
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

  dotation: DepotRevenus = new DepotRevenus();

  insertRecord(form: NgForm) {
    this.depotService.Post().subscribe(
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
    if (this.depotService.formData.id == 0)
      this.insertRecord(form);
    else  //update
      this.updateRecord(form);
  }
}
