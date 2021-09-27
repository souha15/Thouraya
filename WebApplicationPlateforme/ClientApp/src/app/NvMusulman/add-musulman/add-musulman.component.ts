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
  selector: 'app-add-musulman',
  templateUrl: './add-musulman.component.html',
  styleUrls: ['./add-musulman.component.css']
})
export class AddMusulmanComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private musService: MusulmanService,
    public serviceupload: UploadDownloadService,
    private toastr: ToastrService,
    private FilesService: FilesmusulmanService,
    private UserService: UserServiceService)
  { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getUserConnected();
    this.getFiles();
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
 
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true;
      this.mus.dateenreg = this.date;
      this.mus.idusercreator = this.UserId;
      this.mus.usernamecreator = this.UserName;
      this.musService.Create(this.mus).subscribe(res => {
        this.Id = res.id;
        /* Pass Files */
        
        this.pjPass.idmusulman = this.Id;
        this.pjPass.typefile ="الجواز"
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
        this.files3= [];
      }, err => {
          this.toastr.error("  فشل في تسجيل	 ", "فشل")
      })
    }
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
