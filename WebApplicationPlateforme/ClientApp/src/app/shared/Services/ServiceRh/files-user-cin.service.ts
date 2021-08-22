import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesUserCin } from '../../Models/ServiceRh/files-user-cin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesUserCinService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesUserCin;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create FilesUserCin

  Add(FilesUserCin: FilesUserCin) {
    return this.http.post<FilesUserCin>(this.rootURL + '/FilesUserCins', FilesUserCin, this.headers);
  }

  PutObservableE(FilesUserCin: FilesUserCin) {
    return this.http.put<FilesUserCin>(this.rootURL + '/FilesUserCins/' + FilesUserCin.id, FilesUserCin, this.headers);

  }

  Post() {
    return this.http.post(this.rootURL + '/FilesUserCins', this.formData, this.headers);
  }

  //Get FilesUserCin List

  Get(): Observable<FilesUserCin[]> {
    return this.http.get<FilesUserCin[]>(this.rootURL + '/FilesUserCins');
  }

  //Get FilesUserCin By Id

  GetById(Id) {
    return this.http.get<FilesUserCin>(this.rootURL + '/FilesUserCins/' + Id);
  }

  //Edit FilesUserCin

  Edit() {
    return this.http.put(this.rootURL + '/FilesUserCins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete FilesUserCin

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilesUserCins/' + id);
  }
}

