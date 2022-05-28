import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conge } from '../../Models/RH/conge.model';
import { Observable } from 'rxjs';


export class CongeFiles {
  public id: number;
  public path: string;
  public typeConges: string;
  public nomConges: string;
  public idConge: number;
}


@Injectable({
  providedIn: 'root'
})
export class CongeService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Conge;
  formDatafc: CongeFiles;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: Conge) {
    return this.http.post<Conge>(this.rootURL + '/Conges', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/Conges', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<Conge[]> {
    return this.http.get<Conge[]>(this.rootURL + '/Conges');
  }

  PutObservableE(Transaction: Conge) {
    return this.http.put<Conge>(this.rootURL + '/Conges/' + Transaction.id, Transaction, this.headers);
  }


  Get() {
    return this.http.get<Conge[]>(this.rootURL + '/Conges');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<Conge>(this.rootURL + '/Conges/' + Id);
  }

  GetUsersDemands(Id) {
    return this.http.get<Conge[]>(this.rootURL + '/CongeByUser/' + Id);
  }


  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/Conges/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/Conges/' + id);
  }

/** Conges Files **/

  AddCF(dotation: CongeFiles) {
    return this.http.post<CongeFiles>(this.rootURL + '/CongeFiles', dotation, this.headers);
  }

  //Save Type Dotation
  PostCF() {
    return this.http.post(this.rootURL + '/CongeFiles', this.formDatafc, this.headers);
  }

  //Get Type dotation List

  GetDotationCF(): Observable<CongeFiles[]> {
    return this.http.get<CongeFiles[]>(this.rootURL + '/CongeFiles');
  }

  PutObservableECF(Transaction: CongeFiles) {
    return this.http.put<CongeFiles>(this.rootURL + '/CongeFiles/' + Transaction.id, Transaction, this.headers);
  }


  GetCF() {
    return this.http.get<CongeFiles[]>(this.rootURL + '/CongeFiles');
  }

  GetByCongesIdCF(idConge) {
    return this.http.get<CongeFiles[]>(this.rootURL + '/CongeFiles/GetByCongesId/' + idConge);
  }
  //Get Type Dotation By Id

  GetByIdCF(Id) {
    return this.http.get<CongeFiles>(this.rootURL + '/CongeFiles/' + Id);
  }


  //Edit Type Dotation

  EditCF() {
    return this.http.put(this.rootURL + '/CongeFiles/' + this.formDatafc.id, this.formDatafc, this.headers);
  }


  //Delete Type Dotation

  DeleteCF(id) {
    return this.http.delete(this.rootURL + '/CongeFiles/' + id);
  }
}

