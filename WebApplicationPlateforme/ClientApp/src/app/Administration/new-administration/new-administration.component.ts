import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-administration',
  templateUrl: './new-administration.component.html',
  styleUrls: ['./new-administration.component.css']
})
export class NewAdministrationComponent implements OnInit {

  constructor(private AdministrativeSevice: AdministrationService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
  ) { }

  ngOnInit(): void {
    
    this.getUsersList();
  
  
  }


  //Get Users List

  UsersList: UserDetail[] = [];

  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersList = res
    })
  }

  //Create Tache


  admin: Administration = new Administration();
  CreatedAdministration: Administration = new Administration();
  adminId: number;


  

  onSubmit(form:NgForm) {

    if (this.nomAd == null) {
      this.toastr.warning(" اكتب اسم الإدارة", "فشل")
    }
    else {

      this.AdministrativeSevice.AddAdministration(this.admin).subscribe(
        (res: any) => {
          this.vider(form);
        this.CreatedAdministration = res;
        this.adminId = this.CreatedAdministration.id;

          this.toastr.success("تم تسجيل الإدارة بنجاح", " تسجيل الإدارة");
  
      },
      err => {
        this.toastr.error("فشل تسجيل الإدارة", " تسجيل الإدارة")
      }

    )
  }
  }

  //Test champs nom si vide
  nomAd: string;
  testnom(event) {
    this.nomAd = event.target.value;
     this.nomAd.toString();
  }

  //ResetForm

  resetForm(form?: NgForm) {

    if (form != null) 
      form.resetForm();
    
    this.AdministrativeSevice.formData = {
      id: null,
      nom: '',
      description: '',
      nomDirecteur:''

    }
   
  }

  vider(form: NgForm) {
    form.reset();
  }
}
