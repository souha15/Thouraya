import { Injectable } from '@angular/core';
import { Interview } from '../../../Models/MediaCenter/Interview/interview.model';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Interview;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Interview

  Create(Interview: Interview) {
    return this.http.post<Interview>(this.rootURL + '/Interviews', Interview, this.headers);
  }

  //Edit Interview
  Edit() {
    return this.http.put(this.rootURL + '/Interviews/' + this.formData.id, this.formData, this.headers);
  }

  // List Interview

  List(): Observable<Interview[]> {
    return this.http.get<Interview[]>(this.rootURL + '/Interviews');
  }


  //Delete Interview

  Delete(id) {
    return this.http.delete(this.rootURL + '/Interviews/' + id);
  }

  //Put Interview

  PutObservable(Interview: Interview) {
    return this.http.put<Interview>(this.rootURL + '/Interviews/' + Interview.id, Interview, this.headers);
  }

  PutObservableTr(Interview: Interview) {
    return this.http.put<Interview>(this.rootURL + '/Interviews/' + Interview.id, Interview, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/Interviews/' + this.formData.id, this.formData, this.headers);
  }

  //Get Interview By Id

  GetById(Id) {
    return this.http.get<Interview>(this.rootURL + '/Interviews/' + Id);
  }
}
