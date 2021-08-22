import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Doneur } from '../../Models/Dons/doneur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoneurService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Doneur;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: Doneur) {
    return this.http.post<Doneur>(this.rootURL + '/Doneurs', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/Doneurs', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<Doneur[]> {
    return this.http.get<Doneur[]>(this.rootURL + '/Doneurs');
  }

  Get() {
    return this.http.get<Doneur[]>(this.rootURL + '/Doneurs');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<Doneur>(this.rootURL + '/Doneurs/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/Doneurs/' + this.formData.id, this.formData, this.headers);
  }

  PutObservableE(Transaction: Doneur) {
    return this.http.put<Doneur>(this.rootURL + '/Doneurs/' + Transaction.id, Transaction, this.headers);
  }



  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/Doneurs/' + id);
  }
}


