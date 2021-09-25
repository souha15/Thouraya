import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rendonne } from '../../../Models/MediaCenter/Rendonee/rendonne.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendoneeService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Rendonne;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Rendonne) {
    return this.http.put<Rendonne>(this.rootURL + '/Rendonees/' + Transaction.id, Transaction, this.headers);

  }
  //Create Rendonne

  Create(tache: Rendonne) {
    return this.http.post<Rendonne>(this.rootURL + '/Rendonees', tache, this.headers);
  }

  //Edit Rendonne
  Edit() {
    return this.http.put(this.rootURL + '/Rendonees/' + this.formData.id, this.formData, this.headers);
  }

  // List Rendonne

  List(): Observable<Rendonne[]> {
    return this.http.get<Rendonne[]>(this.rootURL + '/Rendonees');
  }

  //Delete Rendonne

  Delete(id) {
    return this.http.delete(this.rootURL + '/Rendonees/' + id);
  }

  //Put Rendonne


  Put(Id) {
    return this.http.put(this.rootURL + '/Rendonees/' + this.formData.id, this.formData, this.headers);
  }

  //Get Rendonne By Id

  GetById(Id) {
    return this.http.get<Rendonne>(this.rootURL + '/Rendonees/' + Id);
  }
}
