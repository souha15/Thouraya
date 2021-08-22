import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { PrivilegesDetail } from '../../Models/User/privileges-detail.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: PrivilegesDetail;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  // Create Privileges
  CreatePrivilege(privileges: PrivilegesDetail) {
    return this.http.post<PrivilegesDetail>(this.rootURL + '/Privileges', privileges, this.headers);
  }

  // List Tache

  ListPrivilege(): Observable<PrivilegesDetail[]> {
    return this.http.get<PrivilegesDetail[]>(this.rootURL + '/Privileges');
  }

  //Delete Tache

  DeletePrivilege(id) {
    return this.http.delete(this.rootURL + '/Privileges/' + id);
  }

  //Put Tache

  PutPrivilegeObservable(privileges: PrivilegesDetail, Id: string) {
    return this.http.put<PrivilegesDetail>(this.rootURL + '/Privileges/' + Id, privileges, this.headers);
  }

  PutPrivilege(Id) {
    return this.http.put(this.rootURL + '/Privileges/' + this.formData.id, this.formData, this.headers);
  }

  EditPrivilege() {
    return this.http.put <PrivilegesDetail>(this.rootURL + '/Privileges/' + this.formData.id, this.formData, this.headers);
  }


  //Get Tache By Id

  GetById(Id) {
    return this.http.get<PrivilegesDetail>(this.rootURL + '/Privileges/' + Id);
  }
}
