import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GuestSoiree } from '../../../Models/MediaCenter/OccaSoiree/guest-soiree.model';

@Injectable({
  providedIn: 'root'
})
export class GuestSoireeOccasionService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: GuestSoiree;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: GuestSoiree) {
    return this.http.put<GuestSoiree>(this.rootURL + '/GuestSoirees/' + Transaction.id, Transaction, this.headers);

  }
  //Create GuestSoiree

  Create(tache: GuestSoiree) {
    return this.http.post<GuestSoiree>(this.rootURL + '/GuestSoirees', tache, this.headers);
  }

  //Edit GuestSoiree
  Edit() {
    return this.http.put(this.rootURL + '/GuestSoirees/' + this.formData.id, this.formData, this.headers);
  }

  // List GuestSoiree

  List(): Observable<GuestSoiree[]> {
    return this.http.get<GuestSoiree[]>(this.rootURL + '/GuestSoirees');
  }

  //Delete GuestSoiree

  Delete(id) {
    return this.http.delete(this.rootURL + '/GuestSoirees/' + id);
  }

  //Put GuestSoiree


  Put(Id) {
    return this.http.put(this.rootURL + '/GuestSoirees/' + this.formData.id, this.formData, this.headers);
  }

  //Get GuestSoiree By Id

  GetById(Id) {
    return this.http.get<GuestSoiree>(this.rootURL + '/GuestSoirees/' + Id);
  }
}
