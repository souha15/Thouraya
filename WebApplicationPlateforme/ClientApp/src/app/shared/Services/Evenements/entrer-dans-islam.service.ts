import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EntrerDansIslam } from '../../Models/Evenements/entrer-dans-islam.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrerDansIslamService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: EntrerDansIslam;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create EntrerDansIslam

  Create(EntrerDansIslam: EntrerDansIslam) {
    return this.http.post<EntrerDansIslam>(this.rootURL + '/EntrerDansIslams', EntrerDansIslam, this.headers);
  }

  //Edit EntrerDansIslam
  Edit() {
    return this.http.put(this.rootURL + '/EntrerDansIslams/' + this.formData.id, this.formData, this.headers);
  }

  // List EntrerDansIslam

  List(): Observable<EntrerDansIslam[]> {
    return this.http.get<EntrerDansIslam[]>(this.rootURL + '/EntrerDansIslams');
  }


  //Delete EntrerDansIslam

  Delete(id) {
    return this.http.delete(this.rootURL + '/EntrerDansIslams/' + id);
  }

  //Put EntrerDansIslam

  PutObservable(EntrerDansIslam: EntrerDansIslam) {
    return this.http.put<EntrerDansIslam>(this.rootURL + '/EntrerDansIslams/' + EntrerDansIslam.id, EntrerDansIslam, this.headers);
  }

  PutObservableTr(EntrerDansIslam: EntrerDansIslam) {
    return this.http.put<EntrerDansIslam>(this.rootURL + '/EntrerDansIslams/' + EntrerDansIslam.id, EntrerDansIslam, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/EntrerDansIslams/' + this.formData.id, this.formData, this.headers);
  }

  //Get EntrerDansIslam By Id

  GetById(Id) {
    return this.http.get<EntrerDansIslam>(this.rootURL + '/EntrerDansIslams/' + Id);
  }
}
