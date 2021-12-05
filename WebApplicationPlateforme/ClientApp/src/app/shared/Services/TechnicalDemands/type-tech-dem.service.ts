import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { TbListening } from '../../Models/Evenements/tb-listening.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TypeTechDemService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TbListening;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  Post() {
    return this.http.post(this.rootURL + '/TypeTechDems', this.formData, this.headers);
  }
  PutObservableE(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeTechDems/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  Create(tache: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeTechDems', tache, this.headers);
  }

  //Edit Cadeaux
  Edit() {
    return this.http.put(this.rootURL + '/TypeTechDems/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  List(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeTechDems');
  }

  //Delete Cadeaux

  Delete(id) {
    return this.http.delete(this.rootURL + '/TypeTechDems/' + id);
  }

  //Put Cadeaux


  Put(Id) {
    return this.http.put(this.rootURL + '/TypeTechDems/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetById(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeTechDems/' + Id);
  }
}
