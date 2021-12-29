import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbListening } from '../../Models/Evenements/tb-listening.model';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllTypeMaintenanceService {
  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TbListening
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  // 

  Add(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/allMaintenanceTypes', TbListening, this.headers);
  }

  PutObservableE(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/allMaintenanceTypes/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/allMaintenanceTypes', this.formData, this.headers);
  }


  Get(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/allMaintenanceTypes');
  }


  GetById(Id) {
    return this.http.get<TbListening>(this.rootURL + '/allMaintenanceTypes/' + Id);
  }


  Edit() {
    return this.http.put(this.rootURL + '/allMaintenanceTypes/' + this.formData.id, this.formData, this.headers);
  }

  Delete(id) {
    return this.http.delete(this.rootURL + '/allMaintenanceTypes/' + id);
  }
}
