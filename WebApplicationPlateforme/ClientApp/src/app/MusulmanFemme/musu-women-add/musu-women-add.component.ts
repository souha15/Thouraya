import { Component, OnInit, Injectable, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import {
  NgbDateStruct, NgbCalendar, NgbCalendarIslamicUmalqura, NgbDatepickerI18n, NgbDate
} from '@ng-bootstrap/ng-bootstrap';

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


const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
  'ذو القعدة', 'ذو الحجة'];

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {

  getWeekdayShortName(weekday: number): string {
    return WEEKDAYS[weekday - 1];
  }
  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }

  getWeekdayLabel(weekday: number, width?: TranslationWidth) {
    return WEEKDAYS[weekday - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}
@Component({
  selector: 'app-musu-women-add',
  templateUrl: './musu-women-add.component.html',
  styleUrls: ['./musu-women-add.component.css'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n }
  ]
})
export class MusuWomenAddComponent implements OnInit {
  model: NgbDateStruct;
  model1: NgbDateStruct;
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private calendar: NgbCalendar,
    private musService: MusuWomenService,
    public serviceupload: UploadDownloadService,
    private toastr: ToastrService,
    private FilesService: FilesMusuWomenService,
    private UserService: UserServiceService) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getUserConnected();
    this.getFiles();

  }

  onDateSelect(date: NgbDate) {

    var day: string = date.day.toString()
    var month: string = date.month.toString()
    var year: string = date.year.toString()
    this.mus.datehij = year + "-" + month + "-" + day;

  }

  onDateSelect2(date2: NgbDate) {
    var day: string = date2.day.toString()
    var month: string = date2.month.toString()
    var year: string = date2.year.toString()
    this.mus.attribut2 = year + "-" + month + "-" + day;
  }
  /** Get User Connected **/

  UserId: string;
  UserName: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserId = res.id;
      this.UserName = res.fullName;

    })

  }

  /* Create Musulman */

  mus: Musulman = new Musulman();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  Id: number;
  onSubmit(form: NgForm) {

    //if (form.invalid) {
    //  this.isValidFormSubmitted = false;

    //}
    //else {

      this.isValidFormSubmitted = true;
      this.mus.dateenreg = this.date;
      this.mus.idusercreator = this.UserId;
      this.mus.usernamecreator = this.UserName;
      this.musService.Create(this.mus).subscribe(res => {
        this.Id = res.id;
        /* Pass Files */

        this.pjPass.idmusulman = this.Id;
        this.pjPass.typefile = "الجواز"
        this.fileslistPass.forEach(item => {
          this.pjPass.paths = item;
          this.FilesService.Create(this.pjPass).subscribe(res => {

          })
        })
        /* Photo Files */


        this.pjPhoto.idmusulman = this.Id;
        this.pjPhoto.typefile = "الصورة"
        this.fileslistPhoto.forEach(item => {
          this.pjPhoto.paths = item;
          this.FilesService.Create(this.pjPhoto).subscribe(res => {

          })
        })
        /* Residence Files */


        this.pjResi.idmusulman = this.Id;
        this.pjResi.typefile = "الإقامة"
        this.fileslistResi.forEach(item => {
          this.pjResi.paths = item;
          this.FilesService.Create(this.pjResi).subscribe(res => {

          })
        })




        form.resetForm();
        this.toastr.success("تم التسجيل بنجاح", "نجاح")
        this.files1 = [];
        this.files2 = [];
        this.files3 = [];
      }, err => {
        this.toastr.error("  فشل في تسجيل	 ", "فشل")
      })
    //}
  }

  onSubmitOk() {

    this.toastr.success("تم التسجيل بنجاح", "نجاح")
  }
  //Files

  files1: File[] = [];
  onSelect(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  files2: File[] = [];
  onSelect2(event) {
    //console.log(event);
    this.files2.push(...event.addedFiles);
  }

  onRemove2(event) {
    this.files2.splice(this.files2.indexOf(event), 1);

  }


  files3: File[] = [];
  onSelect3(event) {
    //console.log(event);
    this.files3.push(...event.addedFiles);
  }

  onRemove3(event) {
    this.files3.splice(this.files2.indexOf(event), 1);

  }
  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pjPass: FilesMusulman = new FilesMusulman();
  public pjPhoto: FilesMusulman = new FilesMusulman();
  public pjResi: FilesMusulman = new FilesMusulman();

  public files: string[];

  //get List of Files

  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data

      }
    );

  }

  //Get file name for Database

  GetFileName() {
    let sa: string;
    let s: any;
    let finalres: any;
    let i: number = 0;
    let tlistnew: any[] = [];
    for (var k = 0; k < this.files.length; k++) {
      sa = <string>this.files[k]
      s = sa.toString().split('uploads\\,', sa.length - 1);
      finalres = s.toString().split('uploads\\', sa.length - 1);

      tlistnew[i] = finalres[1]
      i++;


    }


  }

  //Upload

  url: any;
  file: any;
  fileslistPass: string[] = [];
  public uploadPass(event) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                // this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          /// this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslistPass.push(this.file.name);

    }
  }

  fileslistPhoto: string[] = [];
  public uploadPhoto(event) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                // this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          /// this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslistPhoto.push(this.file.name);

    }
  }

  fileslistResi: string[] = [];
  public uploadResi(event) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                // this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          /// this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslistPhoto.push(this.file.name);

    }
  }
}
