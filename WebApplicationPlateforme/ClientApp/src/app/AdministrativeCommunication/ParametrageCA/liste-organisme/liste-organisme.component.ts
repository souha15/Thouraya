import { Component, OnInit } from '@angular/core';
import { OrganismeService } from '../../../shared/Services/AdministrativeCommunication/organisme.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Organisme } from '../../../shared/Models/AdministrativeCommunication/organisme.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-liste-organisme',
  templateUrl: './liste-organisme.component.html',
  styleUrls: ['./liste-organisme.component.css']
})
export class ListeOrganismeComponent implements OnInit {

  constructor(private organismeService: OrganismeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ShowOrganismes();
    this.resetForm();
  }


  //show Organisme List

  private _allOrganismes: Observable<Organisme[]>;
  public get allOrganisme(): Observable<Organisme[]> {
    return this._allOrganismes;
  }

  public set allOrganisme(value: Observable<Organisme[]>) {
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
      nomcomplet: '',
      shortnom: '',
      fax: '',
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
  dotshow: Organisme = new Organisme();

  populateForm(organisme: Organisme) {
    this.organismeService.formData = Object.assign({}, organisme);
    this.dotshow = Object.assign({}, organisme)

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
