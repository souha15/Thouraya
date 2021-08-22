import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TalenOrphelin } from '../../Models/Orphelin/talen-orphelin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TalentOrphelinService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TalenOrphelin
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create TalenOrphelin

  Add(TalenOrphelin: TalenOrphelin) {
    return this.http.post<TalenOrphelin>(this.rootURL + '/TalentOrphelins', TalenOrphelin, this.headers);
  }

  PutObservableE(Transaction: TalenOrphelin) {
    return this.http.put<TalenOrphelin>(this.rootURL + '/TalentOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/TalentOrphelins', this.formData, this.headers);
  }

  //Get TalenOrphelin List

  Get(): Observable<TalenOrphelin[]> {
    return this.http.get<TalenOrphelin[]>(this.rootURL + '/TalentOrphelins');
  }

  //Get TalenOrphelin By Id

  GetById(Id) {
    return this.http.get<TalenOrphelin>(this.rootURL + '/TalentOrphelins/' + Id);
  }

  //Edit TalenOrphelin

  Edit() {
    return this.http.put(this.rootURL + '/TalentOrphelins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete TalenOrphelin

  Delete(id) {
    return this.http.delete(this.rootURL + '/TalentOrphelins/' + id);
  }
}
