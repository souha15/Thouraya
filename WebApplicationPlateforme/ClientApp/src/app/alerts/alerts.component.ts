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
  privtestaddTask: boolean = false;
  privtestfinance: boolean = false;
  privtesttransaction: boolean = false;
  privtestTasks: boolean = false;
  sexe: string;
  roleslist: any = [];
  testrole: boolean = false;
  testroledir: boolean = false;
  testroleadmin: boolean = false;
  demg1: DemPayCheque[] = [];
  demg2: DemPayCheque[] = [];
  dem1: DemPayCheque[] = [];
  dem2: DemPayCheque[] = [];
  dem3: DemPayCheque[] = [];
  dem4: DemPayCheque[] = [];
  nbr: number = 0;
  nbd: number = 0;
  testroleList = ["DIRECTORGENERAL"];
  testroledirList = ["DIRECTORETAB", "DIRECTORADMN"];
  testroleadminList = ["ADMINISTRATEUR"]
  checker(arr1, arr2) {
    return arr1.some(elem => arr2.includes(elem));
  }
  getUserConnected() {


    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.sexe = res.sexe;
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

          this.demandeService.Get().subscribe(res => {
            this.dem1 = res
            if (this.testrole == true) {
              this.dem3 = this.dem2.filter(item => item.idparfinancier != this.UserIdConnected && item.idfinancier != this.UserIdConnected && item.idpart != this.UserIdConnected)
              this.demg1 = this.dem2.filter(item => +item.etatnum < 3);
              this.demg2 = this.dem1.filter(item => item.attribut5 == this.UserIdConnected && item.attribut3 == "editer");

              this.nbr = this.demg1.length + this.demg2.length
            }

            if (this.testroledir == true) {
              this.dem4 = this.dem1.filter(item => item.etatgeneral == "موافقة" && +item.etatnum == 3);
              this.nbd = this.dem4.length;
            }


          })


      })
    })

  }


  perlis: Permission[] = [];
  Fperlis: Permission[] = [];
  nbPer: number;

  reclis: Recrutement[] = [];
  Freclis: Recrutement[] = [];
  nbRec: number;

  conglis: Conge[] = [];
  Fconglis: Conge[] = [];
  nbCong: number;

  equlis: Equipement[] = [];
  Fequlis: Equipement[] = [];
  nbEqu: number;
  nbRequests: number;
  /*CalculRequests() {
    this.congeService.Get().subscribe(res => {
      this.conglis = res
      this.Fconglis = this.conglis.filter(item => item.directeurid == this.idUser && item.attribut2 == "في الانتظار")
      this.nbCong = this.Fconglis.length;

      this.permissionService.Get().subscribe(res => {
        this.perlis = res
        this.Fperlis = this.perlis.filter(item => item.iddir == this.idUser && item.attribut3 =="في الانتظار")
        this.nbPer = this.Fperlis.length;
 
        this.equipementService.Get().subscribe(res => {
          this.equlis = res
          this.Fequlis = this.equlis.filter( item=> item.attribut2 =="في الانتظار")
          this.nbEqu = this.Fequlis.length;
          
          this.recrutementService.Get().subscribe(res => {
            this.reclis = res
            this.Freclis = this.reclis.filter(item => item.iddir == this.idUser && item.attribut2 == "في الانتظار")
            this.nbRec = this.Freclis.length;
    
            this.nbRequests = this.nbRec + this.nbPer + this.nbEqu + this.nbCong;
        
          })
        })
      })
    })

  }*/
}
