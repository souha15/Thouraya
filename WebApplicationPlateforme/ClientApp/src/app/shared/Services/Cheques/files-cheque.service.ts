import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilesChequesC } from '../../Models/Cheques/files-cheques-c.model';
@Injectable({
  providedIn: 'root'
})
export class FilesChequeService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesChequesC
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create FilesChequesC

  Add(FilesChequesC: FilesChequesC) {
    return this.http.post<FilesChequesC>(this.rootURL + '/FilesCheques', FilesChequesC, this.headers);
  }

  PutObservableE(Transaction: FilesChequesC) {
    return this.http.put<FilesChequesC>(this.rootURL + '/FilesCheques/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/FilesCheques', this.formData, this.headers);
  }

  //Get FilesChequesC List

  Get(): Observable<FilesChequesC[]> {
    return this.http.get<FilesChequesC[]>(this.rootURL + '/FilesCheques');
  }

  //Get FilesChequesC By Id

  GetById(Id) {
    return this.http.get<FilesChequesC>(this.rootURL + '/FilesCheques/' + Id);
  }

  //Edit FilesChequesC

  Edit() {
    return this.http.put(this.rootURL + '/FilesCheques/' + this.formData.id, this.formData, this.headers);
  }


  //Delete FilesChequesC

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilesCheques/' + id);
  }
}
