import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DemandeVoiture } from '../../Models/DemandeVoiture/demande-voiture.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeVoitureService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: DemandeVoiture;

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create DemandeVoiture

  Add(DemandeVoiture: DemandeVoiture) {
    return this.http.post<DemandeVoiture>(this.rootURL + '/DemandeVoitures', DemandeVoiture, this.headers);
  }

  PutObservableE(Transaction: DemandeVoiture) {
    return this.http.put<DemandeVoiture>(this.rootURL + '/DemandeVoitures/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/DemandeVoitures', this.formData, this.headers);
  }

  //Get DemandeVoiture List

  Get(): Observable<DemandeVoiture[]> {
    return this.http.get<DemandeVoiture[]>(this.rootURL + '/DemandeVoitures');
  }

  //Get DemandeVoiture By Id

  GetById(Id) {
    return this.http.get<DemandeVoiture>(this.rootURL + '/DemandeVoitures/' + Id);
  }

  //Edit DemandeVoiture

  Edit() {
    return this.http.put(this.rootURL + '/DemandeVoitures/' + this.formData.id, this.formData, this.headers);
  }


  //Delete DemandeVoiture

  Delete(id) {
    return this.http.delete(this.rootURL + '/DemandeVoitures/' + id);
  }
}
