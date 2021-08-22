import { Injectable } from '@angular/core';
import { TbListening } from '../../Models/Evenements/tb-listening.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TblistingOrphelinService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TbListening
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

//Talent 

  AddTalent(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/Talents', TbListening, this.headers);
  }

  PutObservableETalent(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/Talents/' + Transaction.id, Transaction, this.headers);

  }
  PostTalent() {
    return this.http.post(this.rootURL + '/Talents', this.formData, this.headers);
  }


  GetTalent(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/Talents');
  }


  GetByIdTalent(Id) {
    return this.http.get<TbListening>(this.rootURL + '/Talents/' + Id);
  }


  EditTalent() {
    return this.http.put(this.rootURL + '/Talents/' + this.formData.id, this.formData, this.headers);
  }

  DeleteTalent(id) {
    return this.http.delete(this.rootURL + '/Talents/' + id);
  }

  //Lives With


  AddLivesWiths(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/LivesWiths', TbListening, this.headers);
  }

  PutObservableELivesWiths(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/LivesWiths/' + Transaction.id, Transaction, this.headers);

  }
  PostLivesWiths() {
    return this.http.post(this.rootURL + '/LivesWiths', this.formData, this.headers);
  }



  GetLivesWiths(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/LivesWiths');
  }



  GetByIdLivesWiths(Id) {
    return this.http.get<TbListening>(this.rootURL + '/LivesWiths/' + Id);
  }



  EditLivesWiths() {
    return this.http.put(this.rootURL + '/LivesWiths/' + this.formData.id, this.formData, this.headers);
  }

  DeleteLivesWiths(id) {
    return this.http.delete(this.rootURL + '/LivesWiths/' + id);
  }

  //Matieres 


  AddMatieres(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/Matieres', TbListening, this.headers);
  }

  PutObservableEMatieres(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/Matieres/' + Transaction.id, Transaction, this.headers);

  }
  PostMatieres() {
    return this.http.post(this.rootURL + '/Matieres', this.formData, this.headers);
  }



  GetMatieres(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/Matieres');
  }



  GetByIdMatieres(Id) {
    return this.http.get<TbListening>(this.rootURL + '/Matieres/' + Id);
  }



  EditMatieres() {
    return this.http.put(this.rootURL + '/Matieres/' + this.formData.id, this.formData, this.headers);
  }

  DeleteMatieres(id) {
    return this.http.delete(this.rootURL + '/Matieres/' + id);
  }


  //Maladies


  AddMaladies(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/Maladies', TbListening, this.headers);
  }

  PutObservableEMaladies(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/Maladies/' + Transaction.id, Transaction, this.headers);

  }
  PostMaladies() {
    return this.http.post(this.rootURL + '/Maladies', this.formData, this.headers);
  }



  GetMaladies(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/Maladies');
  }



  GetByIdMaladies(Id) {
    return this.http.get<TbListening>(this.rootURL + '/Maladies/' + Id);
  }



  EditMaladies() {
    return this.http.put(this.rootURL + '/Maladies/' + this.formData.id, this.formData, this.headers);
  }

  DeleteMaladies(id) {
    return this.http.delete(this.rootURL + '/Maladies/' + id);
  }

  //Parente


  AddParente(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/ParenteOrphelins', TbListening, this.headers);
  }

  PutObservableEParente(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/ParenteOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  PostParente() {
    return this.http.post(this.rootURL + '/ParenteOrphelins', this.formData, this.headers);
  }



  GetParente(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/ParenteOrphelins');
  }



  GetByIdParente(Id) {
    return this.http.get<TbListening>(this.rootURL + '/ParenteOrphelins/' + Id);
  }



  EditParente() {
    return this.http.put(this.rootURL + '/ParenteOrphelins/' + this.formData.id, this.formData, this.headers);
  }

  DeleteParente(id) {
    return this.http.delete(this.rootURL + '/ParenteOrphelins/' + id);
  }



  //TypeSubventions


  AddTypeSubventions(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeSubventions', TbListening, this.headers);
  }

  PutObservableETypeSubventions(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeSubventions/' + Transaction.id, Transaction, this.headers);

  }
  PostTypeSubventions() {
    return this.http.post(this.rootURL + '/TypeSubventions', this.formData, this.headers);
  }



  GetTypeSubventions(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeSubventions');
  }



  GetByIdTypeSubventions(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeSubventions/' + Id);
  }



  EditTypeSubventions() {
    return this.http.put(this.rootURL + '/TypeSubventions/' + this.formData.id, this.formData, this.headers);
  }

  DeleteTypeSubventions(id) {
    return this.http.delete(this.rootURL + '/TypeSubventions/' + id);
  }


  //TypeDotationOrphelins


  AddTypeDotationOrphelins(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeDotationOrphelins', TbListening, this.headers);
  }

  PutObservableETypeDotationOrphelins(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeDotationOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  PostTypeDotationOrphelins() {
    return this.http.post(this.rootURL + '/TypeDotationOrphelins', this.formData, this.headers);
  }



  GetTypeDotationOrphelins(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeDotationOrphelins');
  }



  GetByIdTypeDotationOrphelins(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeDotationOrphelins/' + Id);
  }



  EditTypeDotationOrphelins() {
    return this.http.put(this.rootURL + '/TypeDotationOrphelins/' + this.formData.id, this.formData, this.headers);
  }

  DeleteTypeDotationOrphelins(id) {
    return this.http.delete(this.rootURL + '/TypeDotationOrphelins/' + id);
  }


  //OrganismeOrphelins


  AddOrganismeOrphelins(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/OrganismeOrphelins', TbListening, this.headers);
  }

  PutObservableEOrganismeOrphelins(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/OrganismeOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  PostOrganismeOrphelins() {
    return this.http.post(this.rootURL + '/OrganismeOrphelins', this.formData, this.headers);
  }



  GetOrganismeOrphelins(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/OrganismeOrphelins');
  }



  GetByIdOrganismeOrphelins(Id) {
    return this.http.get<TbListening>(this.rootURL + '/OrganismeOrphelins/' + Id);
  }



  EditOrganismeOrphelins() {
    return this.http.put(this.rootURL + '/OrganismeOrphelins/' + this.formData.id, this.formData, this.headers);
  }

  DeleteOrganismeOrphelins(id) {
    return this.http.delete(this.rootURL + '/OrganismeOrphelins/' + id);
  }
}
