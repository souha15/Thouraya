import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PayDirecteService } from '../../shared/Services/Gsetion Stock/pay-directe.service';
import { PayDirecte } from '../../shared/Models/Gestion Stock/pay-directe.model';

@Component({
  selector: 'app-details-pay-directe',
  templateUrl: './details-pay-directe.component.html',
  styleUrls: ['./details-pay-directe.component.css']
})
export class DetailsPayDirecteComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private PayService: PayDirecteService) { }

  ngOnInit(): void {
    this.getIdUrl();
  }

  //get the id in Url

  Id: number;
  st: PayDirecte = new PayDirecte();

  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.PayService.GetById(this.Id).subscribe(res => {
        this.st = res

        })
      })


  }
}
