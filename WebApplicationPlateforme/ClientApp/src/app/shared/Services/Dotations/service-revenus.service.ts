import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicesRevenus } from '../../Models/Dotations/services-revenus.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceRevenusService {
 
  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ServicesRevenus;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: ServicesRevenus) {
    return this.http.post<ServicesRevenus>(this.rootURL + '/servicesRevenus', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/servicesRevenus', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<ServicesRevenus[]> {
    return this.http.get<ServicesRevenus[]>(this.rootURL + '/servicesRevenus');
  }

  Get() {
    return this.http.get<ServicesRevenus[]>(this.rootURL + '/servicesRevenus');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<ServicesRevenus>(this.rootURL + '/servicesRevenus/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/servicesRevenus/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/servicesRevenus/' + id);
  }
}
