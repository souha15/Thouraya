import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganismeSupp } from '../../Models/Projet/organisme-supp.model';

@Injectable({
  providedIn: 'root'
})
export class OrgSuppService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: OrganismeSupp;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create OrganismeSupp

  Add(OrganismeSupp: OrganismeSupp) {
    return this.http.post<OrganismeSupp>(this.rootURL + '/OrganismeSupps', OrganismeSupp, this.headers);
  }

  PutObservableE(Transaction: OrganismeSupp) {
    return this.http.put<OrganismeSupp>(this.rootURL + '/OrganismeSupps/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/OrganismeSupps', this.formData, this.headers);
  }

  //Get OrganismeSupp List

  Get(): Observable<OrganismeSupp[]> {
    return this.http.get<OrganismeSupp[]>(this.rootURL + '/OrganismeSupps');
  }

  //Get OrganismeSupp By Id

  GetById(Id) {
    return this.http.get<OrganismeSupp>(this.rootURL + '/OrganismeSupps/' + Id);
  }

  //Edit OrganismeSupp

  Edit() {
    return this.http.put(this.rootURL + '/OrganismeSupps/' + this.formData.id, this.formData, this.headers);
  }


  //Delete OrganismeSupp

  Delete(id) {
    return this.http.delete(this.rootURL + '/OrganismeSupps/' + id);
  }

}
