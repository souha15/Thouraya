import { Component, OnInit } from '@angular/core';
import { PointageEmpEmpService } from '../../shared/Services/PointageViaEmp/pointage-emp.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { PointageEmp } from '../../shared/Models/VointageViaEmp/pointage-emp.model';
import { MacAddressTableService } from '../../shared/Services/Pointage/mac-address-table.service';
import { MacAddressTable } from '../../shared/Models/Pointage/mac-address-table.model';
import { PointageService } from '../../shared/Services/Pointage/pointage.service';
import { Pointage } from '../../shared/Models/Pointage/pointage.model';

@Component({
  selector: 'app-user-list-pointage-emp',
  templateUrl: './user-list-pointage-emp.component.html',
  styleUrls: ['./user-list-pointage-emp.component.css']
})
export class UserListPointageEmpComponent implements OnInit {

  constructor(private empService: PointageService,
    private UserService: UserServiceService,
    private adrTableService: MacAddressTableService) { }

  p: Number = 1;
  count: Number = 5;
  ngOnInit(): void {
    this.getUserConnected();
    //this.getEmpList();

  }
  //Get UserConnected

  UserIdConnected: string;

  mac: string = null;
  listmac2: MacAddressTable[] = [];
  listmac: MacAddressTable[] = [];
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.adrTableService.Get().subscribe(res => {
        this.listmac2 = res
        this.listmac = this.listmac2.filter(item => item.userId == this.UserIdConnected);
        if (this.listmac.length != 0) {
          this.mac = this.listmac[0].adresseMac;
          this.empService.Get().subscribe(res => {
            this.pointList2 = res;
            this.pointList = this.pointList2.filter(item => item.idUserCreator == this.UserIdConnected);
            if (this.mac != null) {
              this.pointList.forEach(item => {

                if (item.adresseMac == this.mac) {

                  item.attribut1 = 1
                } else {
       
                  item.attribut1 = 0
                }
              })
            }
          })
        }
      })
    })

  }
  pointList: Pointage[] = [];
  pointList2: Pointage[] = [];
  date = new Date().toLocaleDateString();
  getEmpList() {
    this.empService.Get().subscribe(res => {
      this.pointList2 = res;
      this.pointList = this.pointList2.filter(item => item.idUserCreator == this.UserIdConnected);
      if (this.mac != null) {
        this.pointList.forEach(item => {
          console.log("mac " + this.mac)
          console.log("item.adresseMac " + item.adresseMac)
          if (item.adresseMac == this.mac) {
            console.log("if true item.adresseMac " + item.adresseMac)
            item.attribut1 = 1
          } else {
            console.log(" else false item.adresseMac " + item.adresseMac)
            item.attribut1 = 0
          }
        })
      }
    })
  }


}
