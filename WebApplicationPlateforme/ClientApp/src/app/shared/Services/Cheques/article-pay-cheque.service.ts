import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticlePayCheque } from '../../Models/Cheques/article-pay-cheque.model';
@Injectable({
  providedIn: 'root'
})
export class ArticlePayChequeService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ArticlePayCheque
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create ArticlePayCheque

  Add(ArticlePayCheque: ArticlePayCheque) {
    return this.http.post<ArticlePayCheque>(this.rootURL + '/ArticlePayCheques', ArticlePayCheque, this.headers);
  }

  PutObservableE(Transaction: ArticlePayCheque) {
    return this.http.put<ArticlePayCheque>(this.rootURL + '/ArticlePayCheques/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/ArticlePayCheques', this.formData, this.headers);
  }

  //Get ArticlePayCheque List

  Get(): Observable<ArticlePayCheque[]> {
    return this.http.get<ArticlePayCheque[]>(this.rootURL + '/ArticlePayCheques');
  }

  //Get ArticlePayCheque By Id

  GetById(Id) {
    return this.http.get<ArticlePayCheque>(this.rootURL + '/ArticlePayCheques/' + Id);
  }

  //Edit ArticlePayCheque

  Edit() {
    return this.http.put(this.rootURL + '/ArticlePayCheques/' + this.formData.id, this.formData, this.headers);
  }


  //Delete ArticlePayCheque

  Delete(id) {
    return this.http.delete(this.rootURL + '/ArticlePayCheques/' + id);
  }
}
