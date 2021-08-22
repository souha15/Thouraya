import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbListening } from '../../Models/Evenements/tb-listening.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TbListening;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }
  //Create TypeEquipement

  Add(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/Specialites', dotation, this.headers);
  }


  Post() {
    return this.http.post(this.rootURL + '/Specialites', this.formData, this.headers);
  }



  GetSpecialite(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/Specialites');
  }

  Get() {
    return this.http.get<TbListening[]>(this.rootURL + '/Specialites');
  }


  GetById(Id) {
    return this.http.get<TbListening>(this.rootURL + '/Specialites/' + Id);
  }



  Edit() {
    return this.http.put(this.rootURL + '/Specialites/' + this.formData.id, this.formData, this.headers);
  }



  Delete(id) {
    return this.http.delete(this.rootURL + '/Specialites/' + id);
  }
}
