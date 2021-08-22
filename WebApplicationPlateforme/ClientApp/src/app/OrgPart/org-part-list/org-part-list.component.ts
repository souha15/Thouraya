import { Component, OnInit } from '@angular/core';
import { OrgPartService } from '../../shared/Services/OrgPart/org-part.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { OrgPart } from '../../shared/Models/OgPart/org-part.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-org-part-list',
  templateUrl: './org-part-list.component.html',
  styleUrls: ['./org-part-list.component.css']
})
export class OrgPartListComponent implements OnInit {

  constructor(private OgPartService: OrgPartService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.ShowOrganismes();
    this.resetForm();
  }


  //show Organisme List

  private _allOrganismes: Observable<OrgPart[]>;
  public get allOrganisme(): Observable<OrgPart[]> {
    return this._allOrganismes;
  }

  public set allOrganisme(value: Observable<OrgPart[]>) {
    this._allOrganismes = value;


  }

  ShowOrganismes() {
    this.allOrganisme = this.OgPartService.Get();
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.OgPartService.Delete(Id)
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
    this.OgPartService.formData = {
      id: 0,
      nomcomplet: '',
      shortnom: '',
      fax: '',
      email: '',
      addresse: '',
      tel: '',
      nom: '',
      prenom: '',
      cin: '',
      attribut1: 0,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      CreatorName: '',
      IdUserCreator: '',
      datenereg: '',
    }
  }


  //PopulateForm
  dotshow: OrgPart = new OrgPart();
  org: boolean = false;
  part: boolean = false;
  orgpart: boolean = false;
  populateForm(organisme: OrgPart) {
    this.OgPartService.formData = Object.assign({}, organisme);
    this.dotshow = Object.assign({}, organisme)
    if (this.dotshow.attribut2 == "جهة") {

      this.orgpart = true;
      this.org = true;

    } else {
      this.org = false;
      this.orgpart = false;
    }

    if (this.dotshow.attribut2 == "فرد") {
      this.part = true;
      this.orgpart = true;
    } else {
      this.part = false;
      this.orgpart = false;
    }
  }

  //Edit

  updateRecord(form: NgForm) {
    this.OgPartService.Edit().subscribe(
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
    this.OgPartService.Post().subscribe(
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
    if (this.OgPartService.formData.id == 0)
      this.insertRecord(form);
    else  //update
      this.updateRecord(form);
  }
}
