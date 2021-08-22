import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemPayCheque } from '../../Models/Cheques/dem-pay-cheque.model';
@Injectable({
  providedIn: 'root'
})
export class DemPayChequeService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: DemPayCheque
    ;
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
}
