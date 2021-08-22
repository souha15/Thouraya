import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EtatUnite } from '../../Models/Dotations/etat-unite.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtatUniteService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: EtatUnite;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: EtatUnite) {
    return this.http.post<EtatUnite>(this.rootURL + '/etatUnites', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/etatUnites', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<EtatUnite[]> {
    return this.http.get<EtatUnite[]>(this.rootURL + '/etatUnites');
  }

  Get() {
    return this.http.get<EtatUnite[]>(this.rootURL + '/etatUnites');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<EtatUnite>(this.rootURL + '/etatUnites/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/etatUnites/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/etatUnites/' + id);
  }
}
