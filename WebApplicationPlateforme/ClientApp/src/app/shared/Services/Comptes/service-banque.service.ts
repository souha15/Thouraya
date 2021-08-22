import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceBanque } from '../../Models/Comptes/service-banque.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceBanqueService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ServiceBanque
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create ServiceBanque

  Add(ServiceBanque: ServiceBanque) {
    return this.http.post<ServiceBanque>(this.rootURL + '/ServiceBanques', ServiceBanque, this.headers);
  }

  PutObservableE(Transaction: ServiceBanque) {
    return this.http.put<ServiceBanque>(this.rootURL + '/ServiceBanques/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/ServiceBanques', this.formData, this.headers);
  }

  //Get ServiceBanque List

  Get(): Observable<ServiceBanque[]> {
    return this.http.get<ServiceBanque[]>(this.rootURL + '/ServiceBanques');
  }

  //Get ServiceBanque By Id

  GetById(Id) {
    return this.http.get<ServiceBanque>(this.rootURL + '/ServiceBanques/' + Id);
  }

  //Edit ServiceBanque

  Edit() {
    return this.http.put(this.rootURL + '/ServiceBanques/' + this.formData.id, this.formData, this.headers);
  }


  //Delete ServiceBanque

  Delete(id) {
    return this.http.delete(this.rootURL + '/ServiceBanques/' + id);
  }
}
