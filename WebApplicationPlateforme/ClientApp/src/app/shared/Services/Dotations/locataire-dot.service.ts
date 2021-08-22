import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { LocataireDot } from '../../Models/Dotations/locataire-dot.model';

@Injectable({
  providedIn: 'root'
})
export class LocataireDotService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: LocataireDot;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create LocataireDot

  Add(dotation: LocataireDot) {
    return this.http.post<LocataireDot>(this.rootURL + '/locataireDots', dotation, this.headers);
  }

  PutObservable(unite: LocataireDot) {
    return this.http.put<LocataireDot>(this.rootURL + '/locataireDots/' + unite.id, unite, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/locataireDots', this.formData, this.headers);
  }

  //Get dotation List

  Get(): Observable<LocataireDot[]> {
    return this.http.get<LocataireDot[]>(this.rootURL + '/locataireDots');
  }

  //Get LocataireDot By Id

  GetById(Id) {
    return this.http.get<LocataireDot>(this.rootURL + '/locataireDots/' + Id);
  }

  //Edit LocataireDot

  Edit() {
    return this.http.put(this.rootURL + '/locataireDots/' + this.formData.id, this.formData, this.headers);
  }


  //Delete LocataireDot

  Delete(id) {
    return this.http.delete(this.rootURL + '/locataireDots/' + id);
  }
}
