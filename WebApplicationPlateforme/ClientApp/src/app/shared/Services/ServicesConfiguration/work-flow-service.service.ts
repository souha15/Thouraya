import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceWorkFlow } from './service-work-flow.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkFlowServiceService {
  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ServiceWorkFlow;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create ServiceWorkFlow

  Add(ServiceWorkFlow: ServiceWorkFlow) {
    return this.http.post<ServiceWorkFlow>(this.rootURL + '/ConfigServices', ServiceWorkFlow, this.headers);
  }

  PutObservableE(Transaction: ServiceWorkFlow) {
    return this.http.put<ServiceWorkFlow>(this.rootURL + '/ConfigServices/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/ConfigServices', this.formData, this.headers);
  }

  //Get ServiceWorkFlow List

  Get(): Observable<ServiceWorkFlow[]> {
    return this.http.get<ServiceWorkFlow[]>(this.rootURL + '/ConfigServices');
  }


  //Get ServiceWorkFlow By Id

  GetById(Id) {
    return this.http.get<ServiceWorkFlow>(this.rootURL + '/ConfigServices/' + Id);
  }

  // Test if serviceId exist
  TestIfServiceExist(Id) {
    return this.http.get<boolean>(this.rootURL + '/ConfigServices/TestIfServiceExist/' + Id);
  }
  //Edit ServiceWorkFlow

  Edit() {
    return this.http.put(this.rootURL + '/ConfigServices/' + this.formData.id, this.formData, this.headers);
  }


  //Delete ServiceWorkFlow

  Delete(id) {
    return this.http.delete(this.rootURL + '/ConfigServices/' + id);
  }

}
