import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Permission } from '../../Models/RH/permission.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Permission;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: Permission) {
    return this.http.post<Permission>(this.rootURL + '/Permissions', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/Permissions', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.rootURL + '/Permissions');
  }

  Get() {
    return this.http.get<Permission[]>(this.rootURL + '/Permissions');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<Permission>(this.rootURL + '/Permissions/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/Permissions/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/Permission/' + id);
  }
}
