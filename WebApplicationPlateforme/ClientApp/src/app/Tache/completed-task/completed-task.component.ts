import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TacheService } from '../../shared/Services/Taches/tache.service';
import { Tache } from '../../shared/Models/Taches/tache.model';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { EvaluationService } from '../../shared/Services/Taches/evaluation.service';
import { Evaluation } from '../../shared/Models/Taches/evaluation.model';
import { ToastrService } from 'ngx-toastr';
import { PiecesJointes } from '../../shared/Models/Taches/pieces-jointes.model';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { HttpEventType } from '@angular/common/http';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.css']
})
export class CompletedTaskComponent implements OnInit {

  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private TacheService: TacheService,
    private UserService: UserServiceService,
    private evaluationService: EvaluationService,
    private toastr: ToastrService,
    private serviceupload: UploadDownloadService) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getIdUrl();
    this.getTaskDetails();
    this.getUserConnected();
    this.getAllPj();

  }

  //get id in URl
  TaskId: number;
  tache: Tache = new Tache();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.TaskId = params['id']
    });


  }

  // getTask
  getTaskDetails() {
    this.TacheService.GetById(this.TaskId).subscribe(res => {
      this.tache = res

    })
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  //Test Rating
  rating: number = 0;
  onSelect(event) {
    if (event.target.checked) {
      this.rating = this.rating + 1.25;

    }
    else
      this.rating = this.rating - 1.25;

  }

  // Get User Connected
  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }

  //Create Evaluation

  evaluation: Evaluation = new Evaluation();
  Createdevaluation: Evaluation = new Evaluation();
  date = Date.now();
  CurrentDate = new Date(this.date)
  chec: boolean;
  onSubmit(form: NgForm) {

    if (this.tache.etat == "منجزة") {
      this.evaluation.IdTache = this.tache.id;
    this.evaluation.IdUserEvaluating = this.UserIdConnected;
    this.evaluation.rating = this.rating.toString();
    this.evaluation.NomUserEvaluated = this.tache.createur;
    this.evaluation.dateTime = this.CurrentDate;
    this.evaluation.id = this.tache.id;
    this.evaluationService.CreateEvaluation(this.evaluation).subscribe(
      (res: any) => {
        this.Createdevaluation = res
        form.resetForm();
        this.chec = false;
        this.toastr.success("تم تقييم المهمة بنجاح", " تقييم المهمة");
      },
      err => {
        this.toastr.error("وقع تقييم المهمة مسبقا", " تقييم المهمة")
      }
    )
    } else {
      this.toastr.error(" المهمة تحت الإجراء أو غير منجزة", " تقييم المهمة")
    }

  }


  //Get the list of files

  listPj: PiecesJointes[] = [];
  listPjFiltred: PiecesJointes[] = [];

  getAllPj() {
    this.serviceupload.Search().subscribe(res => {
      this.listPj = res
      this.listPjFiltred = this.listPj.filter(item => item.idTache == this.TaskId)
   
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
