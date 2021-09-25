import { Injectable } from '@angular/core';
import { PartageMedia } from '../../../Models/MediaCenter/PartageMedia/partage-media.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartageMediaService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: PartageMedia;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: PartageMedia) {
    return this.http.put<PartageMedia>(this.rootURL + '/PartageMedias/' + Transaction.id, Transaction, this.headers);

  }
  //Create Film

  Create(tache: PartageMedia) {
    return this.http.post<PartageMedia>(this.rootURL + '/PartageMedias', tache, this.headers);
  }

  //Edit Film
  Edit() {
    return this.http.put(this.rootURL + '/PartageMedias/' + this.formData.id, this.formData, this.headers);
  }

  // List Film

  List(): Observable<PartageMedia[]> {
    return this.http.get<PartageMedia[]>(this.rootURL + '/PartageMedias');
  }

  //Delete Film

  Delete(id) {
    return this.http.delete(this.rootURL + '/PartageMedias/' + id);
  }

  //Put Film


  Put(Id) {
    return this.http.put(this.rootURL + '/PartageMedias/' + this.formData.id, this.formData, this.headers);
  }

  //Get Film By Id

  GetById(Id) {
    return this.http.get<PartageMedia>(this.rootURL + '/PartageMedias/' + Id);
  }
}
