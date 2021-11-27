import { Component, OnInit } from '@angular/core';
import { CommentsTicketService } from '../../shared/Services/Maintenance/comments-ticket.service';
import { CommentsTickets } from '../../shared/Models/Maintenance/comments-tickets.model';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-comments',
  templateUrl: './tickets-comments.component.html',
  styleUrls: ['./tickets-comments.component.css']
})
export class TicketsCommentsComponent implements OnInit {

  constructor(private commentService: CommentsTicketService,
    private UserService: UserServiceService,
    private router: Router,) { }

  ngOnInit(): void {
    this.getComments();
  }

  commentsListG: CommentsTickets[] = [];
  commentsList: CommentsTickets[] = [];
  userId: string;
  getComments() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userId = res.id
     
    this.commentService.List().subscribe(res => {
      this.commentsListG = res
      console.log(this.commentsListG)

      this.commentsList = this.commentsListG.filter(item => item.attribut1 == "0" && item.userId != this.userId);
    });
    });
  }



  comment: CommentsTickets = new CommentsTickets();

  id: number;
  populateForm(facture: CommentsTickets) {
    this.commentService.formData = Object.assign({}, facture)
    this.id = facture.id;
    this.comment = Object.assign({}, facture);
    this.comment.attribut1 = "1"
    this.commentService.PutObservable(this.comment).subscribe(res => {
      this.router.navigate(['/ticket-detail-client', this.comment.idTicket])
    })
  }
}
