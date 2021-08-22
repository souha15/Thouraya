import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../../shared/Services/ServiceRh/formation.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Formation } from '../../../shared/Models/ServiceRh/formation.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit {

  constructor(private creanceService: FormationService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private tblService: TbListeningService,) { }

  ngOnInit(): void {
    this.GetSpecList();
    this.getUserConnected();
    this.getCreance();
    this.resetForm();
  }


  // Get Specilite List

  SpecList: TbListening[] = [];

  GetSpecList() {
    this.tblService.Get().subscribe(res => {
      this.SpecList = res
    })
  }

  UserIdConnected: string;
  UserNameConnected: string;
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }

  factList: Formation[] = [];
  GfactList: Formation[] = [];

  getCreance() {
    this.creanceService.Get().subscribe(res => {
      this.GfactList = res;

      this.factList = this.GfactList.filter(item => item.idUserCreator == this.UserIdConnected)

    })

  }


  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.updateRecord(form)
    }
  }

  //Populate Form 
  factId: number
  fact: Formation = new Formation();
  populateForm(facture: Formation) {
    this.creanceService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);   
  }


  factur: Formation = new Formation();

  updateRecord(form: NgForm) {

    this.factur = Object.assign(this.factur, form.value);
    this.factId = this.factur.id;

  
      this.creanceService.Edit().subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.resetForm();
        this.getCreance();
      },
        err => {
          this.toastr.error(' لم يتم التحديث  ', ' فشل');
        }


      )
  }


  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.creanceService.formData = {
      id: null,
      titre: '',
      specialite: '',
      org: '',
      duree: '',
      datedebut: '',
      datefin: '',
      detail: '',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',
    }
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.creanceService.Delete(Id)
        .subscribe(res => {
          this.getCreance();
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
