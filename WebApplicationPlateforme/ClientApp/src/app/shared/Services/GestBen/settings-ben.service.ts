import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbListening } from '../../Models/Evenements/tb-listening.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsBenService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TbListening;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create TypeBens

  AddTBen(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeBens', dotation, this.headers);
  }


  PostTBen() {
    return this.http.post(this.rootURL + '/TypeBens', this.formData, this.headers);
  }



  GetTBen(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeBens');
  }

  GetTBen2() {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeBens');
  }


  GetByIdTBen(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeBens/' + Id);
  }



  EditTBen() {
    return this.http.put(this.rootURL + '/TypeBens/' + this.formData.id, this.formData, this.headers);
  }



  DeleteTBen(id) {
    return this.http.delete(this.rootURL + '/TypeBens/' + id);
  }

  // TypeDroit


  AddTD(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeDroits', dotation, this.headers);
  }


  PostTD() {
    return this.http.post(this.rootURL + '/TypeDroits', this.formData, this.headers);
  }



  GetTD(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeDroits');
  }

  GetTD2() {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeDroits');
  }


  GetByIdTD(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeDroits/' + Id);
  }



  EditTD() {
    return this.http.put(this.rootURL + '/TypeDroits/' + this.formData.id, this.formData, this.headers);
  }



  DeleteTD(id) {
    return this.http.delete(this.rootURL + '/TypeDroits/' + id);
  }


  // Type Maison


  AddTM(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeMaisons', dotation, this.headers);
  }


  PostTM() {
    return this.http.post(this.rootURL + '/TypeMaisons', this.formData, this.headers);
  }



  GetTM(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeMaisons');
  }

  GetTM2() {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeMaisons');
  }


  GetByIdTM(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeMaisons/' + Id);
  }



  EditTM() {
    return this.http.put(this.rootURL + '/TypeMaisons/' + this.formData.id, this.formData, this.headers);
  }



  DeleteTM(id) {
    return this.http.delete(this.rootURL + '/TypeMaisons/' + id);
  }


  // Type TypeRevBens


  AddTR(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeRevBens', dotation, this.headers);
  }


  PostTR() {
    return this.http.post(this.rootURL + '/TypeRevBens', this.formData, this.headers);
  }



  GetTR(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeRevBens');
  }

  GetTR2() {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeRevBens');
  }


  GetByIdTR(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeRevBens/' + Id);
  }



  EditTR() {
    return this.http.put(this.rootURL + '/TypeRevBens/' + this.formData.id, this.formData, this.headers);
  }



  DeleteTR(id) {
    return this.http.delete(this.rootURL + '/TypeRevBens/' + id);
  }


}
