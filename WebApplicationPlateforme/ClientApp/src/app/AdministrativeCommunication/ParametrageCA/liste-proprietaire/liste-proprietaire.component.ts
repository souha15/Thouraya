import { Component, OnInit } from '@angular/core';
import { ProprietaireService } from '../../../shared/Services/AdministrativeCommunication/proprietaire.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Proprietaire } from '../../../shared/Models/AdministrativeCommunication/proprietaire.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-liste-proprietaire',
  templateUrl: './liste-proprietaire.component.html',
  styleUrls: ['./liste-proprietaire.component.css']
})
export class ListeProprietaireComponent implements OnInit {

  constructor(private organismeService: ProprietaireService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ShowOrganismes();
    this.resetForm();
  }


  //show Proprietaire List

  private _allOrganismes: Observable<Proprietaire[]>;
  public get allOrganisme(): Observable<Proprietaire[]> {
    return this._allOrganismes;
  }

  public set allOrganisme(value: Observable<Proprietaire[]>) {
    this._allOrganismes = value;


  }

  ShowOrganismes() {
    this.allOrganisme = this.organismeService.List();
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.organismeService.Delete(Id)
        .subscribe(res => {
          this.ShowOrganismes();
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
    this.organismeService.formData = {
      id: 0,
      nom: '',
      prenom: '',
      cin: '',
      email: '',
      addresse: '',
      tel: '',
      attribut1: 0,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      creatorName: '',
      idUserCreator: '',
      datenereg: '',
    }
  }


  //PopulateForm
  dotshow: Proprietaire = new Proprietaire();

  populateForm(Proprietaire: Proprietaire) {
    this.organismeService.formData = Object.assign({}, Proprietaire);
    this.dotshow = Object.assign({}, Proprietaire)

  }

  //Edit

  updateRecord(form: NgForm) {
    this.organismeService.Edit().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("تم التحديث  بنجاح", "نجاح");
        this.ShowOrganismes();

      },
      err => {
        console.log(err);
        this.toastr.warning('لم يتم التحديث ', ' فشل');

      }
    )
  }

  // Insert


  insertRecord(form: NgForm) {
    this.organismeService.Post().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.ShowOrganismes();
      },
      err => {
        console.log(err);
        this.toastr.warning('لم تتم الإضافة', ' فشل');
      }
    )
  }

  // Add and Update
  onSubmit(form: NgForm) {
    if (this.organismeService.formData.id == 0)
      this.insertRecord(form);
    else  //update
      this.updateRecord(form);
  }
}
