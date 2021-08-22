import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../../Models/User/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  list: Role[];
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }
  //readonly rootURL = 'http://localhost:53847/api';
  readonly rootURL = this.shared.getPath();

  constructor(private http: HttpClient, private shared: PathSharedService) { }

  getClaimsK() {
    return this.http.get<Role[]>(this.rootURL + '/Role');

  }

  getRole() {
    return this.http.get(this.rootURL + '/Role')
      .toPromise()
      .then(res => this.list = res as Role[])
  }

  getAllRoles() {
    return this.http.get(this.rootURL + '/Role');
  }
}
