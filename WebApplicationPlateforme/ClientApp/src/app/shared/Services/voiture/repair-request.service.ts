import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepairRequest } from '../../Models/voiture/repair-request.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';

@Injectable({
  providedIn: 'root'
})
export class RepairRequestService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: RepairRequest;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: RepairRequest) {
    return this.http.post<RepairRequest>(this.rootURL + '/voitureRepairs', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/voitureRepairs', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<RepairRequest[]> {
    return this.http.get<RepairRequest[]>(this.rootURL + '/voitureRepairs');
  }

  Get() {
    return this.http.get<RepairRequest[]>(this.rootURL + '/voitureRepairs');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<RepairRequest>(this.rootURL + '/voitureRepairs/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/voitureRepairs/' + this.formData.id, this.formData, this.headers);
  }

  PutObservableE(Transaction: RepairRequest) {
    return this.http.put<RepairRequest>(this.rootURL + '/voitureRepairs/' + Transaction.id, Transaction, this.headers);
  }
  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/RepairRequest/' + id);
  }
}

