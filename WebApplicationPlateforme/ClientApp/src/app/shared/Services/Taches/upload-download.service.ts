import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PiecesJointes } from '../../Models/Taches/pieces-jointes.model';
import { PiecesJointesLocataire } from '../../Models/Dotations/pieces-jointes-locataire.model';
import { PiecesJointesRevenus } from '../../Models/Dotations/pieces-jointes-revenus.model';
import { PiecesjointerevenusService } from '../Dotations/piecesjointerevenus.service';
import { ContratLocation } from '../../Models/Dotations/contrat-location.model';
import { PiecesJointesTr } from '../../Models/AdministrativeCommunication/pieces-jointes-tr.model';
import { PiecesJointesEv } from '../../Models/Evenements/pieces-jointes-ev.model';
import { PiecesJointesRc } from '../../Models/RH/pieces-jointes-rc.model';
import { PiecesJointesFacture } from '../../Models/Finance/pieces-jointes-facture.model';
import { PiecesJointesCF } from '../../Models/Finance/pieces-jointes-cf.model';
import { PiecesJointesRecepCheque } from '../../Models/Finance/pieces-jointes-recep-cheque.model';
import { PiecesJointesEventsTwo } from '../../Models/EventsTwo/pieces-jointes-events-two.model';

@Injectable({
  providedIn: 'root'
})
export class UploadDownloadService {

  private baseApiUrl: string;
  private apiDownloadUrl: string;
  private apiUploadUrl: string;
  private apiFileUrl: string;


  constructor(private pathService: PathSharedService,
    private httpClient: HttpClient) {
    this.baseApiUrl = this.pathService.getPath();
    this.apiDownloadUrl = this.baseApiUrl + '/UploadDownload/download';
    this.apiUploadUrl = this.baseApiUrl + '/UploadDownload/upload';
    this.apiFileUrl = this.baseApiUrl + '/UploadDownload/files';

  }


