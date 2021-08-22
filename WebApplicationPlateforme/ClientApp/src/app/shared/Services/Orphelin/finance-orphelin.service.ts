import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FinanceOrphelin } from '../../Models/Orphelin/finance-orphelin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceOrphelinService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FinanceOrphelin;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create FinanceOrphelin

  Add(FinanceOrphelin: FinanceOrphelin) {
    return this.http.post<FinanceOrphelin>(this.rootURL + '/FinanceOrphelins', FinanceOrphelin, this.headers);
  }

  PutObservableE(Transaction: FinanceOrphelin) {
    return this.http.put<FinanceOrphelin>(this.rootURL + '/FinanceOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/FinanceOrphelins', this.formData, this.headers);
  }

  //Get FinanceOrphelin List

  Get(): Observable<FinanceOrphelin[]> {
    return this.http.get<FinanceOrphelin[]>(this.rootURL + '/FinanceOrphelins');
  }

  //Get FinanceOrphelin By Id

  GetById(Id) {
    return this.http.get<FinanceOrphelin>(this.rootURL + '/FinanceOrphelins/' + Id);
  }

  //Edit FinanceOrphelin

  Edit() {
    return this.http.put(this.rootURL + '/FinanceOrphelins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete FinanceOrphelin

  Delete(id) {
    return this.http.delete(this.rootURL + '/FinanceOrphelins/' + id);
  }
}
