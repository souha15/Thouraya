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

export class AutomaticNotification {
  public id: number;
  public transmitterName: string;
  public transmitterId: string;
  public text: string;
  public shortDate: string;
  public shortTime: string;
  public receiverName: string;
  public receiverId: string;
  public vu: string;
  serviceId: number;
  pageUrl: string;
  idService: number;
  userType: string;
  reponse: string;

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

  // Notification

  readonly rootURL = this.pathService.getPath();
  updateNotif(idTransmitter, idReceiver) {
    return this.http.put(this.rootURL + '/AutomaticNotifs/GetReadUnread/' + idTransmitter + '/' + idReceiver, this.headers);
  }

  GetNotificationsNumber(idReceiver) {
    return this.http.get<number>(this.rootURL + '/AutomaticNotifs/GetNotificationsNumber/' + idReceiver);
  }
  GetNotification(idReceiver, idSender) {
    return this.http.get<number>(this.rootURL + '/AutomaticNotifs/GetNotification/' + idReceiver + '/' + idSender);
  }

  GetLastNotif(idTransmitter,idReceiver) {
    return this.http.get<AutomaticNotification>(this.rootURL + '/AutomaticNotifs/GetLastNotif/' + idTransmitter +'/' + idReceiver);
  }


  GetNotificationByUser(idReceiver) {
    return this.http.get<AutomaticNotification[]>(this.rootURL + '/AutomaticNotifs/GetNotificationByUser/' + idReceiver);
  }
  GetUnreadNotificationByUser(idReceiver) {
    return this.http.get<AutomaticNotification[]>(this.rootURL + '/AutomaticNotifs/GetUnreadNotificationByUser/' + idReceiver);
  }

  GetUnreadServicesNotificationByUser(idReceiver) {
    return this.http.get<AutomaticNotification[]>(this.rootURL + '/AutomaticNotifs/GetUnreadServicesNotificationByUser/' + idReceiver);
  }

  GetUnreadDotationsNotificationByUser(idReceiver) {
    return this.http.get<AutomaticNotification[]>(this.rootURL + '/AutomaticNotifs/GetUnreadDotationsNotificationByUser/' + idReceiver);
  }
  GetUnreadMediaNotificationByUser(idReceiver) {
      return this.http.get<AutomaticNotification[]>(this.rootURL + '/AutomaticNotifs/GetUnreadMediaNotificationByUser/' + idReceiver);
  }

  UpdateNotif(model: AutomaticNotification) {
    return this.http.put<AutomaticNotification>(this.rootURL + '/AutomaticNotifs/' + model.id, model, this.headers);
  }

  CreateNotif(model: AutomaticNotification) {
    return this.http.post<AutomaticNotification>(this.rootURL + '/AutomaticNotifs', model, this.headers);
  }


  GetLastConnection(idUser) {
    return this.http.get<connection>(this.rootURL + '/connections/GetLastConnection/' + idUser);
  }

  deleteConnection(id) {
    return this.http.delete(this.rootURL + '/connections/' + id);
  }

  GetConnectionList(idUser) {
    return this.http.get<connection[]>(this.rootURL + '/connections/GetConnectionList/' + idUser);
  }

  GetConnectionByIdUser(idUser) {
    return this.http.get<connection>(this.rootURL + '/connections/GetConnectionByIdUser/' + idUser);
  }

  TestIfUserConnected(currUserId) {
    return this.http.get<boolean>(this.rootURL + '/connections/TestIfUserConnected/' + currUserId);
  }
}
