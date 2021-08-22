import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Locataire } from '../../Models/Dotations/locataire.model';

@Injectable({
  providedIn: 'root'
})
export class LocataireService {

 constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Locataire;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Locataire

  Add(Locataire: Locataire) {
    return this.http.post<Locataire>(this.rootURL + '/locataires', Locataire, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/locataires', this.formData, this.headers);
  }

  //Get Locataire List

  Get(): Observable<Locataire[]> {
    return this.http.get<Locataire[]>(this.rootURL + '/locataires');
  }

  //Get Locataire By Id

  GetById(Id) {
    return this.http.get<Locataire>(this.rootURL + '/locataires/' + Id);
  }

  //Edit Locataire

  Edit() {
    return this.http.put(this.rootURL + '/locataires/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Locataire

  Delete(id) {
    return this.http.delete(this.rootURL + '/locataires/' + id);
  }
}
