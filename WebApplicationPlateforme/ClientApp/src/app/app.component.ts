import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { VoitureService } from './shared/Services/voiture/voiture.service';
import { Voiture } from './shared/Models/voiture/voiture.model';
import { ToastrService } from 'ngx-toastr';
import * as signalR from '@aspnet/signalr'
import { type } from 'os';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { SoldeCongeService } from './shared/Services/Rh/solde-conge.service';
import { SoldeConge } from './shared/Models/RH/solde-conge.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent {
  title = 'app';

  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor(private MessageService: ToastrService,
    private router: Router,
    private carsService: VoitureService,
    private toastr: ToastrService,
    private updateCongeSolde: SoldeCongeService) {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/user-register']);
    });


  }
  ngOnInit(): void {
    this.updateSoldeConges();
  
  }
  ListCongeSolde: SoldeConge[] = [];
  updateSoldeConges() {
    this.updateCongeSolde.PutAutomatically().subscribe(res => {
      this.ListCongeSolde = res
      this.ListCongeSolde.forEach(item => {
        //item.soldemaladie = (+item.numbermaladie + +item.soldemaladie).toString();
        item.soldenormal = (+item.numbernormal + +item.soldenormal).toString();
        //item.soldeurgent = (+item.numberurgent + +item.soldeurgent).toString();
        this.updateCongeSolde.PutObservable(item).subscribe(res => {})
      })
    })
  }
  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 1500000);

  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
