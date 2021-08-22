import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { PointageService } from '../../shared/Services/Pointage/pointage.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { Pointage } from '../../shared/Models/Pointage/pointage.model';

@Component({
  selector: 'app-pointage-list',
  templateUrl: './pointage-list.component.html',
  styleUrls: ['./pointage-list.component.css']
})
export class PointageListComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private pointageService: PointageService) { }

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

  pointList: Pointage[] = [];
  pointList2: Pointage[] = [];
  Chercher() {
    this.pointageService.Get().subscribe(res => {
      this.pointList2 = res;
      this.pointList = this.pointList2.filter(item => item.idUserCreator == this.cin)
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
        var d1 = item.datePresence.split("/").reverse().join("-");
        var d2 = this.day.split("/").reverse().join("/");
        if (d1 == d2) {
          this.pointList.push(item)
        }
      })
    })
  }

  //getMonth
  month: string;
  getMonth(event) {
    this.month = event.target.value;
  }

  SarchByMonth() {
    this.pointageService.Get().subscribe(res => {
      this.pointList2 = res;
      this.pointList2.forEach(item => {
        if (this.month == item.mois) {
          this.pointList.push(item)
        }
      })
    })
  }
}
