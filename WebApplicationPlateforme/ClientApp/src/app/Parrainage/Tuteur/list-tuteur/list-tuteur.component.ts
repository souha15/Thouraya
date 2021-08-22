import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TuteurParrinage } from '../../../shared/Models/Parrainage/tuteur-parrinage.model';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TuteurParrainageService } from '../../../shared/Services/Parrainage/tuteur-parrainage.service';

@Component({
  selector: 'app-list-tuteur',
  templateUrl: './list-tuteur.component.html',
  styleUrls: ['./list-tuteur.component.css']
})
export class ListTuteurComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private tutService: TuteurParrainageService) { }

  ngOnInit(): void {
    this.ShowListTaches();
  }
  c: Number = 1;
  count: Number = 5;
  allTa
  //Orph list
  orph: TuteurParrinage[] = [];

  ShowListTaches() {

    this.tutService.Get().subscribe(res => {
      this.orph = res
    })
  }


  Id: number=0;

  populateForm(tut: TuteurParrinage) {
    this.tutService.formData = Object.assign({}, tut)
    this.Id = tut.id;

}

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.tutService.Delete(Id)
        .subscribe(res => {
          this.ShowListTaches();
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
