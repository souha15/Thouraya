import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemPayCheque } from '../../Models/Cheques/dem-pay-cheque.model';

export class demandePayChequesReceive {
  id: string;
  idBoxMen : string;
 nomBoxMen : string;
 idComptable : string;
 nomComptable : string;
 transfert : string;
 prix : string;
 retour : string;
 idCheque :number
 attibut1 : string;
 attribut2 : string;
 attribut3 : string;
 attribut4 : string;
 attribut5 : string;
 attribut6 : string;
 creatorName : string;
 dateenreg : string;
 idUserCreator : string;
}

@Injectable({
  providedIn: 'root'
})
export class DemPayChequeService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: DemPayCheque;
  formDataReceive: demandePayChequesReceive;

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create DemPayCheque

  Add(DemPayCheque: DemPayCheque) {
    return this.http.post<DemPayCheque>(this.rootURL + '/DemandePayCheques', DemPayCheque, this.headers);
  }

  PutObservableE(Transaction: DemPayCheque) {
    return this.http.put<DemPayCheque>(this.rootURL + '/DemandePayCheques/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/DemandePayCheques', this.formData, this.headers);
  }

  //Get DemPayCheque List

  Get(): Observable<DemPayCheque[]> {
    return this.http.get<DemPayCheque[]>(this.rootURL + '/DemandePayCheques');
  }

  //Get DemPayCheque By Id

  GetById(Id) {
    return this.http.get<DemPayCheque>(this.rootURL + '/DemandePayCheques/' + Id);
  }

  //Edit DemPayCheque

  Edit() {
    return this.http.put(this.rootURL + '/DemandePayCheques/' + this.formData.id, this.formData, this.headers);
  }


  //Delete DemPayCheque

  Delete(id) {
    return this.http.delete(this.rootURL + '/DemandePayCheques/' + id);
  }

  /****  DemandePayChequeReceive
   * */


  AddPayChequeReceive(DemPayCheque: demandePayChequesReceive) {
    return this.http.post<demandePayChequesReceive>(this.rootURL + '/demandePayChequesReceives', DemPayCheque, this.headers);
  }

  PutObservableEPayChequeReceive(Transaction: demandePayChequesReceive) {
    return this.http.put<demandePayChequesReceive>(this.rootURL + '/demandePayChequesReceives/' + Transaction.id, Transaction, this.headers);

  }
  PostPayChequeReceive() {
    return this.http.post(this.rootURL + '/demandePayChequesReceives', this.formDataReceive, this.headers);
  }



  GetPayChequeReceive(): Observable<demandePayChequesReceive[]> {
    return this.http.get<demandePayChequesReceive[]>(this.rootURL + '/demandePayChequesReceives');
  }


  GetByIdPayChequeReceive(Id) {
    return this.http.get<demandePayChequesReceive>(this.rootURL + '/demandePayChequesReceives/' + Id);
  }

  EditPayChequeReceive() {
    return this.http.put(this.rootURL + '/demandePayChequesReceives/' + this.formDataReceive.id, this.formDataReceive, this.headers);
  }


  DeletePayChequeReceive(id) {
    return this.http.delete(this.rootURL + '/demandePayChequesReceives/' + id);
  }

  GetByUserCreator(userId) {
    return this.http.get<DemPayCheque[]>(this.rootURL + '/DemandePayCheques/GetByUserCreator/' + userId);
  }

  GetDemand(userId) {
    return this.http.get<DemPayCheque[]>(this.rootURL + '/DemandePayCheques/GetDemand/' + userId);
  }

  GetHistorique(id) {
    return this.http.get<DemPayCheque>(this.rootURL + '/DemandePayCheques/GetHistorique/' + id);
  }

  EditDemandByRole(Id: number, userEtat: string) {
    return this.http.get<DemPayCheque>(this.rootURL + '/DemandePayCheques/EditDemandByRole/' + Id + '/' + userEtat, this.headers);

  }
}
