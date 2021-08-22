import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { TypeStockage } from '../../Models/Gestion Stock/type-stockage.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeStockageService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TypeStockage;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: TypeStockage) {
    return this.http.put<TypeStockage>(this.rootURL + '/TypeStockages/' + Transaction.id, Transaction, this.headers);

  }
  //Create TypeStockage

  CreateTypeStockage(tache: TypeStockage) {
    return this.http.post<TypeStockage>(this.rootURL + '/TypeStockages', tache, this.headers);
  }

  //Edit TypeStockage
  EditTypeStockage() {
    return this.http.put(this.rootURL + '/TypeStockages/' + this.formData.id, this.formData, this.headers);
  }

  // List TypeStockage

  ListTypeStockage(): Observable<TypeStockage[]> {
    return this.http.get<TypeStockage[]>(this.rootURL + '/TypeStockages');
  }

  //Delete TypeStockage

  DeleteTypeStockage(id) {
    return this.http.delete(this.rootURL + '/TypeStockages/' + id);
  }

  //Put TypeStockage

  PutTypeStockageObservable(tache: TypeStockage, Id: number) {
    return this.http.put<TypeStockage>(this.rootURL + '/TypeStockages/' + Id, tache, this.headers);
  }

  PutTypeStockage(Id) {
    return this.http.put(this.rootURL + '/TypeStockages/' + this.formData.id, this.formData, this.headers);
  }

  //Get TypeStockage By Id

  GetById(Id) {
    return this.http.get<TypeStockage>(this.rootURL + '/TypeStockages/' + Id);
  }
}
