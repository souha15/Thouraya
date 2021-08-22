import { Component, OnInit } from '@angular/core';
import { PointageEmpEmpService } from '../../shared/Services/PointageViaEmp/pointage-emp.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { PointageEmp } from '../../shared/Models/VointageViaEmp/pointage-emp.model';

@Component({
  selector: 'app-user-list-pointage-emp',
  templateUrl: './user-list-pointage-emp.component.html',
  styleUrls: ['./user-list-pointage-emp.component.css']
})
export class UserListPointageEmpComponent implements OnInit {

  constructor(private empService: PointageEmpEmpService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getEmpList();
  }
  //Get UserConnected

  UserIdConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.num;
    })

  }
  pointList: PointageEmp[] = [];
  pointList2: PointageEmp[] = [];
  date = new Date().toLocaleDateString();
  getEmpList() {
    this.empService.Get().subscribe(res => {
      this.pointList2 = res;
      this.pointList = this.pointList2.filter(item => item.numEmp == this.UserIdConnected);
    })
  }
}
