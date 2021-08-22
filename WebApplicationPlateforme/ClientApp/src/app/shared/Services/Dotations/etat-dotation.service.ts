import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EtatDotation } from '../../Models/Dotations/etat-dotation.model';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtatDotationService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: EtatDotation;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Etat Dotation

  Add(dotation: EtatDotation) {
    return this.http.post<EtatDotation>(this.rootURL + '/etatDotations', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/etatDotations', this.formData, this.headers);
  }

  //Get Etat dotation List

  GetDotation(): Observable<EtatDotation[]> {
    return this.http.get<EtatDotation[]>(this.rootURL + '/etatDotations');
  }

  Get() {
    return this.http.get<EtatDotation[]>(this.rootURL + '/etatDotations');
  }
  //Get Etat Dotation By Id

  GetById(Id) {
    return this.http.get<EtatDotation>(this.rootURL + '/etatDotations/' + Id);
  }

  //Edit Etat Dotation

  Edit() {
    return this.http.put(this.rootURL + '/etatDotations/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Etat Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/etatDotations/' + id);
  }
}
