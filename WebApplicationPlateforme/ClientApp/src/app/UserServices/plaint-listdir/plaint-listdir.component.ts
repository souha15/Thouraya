import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { ToastrService } from 'ngx-toastr';
import { PlaintService } from '../../shared/Services/User Services/plaint.service';
import { FilesPlaintFilesService } from '../../shared/Services/User Services/plaint-files.service';
import { FilesPlaint } from '../../shared/Models/User Services/files-plaint.model';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { Plaint } from '../../shared/Models/User Services/plaint.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-plaint-listdir',
  templateUrl: './plaint-listdir.component.html',
  styleUrls: ['./plaint-listdir.component.css']
})
export class PlaintListdirComponent implements OnInit {

  constructor(private plaintService: PlaintService,
    private FilesService: FilesPlaintFilesService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected()
    this.CongeList();
  }

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;


  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  //Get Conge Demand Lis

  congeList: Plaint[] = [];
  dem: Plaint = new Plaint();
  filtredCongeList: Plaint[] = [];
  CongeList() {
    this.plaintService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item => item.attribut2 == this.UserIdConnected)
    })
  }

  p: Number = 1;
  count: Number = 5;

  populateForm(conge: Plaint) {
    this.plaintService.formData = Object.assign({}, conge)
    this.dem = Object.assign({}, conge)

  }

}
