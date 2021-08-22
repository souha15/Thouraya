import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { PointageEmp } from '../../shared/Models/VointageViaEmp/pointage-emp.model';
import { PointageEmpEmpService } from '../../shared/Services/PointageViaEmp/pointage-emp.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';

@Component({
  selector: 'app-add-pointage-emp',
  templateUrl: './add-pointage-emp.component.html',
  styleUrls: ['./add-pointage-emp.component.css']
})
export class AddPointageEmpComponent implements OnInit {
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private viaempService: PointageEmpEmpService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    public serviceupload: UploadDownloadService, ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getFiles();
    this.getListEmp();
  }
  listdate: PointageEmp[] = [];
  listdate2: PointageEmp[] = [];
  date = new Date().toLocaleDateString();
  presenceTest: boolean = false;
  getdate() {
    this.viaempService.Get().subscribe(res => {
      this.listdate = res
      this.listdate2 = this.listdate.filter(x => x.date == this.date)
      if (this.listdate2.length == 0) {
        this.presenceTest = true;
      } else {
        this.presenceTest = false;
      }
    })
  }
  listdate4: PointageEmp[] = [];
  listdate3: PointageEmp[] = [];
  DepartTest: boolean = false;
  getdateDepart() {
    this.viaempService.Get().subscribe(res => {
      this.listdate4 = res
      this.listdate3 = this.listdate4.filter(x => x.date == this.date && x.heurePartir == null && x.heureAssister != null)
      if (this.listdate3.length > 0) {
        this.DepartTest = true;
      } else {
        this.DepartTest = false;
      }
    })
  }
  listdate5: PointageEmp[] = [];
  listdate6: PointageEmp[] = [];
  TwoTest: boolean = false;
  getdateTwo() {
    this.viaempService.Get().subscribe(res => {
      this.listdate5 = res
      this.listdate6 = this.listdate5.filter(x => x.date == this.date && x.heurePartir != null && x.heureAssister != null)
      if (this.listdate6.length > 0) {
        this.TwoTest = true;
      } else {
        this.TwoTest = false;
      }
    })
  }
  private selectedLink: string;

  setradio(e: string): void {

    this.selectedLink = e;
    if (this.selectedLink == "presence") {
      this.getdate()
    }

    if (this.selectedLink == "depart") {
      this.getdateDepart();
    }

    if (this.selectedLink == "two") {
      this.getdateTwo();
    }


  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }
  empList: PointageEmp[] = [];
  empListFile: PointageEmp[] = [];
  Submit() {
    this.viaempService.downloadFile(this.FileName).subscribe(res => {
      this.tableshow = true;
      this.viaempService.Get().subscribe(res => {
        this.empList = res;
        this.empListFile = this.empList.filter(item => item.attribut1 == this.FileName)

      })
    })


  }

  submit2() {

    this.viaempService.downloadFilePrensence(this.FileName).subscribe(res => {
      this.tableshow = true;
      this.viaempService.Get().subscribe(res => {
        this.empList = res;
        this.empListFile = this.empList.filter(item => item.attribut1 == this.FileName)

      })
    })
  }
  submit3() {

    this.viaempService.downloadFile(this.FileName).subscribe(res => {
      this.tableshow = true;
      for (var i = 0; i < this.listdate3.length; i++) {
        this.viaempService.Delete(this.listdate3[i].id).subscribe(res => {

        })
      }
      this.viaempService.Get().subscribe(res => {
        this.empList = res;
        this.listdate3 = this.empList.filter(item => item.attribut1 == this.FileName)

      })
    })
  }
  tableshow: boolean = false;
  getListEmp() {
    this.viaempService.Get().subscribe(res => {
      this.empList = res;
    })
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

  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;

  public files: string[];

  //get List of Files

  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data

      }
    );

  }
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
  //Save it ToDatabase
  Idtransaction: number;
  url: any;
  file: any;
  fileslist: string[] = [];
  FileName: string;
  public upload(event) {
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
            //    this.GetFileName();



          }

        },

        error => {
          /// this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );

      this.FileName = this.file.name;
      console.log(this.FileName)

    }
  }
}
