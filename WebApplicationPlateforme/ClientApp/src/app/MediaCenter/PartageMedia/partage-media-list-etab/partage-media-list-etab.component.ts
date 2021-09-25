import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { SalaireDService } from '../../../shared/Services/Salaire/salaire-d.service';
import { SalaireD } from '../../../shared/Models/Salaire/salaire-d.model';

@Component({
  selector: 'app-partage-media-list-etab',
  templateUrl: './partage-media-list-etab.component.html',
  styleUrls: ['./partage-media-list-etab.component.css']
})
export class PartageMediaListEtabComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private salaireService: SalaireDService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getList();
  }

  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  list: SalaireD[] = [];
  listG: SalaireD[] = [];
  getList() {

    this.salaireService.Get().subscribe(res => {
      this.list = res
      this.listG = this.list.filter(item => item.userName == this.UserNameConnected)
    })
  }


  p: Number = 1;
  count: Number = 5;
}
