import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SideMenuUnderMain } from '../../Models/MenuSettings/side-menu-under-main.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideMenuUnderMainService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: SideMenuUnderMain;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: SideMenuUnderMain) {
    return this.http.put<SideMenuUnderMain>(this.rootURL + '/SideMenuUnderMains/' + Transaction.id, Transaction, this.headers);

  }
  //Create SideMenuUnderMain

  Create(tache: SideMenuUnderMain) {
    return this.http.post<SideMenuUnderMain>(this.rootURL + '/SideMenuUnderMains', tache, this.headers);
  }

  //Edit SideMenuUnderMain
  Edit() {
    return this.http.put(this.rootURL + '/SideMenuUnderMains/' + this.formData.id, this.formData, this.headers);
  }

  // List SideMenuUnderMain

  List(): Observable<SideMenuUnderMain[]> {
    return this.http.get<SideMenuUnderMain[]>(this.rootURL + '/SideMenuUnderMains');
  }

  //Delete SideMenuUnderMain

  Delete(id) {
    return this.http.delete(this.rootURL + '/SideMenuUnderMains/' + id);
  }

  //Put SideMenuUnderMain


  Put(Id) {
    return this.http.put(this.rootURL + '/SideMenuUnderMains/' + this.formData.id, this.formData, this.headers);
  }

  //Get SideMenuUnderMain By Id

  GetById(Id) {
    return this.http.get<SideMenuUnderMain>(this.rootURL + '/SideMenuUnderMains/' + Id);
  }
}
