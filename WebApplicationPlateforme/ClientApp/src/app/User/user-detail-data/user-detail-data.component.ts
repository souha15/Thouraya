import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-user-detail-data',
  templateUrl: './user-detail-data.component.html',
  styleUrls: ['./user-detail-data.component.css']
})
export class UserDetailDataComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private UserService: UserServiceService,
    private router: Router,) { }

  ngOnInit(): void {
    this.getIdUrl();
  }

  user: UserDetail = new UserDetail();
  userId: string;
  roleslist: any = [];
  emploi: string;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id']

  
      this.UserService.GetUserById(this.userId).subscribe(res => {
        this.user = res

        this.UserService.getUserRoles(this.userId).subscribe(res => {
          this.roleslist = res;
          this.roleslist.forEach(item => {
            if (item == "EMPLOYEE") {
              this.emploi ="موظف"
            } else if (item == "DIRECTORG") {
              this.emploi ="المدير التنفيذي"
            } else if (item == "ADMINISTRATEUR") {
              this.emploi = "مسؤول النظام"
            } else if (item == "STAGIAIRE") {
              this.emploi = "متعاون"
            } else if (item == "CONSEILADMIN") {
              this.emploi = "رئيس مجلس الإدارة"
            } else if (item == "SUPCONSEILADMIN") {
              this.emploi = "نائب رئيس مجلس الإدارة"
            } else if (item == "DIRECTOR") {
              this.emploi = "مدير الجمعية"
            } else if (item == "PARTRESP") {
              this.emploi = "عضو مشرف"
            } else if (item == "PARTNORMAL") {
              this.emploi = "عضو"
            } else if (item == "RESP") {
              this.emploi = "المسؤول"
            } else {
              this.emploi = "عضو مالي"
            }
          })
      })
      })
    });



  }
}
