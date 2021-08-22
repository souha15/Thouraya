import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';
import { SalaireD } from '../../Models/Salaire/salaire-d.model';

@Injectable({
  providedIn: 'root'
})
export class SalaireDService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: SalaireD;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create SalaireD

  Add(SalaireD: SalaireD) {
    return this.http.post<SalaireD>(this.rootURL + '/SalaireDs', SalaireD, this.headers);
  }

  PutObservableE(Transaction: SalaireD) {
    return this.http.put<SalaireD>(this.rootURL + '/SalaireDs/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/SalaireDs', this.formData, this.headers);
  }

  //Get SalaireD List

  Get(): Observable<SalaireD[]> {
    return this.http.get<SalaireD[]>(this.rootURL + '/SalaireDs');
  }

  //Get SalaireD By Id

  GetById(Id) {
    return this.http.get<SalaireD>(this.rootURL + '/SalaireDs/' + Id);
  }

  //Edit SalaireD

  Edit() {
    return this.http.put(this.rootURL + '/SalaireDs/' + this.formData.id, this.formData, this.headers);
  }


  //Delete SalaireD

  Delete(id) {
    return this.http.delete(this.rootURL + '/SalaireDs/' + id);
  }
}
