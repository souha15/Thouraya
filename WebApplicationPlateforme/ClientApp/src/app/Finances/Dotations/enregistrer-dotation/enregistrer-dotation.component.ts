import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EtatDotationService } from '../../../shared/Services/Dotations/etat-dotation.service';
import { TypeDotationService } from '../../../shared/Services/Dotations/type-dotation.service';
import { AgenceImmobService } from '../../../shared/Services/Dotations/agence-immob.service';
import { ToastrService } from 'ngx-toastr';
import { DotationService } from '../../../shared/Services/Dotations/dotation.service';
import { TypeDotation } from '../../../shared/Models/Dotations/type-dotation.model';
import { EtatDotation } from '../../../shared/Models/Dotations/etat-dotation.model';
import { AgenceImmob } from '../../../shared/Models/Dotations/agence-immob.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Dotation } from '../../../shared/Models/Dotations/dotation.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UniteService } from '../../../shared/Services/Dotations/unite.service';
import { Unite } from '../../../shared/Models/Dotations/unite.model';

@Component({
  selector: 'app-enregistrer-dotation',
  templateUrl: './enregistrer-dotation.component.html',
  styleUrls: ['./enregistrer-dotation.component.css']
})
export class EnregistrerDotationComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private etatDotation: EtatDotationService,
    private typeDotation: TypeDotationService,
    private AgenceService: AgenceImmobService,
    private dotationService: DotationService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private uniteService: UniteService
  ) { }

  ngOnInit(): void {
    this.TypeList();
    this.Etatlist();
    this.AgenceList();
    this.resetForm();
    this.getUserConnected();
    this.UserList();
    
  }

  //Unite Add



  unite: Unite = new Unite();
  payList: Unite[] = [];
  payList2: Unite[] = [];
  i = 0;
  paytest: boolean;
  sommepay: number;


  addActivite() {
    this.paytest = true;
    this.unite.creatorName = this.UserNameConnected;
    this.unite.idUserCreator = this.UserIdConnected;
    this.unite.dateenreg = this.date;
    this.payList[this.i] = this.unite
    this.unite = new Unite();
    this.i = this.i + 1;

  }

  del1(dp, i) {
    //this.benList.splice(i, 1)
    this.payList.splice(this.payList.indexOf(dp), 1);
    this.i = this.i - 1
    this.unite = new Unite();

  }


  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  //Get Users List
  user: UserDetail[] = [];
  UserList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.user = res; 
    })
  }
  //Get TypeDotation
  types: TypeDotation[] = [];

  TypeList() {
    this.typeDotation.Get().subscribe(res => {
      this.types = res;
     
    });
  }

  //Get etatDotation

  etats: EtatDotation[] = [];
  Etatlist() {
    this.etatDotation.Get().subscribe(res => {
      this.etats=res
    })
  }

  //Get Agence

  agence: AgenceImmob[] = [];
  AgenceList() {
    this.AgenceService.Get().subscribe(res => {
      this.agence=res
    })
  }

  dotation: Dotation = new Dotation();
  Cdotation: Dotation = new Dotation();
  idot: number;
  isValidFormSubmitted = false;
  onSubmit(form: NgForm) {
    this.dotation.creatorName = this.UserNameConnected;
    this.dotation.idUserCreator = this.UserIdConnected;
    this.dotation.dateenreg = this.date;
    this.dotation.attribut2 = this.dotation.nbunite

    if (form.invalid) {
      this.isValidFormSubmitted = false;

    } else {

      this.isValidFormSubmitted = true

    this.dotationService.Add(this.dotation).subscribe(
      res => {
        this.idot = res.id
        //Pay add
        if (this.paytest) {

          for (let i = 0; i < this.payList.length; i++) {
            //this.dep = new Depenses();

            this.unite = this.payList[i]
            this.unite.idDotation = this.idot
            this.unite.etat ="غير مؤجرة"
            this.unite.idUserCreator = this.UserIdConnected
            this.uniteService.Add(this.unite).subscribe(res => {
              this.payList2[i] = res

            },
              err => {
                this.toastr.error("  فشل في تسجيل   الوحدات", "فشل")
              })

          }



        }
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.i = 0;
        this.paytest = false;
        this.payList.splice(0, this.payList.length)      
        form.resetForm();
      },
      err => {
        console.log(err);
        this.toastr.warning('لم تتم الإضافة', ' فشل');
      }
    )
  }
  }

  date = new Date().toLocaleDateString();
  resetForm(form?: NgForm) {
  
    if (form != null)
      form.resetForm();
    this.dotationService.formData = {
      id: 0,
      nom: '',
      date: '',
      type: '',
      etat: '',
      adresse: '',
      nbunite: '',
      compteurElec: '',
      numCompteur: '',
      officeImmobiler: '',
      comptable: '',
      attribut1: 0,
      attribut2: '',
      attribut3: '',
      attribue4: '',
      creatorName: this.UserNameConnected,
      idUserCreator: this.UserIdConnected,
      idAgence: null,
      dateenreg: this.date,
   
    }
 
  }

  //Get Agencey Name
  AgencyName: string;
  getAgenceName() {
    this.AgenceService.GetById(this.dotation.idAgence).subscribe(res => {
      this.AgencyName = res.nom
    })
  }

}
