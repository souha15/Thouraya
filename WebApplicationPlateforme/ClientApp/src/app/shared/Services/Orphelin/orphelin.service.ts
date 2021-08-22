import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Orphelin } from '../../Models/Orphelin/orphelin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrphelinService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Orphelin;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Orphelin

  Add(Orphelin: Orphelin) {
    return this.http.post<Orphelin>(this.rootURL + '/Orphelins', Orphelin, this.headers);
  }

  PutObservableE(Transaction: Orphelin) {
    return this.http.put<Orphelin>(this.rootURL + '/Orphelins/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/Orphelins', this.formData, this.headers);
  }

  //Get Orphelin List

  Get(): Observable<Orphelin[]> {
    return this.http.get<Orphelin[]>(this.rootURL + '/Orphelins');
  }

  //Get Orphelin By Id

  GetById(Id) {
    return this.http.get<Orphelin>(this.rootURL + '/Orphelins/' + Id);
  }

  //Edit Orphelin

  Edit() {
    return this.http.put(this.rootURL + '/Orphelins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Orphelin

  Delete(id) {
    return this.http.delete(this.rootURL + '/Orphelins/' + id);
  }
}
