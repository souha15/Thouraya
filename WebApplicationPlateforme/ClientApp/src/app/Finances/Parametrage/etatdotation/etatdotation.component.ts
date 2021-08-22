import { Component, OnInit } from '@angular/core';
import { EtatDotationService } from '../../../shared/Services/Dotations/etat-dotation.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EtatDotation } from '../../../shared/Models/Dotations/etat-dotation.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-etatdotation',
  templateUrl: './etatdotation.component.html',
  styleUrls: ['./etatdotation.component.css']
})
export class EtatdotationComponent implements OnInit {


  constructor(private dotationService: EtatDotationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ShowDotations();
    this.resetForm();
  }

  // Type Dotation List

  private _allDotations: Observable<EtatDotation[]>;
  public get allDotation(): Observable<EtatDotation[]> {
    return this._allDotations;
  }

  public set allDotation(value: Observable<EtatDotation[]>) {
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
      description: ''
    }
  }

  //PopulateForm

  populateForm(dotation: EtatDotation) {
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

