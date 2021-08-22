import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TuteurParrinage } from '../../../shared/Models/Parrainage/tuteur-parrinage.model';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TuteurParrainageService } from '../../../shared/Services/Parrainage/tuteur-parrainage.service';
import { SoldeTuteur } from '../../../shared/Models/Parrainage/solde-tuteur.model';
import { SoldeTuteurService } from '../../../shared/Services/Parrainage/solde-tuteur.service';

@Component({
  selector: 'app-add-solde',
  templateUrl: './add-solde.component.html',
  styleUrls: ['./add-solde.component.css']
})
export class AddSoldeComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private tutService: TuteurParrainageService,
    private stutService: SoldeTuteurService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getIdUrl();
    this.ShowListTaches();
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

  Id: number;
  tut: TuteurParrinage = new TuteurParrinage();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.tutService.GetById(this.Id).subscribe(res => {
        this.tut = res
        this.stut.nomTuteur = res.nom
        this.stut.cinTuteur = res.cin
        this.stut.numTuteur = res.numTut;
        this.stut.idTut = this.Id

      })


    });
  }

  //Edit Tuteur

  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  stut: SoldeTuteur = new SoldeTuteur();
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;
      this.stut.idUserCreator = this.UserIdConnected;
      this.stut.attribut6 = this.UserNameConnected;
      this.stutService.Add(this.stut).subscribe(res => {
        this.toastr.success("تم تعديل  رصيد  الكفيل بنجاح", " تعديل  رصيد  الكفيل");
        this.ShowListTaches();
        form.resetForm();
      },
        err => {
          this.toastr.error("فشل تعديل  رصيد  الكفيل", " تعديل  رصيد  الكفيل")
        })
    }
  }

  Idstut: number = 0;

  populateForm(tut: SoldeTuteur) {
    this.stutService.formData = Object.assign({}, tut)
    this.Idstut = tut.id;

  }


  c: Number = 1;
  count: Number = 5;
  allTa
  //Orph list
  orph1: SoldeTuteur[] = [];
  orph: SoldeTuteur[] = [];
  showData: boolean = false;
  ShowListTaches() {

    this.stutService.Get().subscribe(res => {
      this.orph1 = res
      this.orph = this.orph1.filter(item => item.idTut == this.Id)
      if (this.orph.length > 0) {
        this.showData = true
      } else {
        this.showData = false;
      }
    })


  }
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.stutService.Delete(Id)
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