  readonly rootURL = this.pathService.getPath();
  formData: PiecesJointes;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  public downloadFile(file: string): Observable<HttpEvent<Blob>> {
    return this.httpClient.request(new HttpRequest(
      'GET',
      `${this.apiDownloadUrl}?file=${file}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }

  public uploadFile(file: Blob): Observable<HttpEvent<void>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.request(new HttpRequest(
      'POST',
      this.apiUploadUrl,
      formData,
      {
        reportProgress: true
      }));
  }

  //Get Files list from wwroot

  public getFiles(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiFileUrl);
  }

  //Save file

  savefileRc() {
    return this.httpClient.post(this.rootURL + '/PiecesJointesRcs', this.apiFileUrl)
  }

  savefileEv() {
    return this.httpClient.post(this.rootURL + '/PiecesJointesEvents', this.apiFileUrl)
  }


  savefile() {
    return this.httpClient.post(this.rootURL + '/PiecesJointes', this.apiFileUrl)
  }


  savefileL() {
    return this.httpClient.post(this.rootURL + '/piecesjointesLocataires', this.apiFileUrl)
  }

  savefileR() {
    return this.httpClient.post(this.rootURL + '/piecesjointesRevenus', this.apiFileUrl)
  }

  savefileC() {
    return this.httpClient.post(this.rootURL + '/contratLocations', this.apiFileUrl)
  }

  savefileTr() {
    return this.httpClient.post(this.rootURL + '/PiecesJointesTrs', this.apiFileUrl)
  }
  
  savefileTrE() {
    return this.httpClient.post(this.rootURL + '/PiecesJointeEs', this.apiFileUrl)
  }

  savefileTrI() {
    return this.httpClient.post(this.rootURL + '/PiecesJointesIs', this.apiFileUrl)
  }
  // Get list of files from DataBase
  
  getallRc() {
    return this.httpClient.get<PiecesJointesRc[]>(this.rootURL + '/PiecesJointesRcs');
  }


  getallEv() {
    return this.httpClient.get<PiecesJointes[]>(this.rootURL + '/PiecesJointesEvents');
  }

  getall() {
    return this.httpClient.get<PiecesJointes[]>(this.rootURL + '/PiecesJointes');
  }

  getallL() {
    return this.httpClient.get<PiecesJointesLocataire[]>(this.rootURL + '/piecesjointesLocataires');
  }

  getallR() {
    return this.httpClient.get<PiecesJointesRevenus[]>(this.rootURL + '/piecesjointesRevenus');
  }

  getallC() {
    return this.httpClient.get<ContratLocation[]>(this.rootURL + '/contratLocations');
  }

  getallTr() {
    return this.httpClient.get<PiecesJointesTr[]>(this.rootURL + '/PiecesJointesTrs');
  }
  
  getallTrE() {
    return this.httpClient.get<PiecesJointesTr[]>(this.rootURL + '/PiecesJointeEs');
  }

  getallTrI() {
    return this.httpClient.get<PiecesJointesTr[]>(this.rootURL + '/PiecesJointesIs');
  }

  listReceptionCheque: PiecesJointesRecepCheque[];

  refreshListReceptionCheque() {
    this.httpClient.get(this.rootURL + '/PiecesJointesReceptionCs')
      .toPromise()
      .then(res => this.listReceptionCheque = res as PiecesJointesRecepCheque[]);
  }


  SearchReceptionCheque(): Observable<PiecesJointesRecepCheque[]> {
    return this.httpClient.get<PiecesJointesRecepCheque[]>(this.rootURL + '/PiecesJointesReceptionCs');
  }


  listEvTwo: PiecesJointesEventsTwo[];

  refreshListEvTwoe() {
    this.httpClient.get(this.rootURL + '/PiecesJointesEvTzoes')
      .toPromise()
      .then(res => this.listEvTwo = res as PiecesJointesEventsTwo[]);
  }

  SearchEvTwo(): Observable<PiecesJointesEventsTwo[]> {
    return this.httpClient.get<PiecesJointesEventsTwo[]>(this.rootURL + '/PiecesJointesEvTzoes');


  }

  list: PiecesJointes[];

  refreshList() {
    this.httpClient.get(this.rootURL + '/PiecesJointes')
      .toPromise()
      .then(res => this.list = res as PiecesJointes[]);
  } 

  listRc: PiecesJointesRc[];

  refreshListRc() {
    this.httpClient.get(this.rootURL + '/PiecesJointesRcs')
      .toPromise()
      .then(res => this.listRc = res as PiecesJointesRc[]);
  }

  listf: PiecesJointesFacture[];
  refreshListf() {
    this.httpClient.get(this.rootURL + '/PiecesJointesfs')
      .toPromise()
      .then(res => this.listf = res as PiecesJointesFacture[]);
  }

  listCf: PiecesJointesCF[];
  refreshListCf() {
    this.httpClient.get(this.rootURL + '/PiecesJointesCfs')
      .toPromise()
      .then(res => this.listCf = res as PiecesJointesCF[]);
  }


  Searchf(): Observable<PiecesJointesFacture[]> {
    return this.httpClient.get<PiecesJointesFacture[]>(this.rootURL + '/PiecesJointesfs');


  }





  listL: PiecesJointesLocataire[];
  listR: PiecesJointesRevenus[];
  listC: ContratLocation[];
  listTr: PiecesJointesTr[];
  listEv: PiecesJointesEv[];
  

  refreshListEv() {
    this.httpClient.get(this.rootURL + '/PiecesJointesEvents')
      .toPromise()
      .then(res => this.listEv = res as PiecesJointesEv[]);
  }


  refreshListL() {
    this.httpClient.get(this.rootURL + '/piecesjointesLocataires')
      .toPromise()
      .then(res => this.listL = res as PiecesJointesLocataire[]);
  }

  refreshListR() {
    this.httpClient.get(this.rootURL + '/piecesjointesRevenus')
      .toPromise()
      .then(res => this.listR = res as PiecesJointesRevenus[]);
  }

  refreshListC () {
    this.httpClient.get(this.rootURL + '/contratLocations')
      .toPromise()
      .then(res => this.listC = res as ContratLocation[]);
  }


  refreshListTr() {
    this.httpClient.get(this.rootURL + '/PiecesJointesTrs')
      .toPromise()
      .then(res => this.listTr = res as PiecesJointesTr[]);
  }

 

  refreshListTrE() {
    this.httpClient.get(this.rootURL + '/PiecesJointeEs')
      .toPromise()
      .then(res => this.listTr = res as PiecesJointesTr[]);
  }

  refreshListTrI() {
    this.httpClient.get(this.rootURL + '/PiecesJointesIs')
      .toPromise()
      .then(res => this.listTr = res as PiecesJointesTr[]);
  }

  

  SearchRc(): Observable<PiecesJointesRc[]> {
    return this.httpClient.get<PiecesJointesRc[]>(this.rootURL + '/PiecesJointesRcs');


  }

  SearchEv(): Observable<PiecesJointesEv[]> {
    return this.httpClient.get<PiecesJointesEv[]>(this.rootURL + '/PiecesJointesEvents');


  }
  Search(): Observable<PiecesJointes[]> {
    return this.httpClient.get<PiecesJointes[]>(this.rootURL + '/PiecesJointes');
  }

  SearchL(): Observable<PiecesJointesLocataire[]> {
    return this.httpClient.get<PiecesJointesLocataire[]>(this.rootURL + '/piecesjointesLocataires');
  }

  SearchR(): Observable<PiecesJointesRevenus[]> {
    return this.httpClient.get<PiecesJointesRevenus[]>(this.rootURL + '/piecesjointesRevenus');
  }

  SearchC(): Observable<ContratLocation[]> {
    return this.httpClient.get<ContratLocation[]>(this.rootURL + '/contratLocations');
  }

  

  SearchTr(): Observable<PiecesJointesTr[]> {
    return this.httpClient.get<PiecesJointesTr[]>(this.rootURL + '/PiecesJointesTrs');
  }

  SearchTrE(): Observable<PiecesJointesTr[]> {
    return this.httpClient.get<PiecesJointesTr[]>(this.rootURL + '/PiecesJointeEs');
  }

  SearchTrI(): Observable<PiecesJointesTr[]> {
    return this.httpClient.get<PiecesJointesTr[]>(this.rootURL + '/PiecesJointesIs');
  }

  SearchCf(): Observable<PiecesJointesCF[]> {
    return this.httpClient.get<PiecesJointesCF[]>(this.rootURL + '/PiecesJointesCfs');
  }
  //Delete Piece Jointe
  
  
  deletePjRc(id) {
    return this.httpClient.delete(this.rootURL + '/PiecesJointesRcs/' + id);
  }


  deletePjEv(id) {
    return this.httpClient.delete(this.rootURL + '/PiecesJointesEvents/' + id);
  }

  deletePj(id) {
    return this.httpClient.delete(this.rootURL + '/PiecesJointes/' + id);
  }

  deletePjL(id) {
    return this.httpClient.delete(this.rootURL + '/piecesjointesLocataires/' + id);
  }

  deletePjR(id) {
    return this.httpClient.delete(this.rootURL + '/piecesjointesRevenus/' + id);
  }

  deletePjC(id) {
    return this.httpClient.delete(this.rootURL + '/contratLocations/' + id);
  }


  deletePjTr(id) {
    return this.httpClient.delete(this.rootURL + '/PiecesJointesTrs/' + id);
  }

  deletePjTrE(id) {
    return this.httpClient.delete(this.rootURL + '/PiecesJointeEs/' + id);
  }

  deletePjTrI(id) {
    return this.httpClient.delete(this.rootURL + '/PiecesJointesIs/' + id);
  }

  deletef(id) {
    return this.httpClient.delete(this.rootURL + '/PiecesJointesfs/' + id);
  }
}
