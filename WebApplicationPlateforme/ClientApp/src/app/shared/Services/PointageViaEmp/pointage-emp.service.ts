import { Injectable } from '@angular/core';
import {  PointageEmp } from '../../Models/VointageViaEmp/pointage-emp.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointageEmpEmpService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  private apiDownloadUrl = this.rootURL + '/PointageEmpreintes/download';
  private apiDownloadUrlPresence = this.rootURL + '/PointageEmpreintes/downloadPresence';

  formData: PointageEmp;
  headers = {
    headers: new HttpHeaders({
      //'Content-Type': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    })
  }

  public downloadFile(file: string): Observable<HttpEvent<Blob>> {
    return this.http.request(new HttpRequest(
      'POST',
      `${this.apiDownloadUrl}?file=${file}`,
      null,
      {
        reportProgress: true,
        responseType: 'json'
      }));
  }

  public downloadFilePrensence(file: string): Observable<HttpEvent<Blob>> {
    return this.http.request(new HttpRequest(
      'POST',
      `${this.apiDownloadUrlPresence}?file=${file}`,
      null,
      {
        reportProgress: true,
        responseType: 'json'
      }));
  }

  getData(file: string): Observable<PointageEmp[]> {
    return this.http.get<PointageEmp[]>(this.rootURL + '/PointageEmpreintes/getData/' + file);
  }
  //Create PointageEmp

  Add(PointageEmp: PointageEmp) {
    return this.http.post<PointageEmp>(this.rootURL + '/PointageEmpreintes', PointageEmp, this.headers);
  }

  PutObservableE(Transaction: PointageEmp) {
    return this.http.put<PointageEmp>(this.rootURL + '/PointageEmpreintes/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/PointageEmpreintes', this.formData, this.headers);
  }

  //Get PointageEmp List

  Get(): Observable<PointageEmp[]> {
    return this.http.get<PointageEmp[]>(this.rootURL + '/PointageEmpreintes');
  }

  //Get PointageEmp By Id

  GetById(Id) {
    return this.http.get<PointageEmp>(this.rootURL + '/PointageEmpreintes/' + Id);
  }

  //Edit PointageEmp

  Edit() {
    return this.http.put(this.rootURL + '/PointageEmpreintes/' + this.formData.id, this.formData, this.headers);
  }


  //Delete PointageEmp

  Delete(id) {
    return this.http.delete(this.rootURL + '/PointageEmpreintes/' + id);
  }
}
