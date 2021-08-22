import { Component, OnInit } from '@angular/core';
import { Pointage } from '../../shared/Models/Pointage/pointage.model';
import { PointageService } from '../../shared/Services/Pointage/pointage.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-pointage-user-list',
  templateUrl: './pointage-user-list.component.html',
  styleUrls: ['./pointage-user-list.component.css']
})
export class PointageUserListComponent implements OnInit {

  constructor(private pointService: PointageService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getPointList();
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
  pointList: Pointage[] = [];
  pointList2: Pointage[] = [];
  fulldate = new Date().toLocaleDateString();
  getPointList() {
    this.pointService.Get().subscribe(res => {
      this.pointList2 = res
      this.pointList = this.pointList2.filter(item => item.datePresence == this.fulldate && item.attribut6 == this.UserIdConnected)
    })
  }

}
