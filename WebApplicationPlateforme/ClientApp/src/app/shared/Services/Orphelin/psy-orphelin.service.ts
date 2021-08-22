import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PsyOrphelin } from '../../Models/Orphelin/psy-orphelin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsyOrphelinService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: PsyOrphelin;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create PsyOrphelin

  Add(PsyOrphelin: PsyOrphelin) {
    return this.http.post<PsyOrphelin>(this.rootURL + '/PsyOrphelins', PsyOrphelin, this.headers);
  }

  PutObservableE(Transaction: PsyOrphelin) {
    return this.http.put<PsyOrphelin>(this.rootURL + '/PsyOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/PsyOrphelins', this.formData, this.headers);
  }

  //Get PsyOrphelin List

  Get(): Observable<PsyOrphelin[]> {
    return this.http.get<PsyOrphelin[]>(this.rootURL + '/PsyOrphelins');
  }

  //Get PsyOrphelin By Id

  GetById(Id) {
    return this.http.get<PsyOrphelin>(this.rootURL + '/PsyOrphelins/' + Id);
  }

  //Edit PsyOrphelin

  Edit() {
    return this.http.put(this.rootURL + '/PsyOrphelins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete PsyOrphelin

  Delete(id) {
    return this.http.delete(this.rootURL + '/PsyOrphelins/' + id);
  }
}
