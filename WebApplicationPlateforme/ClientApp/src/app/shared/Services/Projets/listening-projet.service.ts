import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbListening } from '../../Models/Evenements/tb-listening.model';
import { Observable } from 'rxjs';
import { EtatListCompte } from '../../Models/Comptes/etat-list-compte.model';

@Injectable({
  providedIn: 'root'
})
export class ListeningProjetService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TbListening;
  formData2: EtatListCompte;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }


  //Create Class

  AddClass(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/ClassProjets', dotation, this.headers);
  }


  PostClass() {
    return this.http.post(this.rootURL + '/ClassProjets', this.formData, this.headers);
  }



  GetClassOv(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/ClassProjets');
  }

  GetClass() {
    return this.http.get<TbListening[]>(this.rootURL + '/ClassProjets');
  }


  GetByIdClass(Id) {
    return this.http.get<TbListening>(this.rootURL + '/ClassProjets/' + Id);
  }



  EditClass() {
    return this.http.put(this.rootURL + '/ClassProjets/' + this.formData.id, this.formData, this.headers);
  }



  DeleteClass(id) {
    return this.http.delete(this.rootURL + '/ClassProjets/' + id);
  }



  //Create Compte

  AddCompte(dotation: EtatListCompte) {
    return this.http.post<EtatListCompte>(this.rootURL + '/Comptes', dotation, this.headers);
  }


  PostCompte() {
    return this.http.post(this.rootURL + '/Comptes', this.formData2, this.headers);
  }



  GetCompteOv(): Observable<EtatListCompte[]> {
    return this.http.get<EtatListCompte[]>(this.rootURL + '/Comptes');
  }

  GetCompte() {
    return this.http.get<EtatListCompte[]>(this.rootURL + '/Comptes');
  }


  GetByIdCompte(Id) {
    return this.http.get<EtatListCompte>(this.rootURL + '/Comptes/' + Id);
  }



  EditCompte() {
    return this.http.put(this.rootURL + '/Comptes/' + this.formData2.id, this.formData2, this.headers);
  }



  DeleteCompte(id) {
    return this.http.delete(this.rootURL + '/Comptes/' + id);
  }

  //Create PayementActivity

  AddPayAct(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/PayementActivites', dotation, this.headers);
  }


  PostPayAct() {
    return this.http.post(this.rootURL + '/PayementActivites', this.formData, this.headers);
  }



  GetPayActOv(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/PayementActivites');
  }

  GetPayAct() {
    return this.http.get<TbListening[]>(this.rootURL + '/PayementActivites');
  }


  GetByIdPayAct(Id) {
    return this.http.get<TbListening>(this.rootURL + '/PayementActivites/' + Id);
  }



  EditPayAct() {
    return this.http.put(this.rootURL + '/PayementActivites/' + this.formData.id, this.formData, this.headers);
  }



  DeletePayAct(id) {
    return this.http.delete(this.rootURL + '/PayementActivites/' + id);
  }


  //Create PayementType

  AddPayType(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/PayementTypes', dotation, this.headers);
  }


  PostPayType() {
    return this.http.post(this.rootURL + '/PayementTypes', this.formData, this.headers);
  }



  GetPayTypeOv(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/PayementTypes');
  }

  GetPayType() {
    return this.http.get<TbListening[]>(this.rootURL + '/PayementTypes');
  }


  GetByIdPayType(Id) {
    return this.http.get<TbListening>(this.rootURL + '/PayementTypes/' + Id);
  }



  EditPayType() {
    return this.http.put(this.rootURL + '/PayementTypes/' + this.formData.id, this.formData, this.headers);
  }



  DeletePayType(id) {
    return this.http.delete(this.rootURL + '/PayementTypes/' + id);
  }
}
