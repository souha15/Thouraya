import { Component, OnInit } from '@angular/core';
import { GestionSuppService } from '../../shared/Services/Supplies/gestion-supp.service';
import { ToastrService } from 'ngx-toastr';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { GestionSupp } from '../../shared/Models/Supplies/gestion-supp.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';

@Component({
  selector: 'app-gestion-suuplies',
  templateUrl: './gestion-suuplies.component.html',
  styleUrls: ['./gestion-suuplies.component.css']
})
export class GestionSuupliesComponent implements OnInit {

  constructor(private tblService: GestionSuppService,
    private toastr: ToastrService,
    private tblService2: TbListeningService,) { }

  ngOnInit(): void {

    this.getnom();
    this.getType();
    this.ShowDotations();
    this.resetForm();
  }




  private _allDotations: Observable<GestionSupp[]>;
  public get allDotation(): Observable<GestionSupp[]> {
    return this._allDotations;
  }

  public set allDotation(value: Observable<GestionSupp[]>) {
    this._allDotations = value;


  }

  ShowDotations() {
    this.allDotation = this.tblService.Get();
  }

  tbnom: TbListening[] = [];
  getnom() {
    this.tblService2.GetNom().subscribe(res => {
      this.tbnom =res
    })

  }
  tbtype: TbListening[] = [];
  getType() {
    this.tblService2.GetType().subscribe(res => {
      this.tbtype = res;
    })
  }

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
      sup: '',
      type: '',
      reference: '',
      quanitite: '',
      attribut1: 0,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',

    }
  }


  //Populate FORM
  populateForm(dotation: GestionSupp) {
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

  dotation: GestionSupp = new GestionSupp();

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
