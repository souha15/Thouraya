import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PereOrphelin } from '../../Models/Orphelin/pere-orphelin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PereOrphelinService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: PereOrphelin;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create PereOrphelin

  Add(PereOrphelin: PereOrphelin) {
    return this.http.post<PereOrphelin>(this.rootURL + '/PereOrphelins', PereOrphelin, this.headers);
  }

  PutObservableE(Transaction: PereOrphelin) {
    return this.http.put<PereOrphelin>(this.rootURL + '/PereOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/PereOrphelins', this.formData, this.headers);
  }

  //Get PereOrphelin List

  Get(): Observable<PereOrphelin[]> {
    return this.http.get<PereOrphelin[]>(this.rootURL + '/PereOrphelins');
  }

  //Get PereOrphelin By Id

  GetById(Id) {
    return this.http.get<PereOrphelin>(this.rootURL + '/PereOrphelins/' + Id);
  }

  //Edit PereOrphelin

  Edit() {
    return this.http.put(this.rootURL + '/PereOrphelins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete PereOrphelin

  Delete(id) {
    return this.http.delete(this.rootURL + '/PereOrphelins/' + id);
  }
}
