import { Injectable } from '@angular/core';
import { Location } from '../../Models/Dotations/location.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

 constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Location;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Location

  Add(Location: Location) {
    return this.http.post<Location>(this.rootURL + '/locationUnites', Location, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/locationUnites', this.formData, this.headers);
  }

  //Get Location List

  Get(): Observable<Location[]> {
    return this.http.get<Location[]>(this.rootURL + '/locationUnites');
  }

  //Get Location By Id

  GetById(Id) {
    return this.http.get<Location>(this.rootURL + '/locationUnites/' + Id);
  }

  //Edit Location

  Edit() {
    return this.http.put(this.rootURL + '/locationUnites/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Location

  Delete(id) {
    return this.http.delete(this.rootURL + '/locationUnites/' + id);
  }
}
