import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrganismeService } from '../../../shared/Services/AdministrativeCommunication/organisme.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Organisme } from '../../../shared/Models/AdministrativeCommunication/organisme.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-organisme',
  templateUrl: './organisme.component.html',
  styleUrls: ['./organisme.component.css']
})
export class OrganismeComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private organismeService: OrganismeService,
    private UserService: UserServiceService,
  ) { }

  ngOnInit(): void {
    this.getUserConnected();
  }


  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(
      res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      
  

    })

  }

  //Create Organisme

  organisme: Organisme = new Organisme();
  date = new Date().toLocaleDateString();
  isValidFormSubmitted = false;
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  onSubmit(form: NgForm) {
    this.organisme.creatorName = this.UserNameConnected;
    this.organisme.datenereg = this.date;
    this.organisme.idUserCreator = this.UserIdConnected;
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    } else {
      this.isValidFormSubmitted = true
      this.organismeService.Create(this.organisme).subscribe(res => {
        this.succ = true;
        this.failed = false;


        this.msg = "  تمت الإضافة بنجاح"
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
          this.failed = true;
          this.succ = false;

          this.msg = " فشل عند الإضافة"
          console.log(err);
          this.toastr.warning('لم تتم الإضافة', ' فشل');
        })
    }
  }
}
