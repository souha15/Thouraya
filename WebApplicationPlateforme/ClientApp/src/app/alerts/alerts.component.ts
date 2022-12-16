import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../shared/Services/User/user-service.service';
import { AutomaticNotification, SignalRService } from '../shared/Services/signalR/signal-r.service';
import { UserDetail } from '../shared/Models/User/user-detail.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {


  constructor(private notifService: SignalRService,
    private UserService: UserServiceService,
    private router: Router, ) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  UserIdConnected: string;
  UserNameConnected: string;
  ListUnreadServices: AutomaticNotification[] = [];
  user: UserDetail = new UserDetail();
  async getUserConnected(): Promise<any> {
    this.user = await this.UserService.getUserConnected();

    this.UserIdConnected = this.user.id;
    this.UserNameConnected = this.user.fullName;
    this.notifService.GetUnreadNotificationsForUserSenderList(this.UserIdConnected).subscribe(res => {
      this.ListUnreadServices = res;

    })

  }

  notif: AutomaticNotification = new AutomaticNotification();
  id: number;
  updateNotif(item: AutomaticNotification) {
    this.notif = Object.assign({}, item);
    this.notif.vu = "1"
    this.notifService.UpdateNotif(this.notif).subscribe(res => {


    })
  }

  //constructor(
  //  private UserService: UserServiceService,
  //  ) { }

  //ngOnInit(): void {
  //  this.getUserConnected();
  // // this.CalculRequests();
  //}

  ////Get Id User Connected
  //UserIdConnected: string;
  //UserNameConnected: string;
  //roleslist: any = [];
  //testrole: boolean = false;
  //testroledir: boolean = false;
  //testroleadmin: boolean = false;
  //nbr: number = 0;
  //nbd: number = 0;
  //testroleList = ["DIRECTORGENERAL"];
  //testroledirList = ["DIRECTORETAB", "DIRECTORADMN"];
  //testroleadminList = ["ADMINISTRATEUR"]
  //checker(arr1, arr2) {
  //  return arr1.some(elem => arr2.includes(elem));
  //}
  //user: UserDetail = new UserDetail();
  //async getUserConnected(): Promise<any> {
  //  this.user = await this.UserService.getUserConnected();
  //  this.UserIdConnected = this.user.id;
  //  this.UserNameConnected = this.user.fullName;
  //    this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
  //      this.roleslist = res;
  //      if (this.checker(this.roleslist, this.testroleList)) {
  //        this.testrole = true;

  //      } else {
  //        this.testrole = false;
  //      }

  //      if (this.checker(this.roleslist, this.testroledirList)) {
  //        this.testroledir = true;

  //      } else {
  //        this.testroledir = false;
  //      }


  //      if (this.checker(this.roleslist, this.testroleadminList)) {
  //        this.testroleadmin = true;

  //      } else {
  //        this.testroleadmin = false;
  //      }
  //    })
   

  //}
}
