import { Component, OnInit } from '@angular/core';
import { Tache } from '../../shared/Models/Taches/tache.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TacheService } from '../../shared/Services/Taches/tache.service';
import { EvaluationService } from '../../shared/Services/Taches/evaluation.service';
@Component({
  selector: 'app-evaluated-task',
  templateUrl: './evaluated-task.component.html',
  styleUrls: ['./evaluated-task.component.css']
})
export class EvaluatedTaskComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private TacheService: TacheService,
    private evaluationService: EvaluationService) { }

  ngOnInit(): void {
    this.getIdUrl();
    this.getTaskDetails();

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
  rated: boolean = false;
  currentRate :number;
  getTaskDetails() {
    this.TacheService.GetById(this.TaskId).subscribe(res => {
      this.tache = res
      this.evaluationService.GetById(this.tache.id).subscribe(res => {
        if (res != null) {
          this.currentRate = +res.rating;
          this.rated = true;
        } else
          this.rated = false
      })


    })
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  //Calculate diffrence date

  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }

  etat: string;
  details: Tache = new Tache();
  populateForm(edittache: Tache) {
    this.TacheService.formData = Object.assign({}, edittache)
    this.etat = edittache.etat
    this.details = Object.assign({}, edittache);

  }
}
