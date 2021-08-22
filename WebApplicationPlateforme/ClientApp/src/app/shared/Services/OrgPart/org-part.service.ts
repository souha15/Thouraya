import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrgPart } from '../../Models/OgPart/org-part.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgPartService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: OrgPart;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: OrgPart) {
    return this.http.post<OrgPart>(this.rootURL + '/OrgPartis', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/OrgPartis', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<OrgPart[]> {
    return this.http.get<OrgPart[]>(this.rootURL + '/OrgPartis');
  }

  Get() {
    return this.http.get<OrgPart[]>(this.rootURL + '/OrgPartis');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<OrgPart>(this.rootURL + '/OrgPartis/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/OrgPartis/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/OrgPartis/' + id);
  }
}
