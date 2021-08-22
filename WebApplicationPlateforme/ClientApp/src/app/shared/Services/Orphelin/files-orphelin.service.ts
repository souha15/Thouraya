import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesOrphelin } from '../../Models/Orphelin/files-orphelin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesOrphelinService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesOrphelin
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create FilesOrphelin

  Add(FilesOrphelin: FilesOrphelin) {
    return this.http.post<FilesOrphelin>(this.rootURL + '/FilesOrphelins', FilesOrphelin, this.headers);
  }

  PutObservableE(Transaction: FilesOrphelin) {
    return this.http.put<FilesOrphelin>(this.rootURL + '/FilesOrphelins/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/FilesOrphelins', this.formData, this.headers);
  }

  //Get FilesOrphelin List

  Get(): Observable<FilesOrphelin[]> {
    return this.http.get<FilesOrphelin[]>(this.rootURL + '/FilesOrphelins');
  }

  //Get FilesOrphelin By Id

  GetById(Id) {
    return this.http.get<FilesOrphelin>(this.rootURL + '/FilesOrphelins/' + Id);
  }

  //Edit FilesOrphelin

  Edit() {
    return this.http.put(this.rootURL + '/FilesOrphelins/' + this.formData.id, this.formData, this.headers);
  }


  //Delete FilesOrphelin

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilesOrphelins/' + id);
  }
}
