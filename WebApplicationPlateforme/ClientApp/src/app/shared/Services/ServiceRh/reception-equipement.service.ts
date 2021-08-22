import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReceptionEquipement } from '../../Models/ServiceRh/reception-equipement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionEquipementService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ReceptionEquipement;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create ReceptionEquipement

  Add(ReceptionEquipement: ReceptionEquipement) {
    return this.http.post<ReceptionEquipement>(this.rootURL + '/ReceptionEquipements', ReceptionEquipement, this.headers);
  }

  PutObservableE(Transaction: ReceptionEquipement) {
    return this.http.put<ReceptionEquipement>(this.rootURL + '/ReceptionEquipements/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/ReceptionEquipements', this.formData, this.headers);
  }

  //Get ReceptionEquipement List

  Get(): Observable<ReceptionEquipement[]> {
    return this.http.get<ReceptionEquipement[]>(this.rootURL + '/ReceptionEquipements');
  }

  //Get ReceptionEquipement By Id

  GetById(Id) {
    return this.http.get<ReceptionEquipement>(this.rootURL + '/ReceptionEquipements/' + Id);
  }

  //Edit ReceptionEquipement

  Edit() {
    return this.http.put(this.rootURL + '/ReceptionEquipements/' + this.formData.id, this.formData, this.headers);
  }


  //Delete ReceptionEquipement

  Delete(id) {
    return this.http.delete(this.rootURL + '/ReceptionEquipements/' + id);
  }
}
