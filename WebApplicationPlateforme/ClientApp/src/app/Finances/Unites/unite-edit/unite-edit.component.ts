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
import { UniteService } from '../../../shared/Services/Dotations/unite.service';
import { Unite } from '../../../shared/Models/Dotations/unite.model';
import { Subscription, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unite-edit',
  templateUrl: './unite-edit.component.html',
  styleUrls: ['./unite-edit.component.css']
})
export class UniteEditComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private etatDotation: EtatDotationService,
    private typeDotation: TypeDotationService,
    private AgenceService: AgenceImmobService,
    private dotationService: DotationService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private uniteService: UniteService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getIdUrl();
    this.TypeList();
    this.Etatlist();
    this.getUserConnected();
    this.getUniteList();
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
      this.etats = res
    })
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

  //Get Unite List

  pay: Unite = new Unite();
  payList: Unite[] = [];
  payListF: Unite[] = [];
  payList2: Unite[] = [];
  payList3: Unite[] = [];
  i = 0;
  paytest: boolean;
  paytest2: boolean = false;
  getUniteList() {
    this.uniteService.Get().subscribe(res => {
      this.payListF = res
      this.payList = this.payListF.filter(item => item.idDotation == this.id)
      if (this.payList.length != 0) {
        this.paytest = true;
      }
    })
  }

  addActivite() {
    this.paytest2 = true;
    this.pay.creatorName = this.UserNameConnected;
    this.pay.idUserCreator = this.UserIdConnected;
    this.payList3[this.i] = this.pay
    this.pay = new Unite();
    this.i = this.i + 1;

  }

  del1(dp, i) {
    //this.benList.splice(i, 1)
    this.payList3.splice(this.payList3.indexOf(dp), 1);
    this.i = this.i - 1
    this.pay = new Unite();

  }

  del11(Id) {
    this.uniteService.Delete(Id).subscribe(res => {
      this.getUniteList();
    })
  }

  id: number;
  dotation: Dotation = new Dotation();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id']

      this.dotationService.GetById(this.id).subscribe(res => {
        this.dotation = res
      })
    });
  }

  editdot: Dotation = new Dotation();
  updateRecord(form: NgForm) {
    this.dotation.idUserCreator = this.UserIdConnected;
    this.dotation.creatorName = this.UserNameConnected;
    this.dotation.attribut2 = this.dotation.nbunite;;

    this.dotationService.PutObservable(this.dotation).subscribe(res => {

      if (this.paytest2) {

        for (let i = 0; i < this.payList3.length; i++) {
          //this.dep = new Depenses();

          this.pay = this.payList3[i]
          this.pay.idUserCreator = this.UserIdConnected
          this.pay.idDotation = this.id
          this.pay.etat ="غير مؤجرة"
          this.uniteService.Add(this.pay).subscribe(res => {
          },
            err => {
              this.toastr.error("  فشل في تسجيل  الوحدات", "فشل")
            })

        }
      }

      this.i = 0;
      this.paytest = false;
      this.payList.splice(0, this.payList.length)
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      form.resetForm();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )
  }

  onSubmit(form: NgForm) {
    this.updateRecord(form)
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.dotationService.formData = {
      id: null,
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
      creatorName: '',
      idUserCreator: '',
      idAgence: null,
      dateenreg: '',

    }

  }

}
