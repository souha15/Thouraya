import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { NotifCars } from '../../Models/voiture/notif-cars.model';

@Injectable({
  providedIn: 'root'
})
export class NotifCarsService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: NotifCars;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: NotifCars) {
    return this.http.post<NotifCars>(this.rootURL + '/NotifCars', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/NotifCars', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<NotifCars[]> {
    return this.http.get<NotifCars[]>(this.rootURL + '/NotifCars');
  }

  Get() {
    return this.http.get<NotifCars[]>(this.rootURL + '/NotifCars');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<NotifCars>(this.rootURL + '/NotifCars/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/NotifCars/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/NotifCars/' + id);
  }
}
