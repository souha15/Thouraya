import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tache } from '../../shared/Models/Taches/tache.model';
import { TacheService } from '../../shared/Services/Taches/tache.service';
import { Chart } from 'node_modules/chart.js'
import { Message } from '../../shared/Models/Comments/message.model';
import { Commentaire } from '../../shared/Models/Taches/commentaire.model';
import { CommentaireService } from '../../shared/Services/Taches/commentaire.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
@Component({
  selector: 'app-timelinetache',
  templateUrl: './timelinetache.component.html',
  styleUrls: ['./timelinetache.component.css']
})
export class TimelinetacheComponent implements OnInit {
  private routeSub: Subscription;


  constructor(private route: ActivatedRoute,
    private TacheService: TacheService,
    private commentsService: CommentaireService,
    private UserService: UserServiceService, ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getIdUrl();
    this.getTaskDetails();
    this.ListOfComments();
    //this.LoadMore();

    //this.Charts();
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }


  //get id in URl
  TaskId: number;
  tache: Tache = new Tache();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.TaskId = params['id']
    });


  }

  // getTask
  getTaskDetails() {
    this.TacheService.GetById(this.TaskId).subscribe(res => {
      this.tache = res

    })
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  //Calculate diffrence date

  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }

  //Create Chart

  Labels: string[];
  ChartData: number[];
  chart = [];


  Charts() {
    this.TacheService.GetById(this.TaskId).subscribe(res => {
      this.tache = res

      let a: number;
      let b: number;
      let c: number;
      a = +this.tache.delai;
      b = this.calculateDiff(this.tache.date)
      if (a > b)
        c = a - b;
      else
        c = 0;
      this.Labels = ['الوقت المنتهي ', 'الوقت  المتبقي'];
      this.ChartData = [this.calculateDiff(this.tache.date), c];

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
  }


  //Comments

  txtMessage: string = '';
  messages = new Array<Commentaire>();
  message: Commentaire = new Commentaire();
  listmessage: Commentaire[] = [];
  //list of comments
  ListOfComments() {
    this.commentsService.CommentsList().subscribe(res => {
      this.listmessage = res;
      console.log(this.listmessage)
      this.messages = this.listmessage.filter(item =>
        item.idTache == this.tache.id
      );
      this.messages.reverse();
      console.log(this.tache.id)
      console.log(typeof this.tache.id)
      console.log(this.messages)
    })


  }



  //Create Comment
  sendMessage(): void {
    if (this.txtMessage) {

      this.message.idTache = this.tache.id;
      this.message.textCommentaire = this.txtMessage;
      this.message.dateTime = new Date();
      this.message.idUser = this.UserIdConnected;
      this.message.nomUser = this.UserNameConnected;
      this.commentsService.CreateComment(this.message).subscribe(res => {

        //   this.messages.push(this.message);
        this.messages.splice(this.messages.length + 1, 0, this.message)
        this.txtMessage = '';
      })


      //this.chatService.sendMessage(this.message);

    }
  }
  /*  private subscribeToEvents(): void {
  
      this.chatService.messageReceived.subscribe((message: Message) => {
        this._ngZone.run(() => {
          if (message.clientuniqueid !== this.uniqueID) {
            message.type = "received";
            this.messages.push(message);
          }
        });
      });
    }  */
}
