import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';
import { PiecesJointesAffectation } from '../../Models/AdministrativeCommunication/pieces-jointes-affectation.model';

@Injectable({
  providedIn: 'root'
})
export class PiecesJointesAffectationService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: PiecesJointesAffectation;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create PiecesJointesAffectation

  Create(PiecesJointesAffectation: PiecesJointesAffectation) {
    return this.http.post<PiecesJointesAffectation>(this.rootURL + '/PiecesJointesAffecteds', PiecesJointesAffectation, this.headers);
  }

  //Edit PiecesJointesAffectation
  Edit() {
    return this.http.put(this.rootURL + '/PiecesJointesAffecteds/' + this.formData.id, this.formData, this.headers);
  }

  // List PiecesJointesAffectation

  List(): Observable<PiecesJointesAffectation[]> {
    return this.http.get<PiecesJointesAffectation[]>(this.rootURL + '/PiecesJointesAffecteds');
  }

  //Delete PiecesJointesAffectation

  Delete(id) {
    return this.http.delete(this.rootURL + '/PiecesJointesAffecteds/' + id);
  }

  //Put PiecesJointesAffectation

  PutObservable(PiecesJointesAffectation: PiecesJointesAffectation, Id: number) {
    return this.http.put<PiecesJointesAffectation>(this.rootURL + '/PiecesJointesAffecteds/' + Id, PiecesJointesAffectation, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/PiecesJointesAffecteds/' + this.formData.id, this.formData, this.headers);
  }

  //Get PiecesJointesAffectation By Id

  GetById(Id) {
    return this.http.get<PiecesJointesAffectation>(this.rootURL + '/PiecesJointesAffecteds/' + Id);
  }
}
