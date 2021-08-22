import { Component, OnInit } from '@angular/core';
import { ProprietaireService } from '../../../shared/Services/AdministrativeCommunication/proprietaire.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Proprietaire } from '../../../shared/Models/AdministrativeCommunication/proprietaire.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.component.html',
  styleUrls: ['./proprietaire.component.css']
})
export class ProprietaireComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private proprietaireService: ProprietaireService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(
      res => {
        this.UserIdConnected = res.id;
        this.UserNameConnected = res.fullName;
        this.adminisgtrationName = res.idAdministration;


      })

  }

  //Test cin

  propList: Proprietaire[] = [];
  propListf: Proprietaire[] = [];
  cin: string;
  cinexist: boolean;
  testcin(event) {
    this.cin = event.target.value;
    this.cin.toString();
    this.proprietaireService.List().subscribe(res => {
      this.propList = res
      this.propListf = this.propList.filter(item => item.cin == this.cin)
      if (this.propListf.length == 0) {
        this.cinexist = true

      } else {
        this.cinexist = false
      }
    })

  }

  //Create prop

  prop: Proprietaire = new Proprietaire();
  date = new Date().toLocaleDateString();
  isValidFormSubmitted = false;
  onSubmit(form: NgForm) {
    this.prop.creatorName = this.UserNameConnected;
    this.prop.datenereg = this.date;
    this.prop.idUserCreator = this.UserIdConnected;
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    } else {
      if (this.cinexist) {
        this.isValidFormSubmitted = true
        this.proprietaireService.Create(this.prop).subscribe(res => {

          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
          form.resetForm();
        },
          err => {
            console.log(err);
            this.toastr.warning('لم تتم الإضافة', ' فشل');
          })
      } else {
        this.toastr.warning('لم تتم الإضافة رقم الهوية موجود', ' فشل');
      }
    }
  }
}
