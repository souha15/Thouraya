import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../shared/Services/User/user-service.service';
import { Router } from '@angular/router';
import { PrivilegesService } from '../shared/Services/User/privileges.service';
import { VoitureService } from '../shared/Services/voiture/voiture.service';
import { Voiture } from '../shared/Models/voiture/voiture.model';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { DemPayChequeService } from '../shared/Services/Cheques/dem-pay-cheque.service';
import { DemPayCheque } from '../shared/Models/Cheques/dem-pay-cheque.model';
import { PointageService } from '../shared/Services/Pointage/pointage.service';
import { UserDetail } from '../shared/Models/User/user-detail.model';
import { Pointage } from '../shared/Models/Pointage/pointage.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  userDetails;
  constructor(private UserService: UserServiceService,
    private router: Router,
    private privilegesService: PrivilegesService,
    private carsService: VoitureService,
    private toastr: ToastrService,
    private demandeService: DemPayChequeService,
    private pointageService: PointageService,

  ) {}

  ngOnInit(): void {

   //this.getVoiture();
    this.getUser();
    this.getUserConnected();
  //  this.getPointage();
    this.UserService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
       
               
      },
      err => {
        console.log(err);
      },
    );
 // this.autoSave();
  }

  save: boolean = false;
  intervale;
  autoSave() {
    this.intervale = setInterval(() => {

      this.save = true;
      if (this.UserIdConnected != null) {
        this.getUserConnected();
        this.getPointage();

      }

    }, 1000);
  }

  getUserProfile() {
   return  this.UserService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login-page');
  }

  getUser() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })
  }

  checker(arr1, arr2) {
    return arr1.some(elem => arr2.includes(elem));
  }
  // Get User Connected
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
  testroledirectors: boolean = false;
  demg1: DemPayCheque[] = [];
  demg2: DemPayCheque[] = [];
  admin: boolean;
  allowedRoles = ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORETAB', 'DIRECTORADMN', 'RESSOURCEHUMAINE', 'RESPFINANCE', 'DAWAAPRIV', 'DOTPRIV', 'FINPRIV', 'DIRPRIV'];
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.sexe = res.sexe;
      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;

        if (this.checker(this.roleslist, this.allowedRoles)) {
          this.testroledir = true;

        } else {
          this.testroledir = false;
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


  dem1: DemPayCheque[] = [];
  dem2: DemPayCheque[] = [];
  dem3: DemPayCheque[] = [];
  dem4: DemPayCheque[] = [];
  nbr: number = 0;
  nbd: number = 0;
  getDemPayList() {

  }
  List: Voiture[] = [];
  FList: Voiture[] = [];
  secondDate: Date;
  thirdDate: Date;
  nb: number=0;
 
  /*getVoiture() {
    let i: number = 0;
    this.carsService.Get().subscribe(res => {
      this.List = res;
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const firstDate = new Date();
      this.List.forEach(item => {

        this.secondDate = new Date(item.dateassurance);
        const diffDays = Math.round(Math.abs((firstDate.getTime() - this.secondDate.getTime()) / oneDay));
        if (diffDays == 11) {
          i = i + 1;
          this.nb = this.nb + 1;
 
        }
        if (diffDays == 30) {
          i = i + 1;
          this.nb = this.nb + 1;

        }


        this.thirdDate = new Date(item.datepermis);

        const diffDays2 = Math.round(Math.abs((firstDate.getTime() - this.thirdDate.getTime()) / oneDay));
        if (diffDays2 == 11) {
          i = i + 1;
          this.nb = this.nb + 1;

        }
        if (diffDays2 == 30) {
          i = i + 1;
          this.nb = this.nb + 1;
       
        }

      })

    })

  }*/

  point: Pointage = new Pointage();
  plist: Pointage[] = [];
  plist2: Pointage[] = [];
  fulldate = new Date().toLocaleDateString();
  pointer: boolean = false;

  getPointage() {
    this.pointageService.Get().subscribe(res => {
      this.plist2 = res
      this.plist = this.plist2.filter(item => item.idUserCreator == this.UserIdConnected && item.datePresence == this.fulldate)
      if (this.plist.length == 0) {
        this.pointer = true;
    
      } else {
        this.pointer = false;
        this.point = this.plist[0];
      }
    })
  }
}
