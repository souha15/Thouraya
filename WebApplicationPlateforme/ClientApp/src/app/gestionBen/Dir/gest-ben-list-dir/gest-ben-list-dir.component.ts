import { Component, OnInit } from '@angular/core';
import { GestBenService } from '../../../shared/Services/GestBen/gest-ben.service';
import { GestBen } from '../../../shared/Models/GestBen/gest-ben.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-gest-ben-list-dir',
  templateUrl: './gest-ben-list-dir.component.html',
  styleUrls: ['./gest-ben-list-dir.component.css']
})
export class GestBenListDirComponent implements OnInit {


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

      //List Refusé

      this.BenListRefuse = this.BenList.filter(item => item.etat == "غير نشط")
      this.nb4 = this.BenListRefuse.length;

      //List Accepté

      this.BenListAccepte = this.BenList.filter(item => item.etat == "نشط")
      this.nb3 = this.BenListAccepte.length;

      //list a show
      this.BenListChercheur = this.BenList.filter(item => item.etat == "غير نشط" || item.etatchercheur == "مرسلة" || item.typeEnreg =="طلب اعتماد التسجيل")

    })
  }


  gest: GestBen = new GestBen();
  populateForm(conge: GestBen) {
    this.gest = Object.assign({}, conge)

  }

  onSubmit(form: NgForm) {
    this.benService.PutObservableE(this.gest).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح');
      this.getDataBen();
      form.resetForm();
    })
  }
}
