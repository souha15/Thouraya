import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MacAddressTable } from '../../Models/Pointage/mac-address-table.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MacAddressTableService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: MacAddressTable;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create TacheEv

  Add(dotation: MacAddressTable) {
    return this.http.post<MacAddressTable>(this.rootURL + '/AddresseMacs', dotation, this.headers);
  }


  Post() {
    return this.http.post(this.rootURL + '/AddresseMacs', this.formData, this.headers);
  }



  Get(): Observable<MacAddressTable[]> {
    return this.http.get<MacAddressTable[]>(this.rootURL + '/AddresseMacs');
  }

  List() {
    return this.http.get<MacAddressTable[]>(this.rootURL + '/AddresseMacs');
  }


  GetById(Id) {
    return this.http.get<MacAddressTable>(this.rootURL + '/AddresseMacs/' + Id);
  }



  Edit() {
    return this.http.put(this.rootURL + '/AddresseMacs/' + this.formData.id, this.formData, this.headers);
  }



  Delete(id) {
    return this.http.delete(this.rootURL + '/AddresseMacs/' + id);
  }


  PutObservableE(Transaction: MacAddressTable) {
    return this.http.put<MacAddressTable>(this.rootURL + '/AddresseMacs/' + Transaction.id, Transaction, this.headers);

  }

}
