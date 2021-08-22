import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../shared/Services/Taches/tache.service';
import { Tache } from '../../shared/Models/Taches/tache.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  constructor(private TacheService: TacheService) { }

  ngOnInit(): void {
    this.filtredDataTache();
  }

  c: Number = 1;
  count: Number = 5;
  //Tache list
  private _allTaches: Observable<Tache[]>;
  public get allTache(): Observable<Tache[]> {
    return this._allTaches;
  }

  public set allTache(value: Observable<Tache[]>) {
    this._allTaches = value;


  }
  
  ShowListTaches() {

    this.allTache = this.TacheService.ListTache();

   
    
  }

  tacheliste: Tache[] = [];
  filtredtachelist: Tache[] = [];
  nbclose: number=0;
  nbnew: number=0;
  nbcurrent: number=0;
  nbretard: number=0;
  filtredDataTache() {
    this.TacheService.ListTache().subscribe(res => {
      this.filtredtachelist = res

      this.filtredtachelist.forEach(item => {
      
        if (this.calculateDiff(item.date) > +item.delai && item.etat == "في الإنتظار") {
          item.etat ="مغلقة"
          this.TacheService.PutObservableE(item).subscribe(res => {
            this.TacheService.ListTache().subscribe(res => {
              this.filtredtachelist = res
            })
          })
        }
      })
      this.nbclose = this.filtredtachelist.filter(item => item.Attribut1 == "منجزة").length;
      this.nbnew = this.filtredtachelist.filter(item => item.etat == "في الإنتظار").length;
      this.nbcurrent = this.filtredtachelist.filter(item => item.etat == "تحت الإجراء").length;
      this.filtredtachelist.forEach(element => {
        if (this.calculateDiff(element.date) > +element.delai) {
          this.nbretard++;
        }

      })

      console.log(this.filtredtachelist.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      return this.filtredtachelist.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    });


  }

  //Calculate difference Date
  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }
  //sorting
  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  //Pagination initialisation

}
