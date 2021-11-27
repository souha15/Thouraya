import { Component, OnInit } from '@angular/core';
import { OrdrePayStockageService } from '../../shared/Services/Gsetion Stock/ordre-pay-stockage.service';
import { OrdrePayStockage } from '../../shared/Models/Gestion Stock/ordre-pay-stockage.model';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-list-resp-ordre-pay',
  templateUrl: './list-resp-ordre-pay.component.html',
  styleUrls: ['./list-resp-ordre-pay.component.css']
})
export class ListRespOrdrePayComponent implements OnInit {


  constructor(private OrdrePayService: OrdrePayStockageService,
    private UserService: UserServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected()
    this.getList();
  }



  //Get User Connected
  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }

  newT: boolean = false
  new() {
    this.newT = true;
    this.closedT = false;

  }


  closedT: boolean = false
  closed() {
    this.newT = false;
    this.closedT = true;
  }

  ListStockage: OrdrePayStockage[] = [];
  ListStockageClosed: OrdrePayStockage[] = [];
  ListStockageNew: OrdrePayStockage[] = [];
  nb1: number = 0;
  nb3: number = 0;
  getList() {
    this.OrdrePayService.ListOrdrePayStockage().subscribe(res => {
      this.ListStockage = res
      this.ListStockageNew = this.ListStockage.filter(item => item.typeOrdre == "مباشر" )
      console.log(this.ListStockage)
      console.log(this.ListStockageNew)
      this.nb1 = this.ListStockageNew.length;
      this.ListStockageClosed = this.ListStockage.filter(item => item.typeOrdre == "للاعتماد" ||  item.etatOrdre =="معتمدة")
      this.nb3 = this.ListStockageClosed.length;

    })
  }
}
