import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-org-part-details',
  templateUrl: './org-part-details.component.html',
  styleUrls: ['./org-part-details.component.css']
})
export class OrgPartDetailsComponent implements OnInit {

  constructor(private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  dir: boolean = false;
  employee: boolean = false;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      if (res.idAdministration == 29) {
        this.employee = true;
      } else {
        this.employee = false
        this.dir = true;
      }
      if (res.emploi == "مدير إدارة الأوقاف والخدمات ") {
        this.dir = true;
      } else {
        this.dir = false
      }
    })

  }
}
