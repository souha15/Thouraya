import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BrancheTwo } from '../../Models/Finance/branche-two.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrancheTwoService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: BrancheTwo;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }
  //Create Branche two

  AddBt(dotation: BrancheTwo) {
    return this.http.post<BrancheTwo>(this.rootURL + '/BrancheTwoes', dotation, this.headers);
  }


  PostBt() {
    return this.http.post(this.rootURL + '/BrancheTwoes', this.formData, this.headers);
  }



  GetBrancheTwo(): Observable<BrancheTwo[]> {
    return this.http.get<BrancheTwo[]>(this.rootURL + '/BrancheTwoes');
  }

  GetBt() {
    return this.http.get<BrancheTwo[]>(this.rootURL + '/BrancheTwoes');
  }


  GetByIdBt(Id) {
    return this.http.get<BrancheTwo>(this.rootURL + '/BrancheTwoes/' + Id);
  }



  EditBt() {
    return this.http.put(this.rootURL + '/BrancheTwoes/' + this.formData.id, this.formData, this.headers);
  }



  DeleteBt(id) {
    return this.http.delete(this.rootURL + '/BrancheTwoes/' + id);
  }


}
