import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilesPlaint } from '../../Models/User Services/files-plaint.model';

@Injectable({
  providedIn: 'root'
})
export class FilesPlaintFilesService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesPlaint;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create FilesPlaint

  Add(FilesPlaint: FilesPlaint) {
    return this.http.post<FilesPlaint>(this.rootURL + '/FilesPlaints', FilesPlaint, this.headers);
  }

  PutObservableE(Transaction: FilesPlaint) {
    return this.http.put<FilesPlaint>(this.rootURL + '/FilesPlaints/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/FilesPlaints', this.formData, this.headers);
  }

  //Get FilesPlaint List

  Get(): Observable<FilesPlaint[]> {
    return this.http.get<FilesPlaint[]>(this.rootURL + '/FilesPlaints');
  }

  //Get FilesPlaint By Id

  GetById(Id) {
    return this.http.get<FilesPlaint>(this.rootURL + '/FilesPlaints/' + Id);
  }

  //Edit FilesPlaint

  Edit() {
    return this.http.put(this.rootURL + '/FilesPlaints/' + this.formData.id, this.formData, this.headers);
  }


  //Delete FilesPlaint

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilesPlaints/' + id);
  }
}
