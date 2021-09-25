import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilesMontage } from '../../../Models/MediaCenter/Montage/files-montage.model';

@Injectable({
  providedIn: 'root'
})
export class FilesMontageService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesMontage;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create FilesMontage

  Create(FilesMontage: FilesMontage) {
    return this.http.post<FilesMontage>(this.rootURL + '/montageFiles', FilesMontage, this.headers);
  }

  //Edit FilesMontage
  Edit() {
    return this.http.put(this.rootURL + '/montageFiles/' + this.formData.id, this.formData, this.headers);
  }

  // List FilesMontage

  List(): Observable<FilesMontage[]> {
    return this.http.get<FilesMontage[]>(this.rootURL + '/montageFiles');
  }


  //Delete FilesMontage

  Delete(id) {
    return this.http.delete(this.rootURL + '/montageFiles/' + id);
  }

  //Put FilesMontage

  PutObservable(FilesMontage: FilesMontage) {
    return this.http.put<FilesMontage>(this.rootURL + '/montageFiles/' + FilesMontage.id, FilesMontage, this.headers);
  }

  PutObservableTr(FilesMontage: FilesMontage) {
    return this.http.put<FilesMontage>(this.rootURL + '/montageFiles/' + FilesMontage.id, FilesMontage, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/montageFiles/' + this.formData.id, this.formData, this.headers);
  }

  //Get FilesMontage By Id

  GetById(Id) {
    return this.http.get<FilesMontage>(this.rootURL + '/montageFiles/' + Id);
  }
}
