import { Component, OnInit } from '@angular/core';
import { PointageEmp } from '../../shared/Models/VointageViaEmp/pointage-emp.model';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { PointageEmpEmpService } from '../../shared/Services/PointageViaEmp/pointage-emp.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-list-pointage-emp',
  templateUrl: './list-pointage-emp.component.html',
  styleUrls: ['./list-pointage-emp.component.css']
})
export class ListPointageEmpComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private pointageService: PointageEmpEmpService) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  UserList: UserDetail[] = [];

  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UserList = res;
    })
  }

  private selectedLink: string = "day";
  search: string;
  setradio(e: string): void {

    this.selectedLink = e;
    if (this.selectedLink == "day") {
      this.search = "day"
    }

    if (this.selectedLink == "month") {
      this.search = "month"
    }

    if (this.selectedLink == "ben") {
      this.search = "ben"
    }


  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }


  testNom: boolean = false;
  testNom2: boolean = false;
  cin: string;
  nom: string;
  cinSearch(event) {
    this.cin = event.target.value;

  }

  pointList: PointageEmp[] = [];
  pointList2: PointageEmp[] = [];
  Chercher() {
    this.pointageService.Get().subscribe(res => {
      this.pointList2 = res;
      this.pointList = this.pointList2.filter(item => item.numEmp == this.cin)
    })
  }


  //get day
  day: string;
  getDay(event) {
    this.day = event.target.value

  }

  //Search by Day

  SearchByDay() {
    this.pointageService.Get().subscribe(res => {
      this.pointList2 = res;

      this.pointList2.forEach(item => {
        var d1 = item.date.split("/").reverse().join("-");
        var d2 = this.day.split("/").reverse().join("/");
        if (d1 == d2) {
          this.pointList.push(item)
        }
      })
    })
  }

  //getMonth
  month: number;
  getMonth(event) {
    this.month = +event.target.value;
  }

  SarchByMonth() {
    this.pointageService.Get().subscribe(res => {
      this.pointList2 = res;
      this.pointList2.forEach(item => {
        let d1 = new Date(item.date);
        let month = d1.getMonth();

        if (month == this.month) {
          this.pointList.push(item)
        }
      })
    })
  }
}
