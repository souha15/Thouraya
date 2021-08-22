import { Component, OnInit } from '@angular/core';
import { ProjetClient } from '../../../shared/Models/ProjetOrg/projet-client.model';
import { ClientProjetClientOrgService } from '../../../shared/Services/ProjetOrg/client-projet-org.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-projet-client',
  templateUrl: './add-projet-client.component.html',
  styleUrls: ['./add-projet-client.component.css']
})
export class AddProjetClientComponent implements OnInit {

  constructor(private projetcltService: ClientProjetClientOrgService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ShowDotations();
    this.resetForm();
  }

  clt: ProjetClient = new ProjetClient();
  isValidFormSubmitted = false;

  // Type Dotation List

  private _allDotations: Observable<ProjetClient[]>;
  public get allDotation(): Observable<ProjetClient[]> {
    return this._allDotations;
  }

  public set allDotation(value: Observable<ProjetClient[]>) {
    this._allDotations = value;


  }

  ShowDotations() {
    this.allDotation = this.projetcltService.Get();
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.projetcltService.Delete(Id)
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
    this.projetcltService.formData = {
      id: 0,
      nom: '',
      tel: '',
      pays: '',
      ville: '',
      cin: '',
      travail: '',
      email: '',
      num: '',
      attibut1: '',
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',

    }
  }

  populateForm(dotation: ProjetClient) {
    this.projetcltService.formData = Object.assign({}, dotation);

  }


  updateRecord(form: NgForm) {
    this.projetcltService.Edit().subscribe(
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


  insertRecord(form: NgForm) {
    this.projetcltService.Post().subscribe(
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
    if (this.projetcltService.formData.id == 0)
      this.insertRecord(form);
    else  //update
      this.updateRecord(form);
  }
}
