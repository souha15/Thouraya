import { Component, OnInit } from '@angular/core';
import { GestBenService } from '../../../shared/Services/GestBen/gest-ben.service';
import { ParrinerService } from '../../../shared/Services/Parrainage/parriner.service';
import { OrphelinService } from '../../../shared/Services/Orphelin/orphelin.service';
import { Parriner } from '../../../shared/Models/Parrainage/parriner.model';
import { GestBen } from '../../../shared/Models/GestBen/gest-ben.model';
import { Orphelin } from '../../../shared/Models/Orphelin/orphelin.model';

@Component({
  selector: 'app-list-solde',
  templateUrl: './list-solde.component.html',
  styleUrls: ['./list-solde.component.css']
})
export class ListSoldeComponent implements OnInit {

  constructor(
    private OrphelinService: OrphelinService,
    private beneficiaireService: GestBenService) { }

  ngOnInit(): void {
  }

  p: Number = 1;
  count: Number = 5;
  private selectedLink: string = "";
  setradio(e: string): void {

    this.selectedLink = e;
    if (this.selectedLink == "orphelin") {
      this.getOrph();
    }

    if (this.selectedLink == "femme") {
      this.getFemme();
    }
  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }

  BenList: GestBen[] = [];
  OrphsList: Orphelin[] = [];

  getOrph() {
    this.OrphelinService.Get().subscribe(res => {
      this.OrphsList = res
    })
  }


  getFemme() {
    this.beneficiaireService.ListGestBen().subscribe(res => {
      this.BenList =res
    })
  }

  
}
