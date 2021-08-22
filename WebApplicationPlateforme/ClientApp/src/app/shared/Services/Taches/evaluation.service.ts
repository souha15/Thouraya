import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evaluation } from '../../Models/Taches/evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Evaluation;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Evaluation
  CreateEvaluation(evaluation: Evaluation) {
    return this.http.post<Evaluation>(this.rootURL + '/Evaluations', evaluation, this.headers);
  }

  GetById(Id) {
    return this.http.get<Evaluation>(this.rootURL + '/Evaluations/' + Id);
  }
}
