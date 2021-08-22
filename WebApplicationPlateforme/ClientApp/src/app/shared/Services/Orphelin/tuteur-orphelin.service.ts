import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TuteurOrphelin } from '../../Models/Orphelin/tuteur-orphelin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TuteurOrphelinService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TuteurOrphelin;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create TuteurOrphelin

  Add(TuteurOrphelin: TuteurOrphelin) {
    return this.http.post<TuteurOrphelin>(this.rootURL + '/TuteurOrphelins', TuteurOrphelin, this.headers);
  }

  PutObservableE(Transaction: TuteurOrphelin) {
    return this.http.put<TuteurOrphelin>(this.rootURL + '/TuteurOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/TuteurOrphelins', this.formData, this.headers);
  }

  //Get TuteurOrphelin List

  Get(): Observable<TuteurOrphelin[]> {
    return this.http.get<TuteurOrphelin[]>(this.rootURL + '/TuteurOrphelins');
  }

  //Get TuteurOrphelin By Id

  GetById(Id) {
    return this.http.get<TuteurOrphelin>(this.rootURL + '/TuteurOrphelins/' + Id);
  }

  //Edit TuteurOrphelin

  Edit() {
    return this.http.put(this.rootURL + '/TuteurOrphelins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete TuteurOrphelin

  Delete(id) {
    return this.http.delete(this.rootURL + '/TuteurOrphelins/' + id);
  }
}
