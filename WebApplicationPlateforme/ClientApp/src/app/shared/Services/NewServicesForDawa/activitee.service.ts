import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Activite } from '../../Models/NewModelsForDawaa/activite.model';
import { Observable } from 'rxjs';
import { TbListening } from '../../Models/Evenements/tb-listening.model';
import { TbListeningService } from '../Evenements/tb-listening.service';

export class ActiviteDetail {
  id: number;
  idActivite: number;
  details: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActiviteeService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Activite;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Activite) {
    return this.http.put<Activite>(this.rootURL + '/Activitees/' + Transaction.id, Transaction, this.headers);

  }

  GetByAdmin(Id) {
    return this.http.get<Activite[]>(this.rootURL + '/GetActiviteeByEtab/' + Id);
  }
  //Create Cadeaux

  Create(tache: Activite) {
    return this.http.post<Activite>(this.rootURL + '/Activitees', tache, this.headers);
  }

  //Edit Cadeaux
  Edit() {
    return this.http.put(this.rootURL + '/Activitees/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  List(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.rootURL + '/Activitees');
  }



  //Delete Cadeaux

  Delete(id) {
    return this.http.delete(this.rootURL + '/Activitees/' + id);
  }

  //Put Cadeaux


  Put(Id) {
    return this.http.put(this.rootURL + '/Activitees/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetById(Id) {
    return this.http.get<Activite>(this.rootURL + '/Activitees/' + Id);
  }

  public list: Activite[] = [];
//***********************************

  PutObservableEW(Transaction: Activite) {
    return this.http.put<Activite>(this.rootURL + '/ActiviteeWomen/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  CreateW(tache: Activite) {
    return this.http.post<Activite>(this.rootURL + '/ActiviteeWomen', tache, this.headers);
  }

  //Edit Cadeaux
  EditW() {
    return this.http.put(this.rootURL + '/ActiviteeWomen/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  ListW(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.rootURL + '/ActiviteeWomen');
  }



  //Delete Cadeaux

  DeleteW(id) {
    return this.http.delete(this.rootURL + '/ActiviteeWomen/' + id);
  }

  //Put Cadeaux


  PutW(Id) {
    return this.http.put(this.rootURL + '/ActiviteeWomen/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetByIdW(Id) {
    return this.http.get<Activite>(this.rootURL + '/ActiviteeWomen/' + Id);
  }

  //***********************************

  PutObservableEP(Transaction: Activite) {
    return this.http.put<Activite>(this.rootURL + '/ActivitePrepas/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  CreateP(tache: Activite) {
    return this.http.post<Activite>(this.rootURL + '/ActivitePrepas', tache, this.headers);
  }

  //Edit Cadeaux
  EditP() {
    return this.http.put(this.rootURL + '/ActivitePrepas/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  ListP(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.rootURL + '/ActivitePrepas');
  }



  //Delete Cadeaux

  DeleteP(id) {
    return this.http.delete(this.rootURL + '/ActivitePrepas/' + id);
  }

  //Put Cadeaux


  PutP(Id) {
    return this.http.put(this.rootURL + '/ActivitePrepas/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetByIdP(Id) {
    return this.http.get<Activite>(this.rootURL + '/ActivitePrepas/' + Id);
  }

  //***********************************

  PutObservableEE(Transaction: Activite) {
    return this.http.put<Activite>(this.rootURL + '/ActiviteEducations/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  CreateE(tache: Activite) {
    return this.http.post<Activite>(this.rootURL + '/ActiviteEducations', tache, this.headers);
  }

  //Edit Cadeaux
  EditE() {
    return this.http.put(this.rootURL + '/ActiviteEducations/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  ListE(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.rootURL + '/ActiviteEducations');
  }



  //Delete Cadeaux

  DeleteE(id) {
    return this.http.delete(this.rootURL + '/ActiviteEducations/' + id);
  }

  //Put Cadeaux


  PutE(Id) {
    return this.http.put(this.rootURL + '/ActiviteEducations/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetByIdE(Id) {
    return this.http.get<Activite>(this.rootURL + '/ActiviteEducations/' + Id);
  }

  //***********************************

  PutObservableEI(Transaction: Activite) {
    return this.http.put<Activite>(this.rootURL + '/ActiviteeImmigrants/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  CreateI(tache: Activite) {
    return this.http.post<Activite>(this.rootURL + '/ActiviteeImmigrants', tache, this.headers);
  }

  //Edit Cadeaux
  EditI() {
    return this.http.put(this.rootURL + '/ActiviteeImmigrants/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  ListI(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.rootURL + '/ActiviteeImmigrants');
  }



  //Delete Cadeaux

  DeleteI(id) {
    return this.http.delete(this.rootURL + '/ActiviteeImmigrants/' + id);
  }

  //Put Cadeaux


  PutI(Id) {
    return this.http.put(this.rootURL + '/ActiviteeImmigrants/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetByIdI(Id) {
    return this.http.get<Activite>(this.rootURL + '/ActiviteeImmigrants/' + Id);
  }

  //***********************************

  PutObservableEC(Transaction: Activite) {
    return this.http.put<Activite>(this.rootURL + '/ActiviteCompagnes/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  CreateC(tache: Activite) {
    return this.http.post<Activite>(this.rootURL + '/ActiviteCompagnes', tache, this.headers);
  }

  //Edit Cadeaux
  EditC() {
    return this.http.put(this.rootURL + '/ActiviteCompagnes/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  ListC(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.rootURL + '/ActiviteCompagnes');
  }



  //Delete Cadeaux

  DeleteC(id) {
    return this.http.delete(this.rootURL + '/ActiviteCompagnes/' + id);
  }

  //Put Cadeaux


  PutC(Id) {
    return this.http.put(this.rootURL + '/ActiviteCompagnes/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetByIdC(Id) {
    return this.http.get<Activite>(this.rootURL + '/ActiviteCompagnes/' + Id);
  }


  //***********************************

  PutObservableED(Transaction: Activite) {
    return this.http.put<Activite>(this.rootURL + '/TypeActiviteDawas/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  CreateD(tache: Activite) {
    return this.http.post<Activite>(this.rootURL + '/ActiviteDawas', tache, this.headers);
  }

  //Edit Cadeaux
  EditD() {
    return this.http.put(this.rootURL + '/ActiviteDawas/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  ListD(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.rootURL + '/ActiviteDawas');
  }



  //Delete Cadeaux

  DeleteD(id) {
    return this.http.delete(this.rootURL + '/ActiviteDawas/' + id);
  }

  //Put Cadeaux


  PutD(Id) {
    return this.http.put(this.rootURL + '/ActiviteDawas/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetByIdD(Id) {
    return this.http.get<Activite>(this.rootURL + '/ActiviteDawas/' + Id);
  }



  //***********************************

  PutObservableDE(Transaction: Activite) {
    return this.http.put<Activite>(this.rootURL + '/ActiviteDawaElecs/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  CreateDE(tache: Activite) {
    return this.http.post<Activite>(this.rootURL + '/ActiviteDawaElecs', tache, this.headers);
  }

  //Edit Cadeaux
  EditDE() {
    return this.http.put(this.rootURL + '/ActiviteDawaElecs/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  ListDE(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.rootURL + '/ActiviteDawaElecs');
  }



  //Delete Cadeaux

  DeleteDE(id) {
    return this.http.delete(this.rootURL + '/ActiviteDawaElecs/' + id);
  }

  //Put Cadeaux


  PutDE(Id) {
    return this.http.put(this.rootURL + '/ActiviteDawaElecs/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetByIdDE(Id) {
    return this.http.get<Activite>(this.rootURL + '/ActiviteDawaElecs/' + Id);
  }


  //***************** Details Activite and TypeActivite

  formDataDetail: ActiviteDetail;

  PutObservableDetail(Transaction: ActiviteDetail) {
    return this.http.put<ActiviteDetail>(this.rootURL + '/ActiviteDetails/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  CreateDetail(tache: ActiviteDetail) {
    return this.http.post<ActiviteDetail>(this.rootURL + '/ActiviteDetails', tache, this.headers);
  }

  //Edit Cadeaux
  EditDetail() {
    return this.http.put(this.rootURL + '/ActiviteDetails/' + this.formDataDetail.id, this.formDataDetail, this.headers);
  }

  // List Cadeaux

  ListDetail(): Observable<ActiviteDetail[]> {
    return this.http.get<ActiviteDetail[]>(this.rootURL + '/ActiviteDetails');
  }



  //Delete Cadeaux

  DeleteDetail(id) {
    return this.http.delete(this.rootURL + '/ActiviteDetails/' + id);
  }

  //Put Cadeaux


  PutDetail(Id) {
    return this.http.put(this.rootURL + '/ActiviteDetails/' + this.formDataDetail.id, this.formDataDetail, this.headers);
  }

  //Get Cadeaux By Id

  GetByIdDetail(Id) {
    return this.http.get<ActiviteDetail>(this.rootURL + '/ActiviteDetails/' + Id);
  }


  //***************** Type Detail Activite and TypeActivite

  formDataTypeDetail: TbListening;

  PutObservableTypeDetail(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeDetailsActivites/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  CreateTypeDetail(tache: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeDetailsActivites', tache, this.headers);
  }

  //Edit Cadeaux
  EditTypeDetail() {
    return this.http.put(this.rootURL + '/TypeDetailsActivites/' + this.formDataTypeDetail.id, this.formDataTypeDetail, this.headers);
  }

  // List Cadeaux

  ListTypeDetail(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeDetailsActivites');
  }



  //Delete Cadeaux

  DeleteTypeDetail(id) {
    return this.http.delete(this.rootURL + '/TypeDetailsActivites/' + id);
  }

  //Put Cadeaux


  PutTypeDetail(Id) {
    return this.http.put(this.rootURL + '/TypeDetailsActivites/' + this.formDataTypeDetail.id, this.formDataTypeDetail, this.headers);
  }

  //Get Cadeaux By Id

  GetByIdTypeDetail(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeDetailsActivites/' + Id);
  }

  PostTypeDetail() {
    return this.http.post(this.rootURL + '/TypeDetailsActivites', this.formDataTypeDetail, this.headers);
  }
}
