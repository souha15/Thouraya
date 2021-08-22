import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TypeUnite } from '../../Models/Dotations/type-unite.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeUniteService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TypeUnite;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: TypeUnite) {
    return this.http.post<TypeUnite>(this.rootURL + '/typeUnites', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/typeUnites', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<TypeUnite[]> {
    return this.http.get<TypeUnite[]>(this.rootURL + '/typeUnites');
  }

  Get() {
    return this.http.get<TypeUnite[]>(this.rootURL + '/typeUnites');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<TypeUnite>(this.rootURL + '/typeUnites/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/typeUnites/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/typeUnites/' + id);
  }
}
