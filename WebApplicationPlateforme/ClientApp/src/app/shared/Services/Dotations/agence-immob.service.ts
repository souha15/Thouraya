import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { AgenceImmob } from '../../Models/Dotations/agence-immob.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenceImmobService {
 

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: AgenceImmob;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: AgenceImmob) {
    return this.http.post<AgenceImmob>(this.rootURL + '/agenceImmobs', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/agenceImmobs', this.formData, this.headers);
  }

  //Get Type dotation List

  Get(): Observable<AgenceImmob[]> {
    return this.http.get<AgenceImmob[]>(this.rootURL + '/agenceImmobs');
  }

  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<AgenceImmob>(this.rootURL + '/agenceImmobs/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/agenceImmobs/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/agenceImmobs/' + id);
  }
}
