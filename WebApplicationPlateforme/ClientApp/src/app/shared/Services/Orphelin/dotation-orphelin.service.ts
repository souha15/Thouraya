import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DotationOrphelin } from '../../Models/Orphelin/dotation-orphelin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DotationOrphelinService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: DotationOrphelin;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create DotationOrphelin

  Add(DotationOrphelin: DotationOrphelin) {
    return this.http.post<DotationOrphelin>(this.rootURL + '/DotationOrphelins', DotationOrphelin, this.headers);
  }

  PutObservableE(Transaction: DotationOrphelin) {
    return this.http.put<DotationOrphelin>(this.rootURL + '/DotationOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/DotationOrphelins', this.formData, this.headers);
  }

  //Get DotationOrphelin List

  Get(): Observable<DotationOrphelin[]> {
    return this.http.get<DotationOrphelin[]>(this.rootURL + '/DotationOrphelins');
  }

  //Get DotationOrphelin By Id

  GetById(Id) {
    return this.http.get<DotationOrphelin>(this.rootURL + '/DotationOrphelins/' + Id);
  }

  //Edit DotationOrphelin

  Edit() {
    return this.http.put(this.rootURL + '/DotationOrphelins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete DotationOrphelin

  Delete(id) {
    return this.http.delete(this.rootURL + '/DotationOrphelins/' + id);
  }
}
