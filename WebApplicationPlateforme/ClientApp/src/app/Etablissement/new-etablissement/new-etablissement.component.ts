import { Component, OnInit } from '@angular/core';
import { EtablissementService } from '../../shared/Services/Etablissement/etablissement.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { Etablissement } from '../../shared/Models/Etablissement/etablissement.model';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-etablissement',
  templateUrl: './new-etablissement.component.html',
  styleUrls: ['./new-etablissement.component.css']
})
export class NewEtablissementComponent implements OnInit {

  constructor(private EtablissementService: EtablissementService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private AdministrationService: AdministrationService) { }

  ngOnInit(): void {

    this.getUsersList();
    this.getAdministrationList();

  }


  //Get Administrations List

  AdministrationList: Administration[] = [];

  getAdministrationList() {
    this.AdministrationService.ListAdministration().subscribe(res => {
      this.AdministrationList = res
    })
  }

   //Get Users List
  UsersList: UserDetail[] = [];

  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersList = res
    })
  }
  // convert idAdmnistration
  ConvertedId: number;
  selectInput(event) {
    let selected = event.target.value;
    if (selected) {
      this.ConvertedId = parseInt(selected)
      console.log(this.ConvertedId)
    } else {
      return this.ConvertedId
    }
  }


    //Create Tache


  eta: Etablissement = new Etablissement();
  CreatedEtablissement: Etablissement = new Etablissement();
  etaId: number;

  onSubmit(form: NgForm) {
    this.eta.idAdministration = this.ConvertedId;
    if (this.nomAd == null) {
      this.toastr.warning(" اكتب اسم القسم", "فشل")
    }
    else {
      this.EtablissementService.AddEtablissement(this.eta).subscribe(
        (res: any) => {

          this.CreatedEtablissement = res;
          this.etaId = this.CreatedEtablissement.id;

          this.toastr.success("تم تسجيل القسم بنجاح", " تسجيل القسم");
          this.vider(form);
      },
      err => {
        this.toastr.error("فشل تسجيل القسم", " تسجيل القسم")
      }

    )
  }
  }


  //Test champs nom si vide
  nomAd: string;
  testnom(event) {
    this.nomAd = event.target.value;
    this.nomAd.toString();
  }

  //ResetForm


  vider(form: NgForm) {
    form.reset();
  }
}
