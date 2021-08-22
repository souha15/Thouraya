import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { PrivilegesService } from '../../shared/Services/User/privileges.service';
import { TacheNotifService } from '../../shared/Services/Taches/tache-notif.service';
import { TacheNotif } from '../../shared/Models/Taches/tache-notif.model';


@Component({
  selector: 'app-tasks-up-menu',
  templateUrl: './tasks-up-menu.component.html',
  styleUrls: ['./tasks-up-menu.component.css']
})
export class TasksUpMenuComponent implements OnInit {

  constructor(private privilegesService: PrivilegesService,
    private UserService: UserServiceService,
    private notiftaskService: TacheNotifService,) { }

  ngOnInit(): void {
    this.getUserConnected();

  }


  // Get User Connected
  UserIdConnected: string;
  UserNameConnected: string;
  privtest: boolean = false;
  privtestR: boolean = false;
  addTask: any;
  rapport: any;
  task: TacheNotif[] = [];
  task2: TacheNotif[] = [];
  nb: number;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.notiftaskService.ListTache().subscribe(res => {
        this.task = res
        this.task2 = this.task.filter(item => item.idUserAff == this.UserIdConnected && item.nomCreator == "0");
        this.nb = this.task2.length;
      })
    })

  }


  //Privilege Test

 /* getPriv(id) {
    this.privilegesService.GetById(id).subscribe(res => {
      if (res.addTask == 1) {
        this.privtest = true;

      } else
        this.privtest = false;

    })

    console.log(this.privtest)
  }*/
}
