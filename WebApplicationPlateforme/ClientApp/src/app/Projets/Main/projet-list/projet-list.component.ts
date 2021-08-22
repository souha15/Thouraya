import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../../../shared/Services/Projets/projet.service';
import { Projet } from '../../../shared/Models/Projet/projet.model';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['./projet-list.component.css']
})
export class ProjetListComponent implements OnInit {

  constructor(private projetService: ProjetService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.GetProjet();

  }
  UserIdConnected: string;
  UserNameConnected: string;
  roleslist: any = [];
  testrole: boolean = false;
  testclose: boolean = true;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;
        this.roleslist.forEach(item => {
          if (item == "ADMINISTRATEUR") {
            this.testrole = true;
          } else {this.testrole = false;
          }
          if (item == "RESPFINANCE" || item == "PARTNORMAL") {
            this.testclose = false;
          } else { this.testclose = true; }
        })
        console.log(this.testrole)
      })
    })

  }

  p: Number = 1;
  count: Number = 5;
  prList: Projet[] = [];
  prList1: Projet[] = [];
  prList2: Projet[] = [];
  prList3: Projet[] = [];
  nb1: number;
  nb2: number;
  nb3: number;
  GetProjet() {
    this.projetService.Get().subscribe(res => {
      this.prList = res;

      this.prList1 = this.prList.filter(item => item.etat == "نشط")
      this.nb1=this.prList1.length;
      this.prList2 = this.prList.filter(item => item.etat == "متعثر")
      this.nb2 = this.prList2.length;
      this.prList3 = this.prList.filter(item => item.etat == "مغلق")
      this.nb3 = this.prList3.length;
    })
  }


  //Populate Form 
  factId: number
  fact: Projet = new Projet();
  populateForm(facture: Projet) {
    this.projetService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }

  accept() {
    this.fact.etat = "مغلق"

    if (this.projetService.formData.etat != 'مغلق') {
      this.projetService.PutObservableE(this.fact).subscribe(res => {
        this.GetProjet();
        this.toastr.success("تم غلق المشروع", "نجاح");
      },
        err => {
          this.toastr.warning('لم يتم غلق المشروع', ' فشل');
        })
    } else {
      this.toastr.warning(' المشروع مغلق', ' فشل');
    }
  }



  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.projetService.Delete(Id)
        .subscribe(res => {
          this.GetProjet();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }
}
