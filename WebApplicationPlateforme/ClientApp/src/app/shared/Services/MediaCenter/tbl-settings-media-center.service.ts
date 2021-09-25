import { Injectable } from '@angular/core';
import { TbListening } from '../../Models/Evenements/tb-listening.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TblSettingsMediaCenterService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TbListening
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //TypeRecording 

  AddRecording(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeRecordings', TbListening, this.headers);
  }

  PutObservableERecording(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/TypeRecordings/' + Transaction.id, Transaction, this.headers);

  }
  PostRecording() {
    return this.http.post(this.rootURL + '/TypeRecordings', this.formData, this.headers);
  }


  GetRecording(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeRecordings');
  }


  GetByIdRecording(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeRecordings/' + Id);
  }


  EditRecording() {
    return this.http.put(this.rootURL + '/TypeRecordings/' + this.formData.id, this.formData, this.headers);
  }

  DeleteRecording(id) {
    return this.http.delete(this.rootURL + '/TypeRecordings/' + id);
  }

  //TypeExthechnique 

  AddTypeExthechnique(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/ExthechniqueTypes', TbListening, this.headers);
  }

  PutObservableETypeExthechnique(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/ExthechniqueTypes/' + Transaction.id, Transaction, this.headers);

  }
  PostTypeExthechnique() {
    return this.http.post(this.rootURL + '/ExthechniqueTypes', this.formData, this.headers);
  }


  GetTypeExthechnique(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/ExthechniqueTypes');
  }


  GetByIdTypeExthechnique(Id) {
    return this.http.get<TbListening>(this.rootURL + '/ExthechniqueTypes/' + Id);
  }


  EditTypeExthechnique() {
    return this.http.put(this.rootURL + '/ExthechniqueTypes/' + this.formData.id, this.formData, this.headers);
  }

  DeleteTypeExthechnique(id) {
    return this.http.delete(this.rootURL + '/ExthechniqueTypes/' + id);
  }


  //Type Occasion 

  AddTypeOccasion(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/Occasions', TbListening, this.headers);
  }

  PutObservableETypeOccasion(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/Occasions/' + Transaction.id, Transaction, this.headers);

  }
  PostTypeOccasion() {
    return this.http.post(this.rootURL + '/Occasions', this.formData, this.headers);
  }


  GetTypeOccasion(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/Occasions');
  }


  GetByIdTypeOccasion(Id) {
    return this.http.get<TbListening>(this.rootURL + '/Occasions/' + Id);
  }


  EditTypeOccasion() {
    return this.http.put(this.rootURL + '/Occasions/' + this.formData.id, this.formData, this.headers);
  }

  DeleteTypeOccasion(id) {
    return this.http.delete(this.rootURL + '/Occasions/' + id);
  }

  // Honor
  AddTypeHonor(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/Honors', TbListening, this.headers);
  }

  PutObservableETypeHonor(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/Honors/' + Transaction.id, Transaction, this.headers);

  }
  PostTypeHonor() {
    return this.http.post(this.rootURL + '/Honors', this.formData, this.headers);
  }


  GetTypeHonor(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/Honors');
  }


  GetByIdTypeHonor(Id) {
    return this.http.get<TbListening>(this.rootURL + '/Honors/' + Id);
  }


  EditTypeHonor() {
    return this.http.put(this.rootURL + '/Honors/' + this.formData.id, this.formData, this.headers);
  }

  DeleteTypeHonor(id) {
    return this.http.delete(this.rootURL + '/Honors/' + id);
  }



  // Rendo
  AddTypeRendo(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/RendoneTypes', TbListening, this.headers);
  }

  PutObservableETypeRendo(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/RendoneTypes/' + Transaction.id, Transaction, this.headers);

  }
  PostTypeRendo() {
    return this.http.post(this.rootURL + '/RendoneTypes', this.formData, this.headers);
  }


  GetTypeRendo(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/RendoneTypes');
  }


  GetByIdTypeRendo(Id) {
    return this.http.get<TbListening>(this.rootURL + '/RendoneTypes/' + Id);
  }


  EditTypeRendo() {
    return this.http.put(this.rootURL + '/RendoneTypes/' + this.formData.id, this.formData, this.headers);
  }

  DeleteTypeRendo(id) {
    return this.http.delete(this.rootURL + '/RendoneTypes/' + id);
  }


  // Film
  AddTypeFilm(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/FilmsTypes', TbListening, this.headers);
  }

  PutObservableETypeFilm(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/FilmsTypes/' + Transaction.id, Transaction, this.headers);

  }
  PostTypeFilm() {
    return this.http.post(this.rootURL + '/FilmsTypes', this.formData, this.headers);
  }


  GetTypeFilm(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/FilmsTypes');
  }


  GetByIdTypeFilm(Id) {
    return this.http.get<TbListening>(this.rootURL + '/FilmsTypes/' + Id);
  }


  EditTypeFilm() {
    return this.http.put(this.rootURL + '/FilmsTypes/' + this.formData.id, this.formData, this.headers);
  }

  DeleteTypeFilm(id) {
    return this.http.delete(this.rootURL + '/FilmsTypes/' + id);
  }


  // PartageMedia
  AddPartageMedia(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/PartageMediaTypes', TbListening, this.headers);
  }

  PutObservableEPartageMedia(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/PartageMediaTypes/' + Transaction.id, Transaction, this.headers);

  }
  PostPartageMedia() {
    return this.http.post(this.rootURL + '/PartageMediaTypes', this.formData, this.headers);
  }


  GetPartageMedia(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/PartageMediaTypes');
  }


  GetByIdPartageMedia(Id) {
    return this.http.get<TbListening>(this.rootURL + '/PartageMediaTypes/' + Id);
  }


  EditPartageMedia() {
    return this.http.put(this.rootURL + '/PartageMediaTypes/' + this.formData.id, this.formData, this.headers);
  }

  DeletePartageMedia(id) {
    return this.http.delete(this.rootURL + '/PartageMediaTypes/' + id);
  }

  // Occasion SOiree
  AddOccSoi(TbListening: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/SoireeTypes', TbListening, this.headers);
  }

  PutObservableEOccSoi(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/SoireeTypes/' + Transaction.id, Transaction, this.headers);

  }
  PostOccSoi() {
    return this.http.post(this.rootURL + '/SoireeTypes', this.formData, this.headers);
  }


  GetOccSoi(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/SoireeTypes');
  }


  GetByIdOccSoi(Id) {
    return this.http.get<TbListening>(this.rootURL + '/SoireeTypes/' + Id);
  }


  EditOccSoi() {
    return this.http.put(this.rootURL + '/SoireeTypes/' + this.formData.id, this.formData, this.headers);
  }

  DeleteOccSoi(id) {
    return this.http.delete(this.rootURL + '/SoireeTypes/' + id);
  }

}
