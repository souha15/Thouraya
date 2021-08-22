import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubventionOrphelin } from '../../Models/Orphelin/subvention-orphelin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubventionOrphelinService {
  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: SubventionOrphelin;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create SubventionOrphelin

  Add(SubventionOrphelin: SubventionOrphelin) {
    return this.http.post<SubventionOrphelin>(this.rootURL + '/SubventionOrphelins', SubventionOrphelin, this.headers);
  }

  PutObservableE(Transaction: SubventionOrphelin) {
    return this.http.put<SubventionOrphelin>(this.rootURL + '/SubventionOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/SubventionOrphelins', this.formData, this.headers);
  }

  //Get SubventionOrphelin List

  Get(): Observable<SubventionOrphelin[]> {
    return this.http.get<SubventionOrphelin[]>(this.rootURL + '/SubventionOrphelins');
  }

  //Get SubventionOrphelin By Id

  GetById(Id) {
    return this.http.get<SubventionOrphelin>(this.rootURL + '/SubventionOrphelins/' + Id);
  }

  //Edit SubventionOrphelin

  Edit() {
    return this.http.put(this.rootURL + '/SubventionOrphelins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete SubventionOrphelin

  Delete(id) {
    return this.http.delete(this.rootURL + '/SubventionOrphelins/' + id);
  }
}
