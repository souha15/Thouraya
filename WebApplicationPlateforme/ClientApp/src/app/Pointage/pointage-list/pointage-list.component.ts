import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { PointageService } from '../../shared/Services/Pointage/pointage.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { Pointage } from '../../shared/Models/Pointage/pointage.model';
import { MacAddressTable } from '../../shared/Models/Pointage/mac-address-table.model';
import { MacAddressTableService } from '../../shared/Services/Pointage/mac-address-table.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-pointage-list',
  templateUrl: './pointage-list.component.html',
  styleUrls: ['./pointage-list.component.css']
})
export class PointageListComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  title = 'Excel';  
  constructor(private UserService: UserServiceService,
    private pointageService: PointageService,
    private adrTableService: MacAddressTableService) { }

  ngOnInit(): void {
    this.getUsersList();
    this.GetMacList();
  }

  // Export To Excel Function 
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'PointingSheet.xlsx');
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

    this.adrTableService.Get().subscribe(res => {
      this.listmac2 = res

      this.listmac = this.listmac2.filter(item1 => item1.userId == this.cin);
      if (this.listmac.length != 0) {

        this.mac = this.listmac[0].adresseMac;
      } else {this.mac= null}
    })

  }

  MacList: MacAddressTable[] = [];
  GetMacList() {
    this.adrTableService.Get().subscribe(res => {
      this.MacList=res
    })
  }

  pointList: Pointage[] = [];
  pointList2: Pointage[] = [];
  mac: string = null;
  listmac2: MacAddressTable[] = [];
  listmac: MacAddressTable[] = [];
  Chercher() {
    this.pointList = [];
    this.pointageService.Get().subscribe(res => {
      this.pointList2 = res;
      this.pointList = this.pointList2.filter(item => item.idUserCreator == this.cin)

      this.pointList.forEach(item => {
        
          if (this.mac != null) {

            if (item.adresseMac == this.mac) {

              item.attribut1 = 1

            }

            else {

              item.attribut1 = 0
            }

          }
          else {
            item.attribut1 = 0
          }   
      })

    })
  }



  //get day
  day: string;
  getDay(event) {
    this.day = event.target.value

  }

  //Search by Day
  mac2: MacAddressTable[] = [];
  SearchByDay() {
    this.pointList = [];
    this.pointageService.Get().subscribe(res => {
      this.pointList2 = res;
  
      this.pointList2.forEach(item => {
        var d1 = item.datePresence.split("/").reverse().join("-");
        var d2 = this.day.split("/").reverse().join("/");
        if (d1 == d2) {
          this.pointList.push(item)
          this.pointList.forEach(item => {
            this.mac2 = this.MacList.filter(itemm => itemm.userId == item.idUserCreator)
            if (this.mac2.length != 0) {
              if (this.mac2[0].adresseMac != null) {

                if (item.adresseMac == this.mac2[0].adresseMac) {

                item.attribut1 = 1

              }

              else {

                item.attribut1 = 0
              }

            }
            } else {
              item.attribut1 = 0
            }
          })
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
    this.pointList = [];
    this.pointageService.Get().subscribe(res => {
      this.pointList2 = res;
      this.pointList2.forEach(item => {
        if (this.month == item.mois) {
          this.pointList.push(item)
          this.pointList.forEach(item => {
            this.mac2 = this.MacList.filter(itemm => itemm.userId == item.idUserCreator)
            if (this.mac2.length != 0) {
              if (this.mac2[0].adresseMac != null) {

                if (item.adresseMac == this.mac2[0].adresseMac) {

                  item.attribut1 = 1

                }

                else {

                  item.attribut1 = 0
                }

              }
            } else {
              item.attribut1 = 0
            }
          })
        }
      })
    })
  }
}
