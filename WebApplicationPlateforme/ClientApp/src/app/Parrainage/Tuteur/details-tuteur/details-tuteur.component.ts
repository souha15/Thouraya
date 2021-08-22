import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TuteurParrinage } from '../../../shared/Models/Parrainage/tuteur-parrinage.model';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TuteurParrainageService } from '../../../shared/Services/Parrainage/tuteur-parrainage.service';
import { ParrinerService } from '../../../shared/Services/Parrainage/parriner.service';
import { Parriner } from '../../../shared/Models/Parrainage/parriner.model';

@Component({
  selector: 'app-details-tuteur',
  templateUrl: './details-tuteur.component.html',
  styleUrls: ['./details-tuteur.component.css']
})
export class DetailsTuteurComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private tutService: TuteurParrainageService,
    private parService: ParrinerService) { }

  ngOnInit(): void {
    this.getIdUrl();
  }

  Id: number;
  tut: TuteurParrinage = new TuteurParrinage();
  parList2: Parriner[] = [];
  parList: Parriner[] = [];
  partest: boolean = false;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']
      this.parService.Get().subscribe(res => {
        this.parList2 = res
        this.parList = this.parList2.filter(item => item.attribut7 == this.Id);
        if (this.parList.length != 0) {
          this.partest = true;
        } else {
          this.partest = false;
        }

        this.tutService.GetById(this.Id).subscribe(res => {
          this.tut = res

        })
      })




    });
  }

  Idstut: number = 0;

  populateForm(tut: Parriner) {
    this.parService.formData = Object.assign({}, tut)
    this.Idstut = tut.id;

  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.parService.Delete(Id)
        .subscribe(res => {
          this.getIdUrl();
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
