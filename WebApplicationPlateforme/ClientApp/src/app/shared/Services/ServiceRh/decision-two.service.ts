import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DecisionTwo } from '../../Models/ServiceRh/decision-two.model';
import { Observable } from 'rxjs';

export class FilesDecisionTwoes {
  id: number;
  path: string;
  idDecision: number;

}
@Injectable({
  providedIn: 'root'
})
export class DecisionTwoService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: DecisionTwo;
  formDataFiles: FilesDecisionTwoes;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create DecisionTwo

  Add(DecisionTwo: DecisionTwo) {
    return this.http.post<DecisionTwo>(this.rootURL + '/DecisionTwoes', DecisionTwo, this.headers);
  }

  PutObservableE(Transaction: DecisionTwo) {
    return this.http.put<DecisionTwo>(this.rootURL + '/DecisionTwoes/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/DecisionTwoes', this.formData, this.headers);
  }

  //Get DecisionTwo List

  Get(): Observable<DecisionTwo[]> {
    return this.http.get<DecisionTwo[]>(this.rootURL + '/DecisionTwoes', this.headers);
  }

  //Get DecisionTwo For Userf

  GetDecision(iduser) {
    return this.http.get<boolean>(this.rootURL + '/DecisionTwoes/GetDecision/' + iduser, this.headers);
  }

  TestDecision(UserId,adminId) {
    return this.http.get<string>(this.rootURL + '/DecisionTwoes/TestDecision/' + UserId + '/' +  adminId, this.headers);
  }


  DecisionGetByAdmin(idadmin) {
    return this.http.get<boolean>(this.rootURL + '/DecisionTwoes/DecisionGetByAdmin/' + idadmin, this.headers);
  }

  DecisionGetAllAdmin() {
    return this.http.get<boolean>(this.rootURL + '/DecisionTwoes/DecisionGetAllAdmin');
  }

  //Get DecisionTwo By Id

  GetById(Id) {
    return this.http.get<DecisionTwo>(this.rootURL + '/DecisionTwoes/' + Id);
  }

  //Edit DecisionTwo

  Edit() {
    return this.http.put(this.rootURL + '/DecisionTwoes/' + this.formData.id, this.formData, this.headers);
  }


  //Delete DecisionTwo

  Delete(id) {
    return this.http.delete(this.rootURL + '/DecisionTwoes/' + id);
  }


  //FilesDecisionTwo

  AddFD(DecisionTwo: FilesDecisionTwoes) {
    return this.http.post<FilesDecisionTwoes>(this.rootURL + '/FilesDecisionTwoes', DecisionTwo, this.headers);
  }

  PutObservableEFD(Transaction: FilesDecisionTwoes) {
    return this.http.put<FilesDecisionTwoes>(this.rootURL + '/FilesDecisionTwoes/' + Transaction.id, Transaction, this.headers);

  }
  PostFD() {
    return this.http.post(this.rootURL + '/FilesDecisionTwoes', this.formDataFiles, this.headers);
  }

  //Get DecisionTwo List

  GetFD(): Observable<FilesDecisionTwoes[]> {
    return this.http.get<FilesDecisionTwoes[]>(this.rootURL + '/FilesDecisionTwoes');
  }

  //Get DecisionTwo For Userf

  GetFileByDecisionFD(idDecision) {
    return this.http.get<FilesDecisionTwoes[]>(this.rootURL + '/FilesDecisionTwoes/GetFileByDecisionFD/' + idDecision );
  }

  //Get DecisionTwo By Id

  GetByIdFD(Id) {
    return this.http.get<FilesDecisionTwoes>(this.rootURL + '/FilesDecisionTwoes/' + Id);
  }

  //Edit DecisionTwo

  EditFD() {
    return this.http.put(this.rootURL + '/FilesDecisionTwoes/' + this.formDataFiles.id, this.formDataFiles, this.headers);
  }


  //Delete DecisionTwo

  DeleteFD(id) {
    return this.http.delete(this.rootURL + '/FilesDecisionTwoes/' + id);
  }
}
