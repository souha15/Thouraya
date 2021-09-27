import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Musulman } from '../../shared/Models/NvMusulman/musulman.model';
import { MusulmanService } from '../../shared/Services/NvMusulman/musulman.service';
import { FilesmusulmanService } from '../../shared/Services/NvMusulman/filesmusulman.service';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { FilesMusulman } from '../../shared/Models/NvMusulman/files-musulman.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-musulman',
  templateUrl: './details-musulman.component.html',
  styleUrls: ['./details-musulman.component.css']
})
export class DetailsMusulmanComponent implements OnInit {


  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  private routeSub: Subscription;

  constructor(private musService: MusulmanService,
    public serviceupload: UploadDownloadService,
    private toastr: ToastrService,
    private FilesService: FilesmusulmanService,
    private route: ActivatedRoute,) {
    this.downloadStatus = new EventEmitter<ProgressStatus>(); }

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
