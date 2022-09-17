import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Affectation } from '../../Models/AdministrativeCommunication/affectation.model';
import { Observable } from 'rxjs';
import { Transaction } from '../../Models/AdministrativeCommunication/transaction.model';

export class TransactionsAffectationsViewModel {
  id: number;
  
 numAutorite: string;
orgEnregTr: string;
nomOrganisme: string;
datenereg: string;
date: string;
etat: string;
idAff: number;
type: string;

}
export class AffectationI {
  id: number;
  iduserAffected: string;
  idUserQuiAffecte: string;
  nomUserAffected: string;
  nomUserQuiAffecte: string;
  dateFin: string;
  nbPj: string;
  details: string;
  action: string;
  type: string;
  idAdministration: number;
  nomOrganisme: string;
  attribut1: number;
  attribut2: string;
  attribut3: string;
  attribut4: string;
  attribut5: string;
  attribut6: string;
  CreatorName: string;
  idTransaction: number;
  IdUserCreator: string;
  datenereg: string;

}
@Injectable({
  providedIn: 'root'
})

export class AffectationService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Affectation;
  formData2: AffectationI;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Affectation

  Create(Affectation: Affectation) {
    return this.http.post<Affectation>(this.rootURL + '/TrAffectations', Affectation, this.headers);
  }

  //Edit Affectation
  Edit() {
    return this.http.put(this.rootURL + '/TrAffectations/' + this.formData.id, this.formData, this.headers);
  }

  // List Affectation

  List(): Observable<Affectation[]> {
    return this.http.get<Affectation[]>(this.rootURL + '/TrAffectations');
  }

  //Delete Affectation

  Delete(id) {
    return this.http.delete(this.rootURL + '/TrAffectations/' + id);
  }

  //Put Affectation

  PutObservable(Affectation: Affectation) {
    return this.http.put<Affectation>(this.rootURL + '/TrAffectations/' + Affectation.id, Affectation, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/TrAffectations/' + this.formData.id, this.formData, this.headers);
  }

  //Get Affectation By Id

  GetById(Id) {
    return this.http.get<Affectation>(this.rootURL + '/TrAffectations/' + Id);
  }


/******/
  //Create Affectation

  CreateE(Affectation: Affectation) {
    return this.http.post<Affectation>(this.rootURL + '/TeAffectations', Affectation, this.headers);
  }

  //Edit Affectation
  EditE() {
    return this.http.put(this.rootURL + '/TeAffectations/' + this.formData.id, this.formData, this.headers);
  }

  // List Affectation

  ListE(): Observable<Affectation[]> {
    return this.http.get<Affectation[]>(this.rootURL + '/TeAffectations');
  }

  //Delete Affectation

  DeleteE(id) {
    return this.http.delete(this.rootURL + '/TeAffectations/' + id);
  }

  //Put Affectation

  PutObservableE(Affectation: Affectation, Id: number) {
    return this.http.put<Affectation>(this.rootURL + '/TeAffectations/' + Id, Affectation, this.headers);
  }

  PutE(Id) {
    return this.http.put(this.rootURL + '/TeAffectations/' + this.formData.id, this.formData, this.headers);
  }

  //Get Affectation By Id

  GetByIdE(Id) {
    return this.http.get<Affectation>(this.rootURL + '/TeAffectations/' + Id);
  }
/*****/

  /******/
  //Create Affectation

  CreateI(Affectation: AffectationI) {
    return this.http.post<AffectationI>(this.rootURL + '/TiAffectations', Affectation, this.headers);
  }

  //Edit Affectation
  EditI() {
    return this.http.put(this.rootURL + '/TiAffectations/' + this.formData2.id, this.formData2, this.headers);
  }

  // List Affectation

  ListI(): Observable<AffectationI[]> {
    return this.http.get<AffectationI[]>(this.rootURL + '/TiAffectations');
  }

  GetAffectations(idAdmin): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.rootURL + '/TiAffectations/GetAffectations/'+idAdmin);
  }
  GetAffectationsT(idAdmin): Observable<TransactionsAffectationsViewModel[]> {
    return this.http.get<TransactionsAffectationsViewModel[]>(this.rootURL + '/TiAffectations/GetAffectations/' + idAdmin);
  }

  GetAffectationsTr(idAdmin): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.rootURL + '/TrAffectations/GetAffectations/' + idAdmin);
  }

  //Delete Affectation

  DeleteI(id) {
    return this.http.delete(this.rootURL + '/TiAffectations/' + id);
  }

  //Put Affectation

  PutObservableI(Affectation: AffectationI) {
    return this.http.put<AffectationI>(this.rootURL + '/TiAffectations/' + Affectation.id, Affectation, this.headers);
  }


  PutI(Id) {
    return this.http.put(this.rootURL + '/TiAffectations/' + this.formData2.id, this.formData2, this.headers);
  }

  //Get Affectation By Id

  GetByIdI(Id) {
    return this.http.get<AffectationI>(this.rootURL + '/TiAffectations/' + Id);
  }


  // Get Affcetations List I

  GetAffectationsListI(Id) {
    return this.http.get<AffectationI[]>(this.rootURL + '/TiAffectations/GetAffectationsList/' + Id);
  }

  GetAffectationsListR(Id) {
    return this.http.get<Affectation[]>(this.rootURL + '/TiAffectations/GetAffectationsListR/' + Id);
  }
/*****/
}
