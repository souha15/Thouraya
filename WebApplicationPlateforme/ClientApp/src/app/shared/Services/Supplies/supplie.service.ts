import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplie } from '../../Models/Supplies/supplie.model';

@Injectable({
  providedIn: 'root'
})
export class SupplieService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Supplie;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Supplie

  Add(Supplie: Supplie) {
    return this.http.post<Supplie>(this.rootURL + '/Supplies', Supplie, this.headers);
  }

  PutObservableE(Transaction: Supplie) {
    return this.http.put<Supplie>(this.rootURL + '/Supplies/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/Supplies', this.formData, this.headers);
  }

  //Get Supplie List

  Get(): Observable<Supplie[]> {
    return this.http.get<Supplie[]>(this.rootURL + '/Supplies');
  }

  //Get Supplie By Id

  GetById(Id) {
    return this.http.get<Supplie>(this.rootURL + '/Supplies/' + Id);
  }

  //Edit Supplie

  Edit() {
    return this.http.put(this.rootURL + '/Supplies/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Supplie

  Delete(id) {
    return this.http.delete(this.rootURL + '/Supplies/' + id);
  }

}

