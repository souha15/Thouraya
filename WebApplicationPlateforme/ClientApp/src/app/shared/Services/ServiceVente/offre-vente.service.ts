import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OffreVente } from '../../Models/ServiceVente/offre-vente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreVenteService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: OffreVente;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create OffreVente

  Add(OffreVente: OffreVente) {
    return this.http.post<OffreVente>(this.rootURL + '/OffreVentes', OffreVente, this.headers);
  }

  PutObservableE(Transaction: OffreVente) {
    return this.http.put<OffreVente>(this.rootURL + '/OffreVentes/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/OffreVentes', this.formData, this.headers);
  }

  //Get OffreVente List

  Get(): Observable<OffreVente[]> {
    return this.http.get<OffreVente[]>(this.rootURL + '/OffreVentes');
  }

  //Get OffreVente By Id

  GetById(Id) {
    return this.http.get<OffreVente>(this.rootURL + '/OffreVentes/' + Id);
  }

  //Edit OffreVente

  Edit() {
    return this.http.put(this.rootURL + '/OffreVentes/' + this.formData.id, this.formData, this.headers);
  }


  //Delete OffreVente

  Delete(id) {
    return this.http.delete(this.rootURL + '/OffreVentes/' + id);
  }
}
