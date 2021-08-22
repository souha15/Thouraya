import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjetOuvrier } from '../../Models/ProjetOrg/projet-ouvrier.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OuvrierProjetOuvrierOrgService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ProjetOuvrier;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create ProjetOuvrier

  Add(ProjetOuvrier: ProjetOuvrier) {
    return this.http.post<ProjetOuvrier>(this.rootURL + '/ProjetOuvriers', ProjetOuvrier, this.headers);
  }

  PutObservableE(Transaction: ProjetOuvrier) {
    return this.http.put<ProjetOuvrier>(this.rootURL + '/ProjetOuvriers/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/ProjetOuvriers', this.formData, this.headers);
  }

  //Get ProjetOuvrier List

  Get(): Observable<ProjetOuvrier[]> {
    return this.http.get<ProjetOuvrier[]>(this.rootURL + '/ProjetOuvriers');
  }

  //Get ProjetOuvrier By Id

  GetById(Id) {
    return this.http.get<ProjetOuvrier>(this.rootURL + '/ProjetOuvriers/' + Id);
  }

  //Edit ProjetOuvrier

  Edit() {
    return this.http.put(this.rootURL + '/ProjetOuvriers/' + this.formData.id, this.formData, this.headers);
  }


  //Delete ProjetOuvrier

  Delete(id) {
    return this.http.delete(this.rootURL + '/ProjetOuvriers/' + id);
  }

}
