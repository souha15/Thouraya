import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BrancheOne } from '../../../shared/Models/Finance/branche-one.model';
import { BrancheOneService } from '../../../shared/Services/Finance/branche-one.service';

@Component({
  selector: 'app-branche-one',
  templateUrl: './branche-one.component.html',
  styleUrls: ['./branche-one.component.css']
})
export class BrancheOneComponent implements OnInit {




  constructor(private tblService: BrancheOneService,
    private toastr: ToastrService,
    private typeService: TbListeningService) { }

  ngOnInit(): void {
    this.ShowDotations();
    this.resetForm();
    this.showty();
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
    this.allDotation = this.tblService.GetBrancheOne();
  }

  typef: TbListening[] = [];
  showty() {
    this.typeService.GetTypefacture().subscribe(res => {
      this.typef = res
    })
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.tblService.DeleteBo(Id)
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
      idTF: 0,

    }
  }

  //PopulateForm

  populateForm(dotation: BrancheOne) {
    this.tblService.formData = Object.assign({}, dotation);

  }

  //Edit

  updateRecord(form: NgForm) {
    this.tblService.EditBo().subscribe(
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

  dotation: BrancheOne = new BrancheOne();

  insertRecord(form: NgForm) {
    this.tblService.PostBo().subscribe(
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
