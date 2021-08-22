import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SuppEquipement } from '../../Models/ServiceRh/supp-equipement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuppEquipementService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: SuppEquipement;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create SuppEquipement

  Add(SuppEquipement: SuppEquipement) {
    return this.http.post<SuppEquipement>(this.rootURL + '/SuppEquipements', SuppEquipement, this.headers);
  }

  PutObservableE(Transaction: SuppEquipement) {
    return this.http.put<SuppEquipement>(this.rootURL + '/SuppEquipements/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/SuppEquipements', this.formData, this.headers);
  }

  //Get SuppEquipement List

  Get(): Observable<SuppEquipement[]> {
    return this.http.get<SuppEquipement[]>(this.rootURL + '/SuppEquipements');
  }

  //Get SuppEquipement By Id

  GetById(Id) {
    return this.http.get<SuppEquipement>(this.rootURL + '/SuppEquipements/' + Id);
  }

  //Edit SuppEquipement

  Edit() {
    return this.http.put(this.rootURL + '/SuppEquipements/' + this.formData.id, this.formData, this.headers);
  }


  //Delete SuppEquipement

  Delete(id) {
    return this.http.delete(this.rootURL + '/SuppEquipements/' + id);
  }
}
