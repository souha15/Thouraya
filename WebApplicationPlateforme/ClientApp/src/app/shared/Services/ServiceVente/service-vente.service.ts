import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceVente } from '../../Models/ServiceVente/service-vente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceVenteervice {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ServiceVente;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create ServiceVente

  Add(ServiceVente: ServiceVente) {
    return this.http.post<ServiceVente>(this.rootURL + '/ServiceVentes', ServiceVente, this.headers);
  }

  PutObservableE(Transaction: ServiceVente) {
    return this.http.put<ServiceVente>(this.rootURL + '/ServiceVentes/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/ServiceVentes', this.formData, this.headers);
  }

  //Get ServiceVente List

  Get(): Observable<ServiceVente[]> {
    return this.http.get<ServiceVente[]>(this.rootURL + '/ServiceVentes');
  }

  //Get ServiceVente By Id

  GetById(Id) {
    return this.http.get<ServiceVente>(this.rootURL + '/ServiceVentes/' + Id);
  }

  //Edit ServiceVente

  Edit() {
    return this.http.put(this.rootURL + '/ServiceVentes/' + this.formData.id, this.formData, this.headers);
  }


  //Delete ServiceVente

  Delete(id) {
    return this.http.delete(this.rootURL + '/ServiceVentes/' + id);
  }
}
