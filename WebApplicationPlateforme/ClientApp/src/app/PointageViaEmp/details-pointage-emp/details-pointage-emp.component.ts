import { Component, OnInit } from '@angular/core';
import { PointageEmpEmpService } from '../../shared/Services/PointageViaEmp/pointage-emp.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { PointageEmp } from '../../shared/Models/VointageViaEmp/pointage-emp.model';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { MacAddressTableService } from '../../shared/Services/Pointage/mac-address-table.service';
import { MacAddressTable } from '../../shared/Models/Pointage/mac-address-table.model';

@Component({
  selector: 'app-details-pointage-emp',
  templateUrl: './details-pointage-emp.component.html',
  styleUrls: ['./details-pointage-emp.component.css']
})
export class DetailsPointageEmpComponent implements OnInit {

  constructor(private empService: PointageEmpEmpService,
    private UserService: UserServiceService,
   ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getEmpList();
   
  }

  pointList: PointageEmp[] = [];
  pointList1: PointageEmp[] = [];
  pointList2: PointageEmp[] = [];
  date = new Date().toLocaleDateString();
  getEmpList() {
    this.empService.Get().subscribe(res => {
      this.pointList2 = res;
      this.pointList1 = this.pointList2.filter(item => item.date == this.date);
      let j = 0;
      let bool: boolean;
      for (let i = 0; i < this.pointList1.length; i++) {
        if(this.pointList1[i].numEmp != undefined)
        this.UserService.GetUserByNum(this.pointList1[i].numEmp).subscribe(res => {
          if (res.attribut1 == this.UserIdConnected) {
            this.pointList1[i].attribut1 = res.fullName;
            this.pointList.push(this.pointList1[i]);
            
        
            console.log(this.pointList)

          } else {
          
          }

        },
          err => {
            console.log(err)
          })

      }
   
    })
  }


  //Get UserConnected

  UserIdConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
    })

  }


}
