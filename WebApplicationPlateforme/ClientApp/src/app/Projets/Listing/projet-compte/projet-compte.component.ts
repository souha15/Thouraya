import { Component, OnInit } from '@angular/core';
import { ListeningProjetService } from '../../../shared/Services/Projets/listening-projet.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';
import { EtatListCompte } from '../../../shared/Models/Comptes/etat-list-compte.model';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';

@Component({
  selector: 'app-projet-compte',
  templateUrl: './projet-compte.component.html',
  styleUrls: ['./projet-compte.component.css']
})
export class ProjetCompteComponent implements OnInit {

  constructor(private tblService: ListeningProjetService,
    private toastr: ToastrService,
    private tblService2: TbListeningService,) { }

  ngOnInit(): void {
    this.ShowDotations();
    this.gettb();
    this.resetForm();
  }


  //gettb()
  tb: TbListening[] = [];
  gettb() {
    this.tblService2.GetEtatCompte().subscribe(res => {
      this.tb =res
    })
  }
  // Type Dotation List

  private _allDotations: Observable<EtatListCompte[]>;
  public get allDotation(): Observable<EtatListCompte[]> {
    return this._allDotations;
  }

  public set allDotation(value: Observable<EtatListCompte[]>) {
    this._allDotations = value;


  }

  ShowDotations() {
    this.allDotation = this.tblService.GetCompte();
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.tblService.DeleteCompte(Id)
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
    this.tblService.formData2 = {
      id: 0,
      nom: '',
      type: '',
      numCompte: '',

    }
  }

  //PopulateForm

  populateForm(dotation: EtatListCompte) {
    this.tblService.formData2 = Object.assign({}, dotation);

  }

  //Edit

  updateRecord(form: NgForm) {
    this.tblService.EditCompte().subscribe(
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

  dotation: EtatListCompte = new EtatListCompte();

  insertRecord(form: NgForm) {
    this.tblService.PostCompte().subscribe(
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
    if (this.tblService.formData2.id == 0)
      this.insertRecord(form);
    else  //update
      this.updateRecord(form);
  }
}
