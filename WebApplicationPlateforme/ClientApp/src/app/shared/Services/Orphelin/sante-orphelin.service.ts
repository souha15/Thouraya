import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SanteOrphelin } from '../../Models/Orphelin/sante-orphelin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SanteOrphelinService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: SanteOrphelin
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create SanteOrphelin

  Add(SanteOrphelin: SanteOrphelin) {
    return this.http.post<SanteOrphelin>(this.rootURL + '/SanteOrphelins', SanteOrphelin, this.headers);
  }

  PutObservableE(Transaction: SanteOrphelin) {
    return this.http.put<SanteOrphelin>(this.rootURL + '/SanteOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/SanteOrphelins', this.formData, this.headers);
  }

  //Get SanteOrphelin List

  Get(): Observable<SanteOrphelin[]> {
    return this.http.get<SanteOrphelin[]>(this.rootURL + '/SanteOrphelins');
  }

  //Get SanteOrphelin By Id

  GetById(Id) {
    return this.http.get<SanteOrphelin>(this.rootURL + '/SanteOrphelins/' + Id);
  }

  //Edit SanteOrphelin

  Edit() {
    return this.http.put(this.rootURL + '/SanteOrphelins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete SanteOrphelin

  Delete(id) {
    return this.http.delete(this.rootURL + '/SanteOrphelins/' + id);
  }
}
