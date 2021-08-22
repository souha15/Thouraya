import { Injectable } from '@angular/core';
import { Liaison } from '../../Models/AdministrativeCommunication/liaison.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiaisonService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Liaison;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Liaison

  Create(Liaison: Liaison) {
    return this.http.post<Liaison>(this.rootURL + '/Liaisons', Liaison, this.headers);
  }

  //Edit Liaison
  Edit() {
    return this.http.put(this.rootURL + '/Liaisons/' + this.formData.id, this.formData, this.headers);
  }

  // List Liaison

  List(): Observable<Liaison[]> {
    return this.http.get<Liaison[]>(this.rootURL + '/Liaisons');
  }

  //Delete Liaison

  Delete(id) {
    return this.http.delete(this.rootURL + '/Liaisons/' + id);
  }

  //Put Liaison

  PutObservable(Liaison: Liaison, Id: number) {
    return this.http.put<Liaison>(this.rootURL + '/Liaisons/' + Id, Liaison, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/Liaisons/' + this.formData.id, this.formData, this.headers);
  }

  //Get Liaison By Id

  GetById(Id) {
    return this.http.get<Liaison>(this.rootURL + '/Liaisons/' + Id);
  }

/*********/

  //Create Liaison

  CreateE(Liaison: Liaison) {
    return this.http.post<Liaison>(this.rootURL + '/LiaisonEs', Liaison, this.headers);
  }

  //Edit Liaison
  EditE() {
    return this.http.put(this.rootURL + '/LiaisonEs/' + this.formData.id, this.formData, this.headers);
  }

  // List Liaison

  ListE(): Observable<Liaison[]> {
    return this.http.get<Liaison[]>(this.rootURL + '/LiaisonEs');
  }

  //Delete Liaison

  DeleteE(id) {
    return this.http.delete(this.rootURL + '/LiaisonEs/' + id);
  }

  //Put Liaison

  PutObservableE(Liaison: Liaison, Id: number) {
    return this.http.put<Liaison>(this.rootURL + '/LiaisonEs/' + Id, Liaison, this.headers);
  }

  PutE(Id) {
    return this.http.put(this.rootURL + '/LiaisonEs/' + this.formData.id, this.formData, this.headers);
  }

  //Get Liaison By Id

  GetByIdE(Id) {
    return this.http.get<Liaison>(this.rootURL + '/LiaisonEs/' + Id);
  }

/*********/

  /*********/

  //Create Liaison

  CreateI(Liaison: Liaison) {
    return this.http.post<Liaison>(this.rootURL + '/LiaisonIs', Liaison, this.headers);
  }

  //Edit Liaison
  EditI() {
    return this.http.put(this.rootURL + '/LiaisonIs/' + this.formData.id, this.formData, this.headers);
  }

  // List Liaison

  ListI(): Observable<Liaison[]> {
    return this.http.get<Liaison[]>(this.rootURL + '/LiaisonIs');
  }

  //Delete Liaison

  DeleteI(id) {
    return this.http.delete(this.rootURL + '/LiaisonIs/' + id);
  }

  //Put Liaison

  PutObservableI(Liaison: Liaison, Id: number) {
    return this.http.put<Liaison>(this.rootURL + '/LiaisonIs/' + Id, Liaison, this.headers);
  }

  PutI(Id) {
    return this.http.put(this.rootURL + '/LiaisonIs/' + this.formData.id, this.formData, this.headers);
  }

  //Get Liaison By Id

  GetByIdI(Id) {
    return this.http.get<Liaison>(this.rootURL + '/LiaisonIs/' + Id);
  }

/*********/
}

