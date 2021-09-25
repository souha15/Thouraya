import { Component, OnInit } from '@angular/core';
import { SoldeConge } from '../../../shared/Models/RH/solde-conge.model';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SoldeCongeService } from '../../../shared/Services/Rh/solde-conge.service';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-solde-conge',
  templateUrl: './solde-conge.component.html',
  styleUrls: ['./solde-conge.component.css']
})
export class SoldeCongeComponent implements OnInit {



  constructor(private tblService: SoldeCongeService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.ShowDotations();
    this.resetForm();
    this.UserList();
  
  }

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;


  //get User Connected
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    

    })

  }

  // Type Dotation List

  allDotation: SoldeConge[] = [];
  ShowDotations() {
    this.tblService.Get().subscribe(res => {
      this.allDotation = res;
    })

  }

  //Get Users List
  user: UserDetail[] = [];
  UserList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.user = res;
    })
  }

  //Get UserName
  add: boolean = false;
  getUser(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.tblService.formData.userNameCreator = res.fullName;
      if (this.allDotation.filter(item => item.idUserCreator == res.id).length == 0) {
        this.add = true;
      } else {
        this.add = false;
      }
     
    })
  }


  


  //OnSubmit
  conge: SoldeConge = new SoldeConge();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();

  Insert(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true;
      this.tblService.formData.dateenreg = this.date
      this.tblService.formData.normal = "إجازة سنوية"
      this.tblService.formData.urgent = "إجازة إضطرارية"
      this.tblService.formData.maladie = "إجازة إستثنائية"
      this.tblService.formData.mois = "شهري"
      this.tblService.formData.annee = "سنوي"
      this.tblService.formData.dateurgent = new Date().toString();
      this.tblService.formData.datenormal = new Date().toString();
      this.tblService.formData.datemaladie = new Date().toString();
      this.tblService.Post().subscribe(res => {

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
  }


  //Reset Form
  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.tblService.formData = {
      id: 0,
      type: '',
      mois: '',
      annee: '',
      number: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',
      normal: '',
      numbernormal: '',
      soldenormal: '',
      datenormal: '',
      urgent: '',
      numberurgent: '',
      dateurgent: '',
      soldeurgent: '',
      maladie: '',
      soldemaladie: '',
      numbermaladie: '',
      datemaladie: '',

    }
  }


  //PopulateForm
  solde: boolean = false;
  populateForm(dotation: SoldeConge) {
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


  // Add and Update
  onSubmit(form: NgForm) {
    if (this.tblService.formData.id == 0) {
      if (this.add)
        this.Insert(form);
      else
        this.toastr.warning('لقد تمت إضافة رصيد الموظف مسبقا', ' فشل');
    }else  //update
      this.updateRecord(form);

  }

  c: Number = 1;
  count: Number = 5;
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
}
