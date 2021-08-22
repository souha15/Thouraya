import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../shared/Services/Taches/tache.service';
import { Tache } from '../../shared/Models/Taches/tache.model';
import { Observable } from 'rxjs';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tasks-list-delayed',
  templateUrl: './tasks-list-delayed.component.html',
  styleUrls: ['./tasks-list-delayed.component.css']
})
export class TasksListDelayedComponent implements OnInit {

  constructor(private TacheService: TacheService,
    private UserService: UserServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getUserConnected();
    this.resetForm();
    this.filtredDataTache();
  }
  c: Number = 1;
  count: Number = 5;
  //Tache list

  tacheliste: Tache[] = [];


  listtache() {
    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res
    })
  }

  filtredtachelist1: Tache[] = [];
  filtredtachelist: Tache[] = [];

  filtredDataTache() {
    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res

      if (this.tacheliste != null) {
        this.tacheliste.forEach(item => {
            var diff = this.calculateDiffDay(item.date);
            if (diff > +item.delai) {
              this.filtredtachelist.push(item);
            }
       
        })
      }
    });


  }
  //sorting
  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  //Pagination initialisation


  // Get User Connected

  UserIdConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;

    })
  }


  calculateDiffHour(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    let m1 = currentDate.getMonth();
    let y1 = currentDate.getFullYear();
    let d1 = currentDate.getDay();
    let m2 = dateSent.getMonth();
    let y2 = dateSent.getFullYear();
    let d2 = dateSent.getDay();
    if (m1 == m2 && y1 == y2 && d1 == d2) {
      var diff = (currentDate.getTime() - dateSent.getTime()) / 1000
      diff /= (60 * 60)

      console.log(Math.abs(Math.round(diff)));
      return Math.abs(Math.round(diff));

    }
  }
  // Difference with 2 dates
  calculateDiffDay(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);
      console.log(Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24)));
      return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
    }
    

  //edit etat
  etat: string;
  details: Tache = new Tache();
  populateForm(edittache: Tache) {
    this.TacheService.formData = Object.assign({}, edittache)
    this.etat = edittache.etat
    this.details = Object.assign({}, edittache);

  }

  edittache: Tache = new Tache();
  updateRecord(form: NgForm) {
    this.edittache = Object.assign(this.edittache, form.value);

    this.TacheService.EditTache().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.resetForm();
      this.filtredDataTache();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )
  }

  onSubmit(form: NgForm) {
    this.updateRecord(form)
  }

  //Reset Form

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.TacheService.formData = {
      id: null,
      date: '',
      priorite: '',
      tacheNom: '',
      description: '',
      delai: '',
      atous: '',
      createur: '',
      etat: '',
      type: '',
      sousProjet: '',
      Attribut1: '',
      Attribut2: '',
      Attribut3: '',
      attribut4: null,
      creatorName: '',
      idUserCreator: '',
      affectedName: '',

    }
  }
}
