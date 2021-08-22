import { Injectable } from '@angular/core';
import { Reception } from '../../Models/AdministrativeCommunication/reception.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {
  
  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Reception;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }


  //Create Reception

  CreateReception(Reception: Reception) {
    return this.http.post<Reception>(this.rootURL + '/Receptioncs', Reception, this.headers);
  }

  //Edit Reception
  EditReception() {
    return this.http.put(this.rootURL + '/Receptioncs/' + this.formData.id, this.formData, this.headers);
  }

  // List Reception

  ListReception(): Observable<Reception[]> {
    return this.http.get<Reception[]>(this.rootURL + '/Receptioncs');
  }

  //Delete Reception

  DeleteReception(id) {
    return this.http.delete(this.rootURL + '/Receptioncs/' + id);
  }

  //Put Reception

  PutReceptioneObservable(Reception: Reception, Id: number) {
    return this.http.put<Reception>(this.rootURL + '/Receptioncs/' + Id, Reception, this.headers);
  }

  PutReception(Id) {
    return this.http.put(this.rootURL + '/Receptioncs/' + this.formData.id, this.formData, this.headers);
  }

  //Get Reception By Id

  GetById(Id) {
    return this.http.get<Reception>(this.rootURL + '/Receptioncs/' + Id);
  }


/******/
  //Create Reception

  CreateReceptionE(Reception: Reception) {
    return this.http.post<Reception>(this.rootURL + '/ReceptionEs', Reception, this.headers);
  }

  //Edit Reception
  EditReceptionE() {
    return this.http.put(this.rootURL + '/ReceptionEs/' + this.formData.id, this.formData, this.headers);
  }

  // List Reception

  ListReceptionE(): Observable<Reception[]> {
    return this.http.get<Reception[]>(this.rootURL + '/ReceptionEs');
  }

  //Delete Reception

  DeleteReceptionE(id) {
    return this.http.delete(this.rootURL + '/ReceptionEs/' + id);
  }

  //Put Reception

  PutReceptioneObservableE(Reception: Reception, Id: number) {
    return this.http.put<Reception>(this.rootURL + '/ReceptionEs/' + Id, Reception, this.headers);
  }

  PutReceptionE(Id) {
    return this.http.put(this.rootURL + '/ReceptionEs/' + this.formData.id, this.formData, this.headers);
  }

  //Get Reception By Id

  GetByIdE(Id) {
    return this.http.get<Reception>(this.rootURL + '/ReceptionEs/' + Id);
  }
/*******/


  //Create Reception

  CreateReceptionI(Reception: Reception) {
    return this.http.post<Reception>(this.rootURL + '/ReceptionIs', Reception, this.headers);
  }

  //Edit Reception
  EditReceptionI() {
    return this.http.put(this.rootURL + '/ReceptionIs/' + this.formData.id, this.formData, this.headers);
  }

  // List Reception

  ListReceptionI(): Observable<Reception[]> {
    return this.http.get<Reception[]>(this.rootURL + '/ReceptionIs');
  }

  //Delete Reception

  DeleteReceptionI(id) {
    return this.http.delete(this.rootURL + '/ReceptionIs/' + id);
  }

  //Put Reception

  PutReceptioneObservableI(Reception: Reception, Id: number) {
    return this.http.put<Reception>(this.rootURL + '/ReceptionIs/' + Id, Reception, this.headers);
  }

  PutReceptionI(Id) {
    return this.http.put(this.rootURL + '/ReceptionIs/' + this.formData.id, this.formData, this.headers);
  }

  //Get Reception By Id

  GetByIdI(Id) {
    return this.http.get<Reception>(this.rootURL + '/ReceptionIs/' + Id);
  }
  /*******/
}
