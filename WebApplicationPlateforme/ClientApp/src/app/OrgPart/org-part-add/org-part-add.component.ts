import { Component, OnInit } from '@angular/core';
import { OrgPartService } from '../../shared/Services/OrgPart/org-part.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { OrgPart } from '../../shared/Models/OgPart/org-part.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-org-part-add',
  templateUrl: './org-part-add.component.html',
  styleUrls: ['./org-part-add.component.css']
})
export class OrgPartAddComponent implements OnInit {

  constructor(private OgPartService: OrgPartService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(
      res => {
        this.UserIdConnected = res.id;
        this.UserNameConnected = res.fullName;
      })
  }

  //Create Organisme

  organisme: OrgPart = new OrgPart();
  date = new Date().toLocaleDateString();
  isValidFormSubmitted = false;
  onSubmit(form: NgForm) {
    this.organisme.CreatorName = this.UserNameConnected;
    this.organisme.datenereg = this.date;
    this.organisme.IdUserCreator = this.UserIdConnected;
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    } else {
      this.isValidFormSubmitted = true
      this.OgPartService.Add(this.organisme).subscribe(res => {

        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
          console.log(err);
          this.toastr.warning('لم تتم الإضافة', ' فشل');
        })
    }
  }

  org: boolean = false;
  part: boolean = false;
  orgpart: boolean = false;

  PartorOrg(event) {
    if (event.target.value == "جهة") {
      this.orgpart = true;
      this.org = true;
      
    } else {
      this.org = false;
      this.orgpart = false;
    }

    if (event.target.value == "فرد") {
      this.part = true;
      this.orgpart = true;
    } else {
      this.part = false;
      this.orgpart = false;
    }
    
  }
}
