import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesChangerRib } from '../../Models/ChangeRib/files-changer-rib.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesChangerRibService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesChangerRib;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: FilesChangerRib) {
    return this.http.put<FilesChangerRib>(this.rootURL + '/FilesDemChangeRibs/' + Transaction.id, Transaction, this.headers);

  }
  //Create Film

  Create(tache: FilesChangerRib) {
    return this.http.post<FilesChangerRib>(this.rootURL + '/FilesDemChangeRibs', tache, this.headers);
  }

  //Edit Film
  Edit() {
    return this.http.put(this.rootURL + '/FilesDemChangeRibs/' + this.formData.id, this.formData, this.headers);
  }

  // List Film

  List(): Observable<FilesChangerRib[]> {
    return this.http.get<FilesChangerRib[]>(this.rootURL + '/FilesDemChangeRibs');
  }

  //Delete Film

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilesDemChangeRibs/' + id);
  }

  //Put Film


  Put(Id) {
    return this.http.put(this.rootURL + '/FilesDemChangeRibs/' + this.formData.id, this.formData, this.headers);
  }

  //Get Film By Id

  GetById(Id) {
    return this.http.get<FilesChangerRib>(this.rootURL + '/FilesDemChangeRibs/' + Id);
  }
}
