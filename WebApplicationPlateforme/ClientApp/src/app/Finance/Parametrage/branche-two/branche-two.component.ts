import { Component, OnInit } from '@angular/core';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';
import { BrancheTwoService } from '../../../shared/Services/Finance/branche-two.service';
import { BrancheTwo } from '../../../shared/Models/Finance/branche-two.model';
import { BrancheOneService } from '../../../shared/Services/Finance/branche-one.service';
import { BrancheOne } from '../../../shared/Models/Finance/branche-one.model';

@Component({
  selector: 'app-branche-two',
  templateUrl: './branche-two.component.html',
  styleUrls: ['./branche-two.component.css']
})
export class BrancheTwoComponent implements OnInit {




  constructor(private tblService: BrancheTwoService,
    private toastr: ToastrService,
    private typeService: BrancheOneService) { }

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
    this.allDotation = this.tblService.GetBrancheTwo();
  }

  typef: BrancheOne[] = [];
  showty() {
    this.typeService.GetBo().subscribe(res => {
      this.typef = res
    })
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.tblService.DeleteBt(Id)
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
      idBOne:0,
    }
  }

  //PopulateForm

  populateForm(dotation: BrancheTwo) {
    this.tblService.formData = Object.assign({}, dotation);

  }

  //Edit

  updateRecord(form: NgForm) {
    this.tblService.EditBt().subscribe(
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

  dotation: BrancheTwo = new BrancheTwo();

  insertRecord(form: NgForm) {
    this.tblService.PostBt().subscribe(
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
