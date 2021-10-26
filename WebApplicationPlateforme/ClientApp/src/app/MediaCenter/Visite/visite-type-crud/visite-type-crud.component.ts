import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-visite-type-crud',
  templateUrl: './visite-type-crud.component.html',
  styleUrls: ['./visite-type-crud.component.css']
})
export class VisiteTypeCrudComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private UserService: UserServiceService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getIdUrl();
  }

  //get id in URl


  rolelistDIRPRIV = ["DIRPRIV", "COMADPRIV",
    "RETPRIV"]


  UserId: string;
  roleslist: any = [];

  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.UserId = params['id']
      this.UserService.getUserRoles(this.UserId).subscribe(res => {
        this.roleslist = res;
      })
      })
  
  }


  delete(userId: string, role: string) {
    console.log(role)
    this.UserService.deluserfromrole(userId, role).subscribe(res => {
      console.log("delwithsucc")
      this.getIdUrl();
    })
  }

  clicked = false;

  add1() {
    let userId = this.UserId;
    let role = "DIRPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }


  add2() {
    let userId = this.UserId;
    let role = "COMADPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add3() {
    let userId = this.UserId;
    let role = "RETPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }


  add4() {
    let userId = this.UserId;
    let role = "FINPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }


  add5() {
    let userId = this.UserId;
    let role = "COMPTAPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add6() {
    let userId = this.UserId;
    let role = "BOXPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }


  add7() {
    let userId = this.UserId;
    let role = "EVFINPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }


  add8() {
    let userId = this.UserId;
    let role = "RHPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }


  add9() {
    let userId = this.UserId;
    let role = "DOTPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }


  add10() {
    let userId = this.UserId;
    let role = "SERPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }


  add11() {
    let userId = this.UserId;
    let role = "LOCPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }


  add12() {
    let userId = this.UserId;
    let role = "DAWAAPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add13() {
    let userId = this.UserId;
    let role = "MUSPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add14() {
    let userId = this.UserId;
    let role = "MEDIAPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add15() {
    let userId = this.UserId;
    let role = "MEDIACENTERPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add16() {
    let userId = this.UserId;
    let role = "PROJBENPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add17() {
    let userId = this.UserId;
    let role = "PROJPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add18() {
    let userId = this.UserId;
    let role = "BENPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }


  add19() {
    let userId = this.UserId;
    let role = "EMPLOYEE"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }


  add20() {
    let userId = this.UserId;
    let role = "DIRECTORGENERAL"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add21() {
    let userId = this.UserId;
    let role = "ADMINISTRATEUR"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add22() {
    let userId = this.UserId;
    let role = "DIRECTORETAB"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add23() {
    let userId = this.UserId;
    let role = "RESSOURCEHUMAINE"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add24() {
    let userId = this.UserId;
    let role = "RESPFINANCE"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add25() {
    let userId = this.UserId;
    let role = "DIRECTORADMN"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add26() {
    let userId = this.UserId;
    let role = "TECHPRIV"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  
}
