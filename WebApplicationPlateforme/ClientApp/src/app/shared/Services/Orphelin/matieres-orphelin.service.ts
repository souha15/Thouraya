import { Injectable } from '@angular/core';
import { MatieresOrphelin } from '../../Models/Orphelin/matieres-orphelin.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatieresOrphelinService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: MatieresOrphelin
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create MatieresOrphelin

  Add(MatieresOrphelin: MatieresOrphelin) {
    return this.http.post<MatieresOrphelin>(this.rootURL + '/MatieresOrphelins', MatieresOrphelin, this.headers);
  }

  PutObservableE(Transaction: MatieresOrphelin) {
    return this.http.put<MatieresOrphelin>(this.rootURL + '/MatieresOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/MatieresOrphelins', this.formData, this.headers);
  }

  //Get MatieresOrphelin List

  Get(): Observable<MatieresOrphelin[]> {
    return this.http.get<MatieresOrphelin[]>(this.rootURL + '/MatieresOrphelins');
  }

  //Get MatieresOrphelin By Id

  GetById(Id) {
    return this.http.get<MatieresOrphelin>(this.rootURL + '/MatieresOrphelins/' + Id);
  }

  //Edit MatieresOrphelin

  Edit() {
    return this.http.put(this.rootURL + '/MatieresOrphelins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete MatieresOrphelin

  Delete(id) {
    return this.http.delete(this.rootURL + '/MatieresOrphelins/' + id);
  }
}
