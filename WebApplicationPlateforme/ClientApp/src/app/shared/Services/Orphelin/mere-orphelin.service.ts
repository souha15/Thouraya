import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MereOrphelin } from '../../Models/Orphelin/mere-orphelin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MereOrphelinService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: MereOrphelin;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create MereOrphelin

  Add(MereOrphelin: MereOrphelin) {
    return this.http.post<MereOrphelin>(this.rootURL + '/MereOrphelins', MereOrphelin, this.headers);
  }

  PutObservableE(Transaction: MereOrphelin) {
    return this.http.put<MereOrphelin>(this.rootURL + '/MereOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/MereOrphelins', this.formData, this.headers);
  }

  //Get MereOrphelin List

  Get(): Observable<MereOrphelin[]> {
    return this.http.get<MereOrphelin[]>(this.rootURL + '/MereOrphelins');
  }

  //Get MereOrphelin By Id

  GetById(Id) {
    return this.http.get<MereOrphelin>(this.rootURL + '/MereOrphelins/' + Id);
  }

  //Edit MereOrphelin

  Edit() {
    return this.http.put(this.rootURL + '/MereOrphelins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete MereOrphelin

  Delete(id) {
    return this.http.delete(this.rootURL + '/MereOrphelins/' + id);
  }
}
