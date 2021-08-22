import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';
import { TypeDotation } from '../../Models/Dotations/type-dotation.model';

@Injectable({
  providedIn: 'root'
})
export class TypeDotationService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TypeDotation;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: TypeDotation) {
    return this.http.post<TypeDotation>(this.rootURL + '/typeDotations', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/typeDotations', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<TypeDotation[]> {
    return this.http.get<TypeDotation[]>(this.rootURL + '/typeDotations');
  }

  Get() {
    return this.http.get<TypeDotation[]>(this.rootURL + '/typeDotations');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<TypeDotation>(this.rootURL + '/typeDotations/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/typeDotations/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/typeDotations/' + id);
  }
}
