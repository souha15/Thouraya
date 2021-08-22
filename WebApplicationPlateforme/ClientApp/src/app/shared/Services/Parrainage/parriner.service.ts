import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parriner } from '../../Models/Parrainage/parriner.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParrinerService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Parriner;
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Parriner

  Add(Parriner: Parriner) {
    return this.http.post<Parriner>(this.rootURL + '/Parriners', Parriner, this.headers);
  }

  PutObservableE(Transaction: Parriner) {
    return this.http.put<Parriner>(this.rootURL + '/Parriners/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/Parriners', this.formData, this.headers);
  }

  //Get Parriner List

  Get(): Observable<Parriner[]> {
    return this.http.get<Parriner[]>(this.rootURL + '/Parriners');
  }

  //Get Parriner By Id

  GetById(Id) {
    return this.http.get<Parriner>(this.rootURL + '/Parriners/' + Id);
  }

  //Edit Parriner

  Edit() {
    return this.http.put(this.rootURL + '/Parriners/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Parriner

  Delete(id) {
    return this.http.delete(this.rootURL + '/Parriners/' + id);
  }
}
