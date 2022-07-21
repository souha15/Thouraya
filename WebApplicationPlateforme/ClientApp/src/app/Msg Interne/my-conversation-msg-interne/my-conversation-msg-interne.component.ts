import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { MsgInterneService } from '../../shared/Services/Msg Interne/msg-interne.service';
import { MsgInterne } from '../../shared/Models/Msg Interne/msg-interne.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-conversation-msg-interne',
  templateUrl: './my-conversation-msg-interne.component.html',
  styleUrls: ['./my-conversation-msg-interne.component.css']
})
export class MyConversationMsgInterneComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private UserService: UserServiceService,
    private MsgInterneService: MsgInterneService,
    private route: ActivatedRoute,) {
  }
  ngOnInit(): void {
    this.getIdUrl();
  }
  IdReceiver: string;
  IdSender: string;
  msgList: MsgInterne[] = [];
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.IdSender = params['id']
      this.UserService.getUserProfileObservable().subscribe(resIdReceiver => {
        this.IdReceiver = resIdReceiver.id;
        this.MsgInterneService.GetUsersConversations(this.IdReceiver, this.IdSender).subscribe(resMsgList => {
          this.msgList = resMsgList;
          console.log(this.msgList);
        })
      })
    })
  }


}
