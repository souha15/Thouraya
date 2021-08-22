import { Component, OnInit } from '@angular/core';
import { DotationService } from '../../../shared/Services/Dotations/dotation.service';
import { ToastrService } from 'ngx-toastr';
import { Dotation } from '../../../shared/Models/Dotations/dotation.model';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { AgenceImmobService } from '../../../shared/Services/Dotations/agence-immob.service';
import { TypeDotationService } from '../../../shared/Services/Dotations/type-dotation.service';
import { EtatDotationService } from '../../../shared/Services/Dotations/etat-dotation.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { TypeDotation } from '../../../shared/Models/Dotations/type-dotation.model';
import { EtatDotation } from '../../../shared/Models/Dotations/etat-dotation.model';
import { AgenceImmob } from '../../../shared/Models/Dotations/agence-immob.model';
import { UniteService } from '../../../shared/Services/Dotations/unite.service';
import { Unite } from '../../../shared/Models/Dotations/unite.model';
import { LocationService } from '../../../shared/Services/Dotations/location.service';
import { Location } from '../../../shared/Models/Dotations/location.model';

@Component({
  selector: 'app-liste-dotation',
  templateUrl: './liste-dotation.component.html',
  styleUrls: ['./liste-dotation.component.css']
})
export class ListeDotationComponent implements OnInit {

  constructor(private dotationService: DotationService,
    private toastr: ToastrService,
    private etatDotation: EtatDotationService,
    private typeDotation: TypeDotationService,
    private AgenceService: AgenceImmobService,
    private locationService: LocationService,
    private uniteService: UniteService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getloc();
    this.getUnite();
    this.dotationlist();
    this.resetForm();
    this.TypeList();
    this.Etatlist();
    this.AgenceList();
    this.getUserConnected();
    this.UserList();

 
  }


  p: Number = 1;
  count: Number = 5;
  //Unite Add

  //get dotation list
  getloc() {
    this.locationService.Get().subscribe(res => {
      this.loclist =res
    })
  }
  list: Dotation[] = [];
  nbloue: number=0;
  nbnonloue: number = 0;
  loclist: Location[] = [];
  loclist1: Location[] = [];
  loclist2: Location[] = [];
  un1: Unite[] = [];
  tot: number = 0;
  dotationlist() {
    this.dotationService.Get().subscribe(res => {
      this.list = res
      for (let i = 0; i <= this.list.length; i++) {
        this.nbloue = 0;
        this.nbnonloue = 0;
        this.un1 = this.payListF.filter(item => item.idDotation == this.list[i].id)
        this.tot = this.un1.length;
        this.un1.forEach(item => {
          if (item.etat == "مؤجرة") {
            this.nbloue = this.nbloue + 1; 
          } else {
            this.nbnonloue = this.nbnonloue + 1;
          }
        })

        this.list[i].attribue4 = this.nbloue.toString();
        this.list[i].attribut2 = this.nbnonloue.toString();
        this.list[i].attribut3 = this.tot.toString();

      }
/*   
      }*/
    });


  }

  getUnite() {
    this.uniteService.Get().subscribe(res => {
      this.payListF = res

    })
  }

  unite: Unite = new Unite();
  payList: Unite[] = [];
  payList2: Unite[] = [];
  payList3: Unite[] = [];
  payListF: Unite[] = [];
  payListc: Unite[] = [];
  i = 0;
  paytest: boolean;
  paytest2: boolean;
  sommepay: number;


  addActivite() {
    this.paytest2 = true;
    this.unite.creatorName = this.UserNameConnected;
    this.unite.idUserCreator = this.UserIdConnected;
    this.payList3[this.i] = this.unite
    this.unite = new Unite();
    this.i = this.i + 1;

  }

  del1(dp, i) {
    //this.benList.splice(i, 1)
    this.payList3.splice(this.payList3.indexOf(dp), 1);
    this.i = this.i - 1
    this.unite = new Unite();

  }
  del11(Id) {
    this.uniteService.Delete(Id).subscribe(res => {
      this.toastr.success("تم الحذف  بنجاح", "نجاح");
      this.getUnite();
      this.payList = this.payListF.filter(item => item.idDotation == this.details.id)

      if (this.payList.length != 0) {
        this.paytest = true;

      } else
        this.paytest = false;
    })
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  roleslist: any = [];
  testrole: boolean = false;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;
        this.roleslist.forEach(item => {
          if (item == "ADMINISTRATEUR" || item == "SECRETAIRE") {
            this.testrole = true;
          } else {
          this.testrole = false;
          }
        })
      })
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
      this.etats = res
    })
  }

  //Get Agence

  agence: AgenceImmob[] = [];
  AgenceList() {
    this.AgenceService.Get().subscribe(res => {
      this.agence = res
    })
  }



  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.dotationService.Delete(Id)
        .subscribe(res => {
          this.dotationlist();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }

  details: Dotation = new Dotation();
  agencename: string;
  id: number;
  populateForm(dotation: Dotation) {
    this.dotationService.formData = Object.assign({}, dotation)
    this.details = Object.assign({}, dotation);
    this.id = this.details.id;
    this.payList = this.payListF.filter(item => item.idDotation == this.details.id)

    if (this.payList.length != 0) {
      this.paytest = true;

    } else
      this.paytest = false;

  }

  editdot: Dotation = new Dotation();
  updateRecord(form: NgForm) {
    this.editdot = Object.assign(this.editdot, form.value);
    
    this.dotationService.Edit().subscribe(res => {

      if (this.paytest2) {

        for (let i = 0; i < this.payList3.length; i++) {
          //this.dep = new Depenses();

          this.unite = this.payList3[i]
          this.unite.idUserCreator = this.UserIdConnected
          this.unite.idDotation = this.id
          this.uniteService.Add(this.unite).subscribe(res => {

            this.unite.numRevenus = '';
            this.unite.compteurElc = ''
            this.unite.prix = '';
            this.payList = this.payListF.filter(item => item.idDotation == this.id)

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
      this.resetForm();
      this.dotationlist();
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
