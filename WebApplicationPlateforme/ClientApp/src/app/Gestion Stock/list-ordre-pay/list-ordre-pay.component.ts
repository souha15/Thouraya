import { Component, OnInit } from '@angular/core';
import { OrdrePayStockageService } from '../../shared/Services/Gsetion Stock/ordre-pay-stockage.service';
import { OrdrePayStockage } from '../../shared/Models/Gestion Stock/ordre-pay-stockage.model';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-list-ordre-pay',
  templateUrl: './list-ordre-pay.component.html',
  styleUrls: ['./list-ordre-pay.component.css']
})
export class ListOrdrePayComponent implements OnInit {

  constructor(private OrdrePayService: OrdrePayStockageService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

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

  first: boolean = true;
  newT:boolean=false
  new() {
    this.newT = true;
    this.acceptedT = false;
    this.closedT = false;
    this.first = false;

  }

  acceptedT: boolean = false
  accepted() {
    this.newT = false;
    this.acceptedT = true;
    this.closedT = false;
    this.first = false;
  }

 closedT: boolean = false
  closed() {
    this.newT = false;
    this.acceptedT = false;
    this.closedT = true;
    this.first = false;
  }

  ListStockage: OrdrePayStockage[] = [];
  ListStockageAccepted: OrdrePayStockage[] = [];
  ListStockageClosed: OrdrePayStockage[] = [];
  ListStockageNew: OrdrePayStockage[] = [];
  nb1: number = 0;
  nb2: number = 0;
  nb3: number = 0;
  getList() {
    this.OrdrePayService.ListOrdrePayStockage().subscribe(res => {
      this.ListStockage = res
      this.ListStockageNew = this.ListStockage.filter(item => item.etatOrdre == "في الإنتظار" && item.idUserCreator == this.UserIdConnected)
      this.nb1 = this.ListStockageNew.length;
      this.ListStockageClosed = this.ListStockage.filter(item => item.etatOrdre == "مغلقة" && item.idUserCreator == this.UserIdConnected)
      this.nb2 = this.ListStockageClosed.length;
      this.ListStockageAccepted = this.ListStockage.filter(item => item.etatOrdre == "معتمدة" && item.idUserCreator == this.UserIdConnected)
      this.nb3 = this.ListStockageAccepted.length;
    })
  }

  //Delete
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.OrdrePayService.DeleteOrdrePayStockage(Id)
        .subscribe(res => {
          this.getList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }

}
