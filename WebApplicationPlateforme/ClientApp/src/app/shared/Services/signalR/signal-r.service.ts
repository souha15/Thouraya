import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../User/user-service.service';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import * as signalR from '@aspnet/signalr';
export class connection {
  public id: number;
  public userId: string;
  public userName: string;
  public signalrId: string;
  public photo: string;
  public dateMsg: string;
  public timeMsg: string;
  public vu: number;
  public msgs: Array<Message>;//signalr
}

export class Notification {
  public id: number;
  public transmitterName: string;
  public transmitterId: string;
  public text: string;
  public shortDate: string;
  public shortTime: string;
  public receiverName: string;
  public receiverId: string;
  public vu: string;
}

export class Message {
  constructor(
    public content: string,
    public mine: boolean
  ) { }
}
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  constructor(private toastr: ToastrService,
    private userService: UserServiceService,
    private pathService: PathSharedService,
    private http: HttpClient) {

  }

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  ssSubj = new Subject<any>();
  ssObs(): Observable<any> {
    return this.ssSubj.asObservable();
  }

  hubConnection;
  userId: string;
  public isAuthenticated: boolean = false;
  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("/Notify", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        //transport: signalR.TransportType.LongPolling
      })
      .configureLogging(signalR.LogLevel.Debug)
      .build();


    this.hubConnection
      .start()
      .then(() => {

        console.log('Connected');
        this.ssSubj.next({ type: "HubConnStarted" });
        this.askServerListener();
        this.userService.getUserProfileObservable().subscribe(res => {
          this.userId = res.id;
          this.askServer(this.userId, this.userName, this.conn);
        })
      })
      .catch(error => console.log('Not Connected: ' + error));
  }

  userName: string;
  conn: string;
  async askServer(userId: string, userName: string, conn: string) {
    await this.hubConnection.invoke("askServer", userId, userName, conn)
      .then(() => {
        this.isAuthenticated = true;
      })
      .catch(err => console.log(err));
  }

  askServerListener() {
    this.hubConnection.on("authResponseSuccess", (userId, userName, conn) => {
      this.userId = userId;
      this.userName = userName;
      this.conn = conn;
      //this.toastr.success(userName +"Authenticated With Connection Id : " +conn);
    })
  }

}
