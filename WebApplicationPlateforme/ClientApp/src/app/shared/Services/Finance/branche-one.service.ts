import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BrancheOne } from '../../Models/Finance/branche-one.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrancheOneService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: BrancheOne;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  AddBo(dotation: BrancheOne) {
    return this.http.post<BrancheOne>(this.rootURL + '/BrancheOnes', dotation, this.headers);
  }


  PostBo() {
    return this.http.post(this.rootURL + '/BrancheOnes', this.formData, this.headers);
  }



  GetBrancheOne(): Observable<BrancheOne[]> {
    return this.http.get<BrancheOne[]>(this.rootURL + '/BrancheOnes');
  }

  GetBo() {
    return this.http.get<BrancheOne[]>(this.rootURL + '/BrancheOnes');
  }


  GetByIdBo(Id) {
    return this.http.get<BrancheOne>(this.rootURL + '/BrancheOnes/' + Id);
  }



  EditBo() {
    return this.http.put(this.rootURL + '/BrancheOnes/' + this.formData.id, this.formData, this.headers);
  }



  DeleteBo(id) {
    return this.http.delete(this.rootURL + '/BrancheOnes/' + id);
  }

}
