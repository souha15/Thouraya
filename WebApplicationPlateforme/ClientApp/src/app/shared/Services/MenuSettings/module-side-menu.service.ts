import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { ModuleSideMenu } from '../../Models/MenuSettings/module-side-menu.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleSideMenuService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ModuleSideMenu;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: ModuleSideMenu) {
    return this.http.put<ModuleSideMenu>(this.rootURL + '/ModuleSideMenus/' + Transaction.id, Transaction, this.headers);

  }
  //Create ModuleSideMenu

  Create(tache: ModuleSideMenu) {
    return this.http.post<ModuleSideMenu>(this.rootURL + '/ModuleSideMenus', tache, this.headers);
  }

  //Edit ModuleSideMenu
  Edit() {
    return this.http.put(this.rootURL + '/ModuleSideMenus/' + this.formData.id, this.formData, this.headers);
  }

  // List ModuleSideMenu

  List(): Observable<ModuleSideMenu[]> {
    return this.http.get<ModuleSideMenu[]>(this.rootURL + '/ModuleSideMenus');
  }

  //Delete ModuleSideMenu

  Delete(id) {
    return this.http.delete(this.rootURL + '/ModuleSideMenus/' + id);
  }

  //Put ModuleSideMenu


  Put(Id) {
    return this.http.put(this.rootURL + '/ModuleSideMenus/' + this.formData.id, this.formData, this.headers);
  }

  //Get ModuleSideMenu By Id

  GetById(Id) {
    return this.http.get<ModuleSideMenu>(this.rootURL + '/ModuleSideMenus/' + Id);
  }
}
