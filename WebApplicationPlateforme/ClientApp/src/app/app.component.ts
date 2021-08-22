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
   /* var connection = new signalR.HubConnectionBuilder()
      .withUrl("notify")
      .build();

    connection.start().then(function () {
      console.log("connected ! ");
    }).catch(function (err) {
      return console.error(err.toString());
    });


    connection.on("UserConnected", (connectionId: string, message: string) => {
    })


    connection.on("UserDisconnected", (connectionId: string, message: string) => {

    })


    connection.on("ReceiveMessage", function (message) {
      this.toastr.success(message)
    });






*/

   /* const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("notify")
      .build();


    
    connection.start().then(function () {
      console.log("connected ! ");
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", (type: string, payload: string) => {

      this.MessageService.success(type, payload)
    })

*/
  }



  List: Voiture[] = [];
  FList: Voiture[] = [];
  secondDate: Date;
  thirdDate: Date;
  nb: number = 0;

 /* getVoiture() {
    let i: number = 0;
    this.carsService.Get().subscribe(res => {
      this.List = res;
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const firstDate = new Date();
      this.List.forEach(item => {

        this.secondDate = new Date(item.dateassurance);
        const diffDays = Math.round(Math.abs((firstDate.getTime() - this.secondDate.getTime()) / oneDay));
        if (diffDays == 11) {
          i = i + 1;
          this.nb = this.nb + 1;
          this.toastr.info("لديك اسبوعين حتى انتهاء صلاحية التأمين", "", {
            extendedTimeOut: 0,
            closeButton: true,
            progressBar: true,
            progressAnimation: "decreasing",
            positionClass: 'toast-bottom-right',

          })
        }
        if (diffDays == 30) {
          i = i + 1;
          this.nb = this.nb + 1;
          this.toastr.info("لديك شهر حتى انتهاء صلاحية التأمين", "تنبيه", {
            extendedTimeOut: 0,
            closeButton: true,
            progressBar: true,
            progressAnimation: "decreasing",
            positionClass: 'toast-bottom-right',

          })
        }


        this.thirdDate = new Date(item.datepermis);

        const diffDays2 = Math.round(Math.abs((firstDate.getTime() - this.thirdDate.getTime()) / oneDay));
        if (diffDays2 == 11) {
          i = i + 1;
          this.nb = this.nb + 1;
          this.toastr.info("لديك اسبوعين حتى انتهاء صلاحية رخصة السير", "", {
            extendedTimeOut: 0,
            closeButton: true,
            progressBar: true,
            progressAnimation: "decreasing",
            positionClass: 'toast-bottom-right',

          })
        }
        if (diffDays2 == 30) {
          i = i + 1;
          this.nb = this.nb + 1;

          this.toastr.info("لديك شهر حتى انتهاء صلاحية رخصة السير", "تنبيه", {
            extendedTimeOut: 0,
            closeButton: true,
            progressBar: true,
            progressAnimation: "decreasing",
            positionClass: 'toast-bottom-right',

          })
        }


      })

    })

  }*/
  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 1500000);

  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
