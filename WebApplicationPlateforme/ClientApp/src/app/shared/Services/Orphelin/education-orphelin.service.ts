import { Injectable } from '@angular/core';
import { EducationOrphelin } from '../../Models/Orphelin/education-orphelin.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationOrphelinService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: EducationOrphelin;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create EducationOrphelin

  Add(EducationOrphelin: EducationOrphelin) {
    return this.http.post<EducationOrphelin>(this.rootURL + '/EducationOrphelins', EducationOrphelin, this.headers);
  }

  PutObservableE(Transaction: EducationOrphelin) {
    return this.http.put<EducationOrphelin>(this.rootURL + '/EducationOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/EducationOrphelins', this.formData, this.headers);
  }

  //Get EducationOrphelin List

  Get(): Observable<EducationOrphelin[]> {
    return this.http.get<EducationOrphelin[]>(this.rootURL + '/EducationOrphelins');
  }

  //Get EducationOrphelin By Id

  GetById(Id) {
    return this.http.get<EducationOrphelin>(this.rootURL + '/EducationOrphelins/' + Id);
  }

  //Edit EducationOrphelin

  Edit() {
    return this.http.put(this.rootURL + '/EducationOrphelins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete EducationOrphelin

  Delete(id) {
    return this.http.delete(this.rootURL + '/EducationOrphelins/' + id);
  }
}
