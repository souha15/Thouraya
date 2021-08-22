import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilesCars } from '../../Models/Supplies/files-cars.model';

@Injectable({
  providedIn: 'root'
})
export class FilesCarService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesCars;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Supplie

  Add(Supplie: FilesCars) {
    return this.http.post<FilesCars>(this.rootURL + '/FilesVoitures', Supplie, this.headers);
  }

  PutObservableE(Transaction: FilesCars) {
    return this.http.put<FilesCars>(this.rootURL + '/FilesVoitures/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/FilesVoitures', this.formData, this.headers);
  }

  //Get Supplie List

  Get(): Observable<FilesCars[]> {
    return this.http.get<FilesCars[]>(this.rootURL + '/FilesVoitures');
  }

  //Get Supplie By Id

  GetById(Id) {
    return this.http.get<FilesCars>(this.rootURL + '/FilesVoitures/' + Id);
  }

  //Edit Supplie

  Edit() {
    return this.http.put(this.rootURL + '/FilesVoitures/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Supplie

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilesVoitures/' + id);
  }

}
