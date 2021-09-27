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

@Component({
  selector: 'app-list-musulman',
  templateUrl: './list-musulman.component.html',
  styleUrls: ['./list-musulman.component.css']
})
export class ListMusulmanComponent implements OnInit {


  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private musService: MusulmanService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getList()
  }
  c: Number = 1;

  count: Number = 5;
  /* Create Musulman */

  mus: Musulman[] = []
  getList() {
    this.musService.List().subscribe(res => {
      this.mus =res
    });


  }

/** Delete **/
  onDelete(Id) {
  if(confirm('Are you sure to delete this record ?')) {
  this.musService.Delete(Id)
    .subscribe(res => {
      this.getList();
      this.toastr.success("تم الحذف  بنجاح", "نجاح");
    },

      err => {
        console.log(err);
        this.toastr.warning('لم يتم الحذف  ', ' فشل');

      }
    )

}
  }

}
