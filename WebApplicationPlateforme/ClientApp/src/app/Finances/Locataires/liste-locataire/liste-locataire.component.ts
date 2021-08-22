import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocataireService } from '../../../shared/Services/Dotations/locataire.service';
import { ToastrService } from 'ngx-toastr';
import { Locataire } from '../../../shared/Models/Dotations/locataire.model';
import { NgForm } from '@angular/forms';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpEventType } from '@angular/common/http';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { PiecesJointesLocataire } from '../../../shared/Models/Dotations/pieces-jointes-locataire.model';

@Component({
  selector: 'app-liste-locataire',
  templateUrl: './liste-locataire.component.html',
  styleUrls: ['./liste-locataire.component.css']
})
export class ListeLocataireComponent implements OnInit {

  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  constructor(private locataireService: LocataireService,
    private toastr: ToastrService,
    private serviceupload: UploadDownloadService,
  ) { this.downloadStatus = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.resetForm();
    this.LocataireList();
    this.getAllPj();
  }

  list: Locataire[] = [];
  LocataireList() {
    this.locataireService.Get().subscribe(res => {
      this.list = res
    })
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.locataireService.Delete(Id)
        .subscribe(res => {
          this.LocataireList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }

  details: Locataire = new Locataire();
  populateForm(locataire: Locataire) {
    this.locataireService.formData = Object.assign({}, locataire)
    this.details = Object.assign({}, locataire);
    this.serviceupload.SearchL().subscribe(res => {
      this.listPj = res
      this.details = Object.assign({}, locataire);
      this.listPjFiltred = this.listPj.filter(item => item.idlocataire == this.details.id)
      console.log(this.listPjFiltred)
    })

  }

  editloc: Locataire = new Locataire();
  updateRecord(form: NgForm) {
    this.editloc = Object.assign(this.editloc, form.value);

    this.locataireService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      form.resetForm();
      this.LocataireList();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )
  }


  onSubmit(form: NgForm) {
    this.updateRecord(form)
  }


  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.locataireService.formData = {
      id: null,      
      nom:'',
      cin: '',
      profession: '',
      adresse: '',
      nationnalite: '',
      tel: '',
      attribut1: 0,
      attribut2: '',
      attribut3: '',
      attribue4: '',
      creatorName: '',
      idUserCreator: '',
      dateenreg: '',

    }

  }

  //Get the list of files

  listPj: PiecesJointesLocataire[] = [];
  listPjFiltred: PiecesJointesLocataire[] = [];

  getAllPj() {
    this.serviceupload.SearchL().subscribe(res => {
      this.listPj = res
      this.listPjFiltred = this.listPj.filter(item => item.idlocataire == this.details.id)
      console.log(this.listPjFiltred)
    })

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
