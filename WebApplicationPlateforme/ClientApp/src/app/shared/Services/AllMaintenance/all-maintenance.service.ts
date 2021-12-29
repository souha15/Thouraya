import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AllMaintenance } from '../../Models/AllMaintenance/all-maintenance.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllMaintenanceService {
  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: AllMaintenance
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  // 

  Add(AllMaintenance: AllMaintenance) {
    return this.http.post<AllMaintenance>(this.rootURL + '/AllTypeOfMaintenances', AllMaintenance, this.headers);
  }

  PutObservableE(Transaction: AllMaintenance) {
    return this.http.put<AllMaintenance>(this.rootURL + '/AllTypeOfMaintenances/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/AllTypeOfMaintenances', this.formData, this.headers);
  }


  Get(): Observable<AllMaintenance[]> {
    return this.http.get<AllMaintenance[]>(this.rootURL + '/AllTypeOfMaintenances');
  }


  GetByDir(id: string): Observable<AllMaintenance[]> {
    return this.http.get<AllMaintenance[]>(this.rootURL + '/AllMaintenanceByUserCreator/ByDir/'+id);
  }


  GetByUser(id :string): Observable<AllMaintenance[]> {
    return this.http.get<AllMaintenance[]>(this.rootURL + '/AllMaintenanceByUserCreator/ByUserCreator/'+id);
  }


  GetByEmployee(id: string): Observable<AllMaintenance[]> {
    return this.http.get<AllMaintenance[]>(this.rootURL + '/AllMaintenanceByUserCreator/ByEmployee/'+id);

  }


  GetById(Id) {
    return this.http.get<AllMaintenance>(this.rootURL + '/AllTypeOfMaintenances/' + Id);
  }


  Edit() {
    return this.http.put(this.rootURL + '/AllTypeOfMaintenances/' + this.formData.id, this.formData, this.headers);
  }

  Delete(id) {
    return this.http.delete(this.rootURL + '/AllTypeOfMaintenances/' + id);
  }
}
