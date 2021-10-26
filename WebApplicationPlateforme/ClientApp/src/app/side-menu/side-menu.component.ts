import { Component, OnInit } from '@angular/core';
import { PrivilegesService } from '../shared/Services/User/privileges.service';
import { UserServiceService } from '../shared/Services/User/user-service.service';
import { Ticket2 } from '../shared/Models/Ticket2/ticket2.model';
import { Ticket2Service } from '../shared/Services/Ticket2/ticket2.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(private privilegesService: PrivilegesService,
    private UserService: UserServiceService,
    private TicketService: Ticket2Service,) { }

  ngOnInit(): void {
    this.getUserConnected();
    
 
  }


  // Get User Connected
  UserIdConnected: string;
  UserNameConnected: string;
  privtestaddTask: boolean = false;
  privtestfinance: boolean = false;
  privtesttransaction: boolean = false;
  privtestTasks: boolean = false;
  roleslist: any = [];
  testrole: boolean = false;
  admin: boolean;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
   
      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;
        this.roleslist.forEach(item => {
          if (item == "PARTNORMAL" || item == "RESPFINANCE") {
            this.testrole = true;
          }

          if (item == "ADMINISTRATEUR") {
            this.admin = true;
          } else {
            this.admin = false;
          }
        })
        console.log(this.testrole)
      })   
    })
  }
  //get Ticket notif


}
