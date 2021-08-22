import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../shared/Services/News/news.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { News } from '../../shared/Models/News/news.model';

@Component({
  selector: 'app-news-list-creator',
  templateUrl: './news-list-creator.component.html',
  styleUrls: ['./news-list-creator.component.css']
})
export class NewsListCreatorComponent implements OnInit {

  constructor(private newsService: NewsService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getNewsList();
  }


  UserIdConnected: string;
  UserNameConnected: string;


  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  per: News = new News();

  populateForm(conge: News) {
    this.per = Object.assign({}, conge)
    this.newsService.formData = Object.assign({}, conge)
  }

  //get News List

  List: News[] = [];
  newsList: News[] = [];
  getNewsList() {
    this.newsService.Get().subscribe(res => {
      this.List = res
      this.newsList = this.List.filter(item => item.idUserCreator == this.UserIdConnected)
    })
  }

}
