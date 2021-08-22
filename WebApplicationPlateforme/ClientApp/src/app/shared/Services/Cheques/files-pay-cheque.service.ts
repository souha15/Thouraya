import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilesPayChequesC } from '../../Models/Cheques/files-pay-cheques-c.model';
@Injectable({
  providedIn: 'root'
})
export class FilesPayChequeService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesPayChequesC
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create FilesPayChequesC

  Add(FilesPayChequesC: FilesPayChequesC) {
    return this.http.post<FilesPayChequesC>(this.rootURL + '/FilesPayCheques', FilesPayChequesC, this.headers);
  }

  PutObservableE(Transaction: FilesPayChequesC) {
    return this.http.put<FilesPayChequesC>(this.rootURL + '/FilesPayCheques/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/FilesPayCheques', this.formData, this.headers);
  }

  //Get FilesPayChequesC List

  Get(): Observable<FilesPayChequesC[]> {
    return this.http.get<FilesPayChequesC[]>(this.rootURL + '/FilesPayCheques');
  }

  //Get FilesPayChequesC By Id

  GetById(Id) {
    return this.http.get<FilesPayChequesC>(this.rootURL + '/FilesPayCheques/' + Id);
  }

  //Edit FilesPayChequesC

  Edit() {
    return this.http.put(this.rootURL + '/FilesPayCheques/' + this.formData.id, this.formData, this.headers);
  }


  //Delete FilesPayChequesC

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilesPayCheques/' + id);
  }
}
