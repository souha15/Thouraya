import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { LesServices } from '../../Models/Dotations/les-services.model';

@Injectable({
  providedIn: 'root'
})
export class LesServicesService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: LesServices;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create LesServices

  Add(lesServices: LesServices) {
    return this.http.post<LesServices>(this.rootURL + '/LesServices', lesServices, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/LesServices', this.formData, this.headers);
  }

  //Get LesServices List

  Get(): Observable<LesServices[]> {
    return this.http.get<LesServices[]>(this.rootURL + '/LesServices');
  }

  //Get LesServices By Id

  GetById(Id) {
    return this.http.get<LesServices>(this.rootURL + '/LesServices/' + Id);
  }

  //Edit LesServices

  Edit() {
    return this.http.put(this.rootURL + '/LesServices/' + this.formData.id, this.formData, this.headers);
  }


  //Delete LesServices

  Delete(id) {
    return this.http.delete(this.rootURL + '/LesServices/' + id);
  }
}
