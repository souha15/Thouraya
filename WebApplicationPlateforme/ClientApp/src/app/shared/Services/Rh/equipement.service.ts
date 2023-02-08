import { Injectable } from '@angular/core';
import { Equipement } from '../../Models/RH/equipement.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Equipement;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: Equipement) {
    return this.http.post<Equipement>(this.rootURL + '/Equipements', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/Equipements', this.formData, this.headers);
  }
  PutObservableE(Transaction: Equipement) {
    return this.http.put<Equipement>(this.rootURL + '/Equipements/' + Transaction.id, Transaction, this.headers);

  }
  //Save Type Dotation
  GetByUser(id) {
    return this.http.get<Equipement[]>(this.rootURL + '/EquipementByUserCreator/'+id);
  }

  //Get Type dotation List

  GetDotation(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(this.rootURL + '/Equipements');
  }

  Get() {
    return this.http.get<Equipement[]>(this.rootURL + '/Equipements');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<Equipement>(this.rootURL + '/Equipements/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/Equipements/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/Equipements/' + id);
  }

  GetEquipementByUserCreator(userId) {
    return this.http.get<Equipement[]>(this.rootURL + '/Equipements/GetEquipementByUserCreator/' + userId);
  }

  GetEquipementDemand(userId) {
    return this.http.get<Equipement[]>(this.rootURL + '/Equipements/GetEquipementDemand/' + userId);
  }

  GetEquipementHistorique(id) {
    return this.http.get<Equipement>(this.rootURL + '/Equipements/GetEquipementHistorique/' + id);
  }

  EditDemandByRole(Id: number, userEtat: string) {
    return this.http.get<Equipement>(this.rootURL + '/Equipements/EditDemandByRole/' + Id + '/' + userEtat, this.headers);

  }
}
