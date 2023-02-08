import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';  
import { Chat } from '../../../Chat/chat.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PathSharedService } from '../../path-shared.service';

export class Message {
  constructor(
    public content: string,
    public mine: boolean
  ) { }
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Chat;

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  Create(model: Chat) {
    return this.http.post<Chat>(this.rootURL + '/ChatMsgs', model, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/ChatMsgs', this.formData, this.headers);
  }

  Edit() {
    return this.http.put(this.rootURL + '/ChatMsgs/' + this.formData.id, this.formData, this.headers);
  }


  List(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.rootURL + '/ChatMsgs');
  }

  Delete(id) {
    return this.http.delete(this.rootURL + '/ChatMsgs/' + id);
  }


  PutObservable(model: Chat) {
    return this.http.put<Chat>(this.rootURL + '/ChatMsgs/' + model.id, model, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/ChatMsgs/' + this.formData.id, this.formData, this.headers);
  }


  GetById(Id) {
    return this.http.get<Chat>(this.rootURL + '/ChatMsgs/' + Id);
  }

  GetConversations(IdEmeteur, IdRecepteur) {
    return this.http.get<Chat[]>(this.rootURL + '/ChatMsgs/GetMessagesWithUserSelected/' + IdEmeteur + '/' + IdRecepteur);
  }
}  
