import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaintenanceRequest } from '../../Models/ServiceRh/maintenance-request.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: MaintenanceRequest;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create MaintenanceRequest

  Add(MaintenanceRequest: MaintenanceRequest) {
    return this.http.post<MaintenanceRequest>(this.rootURL + '/MaintenanceRequests', MaintenanceRequest, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/MaintenanceRequests', this.formData, this.headers);
  }


  PutObservableE(Transaction: MaintenanceRequest) {
    return this.http.put<MaintenanceRequest>(this.rootURL + '/MaintenanceRequests/' + Transaction.id, Transaction, this.headers);
  }

  //Get MaintenanceRequest List

  Get(): Observable<MaintenanceRequest[]> {
    return this.http.get<MaintenanceRequest[]>(this.rootURL + '/MaintenanceRequests');
  }

  //Get MaintenanceRequest By Id

  GetById(Id) {
    return this.http.get<MaintenanceRequest>(this.rootURL + '/MaintenanceRequests/' + Id);
  }

  //Edit MaintenanceRequest

  Edit() {
    return this.http.put(this.rootURL + '/MaintenanceRequests/' + this.formData.id, this.formData, this.headers);
  }


  //Delete MaintenanceRequest

  Delete(id) {
    return this.http.delete(this.rootURL + '/MaintenanceRequests/' + id);
  }
}
