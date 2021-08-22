import { Component, OnInit } from '@angular/core';
import { ProjetOrgService } from '../../../shared/Services/ProjetOrg/projet-org.service';
import { ProjetOrg } from '../../../shared/Models/ProjetOrg/projet-org.model';

@Component({
  selector: 'app-menu-projet-org2',
  templateUrl: './menu-projet-org2.component.html',
  styleUrls: ['./menu-projet-org2.component.css']
})
export class MenuProjetOrg2Component implements OnInit {

  constructor(private projetService: ProjetOrgService) { }

  ngOnInit(): void {
    this.getProjet();
  }
  activated: number = 0;
  notactivated: number = 0;
  colsed: number = 0;
  opened: number = 0;
  worked: number = 0;
  pjList: ProjetOrg[] = [];
  pjnotactivated: ProjetOrg[] = [];
  pjactivated: ProjetOrg[] = [];
  pjcolsed: ProjetOrg[] = [];
  pjopened: ProjetOrg[] = [];
  pjworked: ProjetOrg[] = [];
  getProjet() {
    this.projetService.Get().subscribe(res => {
      this.pjList = res

      this.pjcolsed = this.pjList.filter(item => item.etat == "مغلقة")
      this.colsed = this.pjcolsed.length;

      this.pjactivated = this.pjList.filter(item => item.etat == "مفعلة")
      this.activated = this.pjactivated.length;

      this.pjopened = this.pjList.filter(item => item.etat == "مفتوحة")
      this.opened = this.pjopened.length;

      this.pjworked = this.pjList.filter(item => item.etat == "تحت الإنجاز")
      this.worked = this.pjworked.length;

      this.pjnotactivated = this.pjList.filter(item => item.etat == "غير مفعلة")
      this.notactivated = this.pjnotactivated.length;
    })
  }
}
