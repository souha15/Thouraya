import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-priv-add',
  templateUrl: './priv-add.component.html',
  styleUrls: ['./priv-add.component.css']
})
export class PrivAddComponent implements OnInit {

  constructor(private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }
  

  dirfin: boolean = true;
  employeefin: boolean = true;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      /*if (res.emploi == "محاسب") {
        this.employeefin = true;
      } else {
        this.employeefin = false

      }
      if (res.emploi == "مدير إدارة الشؤون المالية والإدارية ") {
        this.dirfin = true;
      } else {
        this.dirfin = false
      }*/
    })

  }

}
