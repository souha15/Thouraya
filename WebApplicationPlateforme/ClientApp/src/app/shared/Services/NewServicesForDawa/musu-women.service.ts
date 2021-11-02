import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Musulman } from '../../Models/NvMusulman/musulman.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusuWomenService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Musulman;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Musulman) {
    return this.http.put<Musulman>(this.rootURL + '/musulmanWomen/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  Create(tache: Musulman) {
    return this.http.post<Musulman>(this.rootURL + '/musulmanWomen', tache, this.headers);
  }

  //Edit Cadeaux
  Edit() {
    return this.http.put(this.rootURL + '/musulmanWomen/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  List(): Observable<Musulman[]> {
    return this.http.get<Musulman[]>(this.rootURL + '/musulmanWomen');
  }



  //Delete Cadeaux

  Delete(id) {
    return this.http.delete(this.rootURL + '/musulmanWomen/' + id);
  }

  //Put Cadeaux


  Put(Id) {
    return this.http.put(this.rootURL + '/musulmanWomen/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetById(Id) {
    return this.http.get<Musulman>(this.rootURL + '/musulmanWomen/' + Id);
  }
  public list: Musulman[] = [];
}
