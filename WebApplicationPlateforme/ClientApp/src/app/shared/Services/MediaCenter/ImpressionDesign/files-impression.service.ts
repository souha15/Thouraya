import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilesImpression } from '../../../Models/MediaCenter/ImpressionDesign/files-impression.model';

@Injectable({
  providedIn: 'root'
})
export class FilesImpressionService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesImpression;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: FilesImpression) {
    return this.http.put<FilesImpression>(this.rootURL + '/DesignFiles/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  Create(tache: FilesImpression) {
    return this.http.post<FilesImpression>(this.rootURL + '/DesignFiles', tache, this.headers);
  }

  //Edit Cadeaux
  Edit() {
    return this.http.put(this.rootURL + '/DesignFiles/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  List(): Observable<FilesImpression[]> {
    return this.http.get<FilesImpression[]>(this.rootURL + '/DesignFiles');
  }

  //Delete Cadeaux

  Delete(id) {
    return this.http.delete(this.rootURL + '/DesignFiles/' + id);
  }

  //Put Cadeaux


  Put(Id) {
    return this.http.put(this.rootURL + '/DesignFiles/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetById(Id) {
    return this.http.get<FilesImpression>(this.rootURL + '/DesignFiles/' + Id);
  }
}
