import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeImpression } from '../../../Models/MediaCenter/ImpressionDesign/type-impression.model';

@Injectable({
  providedIn: 'root'
})
export class TypeImpressionService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TypeImpression;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: TypeImpression) {
    return this.http.put<TypeImpression>(this.rootURL + '/TypeImpressions/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  Create(tache: TypeImpression) {
    return this.http.post<TypeImpression>(this.rootURL + '/TypeImpressions', tache, this.headers);
  }

  //Edit Cadeaux
  Edit() {
    return this.http.put(this.rootURL + '/TypeImpressions/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  List(): Observable<TypeImpression[]> {
    return this.http.get<TypeImpression[]>(this.rootURL + '/TypeImpressions');
  }

  //Delete Cadeaux

  Delete(id) {
    return this.http.delete(this.rootURL + '/TypeImpressions/' + id);
  }

  //Put Cadeaux


  Put(Id) {
    return this.http.put(this.rootURL + '/TypeImpressions/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetById(Id) {
    return this.http.get<TypeImpression>(this.rootURL + '/TypeImpressions/' + Id);
  }
}
