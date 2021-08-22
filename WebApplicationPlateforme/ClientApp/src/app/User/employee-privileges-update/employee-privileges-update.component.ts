import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-employee-privileges-update',
  templateUrl: './employee-privileges-update.component.html',
  styleUrls: ['./employee-privileges-update.component.css']
})
export class EmployeePrivilegesUpdateComponent implements OnInit {

  constructor(private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getUserrsList();
  }


  list1: UserDetail[] = [];
  allUser: UserDetail[] = [];
  getUserrsList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.list1 = res
      this.allUser = this.list1.filter(item => item.userName ==null)
      console.log(this
        .allUser)
    })
  }
  
}
