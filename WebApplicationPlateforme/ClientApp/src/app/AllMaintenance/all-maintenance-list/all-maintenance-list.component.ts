import { Component, OnInit } from '@angular/core';
import * as signalR from "@aspnet/signalr";
@Component({
  selector: 'app-all-maintenance-list',
  templateUrl: './all-maintenance-list.component.html',
  styleUrls: ['./all-maintenance-list.component.css']
})
export class AllMaintenanceListComponent implements OnInit {


  constructor() { }

  //divMessages: HTMLDivElement = document.querySelector("#divMessages");
  ////tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
  //btnSend: HTMLButtonElement = document.querySelector("#btnSend");
  //username = new Date().getTime();
  //connection;
  ngOnInit(): void {
    // this.connection = new signalR.HubConnectionBuilder()
    //   .withUrl("http://localhost:49599/notify")
    //  .build();

    //this.connection.on("ReceiveMessage", (username: string, message: string) => {
    //  let messageContainer = document.createElement("div");

    //  messageContainer.innerHTML =
    //    `<div class="message-author">${username}</div><div>${message}</div>`;

    //  this.divMessages.appendChild(messageContainer);
    //  this.divMessages.scrollTop = this.divMessages.scrollHeight;
    //});
    //this.connection.start().catch(err => console.log(err));

    //this.connection.hub.disconnected(function () {
    //  setTimeout(function () {
    //    this.connection.hub.start();
    //  }, 5000); // Restart connection after 5 seconds.
    //});

    //this.connection.onclose((error) => {
    //  this.connection.start();
    //  console.error(`Something went wrong: ${error}`);
    //});
  }
  tbMessage:string
  getmsg(event) {
    
    this.tbMessage = event.target.value
    }

  //send() {
  //  this.connection.send("SendMessageToUser", this.username, this.tbMessage)
  //    .then(() => this.tbMessage = "");
  //  console.log(this.username)
  //  console.log(this.tbMessage)
  //  }
}
