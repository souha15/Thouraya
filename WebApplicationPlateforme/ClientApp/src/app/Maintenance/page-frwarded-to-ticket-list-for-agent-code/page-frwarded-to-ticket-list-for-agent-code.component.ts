import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-frwarded-to-ticket-list-for-agent-code',
  templateUrl: './page-frwarded-to-ticket-list-for-agent-code.component.html',
  styleUrls: ['./page-frwarded-to-ticket-list-for-agent-code.component.css']
})
export class PageFrwardedToTicketListForAgentCodeComponent implements OnInit {

  constructor(public router: Router,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  code: string;
  getdata(event) {
   this.code = event.target.value
  }

  entrer() {
    if (this.code == "0320") {
      this.router.navigate(['ticket-list-agent']);
    } else {
      this.toastr.error("Code is invalid","Check Code")
    }
  }
}
