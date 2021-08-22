import { Injectable } from '@angular/core';
import { RecepCheque } from '../../Models/Finance/recep-cheque.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionChequeService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: RecepCheque;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: RecepCheque) {
    return this.http.post<RecepCheque>(this.rootURL + '/ChequeReceptions', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/ChequeReceptions', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<RecepCheque[]> {
    return this.http.get<RecepCheque[]>(this.rootURL + '/ChequeReceptions');
  }

  Get() {
    return this.http.get<RecepCheque[]>(this.rootURL + '/ChequeReceptions');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<RecepCheque>(this.rootURL + '/ChequeReceptions/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/ChequeReceptions/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/ChequeReceptions/' + id);
  }
}
