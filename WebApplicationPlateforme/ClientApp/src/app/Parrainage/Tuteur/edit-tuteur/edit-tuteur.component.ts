import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TuteurParrinage } from '../../../shared/Models/Parrainage/tuteur-parrinage.model';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TuteurParrainageService } from '../../../shared/Services/Parrainage/tuteur-parrainage.service';

@Component({
  selector: 'app-edit-tuteur',
  templateUrl: './edit-tuteur.component.html',
  styleUrls: ['./edit-tuteur.component.css']
})
export class EditTuteurComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private tutService: TuteurParrainageService) { }

  ngOnInit(): void {
    this.getIdUrl();
  }

  Id: number;
  tut: TuteurParrinage = new TuteurParrinage();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.tutService.GetById(this.Id).subscribe(res => {
        this.tut = res

      })


    });
  }

  //Edit Tuteur

  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();

  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;
      this.tutService.PutObservableE(this.tut).subscribe(res => {
        this.toastr.success("تم تعديل الكفيل بنجاح", " تعديل الكفيل");
        form.resetForm();
      },
        err => {
          this.toastr.error("فشل تعديل الكفيل", " تعديل الكفيل")
        })
    }
  }
}
