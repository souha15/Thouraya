import { Component, OnInit } from '@angular/core';
import { TuteurParrinage } from '../../../shared/Models/Parrainage/tuteur-parrinage.model';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TuteurParrainageService } from '../../../shared/Services/Parrainage/tuteur-parrainage.service';

@Component({
  selector: 'app-add-tuteur',
  templateUrl: './add-tuteur.component.html',
  styleUrls: ['./add-tuteur.component.css']
})
export class AddTuteurComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private tutService: TuteurParrainageService) { }

  ngOnInit(): void {
    this.getrandomData();
    this.getUserConnected();
  }



  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }


  getrandomData() {
    let ran = Math.floor(Math.random() * (97856 - 10000 + 1)) + 10000;
    this.tut.numTut = "00" + ran.toString();
  }
  telvalid: boolean = false;
  TelTest(event) {
    if (event.target.value.length > 10 || event.target.value.length < 8) {
      this.telvalid = true;
      this.isValidFormSubmitted = false;
    } else {
      this.telvalid = false;
      this.isValidFormSubmitted = false;
    }
  }

  cinvalid: boolean = false;

  cintest(event) {
    if (event.target.value.length > 10 || event.target.value.length < 8) {
      this.cinvalid = true;
      this.isValidFormSubmitted = false;
    } else {
      this.cinvalid = false;
      this.isValidFormSubmitted = false;
    }
  }
  //Add Tuteur
  tut: TuteurParrinage = new TuteurParrinage();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();

  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;
      this.tut.idUserCreator = this.UserIdConnected;
      this.tut.attribut6 = this.UserNameConnected;
      this.tut.dateenreg = this.date;
      this.tutService.Add(this.tut).subscribe(res => {
        this.toastr.success("تم تسجيل الكفيل بنجاح", " تسجيل الكفيل");
        form.resetForm();
      },
        err => {
          this.toastr.error("فشل تسجيل الكفيل", " تسجيل الكفيل")
        })
    }
  }
}
