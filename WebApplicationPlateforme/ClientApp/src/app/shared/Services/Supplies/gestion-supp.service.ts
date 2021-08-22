import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { GestionSupp } from '../../Models/Supplies/gestion-supp.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionSuppService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: GestionSupp;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create GestionSupp

  Add(GestionSupp: GestionSupp) {
    return this.http.post<GestionSupp>(this.rootURL + '/GestionSupplies', GestionSupp, this.headers);
  }

  PutObservableE(Transaction: GestionSupp) {
    return this.http.put<GestionSupp>(this.rootURL + '/GestionSupplies/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/GestionSupplies', this.formData, this.headers);
  }

  //Get GestionSupp List

  Get(): Observable<GestionSupp[]> {
    return this.http.get<GestionSupp[]>(this.rootURL + '/GestionSupplies');
  }

  //Get GestionSupp By Id

  GetById(Id) {
    return this.http.get<GestionSupp>(this.rootURL + '/GestionSupplies/' + Id);
  }

  //Edit GestionSupp

  Edit() {
    return this.http.put(this.rootURL + '/GestionSupplies/' + this.formData.id, this.formData, this.headers);
  }


  //Delete GestionSupp

  Delete(id) {
    return this.http.delete(this.rootURL + '/GestionSupplies/' + id);
  }

}

