import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OccasionSoiree } from '../../../Models/MediaCenter/OccaSoiree/occasion-soiree.model';

@Injectable({
  providedIn: 'root'
})
export class SoireeOccasionService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: OccasionSoiree;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: OccasionSoiree) {
    return this.http.put<OccasionSoiree>(this.rootURL + '/OccasionSoirees/' + Transaction.id, Transaction, this.headers);

  }
  //Create OccasionSoiree

  Create(tache: OccasionSoiree) {
    return this.http.post<OccasionSoiree>(this.rootURL + '/OccasionSoirees', tache, this.headers);
  }

  //Edit OccasionSoiree
  Edit() {
    return this.http.put(this.rootURL + '/OccasionSoirees/' + this.formData.id, this.formData, this.headers);
  }

  // List OccasionSoiree

  List(): Observable<OccasionSoiree[]> {
    return this.http.get<OccasionSoiree[]>(this.rootURL + '/OccasionSoirees');
  }

  //Delete OccasionSoiree

  Delete(id) {
    return this.http.delete(this.rootURL + '/OccasionSoirees/' + id);
  }

  //Put OccasionSoiree


  Put(Id) {
    return this.http.put(this.rootURL + '/OccasionSoirees/' + this.formData.id, this.formData, this.headers);
  }

  //Get OccasionSoiree By Id

  GetById(Id) {
    return this.http.get<OccasionSoiree>(this.rootURL + '/OccasionSoirees/' + Id);
  }
}
