import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../../Models/News/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: News;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: News) {
    return this.http.post<News>(this.rootURL + '/Newsis', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/Newsis', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<News[]> {
    return this.http.get<News[]>(this.rootURL + '/Newsis');
  }

  Get() {
    return this.http.get<News[]>(this.rootURL + '/Newsis');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<News>(this.rootURL + '/Newsis/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/Newsis/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/Newsis/' + id);
  }
}

