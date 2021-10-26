import { Component, OnInit } from '@angular/core';
import { SalaireDService } from '../../../shared/Services/Salaire/salaire-d.service';
import { ToastrService } from 'ngx-toastr';
import { SalaireD } from '../../../shared/Models/Salaire/salaire-d.model';

@Component({
  selector: 'app-occasion-soiree-list-etab',
  templateUrl: './occasion-soiree-list-etab.component.html',
  styleUrls: ['./occasion-soiree-list-etab.component.css']
})
export class OccasionSoireeListEtabComponent implements OnInit {

  constructor(private salaireService: SalaireDService,
    private toastr: ToastrService,
 ) { }

  ngOnInit(): void {
    this.getList();
  }


  p: Number = 1;
  count: Number = 5;

  list: SalaireD[] = [];
  listGlob: SalaireD[] = [];
  list1: SalaireD[] = [];
  list2: SalaireD[] = [];
  list3: SalaireD[] = [];
  list4: SalaireD[] = [];
  list5: SalaireD[] = [];
  list6: SalaireD[] = [];
  list7: SalaireD[] = [];
  list8: SalaireD[] = [];
  list9: SalaireD[] = [];
  list10: SalaireD[] = [];
  list11: SalaireD[] = [];
  list12: SalaireD[] = [];
  listG: SalaireD[] = [];
  obj1: SalaireD = new SalaireD();
  obj2: SalaireD = new SalaireD();
  obj3: SalaireD = new SalaireD();
  obj4: SalaireD = new SalaireD();
  obj5: SalaireD = new SalaireD();
  obj6: SalaireD = new SalaireD();
  obj7: SalaireD = new SalaireD();
  obj8: SalaireD = new SalaireD();
  obj9: SalaireD = new SalaireD();
  obj10: SalaireD = new SalaireD();
  obj11: SalaireD = new SalaireD();
  obj12: SalaireD = new SalaireD();
  getList() {

    this.salaireService.Get().subscribe(res => {
      this.listGlob = res;
      this.list = this.listGlob.filter(item => item.attribut5 == "معتمدة");
      this.list.forEach(item => {
        var date = new Date(item.mois);
        var mois = date.getMonth() + 1;
        if (mois == 1) {
          this.list1.push(item)
          var totsal: number = 0;
          var totindemnite: number = 0;
          var totRetrait: number = 0;
          var tot: number = 0;
          var attribut5: string = "";
          this.list1.forEach(item => {
            totsal = totsal + +item.salaire;
            totindemnite = totindemnite + +item.totIndemnite;
            totRetrait = totRetrait + +item.retrait + +item.assurance;
            tot = totsal + totindemnite - totRetrait
            attribut5 = item.attribut5
          })

          this.obj1.mois = "يناير";
          this.obj1.salaire = totsal.toString();
          this.obj1.indemnite = totindemnite.toString();
          this.obj1.retrait = totRetrait.toString();
          this.obj1.tot = tot.toString();
          this.obj1.attribut5 = attribut5;

        }


        if (mois == 2) {
          this.list12.push(item)
          var totsal: number = 0;
          var totindemnite: number = 0;
          var totRetrait: number = 0;
          var tot: number = 0;
          var attribut5: string = "";
    
          this.list12.forEach(item => {
            totsal = totsal + +item.salaire;
            totindemnite = totindemnite + +item.totIndemnite;
            totRetrait = totRetrait + +item.retrait + +item.assurance;
            tot = totsal + totindemnite - totRetrait
            attribut5 = item.attribut5
            
          })

          this.obj2.mois = "فبراير";
          this.obj2.salaire = totsal.toString();
          this.obj2.indemnite = totindemnite.toString();
          this.obj2.retrait = totRetrait.toString();
          this.obj2.tot = tot.toString();
          this.obj2.attribut5 = attribut5;
        }


        if (mois == 3) {
          this.list3.push(item)
          var totsal: number = 0;
          var totindemnite: number = 0;
          var totRetrait: number = 0;
          var tot: number = 0;
          var attribut5: string = "";
         
          this.list3.forEach(item => {
            totsal = totsal + +item.salaire;
            totindemnite = totindemnite + +item.totIndemnite;
            totRetrait = totRetrait + +item.retrait + +item.assurance;
            tot = totsal + totindemnite - totRetrait
            attribut5 = item.attribut5
    

          })

          this.obj3.mois = "مارس";
          this.obj3.salaire = totsal.toString();
          this.obj3.indemnite = totindemnite.toString();
          this.obj3.retrait = totRetrait.toString();
          this.obj3.tot = tot.toString();
          this.obj3.attribut5 = attribut5;

        }
    
        if (mois == 4) {
          this.list4.push(item)
          var totsal: number = 0;
          var totindemnite: number = 0;
          var totRetrait: number = 0;
          var tot: number = 0;
          var attribut5: string = "";
         
          this.list4.forEach(item => {
            totsal = totsal + +item.salaire;
            totindemnite = totindemnite + +item.totIndemnite;
            totRetrait = totRetrait + +item.retrait + +item.assurance;
            tot = totsal + totindemnite - totRetrait
            attribut5 = item.attribut5
           
          })

          this.obj4.mois = "إبريل";
          this.obj4.salaire = totsal.toString();
          this.obj4.indemnite = totindemnite.toString();
          this.obj4.retrait = totRetrait.toString();
          this.obj4.tot = tot.toString();
          this.obj4.attribut5 = attribut5;

        }

        var attribut5: string = "";
        attribut5 = item.attribut5
        this.obj2.attribut5 = attribut5;
        if (mois == 5) {
          this.list5.push(item)
          var totsal: number = 0;
          var totindemnite: number = 0;
          var totRetrait: number = 0;
          var tot: number = 0;
          var attribut5: string = "";
     
          this.list5.forEach(item => {
            totsal = totsal + +item.salaire;
            totindemnite = totindemnite + +item.totIndemnite;
            totRetrait = totRetrait + +item.retrait + +item.assurance;
            tot = totsal + totindemnite - totRetrait
            attribut5 = item.attribut5
           
          })

          this.obj5.mois = "مايو";
          this.obj5.salaire = totsal.toString();
          this.obj5.indemnite = totindemnite.toString();
          this.obj5.retrait = totRetrait.toString();
          this.obj5.tot = tot.toString();
          this.obj5.attribut5 = attribut5;
        }
      

        if (mois == 6) {
          this.list6.push(item)
          var totsal: number = 0;
          var totindemnite: number = 0;
          var totRetrait: number = 0;
          var tot: number = 0;
          var attribut5: string = "";
       
          this.list6.forEach(item => {
            totsal = totsal + +item.salaire;
            totindemnite = totindemnite + +item.totIndemnite;
            totRetrait = totRetrait + +item.retrait + +item.assurance;
            tot = totsal + totindemnite - totRetrait
            attribut5 = item.attribut5
          

          })

          this.obj6.mois = "يونيو";
          this.obj6.salaire = totsal.toString();
          this.obj6.indemnite = totindemnite.toString();
          this.obj6.retrait = totRetrait.toString();
          this.obj6.tot = tot.toString();
          this.obj6.attribut5 = attribut5;
        }



        if (mois == 7) {
          this.list7.push(item)
          var totsal: number = 0;
          var totindemnite: number = 0;
          var totRetrait: number = 0;
          var tot: number = 0;
          var attribut5: string = "";
 
          this.list7.forEach(item => {
            totsal = totsal + +item.salaire;
            totindemnite = totindemnite + +item.totIndemnite;
            totRetrait = totRetrait + +item.retrait + +item.assurance;
            tot = totsal + totindemnite - totRetrait
            attribut5 = item.attribut5
           
          })

          this.obj7.mois = "يوليو";
          this.obj7.salaire = totsal.toString();
          this.obj7.indemnite = totindemnite.toString();
          this.obj7.retrait = totRetrait.toString();
          this.obj7.tot = tot.toString();
          this.obj7.attribut5 = attribut5;
        }

        
        if (mois == 8) {
          this.list8.push(item)
          var totsal: number = 0;
          var totindemnite: number = 0;
          var totRetrait: number = 0;
          var tot: number = 0;
          var attribut5: string = "";
       

          this.list8.forEach(item => {
            totsal = totsal + +item.salaire;
            totindemnite = totindemnite + +item.totIndemnite;
            totRetrait = totRetrait + +item.retrait + +item.assurance;
            tot = totsal + totindemnite - totRetrait
            attribut5 = item.attribut5
          
          })

          this.obj8.mois = "أغسطس";
          this.obj8.salaire = totsal.toString();
          this.obj8.indemnite = totindemnite.toString();
          this.obj8.retrait = totRetrait.toString();
          this.obj8.tot = tot.toString();
          this.obj8.attribut5 = attribut5;
        }



        if (mois == 9) {
          this.list9.push(item)
          var totsal: number = 0;
          var totindemnite: number = 0;
          var totRetrait: number = 0;
          var tot: number = 0;
          var attribut5: string = "";

          this.list9.forEach(item => {
            totsal = totsal + +item.salaire;
            totindemnite = totindemnite + +item.totIndemnite;
            totRetrait = totRetrait + +item.retrait + +item.assurance;
            tot = totsal + totindemnite - totRetrait
            attribut5 = item.attribut5
         
          })

          this.obj9.mois = "سبتمبر";
          this.obj9.salaire = totsal.toString();
          this.obj9.indemnite = totindemnite.toString();
          this.obj9.retrait = totRetrait.toString();
          this.obj9.tot = tot.toString();
          this.obj9.attribut5 = attribut5;
        }


        if (mois == 10) {
          this.list10.push(item)
          var totsal: number = 0;
          var totindemnite: number = 0;
          var totRetrait: number = 0;
          var tot: number = 0;
          var attribut5: string = "";

          this.list10.forEach(item => {
            totsal = totsal + +item.salaire;
            totindemnite = totindemnite + +item.totIndemnite;
            totRetrait = totRetrait + +item.retrait + +item.assurance;
            tot = totsal + totindemnite - totRetrait
            attribut5 = item.attribut5
   
          })

          this.obj10.mois = "أكتوبر";
          this.obj10.salaire = totsal.toString();
          this.obj10.indemnite = totindemnite.toString();
          this.obj10.retrait = totRetrait.toString();
          this.obj10.tot = tot.toString();
          this.obj10.attribut5 = attribut5;
        }


        if (mois == 11) {
          this.list11.push(item)
          var totsal: number = 0;
          var totindemnite: number = 0;
          var totRetrait: number = 0;
          var tot: number = 0;
          var attribut5: string = "";

          this.list11.forEach(item => {
            totsal = totsal + +item.salaire;
            totindemnite = totindemnite + +item.totIndemnite;
            totRetrait = totRetrait + +item.retrait + +item.assurance;
            tot = totsal + totindemnite - totRetrait
            attribut5 = item.attribut5

          })

          this.obj11.mois = "نوفمبر";
          this.obj11.salaire = totsal.toString();
          this.obj11.indemnite = totindemnite.toString();
          this.obj11.retrait = totRetrait.toString();
          this.obj11.tot = tot.toString();
          this.obj11.attribut5 = attribut5;
        }

        if (mois == 12) {
          this.list12.push(item)
          var totsal: number = 0;
          var totindemnite: number = 0;
          var totRetrait: number = 0;
          var tot: number = 0;
          var attribut5: string = "";

          this.list12.forEach(item => {
            totsal = totsal + +item.salaire;
            totindemnite = totindemnite + +item.totIndemnite;
            totRetrait = totRetrait + +item.retrait + +item.assurance;
            tot = totsal + totindemnite - totRetrait
            attribut5 = item.attribut5

          })

          this.obj12.mois = "ديسمبر";
          this.obj12.salaire = totsal.toString();
          this.obj12.indemnite = totindemnite.toString();
          this.obj12.retrait = totRetrait.toString();
          this.obj12.tot = tot.toString();
          this.obj12.attribut5 = attribut5;
        }

      })

      if (this.list1.length != 0) { this.listG.push(this.obj1) }


      if (this.list2.length != 0)
        this.listG.push(this.obj2)

      if (this.list3.length != 0)
        this.listG.push(this.obj3)

      if (this.list4.length != 0)
        this.listG.push(this.obj4)

      if (this.list5.length != 0)
        this.listG.push(this.obj5)

      if (this.list6.length != 0)
        this.listG.push(this.obj6)

      if (this.list7.length != 0)
        this.listG.push(this.obj7)

      if (this.list8.length != 0)
        this.listG.push(this.obj8)

      if (this.list9.length != 0)
        this.listG.push(this.obj9)

      if (this.list10.length != 0)
        this.listG.push(this.obj10)

      if (this.list11.length != 0)
        this.listG.push(this.obj11)

      if (this.list12.length != 0)
        this.listG.push(this.obj12)


    })
  }

}
