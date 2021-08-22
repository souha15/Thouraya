import { Component, OnInit } from '@angular/core';
import { AgenceImmob } from '../../../shared/Models/Dotations/agence-immob.model';
import { ToastrService } from 'ngx-toastr';
import { AgenceImmobService } from '../../../shared/Services/Dotations/agence-immob.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bureau-immob-page',
  templateUrl: './bureau-immob-page.component.html',
  styleUrls: ['./bureau-immob-page.component.css']
})
export class BureauImmobPageComponent implements OnInit {

  constructor(private dotationService: AgenceImmobService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ShowDotations();
    this.resetForm();
  }

  // Type Dotation List

  private _allDotations: Observable<AgenceImmob[]>;
  public get allDotation(): Observable<AgenceImmob[]> {
    return this._allDotations;
  }

  public set allDotation(value: Observable<AgenceImmob[]>) {
    this._allDotations = value;


  }

  ShowDotations() {
    this.allDotation = this.dotationService.Get();
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
      nomResponsable: '',
      tel: '',
      fax: '',
      phoneNumber: '',
      adresse: '',
      ville: '',
    }
  }

  //PopulateForm
  dotshow: AgenceImmob = new AgenceImmob();

  populateForm(dotation: AgenceImmob) {
    this.dotationService.formData = Object.assign({}, dotation);
    this.dotshow = Object.assign({}, dotation)

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

