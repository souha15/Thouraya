import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesPartageMedia } from '../../../Models/MediaCenter/PartageMedia/files-partage-media.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesPartageMediaService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesPartageMedia;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: FilesPartageMedia) {
    return this.http.put<FilesPartageMedia>(this.rootURL + '/PartageFiles/' + Transaction.id, Transaction, this.headers);

  }
  //Create Film

  Create(tache: FilesPartageMedia) {
    return this.http.post<FilesPartageMedia>(this.rootURL + '/PartageFiles', tache, this.headers);
  }

  //Edit Film
  Edit() {
    return this.http.put(this.rootURL + '/PartageFiles/' + this.formData.id, this.formData, this.headers);
  }

  // List Film

  List(): Observable<FilesPartageMedia[]> {
    return this.http.get<FilesPartageMedia[]>(this.rootURL + '/PartageFiles');
  }

  //Delete Film

  Delete(id) {
    return this.http.delete(this.rootURL + '/PartageFiles/' + id);
  }

  //Put Film


  Put(Id) {
    return this.http.put(this.rootURL + '/PartageFiles/' + this.formData.id, this.formData, this.headers);
  }

  //Get Film By Id

  GetById(Id) {
    return this.http.get<FilesPartageMedia>(this.rootURL + '/PartageFiles/' + Id);
  }
}
