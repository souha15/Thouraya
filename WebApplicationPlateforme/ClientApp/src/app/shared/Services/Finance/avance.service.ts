import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Avance } from '../../Models/Finance/avance.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvanceService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Avance;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: Avance) {
    return this.http.post<Avance>(this.rootURL + '/DemandeAvances', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/DemandeAvances', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<Avance[]> {
    return this.http.get<Avance[]>(this.rootURL + '/DemandeAvances');
  }

  Get() {
    return this.http.get<Avance[]>(this.rootURL + '/DemandeAvances');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<Avance>(this.rootURL + '/DemandeAvances/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/DemandeAvances/' + this.formData.id, this.formData, this.headers);
  }

  PutObservableE(Transaction: Avance) {
    return this.http.put<Avance>(this.rootURL + '/DemandeAvances/' + Transaction.id, Transaction, this.headers);
  }



  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/DemandeAvances/' + id);
  }
}

