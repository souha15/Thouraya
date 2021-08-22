import { Component, OnInit } from '@angular/core';
import { GestBenService } from '../../../shared/Services/GestBen/gest-ben.service';
import { GestBen } from '../../../shared/Models/GestBen/gest-ben.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gest-ben-list-accepte',
  templateUrl: './gest-ben-list-accepte.component.html',
  styleUrls: ['./gest-ben-list-accepte.component.css']
})
export class GestBenListAccepteComponent implements OnInit {


  p: Number = 1;
  count: Number = 5;
  constructor(private benService: GestBenService,
    private UserService: UserServiceService,
    private toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getDataBen();

  }

  //Get User Connected
  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  //Get Data gest Ben

  BenList: GestBen[] = [];
  MyBenList: GestBen[] = [];
  BenListRefuse: GestBen[] = [];
  BenListCreated: GestBen[] = [];
  BenListAccepte: GestBen[] = [];
  BenListChercheur: GestBen[] = [];
  nb1: number = 0;
  nb2: number = 0;
  nb3: number = 0;
  nb4: number = 0;

  getDataBen() {
    this.benService.ListGestBen().subscribe(res => {
      this.BenList = res;

      //My List
      this.MyBenList = this.BenList.filter(item => item.idUserCreator == this.UserIdConnected)
      this.nb1 = this.MyBenList.length;

      //List Refusé

      this.BenListRefuse = this.BenList.filter(item => item.etat == "غير نشط")
      this.nb4 = this.BenListRefuse.length;

      //List Accepté

      this.BenListAccepte = this.BenList.filter(item => item.etat == "نشط")
      this.nb3 = this.BenListAccepte.length;

      // List Chercheur

      this.BenListChercheur = this.BenList.filter(item => item.idchercheur == this.UserIdConnected)
      this.nb2 = this.BenListChercheur.length;

    })
  }

}
