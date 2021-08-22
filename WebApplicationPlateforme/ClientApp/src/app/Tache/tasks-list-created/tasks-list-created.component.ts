import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../shared/Services/Taches/tache.service';
import { Tache } from '../../shared/Models/Taches/tache.model';
import { Observable } from 'rxjs';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { TacheNotif } from '../../shared/Models/Taches/tache-notif.model';
import { TacheNotifService } from '../../shared/Services/Taches/tache-notif.service';


@Component({
  selector: 'app-tasks-list-created',
  templateUrl: './tasks-list-created.component.html',
  styleUrls: ['./tasks-list-created.component.css']
})
export class TasksListCreatedComponent implements OnInit {

  constructor(private TacheService: TacheService,
    private UserService: UserServiceService,
    private notiftaskService: TacheNotifService,) { }

  ngOnInit(): void {

    this.getUserConnected();
    //this.listtache();
    this.filtredDataTache();
  }

  //Tache list
  p: Number = 1;
  count: Number = 5;
  tacheliste: Tache[] = [];
  filtredtachelist: Tache[] = [];

  filtredDataTache() {
    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res
     
      this.filtredtachelist = this.tacheliste.filter(item => item.idUserCreator == this.UserIdConnected)

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
}

