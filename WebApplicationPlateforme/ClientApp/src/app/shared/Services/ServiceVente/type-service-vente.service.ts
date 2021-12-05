import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbListening } from '../../Models/Evenements/tb-listening.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeTypeServiceVenteservice {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TbListening;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create TbListening

  Add(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeServiceVentes', TbListening, this.headers);
  }

  PutObservableE(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeServiceVentes/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/TypeServiceVentes', this.formData, this.headers);
  }

  //Get TbListening List

  Get(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeServiceVentes');
  }

  //Get TbListening By Id

  GetById(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeServiceVentes/' + Id);
  }

  //Edit TbListening

  Edit() {
    return this.http.put(this.rootURL + '/TypeServiceVentes/' + this.formData.id, this.formData, this.headers);
  }


  //Delete TbListening

  Delete(id) {
    return this.http.delete(this.rootURL + '/TypeServiceVentes/' + id);
  }
}
