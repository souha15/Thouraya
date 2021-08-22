import { Injectable } from '@angular/core';
import { PiecesJointesTr } from '../../Models/AdministrativeCommunication/pieces-jointes-tr.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PiecesJointesTrService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: PiecesJointesTr;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create PiecesJointesTr

  CreatePjTR(PiecesJointesTr: PiecesJointesTr) {
    return this.http.post<PiecesJointesTr>(this.rootURL + '/PiecesJointesTrs', PiecesJointesTr, this.headers);
  }

  //Edit PiecesJointesTr
  EditPjTR() {
    return this.http.put(this.rootURL + '/PiecesJointesTrs/' + this.formData.id, this.formData, this.headers);
  }

  // List PiecesJointesTr

  ListPjTR(): Observable<PiecesJointesTr[]> {
    return this.http.get<PiecesJointesTr[]>(this.rootURL + '/PiecesJointesTrs');
  }

  //Delete PiecesJointesTr

  DeletePjTR(id) {
    return this.http.delete(this.rootURL + '/PiecesJointesTrs/' + id);
  }

  //Put PiecesJointesTr

  PutObservablePjTR(PiecesJointesTr: PiecesJointesTr, Id: number) {
    return this.http.put<PiecesJointesTr>(this.rootURL + '/PiecesJointesTrs/' + Id, PiecesJointesTr, this.headers);
  }

  PutPjTR(Id) {
    return this.http.put(this.rootURL + '/PiecesJointesTrs/' + this.formData.id, this.formData, this.headers);
  }

  //Get PiecesJointesTr By Id

  GetByIdPjTR(Id) {
    return this.http.get<PiecesJointesTr>(this.rootURL + '/PiecesJointesTrs/' + Id);
  }


/*****/

  //Create PiecesJointesTr

  CreatePjTE(PiecesJointesTr: PiecesJointesTr) {
    return this.http.post<PiecesJointesTr>(this.rootURL + '/PiecesJointeEs', PiecesJointesTr, this.headers);
  }

  //Edit PiecesJointesTr
  EditPjTE() {
    return this.http.put(this.rootURL + '/PiecesJointeEs/' + this.formData.id, this.formData, this.headers);
  }

  // List PiecesJointesTr

  ListPjTE(): Observable<PiecesJointesTr[]> {
    return this.http.get<PiecesJointesTr[]>(this.rootURL + '/PiecesJointeEs');
  }

  //Delete PiecesJointesTr

  DeletePjTE(id) {
    return this.http.delete(this.rootURL + '/PiecesJointeEs/' + id);
  }

  //Put PiecesJointesTr

  PutObservablePjTE(PiecesJointesTr: PiecesJointesTr, Id: number) {
    return this.http.put<PiecesJointesTr>(this.rootURL + '/PiecesJointeEs/' + Id, PiecesJointesTr, this.headers);
  }

  PutPjTE(Id) {
    return this.http.put(this.rootURL + '/PiecesJointeEs/' + this.formData.id, this.formData, this.headers);
  }

  //Get PiecesJointesTr By Id

  GetByIdPjTE(Id) {
    return this.http.get<PiecesJointesTr>(this.rootURL + '/PiecesJointeEs/' + Id);
  }

/*****/

}
