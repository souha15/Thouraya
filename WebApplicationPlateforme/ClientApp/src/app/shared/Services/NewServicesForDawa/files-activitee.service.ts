import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbListening } from '../../Models/Evenements/tb-listening.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesActiviteeService {



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
    return this.http.post<TbListening>(this.rootURL + '/TypeActivitees', TbListening, this.headers);
  }

  PutObservableETalent(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeActivitees/' + Transaction.id, Transaction, this.headers);

  }
  PostTalent() {
    return this.http.post(this.rootURL + '/TypeActivitees', this.formData, this.headers);
  }


  GetTalent(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeActivitees');
  }


  GetByIdTalent(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeActivitees/' + Id);
  }


  EditTalent() {
    return this.http.put(this.rootURL + '/TypeActivitees/' + this.formData.id, this.formData, this.headers);
  }

  DeleteTalent(id) {
    return this.http.delete(this.rootURL + '/TypeActivitees/' + id);
  }

//-------------------

  Add(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeActiviteeForWomen', TbListening, this.headers);
  }

  PutObservableE(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeActiviteeForWomen/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/TypeActiviteeForWomen', this.formData, this.headers);
  }


  Get(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeActiviteeForWomen');
  }


  GetById(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeActiviteeForWomen/' + Id);
  }


  Edit() {
    return this.http.put(this.rootURL + '/TypeActivitees/' + this.formData.id, this.formData, this.headers);
  }

  Delete(id) {
    return this.http.delete(this.rootURL + '/TypeActivitees/' + id);
  }
  //-----------------------
  AddP(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeActivitePrepas', TbListening, this.headers);
  }

  PutObservableEP(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeActivitePrepas/' + Transaction.id, Transaction, this.headers);

  }
  PostP() {
    return this.http.post(this.rootURL + '/TypeActivitePrepas', this.formData, this.headers);
  }


  GetP(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeActivitePrepas');
  }


  GetByIdP(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeActivitePrepas/' + Id);
  }


  EditP() {
    return this.http.put(this.rootURL + '/TypeActivitePrepas/' + this.formData.id, this.formData, this.headers);
  }

  DeleteP(id) {
    return this.http.delete(this.rootURL + '/TypeActivitePrepas/' + id);
  }

  //-----------------------
  AddDE(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeActiviteDawaaElecs', TbListening, this.headers);
  }

  PutObservableEDE(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeActiviteDawaaElecs/' + Transaction.id, Transaction, this.headers);

  }
  PostDE() {
    return this.http.post(this.rootURL + '/TypeActiviteDawaaElecs', this.formData, this.headers);
  }


  GetDE(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeActiviteDawaaElecs');
  }


  GetByIdDE(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeActiviteDawaaElecs/' + Id);
  }


  EditDE() {
    return this.http.put(this.rootURL + '/TypeActiviteDawaaElecs/' + this.formData.id, this.formData, this.headers);
  }

  DeleteDE(id) {
    return this.http.delete(this.rootURL + '/TypeActiviteDawaaElecs/' + id);
  }
  //-----------------------
  AddD(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeActiviteDawas', TbListening, this.headers);
  }

  PutObservableED(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeActiviteDawas/' + Transaction.id, Transaction, this.headers);

  }
  PostD() {
    return this.http.post(this.rootURL + '/TypeActiviteDawas', this.formData, this.headers);
  }


  GetD(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeActiviteDawas');
  }


  GetByIdD(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeActiviteDawas/' + Id);
  }


  EditD() {
    return this.http.put(this.rootURL + '/TypeActiviteDawas/' + this.formData.id, this.formData, this.headers);
  }

  DeleteD(id) {
    return this.http.delete(this.rootURL + '/TypeActiviteDawas/' + id);
  }

  //-----------------------
  AddE(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeActiviteEducations', TbListening, this.headers);
  }

  PutObservableEE(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeActiviteEducations/' + Transaction.id, Transaction, this.headers);

  }
  PostE() {
    return this.http.post(this.rootURL + '/TypeActiviteEducations', this.formData, this.headers);
  }


  GetE(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeActiviteEducations');
  }


  GetByIdE(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeActiviteEducations/' + Id);
  }


  EditE() {
    return this.http.put(this.rootURL + '/TypeActiviteEducations/' + this.formData.id, this.formData, this.headers);
  }

  DeleteE(id) {
    return this.http.delete(this.rootURL + '/TypeActiviteEducations/' + id);
  }
  //-----------------------
  AddI(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeActiviteeImmigrants', TbListening, this.headers);
  }

  PutObservableEI(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeActiviteeImmigrants/' + Transaction.id, Transaction, this.headers);

  }
  PostI() {
    return this.http.post(this.rootURL + '/TypeActiviteeImmigrants', this.formData, this.headers);
  }


  GetI(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeActiviteeImmigrants');
  }


  GetByIdI(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeActiviteeImmigrants/' + Id);
  }


  EditI() {
    return this.http.put(this.rootURL + '/TypeActiviteeImmigrants/' + this.formData.id, this.formData, this.headers);
  }

  DeleteI(id) {
    return this.http.delete(this.rootURL + '/TypeActiviteeImmigrants/' + id);
  }

  //-----------------------
  AddC(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeActiviteCompagnes', TbListening, this.headers);
  }

  PutObservableEC(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeActiviteCompagnes/' + Transaction.id, Transaction, this.headers);

  }
  PostC() {
    return this.http.post(this.rootURL + '/TypeActiviteCompagnes', this.formData, this.headers);
  }


  GetC(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeActiviteCompagnes');
  }


  GetByIdC(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeActiviteCompagnes/' + Id);
  }


  EditC() {
    return this.http.put(this.rootURL + '/TypeActiviteCompagnes/' + this.formData.id, this.formData, this.headers);
  }

  DeleteC(id) {
    return this.http.delete(this.rootURL + '/TypeActiviteCompagnes/' + id);
  }
}
