import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../shared/Services/Taches/tache.service';
import { Tache } from '../../shared/Models/Taches/tache.model';
import { Observable } from 'rxjs';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Chart } from 'node_modules/chart.js'
import { PrivilegesService } from '../../shared/Services/User/privileges.service';

@Component({
  selector: 'app-main-tasks',
  templateUrl: './main-tasks.component.html',
  styleUrls: ['./main-tasks.component.css']
})
export class MainTasksComponent implements OnInit {

  constructor(private TacheService: TacheService,
    private UserService: UserServiceService,
    private privilegesService: PrivilegesService,) { }

  nbcreated: number;
  nbdone: number;
  Labels: string[];
  ChartData: number[];
  chart = [];  
  ngOnInit(): void {
    this.getUserConnected();
    this.NBTacheCreated();
    this.NbTacheDone();
    this.NbTacheReceived();
    this.NbTacheDelayed();
    this.Charts();
    this.NBTacheAffected();
    this.nbTacheDonewmy();
    this.NbTacheDelayed2();

  }
  
  Charts() {

    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res

      if (this.tacheliste != null) {
        this.filtredtachelist = this.tacheliste.filter(item => item.idUserCreator == this.UserIdConnected);

      } this.nbTacheCreated = this.filtredtachelist.length;

      this.TacheService.ListTache().subscribe(res => {
        this.tacheliste = res

        if (this.tacheliste != null) {
          this.ListeTacheDone = this.tacheliste.filter(item => item.affectedName == this.UserIdConnected && item.etat == "منجزة")
          this.nbTacheDone = this.ListeTacheDone.length
        }
     

 
        this.Labels = ['المهمات التي منجزة ', 'المهمات التي أنشئت'];

    this.NBTacheCreated();
    this.NbTacheDone();

        this.ChartData = [this.nbTacheDone, this.nbTacheCreated];

    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: this.Labels,
        datasets: [
          {
            data: this.ChartData,
            borderColor: '#ffffff',
            backgroundColor: [
              "#398733",
              "#4287f5",             
              "#9966FF",
              "#4C4CFF",
              "#00FFFF",
              "#f990a7",
              "#aad2ed",
              "#FF00FF",
            ],
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });  
      });
    });
  }


  //Tache list

  tacheliste: Tache[] = [];


  listtache() {
    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res
    })
  }


  // Tache Created

  filtredtachelist: Tache[] = [];

  nbTacheCreated: number = 0;

  NBTacheCreated() {
    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res

      if (this.tacheliste != null) {
        this.filtredtachelist = this.tacheliste.filter(item => item.idUserCreator == this.UserIdConnected);

      } this.nbTacheCreated = this.filtredtachelist.length;
      
    });

  
  }

  // Nb Tache Received

  nbTacheReceived: number;
  ListeTacheReceived: Tache[] = [];

  NbTacheReceived() {
    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res

      if (this.tacheliste != null) {
        this.ListeTacheReceived = this.tacheliste.filter(item => item.affectedName == this.UserIdConnected && item.etat == "غير منجزة")
        this.nbTacheReceived = this.ListeTacheReceived.length
      }
    });


  }

  //Tache done

  ListeTacheDone: Tache[] = [];
  nbTacheDone: number;

  NbTacheDone() {
    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res

      if (this.tacheliste != null) {
        this.ListeTacheDone = this.tacheliste.filter(item => item.affectedName == this.UserIdConnected && item.etat == "منجزة")
        this.nbTacheDone = this.ListeTacheDone.length
      }
    });


  }

  //Nb Tache Delayed

  nbTacheDelayed: number = 0;
  ListeTacheDelayed: Tache[] = [];
  NbTacheDelayed() {

    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res

      if (this.tacheliste != null) {
        this.ListeTacheDelayed = this.tacheliste.filter(item => item.affectedName == this.UserIdConnected && item.etat == "غير منجزة")
     

        this.ListeTacheDelayed.forEach(element => {
          if (this.calculateDiff(element.date) > +element.delai) {
            this.nbTacheDelayed++;
          }
       
        })

       
      }
    });

   
  }

  //Calculate difference Date
  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }

//Get User Connected
  UserIdConnected: string;
  UserNameConnected: string;
  privtest: boolean = false;
  privtestR: boolean = false;
  addTask: any;
  rapport: any;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

  /*    this.privilegesService.GetById(this.UserIdConnected).subscribe(res => {
        this.addTask = res.addTask;
        this.rapport = res.rapport
        if (this.addTask == 1) {
          this.privtest = true;
        }


        if (this.rapport == 1) {
          this.privtestR = true;
        }

      })
      */
    })
  }

  // Data filtred with bar progrees

  nbTacheAffected: number = 0;
  fitredAffectedList: Tache[] = [];
  nbmonth: number =0;
  nbweek: number=0;
  nbday: number = 0;
  num: number;
  NBTacheAffected() {
    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res

      if (this.tacheliste != null) {
        this.fitredAffectedList = this.tacheliste.filter(item => item.idUserCreator == this.UserIdConnected && item.affectedName != '');

        this.fitredAffectedList.forEach(element => {
          this.num = this.calculateDiff(element.date)
          
     
          if (Math.abs(this.num) == 0) {
            this.nbday++;
          }
          if (Math.abs(this.num) <= 7 && Math.abs(this.num)>0) {
            this.nbweek++;
          }
          if (Math.abs(this.num) > 7 && Math.abs(this.num) <= 31) {
            this.nbmonth++
          }

        })

      } 

    });


  }


  filtertacheListDone: Tache[] = [];
  nbmonthd: number = 0;
  nbweekd: number = 0;
  nbdayd: number = 0;
  numd: number;
  nbTacheDonewmy() {
    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res

      if (this.tacheliste != null) {
        this.filtertacheListDone = this.tacheliste.filter(item => item.affectedName == this.UserIdConnected && item.etat == "منجزة")
      
      }


      this.filtertacheListDone.forEach(element => {
        this.numd = this.calculateDiff(element.date)

    
        if (Math.abs(this.numd) == 0) {
          this.nbdayd++;
        }
        if (Math.abs(this.numd) <= 7 && Math.abs(this.numd) > 0) {
          this.nbweekd++;
        }
        if (Math.abs(this.numd) > 7 && Math.abs(this.numd) <= 31) {
          this.nbmonthd++
        }

      })
    });
  }

  today: number = 0;
  always: number = 0;  
  numta: number;

  ListeTacheDelayed2: Tache[] = [];
  NbTacheDelayed2() {

    this.TacheService.ListTache().subscribe(res => {
      this.tacheliste = res

      if (this.tacheliste != null) {
        this.ListeTacheDelayed2 = this.tacheliste.filter(item => item.affectedName == this.UserIdConnected && item.etat == "غير منجزة")


        this.ListeTacheDelayed2.forEach(element => {
          this.numta = this.calculateDiff(element.date)
          if (this.numta > +element.delai) {
            if (Math.abs(this.numta) == 1) {
              this.today++;
            }
            else {
              this.always++
            }
          }
        })


      }
    });


  }
}
