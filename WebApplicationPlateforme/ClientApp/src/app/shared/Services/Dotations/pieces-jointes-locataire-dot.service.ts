import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PiecesJointesLocataireDot } from '../../Models/Dotations/pieces-jointes-locataire-dot.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PiecesJointesLocataireDotService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: PiecesJointesLocataireDot;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create LocataireDot

  Add(dotation: PiecesJointesLocataireDot) {
    return this.http.post<PiecesJointesLocataireDot>(this.rootURL + '/PiecesJointesDotLocs', dotation, this.headers);
  }

  PutObservable(unite: PiecesJointesLocataireDot) {
    return this.http.put<PiecesJointesLocataireDot>(this.rootURL + '/PiecesJointesDotLocs/' + unite.id, unite, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/PiecesJointesDotLocs', this.formData, this.headers);
  }

  //Get dotation List

  Get(): Observable<PiecesJointesLocataireDot[]> {
    return this.http.get<PiecesJointesLocataireDot[]>(this.rootURL + '/PiecesJointesDotLocs');
  }

  //Get LocataireDot By Id

  GetById(Id) {
    return this.http.get<PiecesJointesLocataireDot>(this.rootURL + '/PiecesJointesDotLocs/' + Id);
  }

  //Edit LocataireDot

  Edit() {
    return this.http.put(this.rootURL + '/PiecesJointesDotLocs/' + this.formData.id, this.formData, this.headers);
  }


  //Delete LocataireDot

  Delete(id) {
    return this.http.delete(this.rootURL + '/PiecesJointesDotLocs/' + id);
  }
}
