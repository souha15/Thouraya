import { Component, OnInit } from '@angular/core';
import { CommentsTicketService } from '../../shared/Services/Maintenance/comments-ticket.service';
import { CommentsTickets } from '../../shared/Models/Maintenance/comments-tickets.model';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {

  constructor(private commentService: CommentsTicketService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.autoSave();
  }

  save: boolean = false;
  intervale;
  autoSave() {
    this.intervale = setInterval(() => {
     this.save = true;
      this.getComments();
    }, 10000);
  }
  commentsListG: CommentsTickets[] = [];
  commentsList: CommentsTickets[] = [];
  userId: string;
  nb: number = 0;
  getComments() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userId = res.id

      this.commentService.List().subscribe(res => {
        this.commentsListG = res
        this.commentsList = this.commentsListG.filter(item => item.attribut1 == "0" && item.userId != this.userId);
        this.nb = this.commentsList.length;
        
      });
    });
  }
}
