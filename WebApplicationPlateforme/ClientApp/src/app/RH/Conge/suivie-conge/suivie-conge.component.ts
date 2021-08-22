import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CongeService } from '../../../shared/Services/Rh/conge.service';
import { RecrutementService } from '../../../shared/Services/Rh/recrutement.service';
import { Conge } from '../../../shared/Models/RH/conge.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Recrutement } from '../../../shared/Models/RH/recrutement.model';

@Component({
  selector: 'app-suivie-conge',
  templateUrl: './suivie-conge.component.html',
  styleUrls: ['./suivie-conge.component.css']
})
export class SuivieCongeComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private CongeService: CongeService,
    private RecrutementService: RecrutementService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
  
  }
  test1: boolean = false;
  test2: boolean = false;
  test3: boolean = false;

  type: string;
  test(event) {
    this.type = event.target.value;
  }

  date:string
  testdate(event) {
    this.date = event.target.value;
  }


  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;


  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
  
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;



    })

  }

  Conge: Conge = new Conge();  
  FCgList: Conge[] = [];
  CgList: Conge[] = [];
  FrcList: Recrutement[] = [];
  RcList: Recrutement[] = [];

  val: string;
  getdata() {
 
    if (this.type != undefined) {
      
      if (this.type == "1") {
        if (this.date == undefined) {
          this.toastr.warning("يجب عليك تحديد تاريخ")
        } else {
          this.CongeService.Get().subscribe(res => {
            this.CgList = res
        
            this.FCgList = this.CgList.filter(item => item.idUserCreator == this.UserIdConnected && this.date == item.datedebut)
            this.FCgList.forEach(item => {
              if (item.etat =="5%") {
                this.test1 = true;
                this.val = "5%";
              }

              else if (item.etat =="50%") {
                this.test2 = true;
                this.val = "50%";
              }

              else {
                this.test3 = true;
                this.val = "100%";
              } 
            })
          })
        }
      } else {

        if (this.date == undefined) {
          this.toastr.warning("يجب عليك تحديد تاريخ")
        } else {
          this.RecrutementService.Get().subscribe(res => {
            this.RcList = res

            this.FrcList = this.RcList.filter(item => item.idUserCreator == this.UserIdConnected && this.date == item.datedebut)
            this.FrcList.forEach(item => {
              if (item.attribut3 == "5%") {
                this.test1 = true;
                this.val = "5%";
              }

              else if (item.attribut3 == "50%") {
                this.test2 = true;
                this.val = "50%";
              }

              else {
                this.test3 = true;
                this.val = "100%";
              }
            })
          })
        }


      }
    } else {
      this.toastr.warning("يجب عليك تحديد نوع الطلب")
    }
  }
  
}
