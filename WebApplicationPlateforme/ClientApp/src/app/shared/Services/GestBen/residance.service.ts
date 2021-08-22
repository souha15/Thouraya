import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResidanceBen } from '../../Models/GestBen/residance-ben.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidanceService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ResidanceBen;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: ResidanceBen) {
    return this.http.put<ResidanceBen>(this.rootURL + '/Residances/' + Transaction.id, Transaction, this.headers);

  }
  //Create ResidanceBen

  CreateResidanceBen(tache: ResidanceBen) {
    return this.http.post<ResidanceBen>(this.rootURL + '/Residances', tache, this.headers);
  }

  //Edit ResidanceBen
  EditResidanceBen() {
    return this.http.put(this.rootURL + '/Residances/' + this.formData.id, this.formData, this.headers);
  }

  // List ResidanceBen

  ListResidanceBen(): Observable<ResidanceBen[]> {
    return this.http.get<ResidanceBen[]>(this.rootURL + '/Residances');
  }

  //Delete ResidanceBen

  DeleteResidanceBen(id) {
    return this.http.delete(this.rootURL + '/Residances/' + id);
  }

  //Put ResidanceBen

  PutResidanceBenObservable(tache: ResidanceBen, Id: number) {
    return this.http.put<ResidanceBen>(this.rootURL + '/Residances/' + Id, tache, this.headers);
  }

  PutResidanceBen(Id) {
    return this.http.put(this.rootURL + '/Residances/' + this.formData.id, this.formData, this.headers);
  }

  //Get ResidanceBen By Id

  GetById(Id) {
    return this.http.get<ResidanceBen>(this.rootURL + '/Residances/' + Id);
  }
}
