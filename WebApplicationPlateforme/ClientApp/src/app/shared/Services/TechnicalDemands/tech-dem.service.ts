import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TechDem } from '../../Models/TechnicalDemands/tech-dem.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechDemService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TechDem;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: TechDem) {
    return this.http.put<TechDem>(this.rootURL + '/DemTeches/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  Create(tache: TechDem) {
    return this.http.post<TechDem>(this.rootURL + '/DemTeches', tache, this.headers);
  }

  //Edit Cadeaux
  Edit() {
    return this.http.put(this.rootURL + '/DemTeches/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  List(): Observable<TechDem[]> {
    return this.http.get<TechDem[]>(this.rootURL + '/DemTeches');
  }

  //Delete Cadeaux

  Delete(id) {
    return this.http.delete(this.rootURL + '/DemTeches/' + id);
  }

  //Put Cadeaux


  Put(Id) {
    return this.http.put(this.rootURL + '/DemTeches/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetById(Id) {
    return this.http.get<TechDem>(this.rootURL + '/DemTeches/' + Id);
  }
}
