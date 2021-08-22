import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GestBen } from '../../Models/GestBen/gest-ben.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestBenService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: GestBen;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: GestBen) {
    return this.http.put<GestBen>(this.rootURL + '/GestionBenenficiaires/' + Transaction.id, Transaction, this.headers);

  }
  //Create GestBen

  CreateGestBen(tache: GestBen) {
    return this.http.post<GestBen>(this.rootURL + '/GestionBenenficiaires', tache, this.headers);
  }

  //Edit GestBen
  EditGestBen() {
    return this.http.put(this.rootURL + '/GestionBenenficiaires/' + this.formData.id, this.formData, this.headers);
  }

  // List GestBen

  ListGestBen(): Observable<GestBen[]> {
    return this.http.get<GestBen[]>(this.rootURL + '/GestionBenenficiaires');
  }

  //Delete GestBen

  DeleteGestBen(id) {
    return this.http.delete(this.rootURL + '/GestionBenenficiaires/' + id);
  }

  //Put GestBen

  PutGestBenObservable(tache: GestBen, Id: number) {
    return this.http.put<GestBen>(this.rootURL + '/GestionBenenficiaires/' + Id, tache, this.headers);
  }

  PutGestBen(Id) {
    return this.http.put(this.rootURL + '/GestionBenenficiaires/' + this.formData.id, this.formData, this.headers);
  }

  //Get GestBen By Id

  GetById(Id) {
    return this.http.get<GestBen>(this.rootURL + '/GestionBenenficiaires/' + Id);
  }
}
