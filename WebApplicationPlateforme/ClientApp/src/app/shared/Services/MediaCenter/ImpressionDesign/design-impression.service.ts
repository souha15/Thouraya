import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DesignImpression } from '../../../Models/MediaCenter/ImpressionDesign/design-impression.model';

@Injectable({
  providedIn: 'root'
})
export class DesignImpressionService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: DesignImpression;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: DesignImpression) {
    return this.http.put<DesignImpression>(this.rootURL + '/DesignImpressions/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  Create(tache: DesignImpression) {
    return this.http.post<DesignImpression>(this.rootURL + '/DesignImpressions', tache, this.headers);
  }

  //Edit Cadeaux
  Edit() {
    return this.http.put(this.rootURL + '/DesignImpressions/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  List(): Observable<DesignImpression[]> {
    return this.http.get<DesignImpression[]>(this.rootURL + '/DesignImpressions');
  }

  //Delete Cadeaux

  Delete(id) {
    return this.http.delete(this.rootURL + '/DesignImpressions/' + id);
  }

  //Put Cadeaux


  Put(Id) {
    return this.http.put(this.rootURL + '/DesignImpressions/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetById(Id) {
    return this.http.get<DesignImpression>(this.rootURL + '/DesignImpressions/' + Id);
  }
}
