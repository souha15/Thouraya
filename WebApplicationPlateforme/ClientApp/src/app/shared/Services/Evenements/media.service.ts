import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Media } from '../../Models/Evenements/media.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Media;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }




  //Create MediasEvs


  AddM(dotation: Media) {
    return this.http.post<Media>(this.rootURL + '/MediasEvs', dotation, this.headers);
  }


  PostM() {
    return this.http.post(this.rootURL + '/MediasEvs', this.formData, this.headers);
  }



  GetMediasEvs(): Observable<Media[]> {
    return this.http.get<Media[]>(this.rootURL + '/MediasEvs');
  }

  GetM() {
    return this.http.get<Media[]>(this.rootURL + '/MediasEvs');
  }


  GetByIdM(Id) {
    return this.http.get<Media>(this.rootURL + '/MediasEvs/' + Id);
  }



  EditM() {
    return this.http.put(this.rootURL + '/MediasEvs/' + this.formData.id, this.formData, this.headers);
  }



  DeleteM(id) {
    return this.http.delete(this.rootURL + '/MediasEvs/' + id);
  }
}
