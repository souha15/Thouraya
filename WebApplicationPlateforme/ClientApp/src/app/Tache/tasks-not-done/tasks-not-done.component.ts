import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../shared/Services/Taches/tache.service';
import { Tache } from '../../shared/Models/Taches/tache.model';
import { Observable } from 'rxjs';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-tasks-not-done',
  templateUrl: './tasks-not-done.component.html',
  styleUrls: ['./tasks-not-done.component.css']
})
export class TasksNotDoneComponent implements OnInit {

  constructor(private TacheService: TacheService,
    private UserService: UserServiceService, ) { }

  ngOnInit(): void {

    this.getUserConnected();
    //this.listtache();
    this.filtredDataTache();
  }

  //Tache list
  p: Number = 1;
  count: Number = 5;
  tacheliste: Tache[] = [];


  listtache() {
    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res
    })
  }

  filtredtachelist: Tache[] = [];

  filtredDataTache() {
    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res

      if (this.tacheliste != null) {
        this.filtredtachelist = this.tacheliste.filter(item => item.etat == "غير منجزة")
        return this.filtredtachelist.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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
}
