import { Injectable } from '@angular/core';
import { Dotation } from '../../Models/Dotations/dotation.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DotationService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Dotation;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Dotation

  Add(dotation: Dotation) {
    return this.http.post<Dotation>(this.rootURL + '/dotations', dotation, this.headers);
  }

  PutObservable(unite: Dotation) {
    return this.http.put<Dotation>(this.rootURL + '/dotations/' + unite.id, unite, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/dotations', this.formData, this.headers);
  }

  //Get dotation List

  Get(): Observable<Dotation[]> {
    return this.http.get<Dotation[]>(this.rootURL + '/dotations');
  }

  //Get Dotation By Id

  GetById(Id) {
    return this.http.get<Dotation>(this.rootURL + '/dotations/' + Id);
  }

  //Edit Dotation

  Edit() {
    return this.http.put(this.rootURL + '/dotations/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/dotations/' + id);
  }
}
