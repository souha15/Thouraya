import { Component, OnInit } from '@angular/core';
import { CongeService } from '../shared/Services/Rh/conge.service';
import { RecrutementService } from '../shared/Services/Rh/recrutement.service';
import { EquipementService } from '../shared/Services/Rh/equipement.service';
import { PermissionService } from '../shared/Services/Rh/permission.service';
import { Permission } from '../shared/Models/RH/permission.model';
import { Recrutement } from '../shared/Models/RH/recrutement.model';
import { Conge } from '../shared/Models/RH/conge.model';
import { Equipement } from '../shared/Models/RH/equipement.model';
import { UserServiceService } from '../shared/Services/User/user-service.service';
import { DemPayCheque } from '../shared/Models/Cheques/dem-pay-cheque.model';
import { DemPayChequeService } from '../shared/Services/Cheques/dem-pay-cheque.service';
import { UserDetail } from '../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(private congeService: CongeService,
    private recrutementService: RecrutementService,
    private equipementService: EquipementService,
    private permissionService: PermissionService,
    private UserService: UserServiceService,
    private demandeService: DemPayChequeService,) { }

  ngOnInit(): void {
    this.getUserConnected();
   // this.CalculRequests();
  }

  //Get Id User Connected
  UserIdConnected: string;
  UserNameConnected: string;
  roleslist: any = [];
  testrole: boolean = false;
  testroledir: boolean = false;
  testroleadmin: boolean = false;
  nbr: number = 0;
  nbd: number = 0;
  testroleList = ["DIRECTORGENERAL"];
  testroledirList = ["DIRECTORETAB", "DIRECTORADMN"];
  testroleadminList = ["ADMINISTRATEUR"]
  checker(arr1, arr2) {
    return arr1.some(elem => arr2.includes(elem));
  }
  user: UserDetail = new UserDetail();
  async getUserConnected(): Promise<any> {
    this.user = await this.UserService.getUserConnected();
    this.UserIdConnected = this.user.id;
    this.UserNameConnected = this.user.fullName;
      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;
        if (this.checker(this.roleslist, this.testroleList)) {
          this.testrole = true;

        } else {
          this.testrole = false;
        }

        if (this.checker(this.roleslist, this.testroledirList)) {
          this.testroledir = true;

        } else {
          this.testroledir = false;
        }


        if (this.checker(this.roleslist, this.testroleadminList)) {
          this.testroleadmin = true;

        } else {
          this.testroleadmin = false;
        }
      })
   

  }
}
