import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Residence } from '../../Models/User Services/residence.model';
@Injectable({
  providedIn: 'root'
})
export class ResidenceService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Residence;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Residence

  Add(Residence: Residence) {
    return this.http.post<Residence>(this.rootURL + '/Residences', Residence, this.headers);
  }

  PutObservableE(Transaction: Residence) {
    return this.http.put<Residence>(this.rootURL + '/Residences/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/Residences', this.formData, this.headers);
  }

  //Get Residence List

  Get(): Observable<Residence[]> {
    return this.http.get<Residence[]>(this.rootURL + '/Residences');
  }

  //Get Residence By Id

  GetById(Id) {
    return this.http.get<Residence>(this.rootURL + '/Residences/' + Id);
  }

  //Edit Residence

  Edit() {
    return this.http.put(this.rootURL + '/Residences/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Residence

  Delete(id) {
    return this.http.delete(this.rootURL + '/Residences/' + id);
  }
}
