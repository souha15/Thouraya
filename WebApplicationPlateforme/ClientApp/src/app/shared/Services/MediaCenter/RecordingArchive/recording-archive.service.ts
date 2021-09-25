import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecordingArchive } from '../../../Models/MediaCenter/RecordingArchive/recording-archive.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordingArchiveService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: RecordingArchive;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: RecordingArchive) {
    return this.http.put<RecordingArchive>(this.rootURL + '/RecordingArchives/' + Transaction.id, Transaction, this.headers);

  }
  //Create RecordingArchive

  CreateRecordingArchive(tache: RecordingArchive) {
    return this.http.post<RecordingArchive>(this.rootURL + '/RecordingArchives', tache, this.headers);
  }

  //Edit RecordingArchive
  EditRecordingArchive() {
    return this.http.put(this.rootURL + '/RecordingArchives/' + this.formData.id, this.formData, this.headers);
  }

  // List RecordingArchive

  ListRecordingArchive(): Observable<RecordingArchive[]> {
    return this.http.get<RecordingArchive[]>(this.rootURL + '/RecordingArchives');
  }

  //Delete RecordingArchive

  DeleteRecordingArchive(id) {
    return this.http.delete(this.rootURL + '/RecordingArchives/' + id);
  }

  //Put RecordingArchive

  PutRecordingArchiveObservable(tache: RecordingArchive, Id: number) {
    return this.http.put<RecordingArchive>(this.rootURL + '/RecordingArchives/' + Id, tache, this.headers);
  }

  PutRecordingArchive(Id) {
    return this.http.put(this.rootURL + '/RecordingArchives/' + this.formData.id, this.formData, this.headers);
  }

  //Get RecordingArchive By Id

  GetById(Id) {
    return this.http.get<RecordingArchive>(this.rootURL + '/RecordingArchives/' + Id);
  }
}
