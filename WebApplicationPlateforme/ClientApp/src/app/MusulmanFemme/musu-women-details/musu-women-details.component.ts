import { Component, OnInit, Injectable, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { TranslationWidth } from '@angular/common';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { MusuWomenService } from '../../shared/Services/NewServicesForDawa/musu-women.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ToastrService } from 'ngx-toastr';
import { FilesMusuWomenService } from '../../shared/Services/NewServicesForDawa/files-musu-women.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Musulman } from '../../shared/Models/NvMusulman/musulman.model';
import { NgForm } from '@angular/forms';
import { FilesMusulman } from '../../shared/Models/NvMusulman/files-musulman.model';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-musu-women-details',
  templateUrl: './musu-women-details.component.html',
  styleUrls: ['./musu-women-details.component.css']
})
export class MusuWomenDetailsComponent implements OnInit {


  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  private routeSub: Subscription;

  constructor(private musService: MusuWomenService,
    public serviceupload: UploadDownloadService,
    private toastr: ToastrService,
    private FilesService: FilesMusuWomenService,
    private route: ActivatedRoute, ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getIdUrl();
  }

  /* Get Musulman */
  mus: Musulman = new Musulman();
  Id: number;
  list: FilesMusulman[] = [];
  list2: FilesMusulman[] = [];
  listphoto: FilesMusulman[] = [];
  listResi: FilesMusulman[] = [];
  listPass: FilesMusulman[] = [];

  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.musService.GetById(this.Id).subscribe(res => {
        this.mus = res

        this.FilesService.List().subscribe(res => {
          this.list2 = res;
          this.list = this.list2.filter(item => item.idmusulman == this.Id)
          this.listPass = this.list.filter(item => item.typefile == "الجواز");
          this.listphoto = this.list.filter(item => item.typefile == "الصورة");
          this.listResi = this.list.filter(item => item.typefile == "الإقامة");


        })
      })


    });
  }

  //Download

  public download(filepath) {
    this.downloadStatus.emit({ status: ProgressStatusEnum.START });
    this.serviceupload.downloadFile(filepath).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            this.downloadStatus.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
            break;
          case HttpEventType.Response:
            this.downloadStatus.emit({ status: ProgressStatusEnum.COMPLETE });
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = filepath;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        this.downloadStatus.emit({ status: ProgressStatusEnum.ERROR });
      }
    );
  }


}
