import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SideMenuMain } from '../../Models/MenuSettings/side-menu-main.model';

@Injectable({
  providedIn: 'root'
})
export class SideMenuMainService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: SideMenuMain;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: SideMenuMain) {
    return this.http.put<SideMenuMain>(this.rootURL + '/SideMenuMains/' + Transaction.id, Transaction, this.headers);

  }
  //Create SideMenuMain

  Create(tache: SideMenuMain) {
    return this.http.post<SideMenuMain>(this.rootURL + '/SideMenuMains', tache, this.headers);
  }

  //Edit SideMenuMain
  Edit() {
    return this.http.put(this.rootURL + '/SideMenuMains/' + this.formData.id, this.formData, this.headers);
  }

  // List SideMenuMain

  List(): Observable<SideMenuMain[]> {
    return this.http.get<SideMenuMain[]>(this.rootURL + '/SideMenuMains');
  }

  //Delete SideMenuMain

  Delete(id) {
    return this.http.delete(this.rootURL + '/SideMenuMains/' + id);
  }

  //Put SideMenuMain


  Put(Id) {
    return this.http.put(this.rootURL + '/SideMenuMains/' + this.formData.id, this.formData, this.headers);
  }

  //Get SideMenuMain By Id

  GetById(Id) {
    return this.http.get<SideMenuMain>(this.rootURL + '/SideMenuMains/' + Id);
  }
}
