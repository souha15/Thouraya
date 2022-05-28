import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { VoitureService } from './shared/Services/voiture/voiture.service';
import { Voiture } from './shared/Models/voiture/voiture.model';
import { ToastrService } from 'ngx-toastr';
import * as signalR from '@aspnet/signalr'
import { type } from 'os';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
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
    private toastr: ToastrService) {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/user-register']);
    });


  }
  ngOnInit(): void {

  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 1500000);

  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
