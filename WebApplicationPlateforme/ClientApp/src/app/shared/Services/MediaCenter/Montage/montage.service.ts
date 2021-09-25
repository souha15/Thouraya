import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Montage } from '../../../Models/MediaCenter/Montage/montage.model';

@Injectable({
  providedIn: 'root'
})
export class MontageService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Montage;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Montage

  Create(Montage: Montage) {
    return this.http.post<Montage>(this.rootURL + '/montages', Montage, this.headers);
  }

  //Edit Montage
  Edit() {
    return this.http.put(this.rootURL + '/montages/' + this.formData.id, this.formData, this.headers);
  }

  // List Montage

  List(): Observable<Montage[]> {
    return this.http.get<Montage[]>(this.rootURL + '/montages');
  }


  //Delete Montage

  Delete(id) {
    return this.http.delete(this.rootURL + '/montages/' + id);
  }

  //Put Montage

  PutObservable(Montage: Montage) {
    return this.http.put<Montage>(this.rootURL + '/montages/' + Montage.id, Montage, this.headers);
  }

  PutObservableTr(Montage: Montage) {
    return this.http.put<Montage>(this.rootURL + '/montages/' + Montage.id, Montage, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/montages/' + this.formData.id, this.formData, this.headers);
  }

  //Get Montage By Id

  GetById(Id) {
    return this.http.get<Montage>(this.rootURL + '/montages/' + Id);
  }
}
