import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../shared/Services/Taches/tache.service';
import { Tache } from '../../shared/Models/Taches/tache.model';
import { Observable } from 'rxjs';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TacheNotifService } from '../../shared/Services/Taches/tache-notif.service';
import { TacheNotif } from '../../shared/Models/Taches/tache-notif.model';


@Component({
  selector: 'app-tasks-list-received',
  templateUrl: './tasks-list-received.component.html',
  styleUrls: ['./tasks-list-received.component.css']
})
export class TasksListReceivedComponent implements OnInit {

  constructor(private TacheService: TacheService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private notiftaskService: TacheNotifService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.filtredDataTache();
    //this.listtache();
    this.resetForm();
  }

  //Tache list

  tacheliste: Tache[] = [];
  filtredtachelist: Tache[] = [];
  nbclose: number;
  nbnew: number;
  nbcurrent: number;
  filtredDataTache() {
    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res   
      this.filtredtachelist = this.tacheliste.filter(item => item.affectedName == this.UserIdConnected)
      this.nbclose = this.filtredtachelist.filter(item => item.etat == "منجزة").length;
      this.nbnew = this.filtredtachelist.filter(item => item.etat == "في الإنتظار").length;
      this.nbcurrent = this.filtredtachelist.filter(item => item.etat == "تحت الإجراء").length;
      return this.filtredtachelist.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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
  p: number = 1;

  // Get User Connected

  UserIdConnected: string;
  task: TacheNotif[] = [];
  task2: TacheNotif[] = [];
  nb: number;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;    
      this.notiftaskService.ListTache().subscribe(res => {
        this.task = res
        this.task2 = this.task.filter(item => item.idUserAff == this.UserIdConnected && item.nomCreator == "0");
        this.nb = this.task2.length;
      })
    })
  }
  c: Number = 1;
  count: Number = 5;
  //edit etat
  etat: string;
  details: Tache = new Tache();
  editetat: boolean;
  populateForm(edittache: Tache) {
    this.TacheService.formData = Object.assign({}, edittache)
    this.etat = edittache.etat
    this.details = Object.assign({}, edittache);

    if (this.details.etat != "منجزة") {
      this.editetat = true
    } else
      this.editetat = false;
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
