import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Affectation } from '../../Models/AdministrativeCommunication/affectation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Affectation;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Affectation

  Create(Affectation: Affectation) {
    return this.http.post<Affectation>(this.rootURL + '/TrAffectations', Affectation, this.headers);
  }

  //Edit Affectation
  Edit() {
    return this.http.put(this.rootURL + '/TrAffectations/' + this.formData.id, this.formData, this.headers);
  }

  // List Affectation

  List(): Observable<Affectation[]> {
    return this.http.get<Affectation[]>(this.rootURL + '/TrAffectations');
  }

  //Delete Affectation

  Delete(id) {
    return this.http.delete(this.rootURL + '/TrAffectations/' + id);
  }

  //Put Affectation

  PutObservable(Affectation: Affectation, Id: number) {
    return this.http.put<Affectation>(this.rootURL + '/TrAffectations/' + Id, Affectation, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/TrAffectations/' + this.formData.id, this.formData, this.headers);
  }

  //Get Affectation By Id

  GetById(Id) {
    return this.http.get<Affectation>(this.rootURL + '/TrAffectations/' + Id);
  }


/******/
  //Create Affectation

  CreateE(Affectation: Affectation) {
    return this.http.post<Affectation>(this.rootURL + '/TeAffectations', Affectation, this.headers);
  }

  //Edit Affectation
  EditE() {
    return this.http.put(this.rootURL + '/TeAffectations/' + this.formData.id, this.formData, this.headers);
  }

  // List Affectation

  ListE(): Observable<Affectation[]> {
    return this.http.get<Affectation[]>(this.rootURL + '/TeAffectations');
  }

  //Delete Affectation

  DeleteE(id) {
    return this.http.delete(this.rootURL + '/TeAffectations/' + id);
  }

  //Put Affectation

  PutObservableE(Affectation: Affectation, Id: number) {
    return this.http.put<Affectation>(this.rootURL + '/TeAffectations/' + Id, Affectation, this.headers);
  }

  PutE(Id) {
    return this.http.put(this.rootURL + '/TeAffectations/' + this.formData.id, this.formData, this.headers);
  }

  //Get Affectation By Id

  GetByIdE(Id) {
    return this.http.get<Affectation>(this.rootURL + '/TeAffectations/' + Id);
  }
/*****/

  /******/
  //Create Affectation

  CreateI(Affectation: Affectation) {
    return this.http.post<Affectation>(this.rootURL + '/TiAffectations', Affectation, this.headers);
  }

  //Edit Affectation
  EditI() {
    return this.http.put(this.rootURL + '/TiAffectations/' + this.formData.id, this.formData, this.headers);
  }

  // List Affectation

  ListI(): Observable<Affectation[]> {
    return this.http.get<Affectation[]>(this.rootURL + '/TiAffectations');
  }

  //Delete Affectation

  DeleteI(id) {
    return this.http.delete(this.rootURL + '/TiAffectations/' + id);
  }

  //Put Affectation

  PutObservableI(Affectation: Affectation, Id: number) {
    return this.http.put<Affectation>(this.rootURL + '/TiAffectations/' + Id, Affectation, this.headers);
  }

  PutI(Id) {
    return this.http.put(this.rootURL + '/TiAffectations/' + this.formData.id, this.formData, this.headers);
  }

  //Get Affectation By Id

  GetByIdI(Id) {
    return this.http.get<Affectation>(this.rootURL + '/TiAffectations/' + Id);
  }
/*****/
}
