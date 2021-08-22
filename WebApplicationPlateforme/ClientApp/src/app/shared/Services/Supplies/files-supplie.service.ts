import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilesSupplie } from '../../Models/Supplies/files-supplie.model';

@Injectable({
  providedIn: 'root'
})
export class FilesSupplieService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesSupplie;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Supplie

  Add(Supplie: FilesSupplie) {
    return this.http.post<FilesSupplie>(this.rootURL + '/FilesSupplies', Supplie, this.headers);
  }

  PutObservableE(Transaction: FilesSupplie) {
    return this.http.put<FilesSupplie>(this.rootURL + '/FilesSupplies/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/FilesSupplies', this.formData, this.headers);
  }

  //Get Supplie List

  Get(): Observable<FilesSupplie[]> {
    return this.http.get<FilesSupplie[]>(this.rootURL + '/FilesSupplies');
  }

  //Get Supplie By Id

  GetById(Id) {
    return this.http.get<FilesSupplie>(this.rootURL + '/FilesSupplies/' + Id);
  }

  //Edit Supplie

  Edit() {
    return this.http.put(this.rootURL + '/FilesSupplies/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Supplie

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilesSupplies/' + id);
  }

}

