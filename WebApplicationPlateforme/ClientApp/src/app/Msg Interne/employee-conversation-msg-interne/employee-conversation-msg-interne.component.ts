import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { MsgInterneService } from '../../shared/Services/Msg Interne/msg-interne.service';
import { MsgInterne } from '../../shared/Models/Msg Interne/msg-interne.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-employee-conversation-msg-interne',
  templateUrl: './employee-conversation-msg-interne.component.html',
  styleUrls: ['./employee-conversation-msg-interne.component.css']
})
export class EmployeeConversationMsgInterneComponent implements OnInit {

  private routeSub: Subscription;

  constructor(private UserService: UserServiceService,
    private MsgInterneService: MsgInterneService,
    private route: ActivatedRoute,
 ) {

  }
  ngOnInit(): void {
    this.GetUsersList() 
  }



  //Get Users List

  UsersList: UserDetail[] = [];
  GetUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersList =res
    })
  }


  msgList: MsgInterne[] = [];
  showMsg: boolean = false;
  search() {
    this.MsgInterneService.GetUsersConversations(this.IdReceiver, this.IdSender).subscribe(resMsgList => {
      this.msgList = resMsgList;
      this.showMsg = true;
      console.log(this.msgList);
    })
  }

  IdReceiver: string;

  GetUserReceiver(event) {
    this.IdReceiver = event.target.value; 
  }

  IdSender: string;
  GetUserSender(event) {
    this.IdSender = event.target.value;
  }

  reset() {
    this.IdSender =''
    this.IdReceiver = ''
    this.msgList = [];
    this.showMsg = false;

  }
}
