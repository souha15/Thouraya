import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Retrait } from '../../Models/Retrait/retrait.model';

@Injectable({
  providedIn: 'root'
})
export class RetraitService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Retrait;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Retrait) {
    return this.http.put<Retrait>(this.rootURL + '/RetraitPersonnes/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  Create(tache: Retrait) {
    return this.http.post<Retrait>(this.rootURL + '/RetraitPersonnes', tache, this.headers);
  }

  //Edit Cadeaux
  Edit() {
    return this.http.put(this.rootURL + '/RetraitPersonnes/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  List(): Observable<Retrait[]> {
    return this.http.get<Retrait[]>(this.rootURL + '/RetraitPersonnes');
  }

  //Delete Cadeaux

  Delete(id) {
    return this.http.delete(this.rootURL + '/RetraitPersonnes/' + id);
  }

  //Put Cadeaux


  Put(Id) {
    return this.http.put(this.rootURL + '/RetraitPersonnes/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetById(Id) {
    return this.http.get<Retrait>(this.rootURL + '/RetraitPersonnes/' + Id);
  }
}
