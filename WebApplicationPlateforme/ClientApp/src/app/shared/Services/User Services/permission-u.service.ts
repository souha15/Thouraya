import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PermissionU } from '../../Models/User Services/permission-u.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionUService {
  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: PermissionU;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create PermissionU

  Add(PermissionU: PermissionU) {
    return this.http.post<PermissionU>(this.rootURL + '/PermissionUs', PermissionU, this.headers);
  }

  PutObservableE(Transaction: PermissionU) {
    return this.http.put<PermissionU>(this.rootURL + '/PermissionUs/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/PermissionUs', this.formData, this.headers);
  }

  //Get PermissionU List

  Get(): Observable<PermissionU[]> {
    return this.http.get<PermissionU[]>(this.rootURL + '/PermissionUs');
  }

  //Get PermissionU By Id

  GetById(Id) {
    return this.http.get<PermissionU>(this.rootURL + '/PermissionUs/' + Id);
  }

  //Edit PermissionU

  Edit() {
    return this.http.put(this.rootURL + '/PermissionUs/' + this.formData.id, this.formData, this.headers);
  }


  //Delete PermissionU

  Delete(id) {
    return this.http.delete(this.rootURL + '/PermissionUs/' + id);
  }
}
