import { Component, OnInit } from '@angular/core';
import { TypeTypeServiceVenteservice } from '../../shared/Services/ServiceVente/type-service-vente.service';
import { ToastrService } from 'ngx-toastr';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crud-type-service-vente',
  templateUrl: './crud-type-service-vente.component.html',
  styleUrls: ['./crud-type-service-vente.component.css']
})
export class CrudTypeServiceVenteComponent implements OnInit {


  constructor(private tblService: TypeTypeServiceVenteservice,
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
    this.tblService.Edit().subscribe(
      res => {
        this.resetForm(form);
        this.succ = true;
        this.failed = false;
        this.msg = "  تم التحديث بنجاح"
        this.toastr.success("تم التحديث  بنجاح", "نجاح");
        this.ShowDotations();

      },
      err => {
        console.log(err);
        this.failed = true;
        this.succ = false;
        this.msg = "  فشل عند التحديث"
        this.toastr.warning('لم يتم التحديث ', ' فشل');

      }
    )
  }

  // Insert

  dotation: TbListening = new TbListening();

  insertRecord(form: NgForm) {
    this.tblService.Post().subscribe(
      res => {
        this.resetForm(form);
        this.succ = true;
        this.failed = false;
        this.msg = "  تمت الإضافة بنجاح"
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.ShowDotations();
      },
      err => {
        console.log(err);
        this.failed = true;
        this.succ = false;
        this.msg = " فشل عند الإضافة"
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
