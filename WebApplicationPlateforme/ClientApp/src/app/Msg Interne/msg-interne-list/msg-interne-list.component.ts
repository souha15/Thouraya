import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { MsgInterneService } from '../../shared/Services/Msg Interne/msg-interne.service';
import { NotifMsgInterneService } from '../../shared/Services/Msg Interne/notif-msg-interne.service';
import { FilesMsgInterne } from '../../shared/Models/Msg Interne/files-msg-interne.model';
import { FilesMsgInterneService } from '../../shared/Services/Msg Interne/files-msg-interne.service';
import { MsgInterne } from '../../shared/Models/Msg Interne/msg-interne.model';
import { NgForm } from '@angular/forms';
import { NotifMsgInterne } from '../../shared/Models/Msg Interne/notif-msg-interne.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { PathSharedService } from '../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';

@Component({
  selector: 'app-msg-interne-list',
  templateUrl: './msg-interne-list.component.html',
  styleUrls: ['./msg-interne-list.component.css']
})
export class MsgInterneListComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private MsgInterneService: MsgInterneService,
    private toastr: ToastrService,) {  }

  ngOnInit(): void {
    this.getUserConnected();
    this.getMsgInterneList();
  }

  c: Number = 1;
  count: Number = 5;
  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }

  msgInterneList1: MsgInterne[] = [];
  msgInterneList: MsgInterne[] = [];
  getMsgInterneList() {
    this.MsgInterneService.ListMsgInterne().subscribe(res => {
      this.msgInterneList1 = res;
      this.msgInterneList = this.msgInterneList1.filter(item => item.userIdReceiver == this.UserIdConnected || item.userIdSender == this.UserIdConnected)
      return this.msgInterneList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    })
  }
}
