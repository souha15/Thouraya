import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../shared/Services/News/news.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { News } from '../../shared/Models/News/news.model';
import { ToastrService } from 'ngx-toastr';
import * as signalR from '@aspnet/signalr'
import { UserDetail } from '../../shared/Models/User/user-detail.model';
@Component({
  selector: 'app-news-list-viewer',
  templateUrl: './news-list-viewer.component.html',
  styleUrls: ['./news-list-viewer.component.css']
})
export class NewsListViewerComponent implements OnInit {


  constructor(private newsService: NewsService,
    private UserService: UserServiceService,
    private toastr: ToastrService) { }
 // list: { id: string, username: string }[] = []
  list: any[] = [];
  /*connection = new signalR.HubConnectionBuilder()
    .withUrl("notify")
    .build();*/
  ngOnInit(): void {
    this.getUserConnected();
    this.getNewsList();
    this.getUser();
    




  }
  user: UserDetail = new UserDetail();
  getUser() {
    this.UserService.GetUserById("da1f3d18-9035-48f3-803e-17e8d6947a61").subscribe(res => {
      this.user = res
    })
  }


  UserIdConnected: string;
  UserNameConnected: string;


  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  per: News = new News();

  populateForm(conge: News) {
    this.per = Object.assign({}, conge)
    this.newsService.formData = Object.assign({}, conge)
  }

  //get News List

  List: News[] = [];
  newsList: News[] = [];
  getNewsList() {
    this.newsService.Get().subscribe(res => {
      this.newsList = res
      console.log(this.newsList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      return this.newsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    })
  }

}

/*
 *
 *     this.connection
      .start()
      .then(() => console.log('Connection Started'))
      .catch(err=> console.log(err))

    this.connection.on("UserConnected", (connectionId: string, message: string) => {

      this.list.push("connectionId : " + connectionId + "with username " + this.UserNameConnected)
      console.log(connectionId)
      console.log(this.list)
    })



    this.connection.on("ReceiveMessage", function (user,message) {
      var msg = message.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
      var encodedMsg = user + " says " + msg;
      var li = document.createElement("li");
      li.textContent = encodedMsg;
      document.getElementById("messages").appendChild(li);
      console.log(message)
    });

 * message: string;
  getmessage(event) {
    this.message = event.target.value;
  }

  connectionId: string;
 getconnectionId(event) {
    this.connectionId = event.target.value
  }

  send() {
    this.connection.invoke("SendMessage", "da1f3d18-9035-48f3-803e-17e8d6947a61",this.message).catch(function (err) {
      console.log(err)
    })
  }
 *
 *
 *
 *
 * this.connection.start().then(function () {
   console.log("connected ! ");
 }).catch(function (err) {
   return console.error(err.toString());
 });*/
/* this.connection.on("ReceiveMessage", function (message) {
console.log(message)
});
this.connection.on("ReceiveMessage", function (message) {
console.log(message)
});

  connection.on("UserDisconnected", (connectionId: string, message: string) => {
    this.MessageService.error(connectionId, message)
  })
*/
