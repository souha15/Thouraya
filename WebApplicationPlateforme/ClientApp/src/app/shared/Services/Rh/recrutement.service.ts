import { Injectable } from '@angular/core';
import { Recrutement } from '../../Models/RH/recrutement.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecrutementService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Recrutement;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: Recrutement) {
    return this.http.post<Recrutement>(this.rootURL + '/Recrutements', dotation, this.headers);
  }

  getDirList(id) {
    return this.http.get<Recrutement[]>(this.rootURL + '/RecrutementUsers/'+id);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/Recrutements', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<Recrutement[]> {
    return this.http.get<Recrutement[]>(this.rootURL + '/Recrutements');
  }

  Get() {
    return this.http.get<Recrutement[]>(this.rootURL + '/Recrutements');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<Recrutement>(this.rootURL + '/Recrutements/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/Recrutements/' + this.formData.id, this.formData, this.headers);
  }
  PutObservableE(Transaction: Recrutement) {
    return this.http.put<Recrutement>(this.rootURL + '/Recrutements/' + Transaction.id, Transaction, this.headers);

  }

  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/Recrutements/' + id);
  }


  GetByUserCreator(userId) {
    return this.http.get<Recrutement[]>(this.rootURL + '/Recrutements/GetByUserCreator/' + userId);
  }

  GetDemand(userId) {
    return this.http.get<Recrutement[]>(this.rootURL + '/Recrutements/GetDemand/' + userId);
  }

  GetHistorique(id) {
    return this.http.get<Recrutement>(this.rootURL + '/Recrutements/GetHistorique/' + id);
  }

  EditDemandByRole(Id: number, userEtat: string) {
    return this.http.get<Recrutement>(this.rootURL + '/Recrutements/EditDemandByRole/' + Id + '/' + userEtat, this.headers);

  }
}

