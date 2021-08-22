import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EtatUnite } from '../../../shared/Models/Dotations/etat-unite.model';
import { EtatUniteService } from '../../../shared/Services/Dotations/etat-unite.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-etatunite',
  templateUrl: './etatunite.component.html',
  styleUrls: ['./etatunite.component.css']
})
export class EtatuniteComponent implements OnInit {

  constructor(private dotationService: EtatUniteService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ShowDotations();
    this.resetForm();
  }

  // Type Dotation List

  private _allDotations: Observable<EtatUnite[]>;
  public get allDotation(): Observable<EtatUnite[]> {
    return this._allDotations;
  }

  public set allDotation(value: Observable<EtatUnite[]>) {
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

    }
  }

  //PopulateForm

  populateForm(dotation: EtatUnite) {
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

  dotation: EtatUnite = new EtatUnite();

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

