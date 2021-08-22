import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChequesC } from '../../Models/Cheques/cheques-c.model';
@Injectable({
  providedIn: 'root'
})
export class ChequeCService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ChequesC
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create ChequesC

  Add(ChequesC: ChequesC) {
    return this.http.post<ChequesC>(this.rootURL + '/ChequeCs', ChequesC, this.headers);
  }

  PutObservableE(Transaction: ChequesC) {
    return this.http.put<ChequesC>(this.rootURL + '/ChequeCs/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/ChequeCs', this.formData, this.headers);
  }

  //Get ChequesC List

  Get(): Observable<ChequesC[]> {
    return this.http.get<ChequesC[]>(this.rootURL + '/ChequeCs');
  }

  //Get ChequesC By Id

  GetById(Id) {
    return this.http.get<ChequesC>(this.rootURL + '/ChequeCs/' + Id);
  }

  //Edit ChequesC

  Edit() {
    return this.http.put(this.rootURL + '/ChequeCs/' + this.formData.id, this.formData, this.headers);
  }


  //Delete ChequesC

  Delete(id) {
    return this.http.delete(this.rootURL + '/ChequeCs/' + id);
  }
}
