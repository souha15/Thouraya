import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { ToastrService } from 'ngx-toastr';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { DepenseExploitation } from '../../../shared/Models/Finance/depense-exploitation.model';
import { NgForm } from '@angular/forms';
import { DepenseExploitationService } from '../../../shared/Services/Finance/depense-exploitation.service';

@Component({
  selector: 'app-creance-financire-list',
  templateUrl: './creance-financire-list.component.html',
  styleUrls: ['./creance-financire-list.component.css']
})
export class CreanceFinancireListComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private tblService: TbListeningService,
    private toastr: ToastrService,
    private depService: DepenseExploitationService) { }

  ngOnInit(): void {
    this.gettbl();
    this.getUserConnected();
    this.resetForm();
    this.getDep();
  }


  typedepense: TbListening[] = [];
  TypeB: TbListening[] = [];


  gettbl() {
    this.tblService.GetTypeBeneficiare().subscribe(res => {
      this.TypeB = res

    })

    this.tblService.GetTypeDep().subscribe(res => {
      this.typedepense = res;
    })

  }

  UserIdConnected: string;
  UserNameConnected: string;
  dep: DepenseExploitation = new DepenseExploitation();
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }

  factList: DepenseExploitation[] = [];
  getDep() {
    this.depService.Get().subscribe(res => {
      this.factList = res;
    })
  }
  factId: number
  fact: DepenseExploitation = new DepenseExploitation();
  etatok: boolean;
  populateForm(facture: DepenseExploitation) {
    this.depService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.updateRecord(form)
    }
  }

  factur: DepenseExploitation = new DepenseExploitation();

  updateRecord(form: NgForm) {

    this.factur = Object.assign(this.factur, form.value);
    this.factId = this.factur.id;
    this.depService.formData.attribut2 = this.date;
    this.depService.formData.attribut3 = this.UserIdConnected;
    this.depService.formData.attribut4 = this.UserNameConnected;


    this.depService.Edit().subscribe(res => {

        this.toastr.success('تم التحديث بنجاح', 'نجاح')
   
      this.resetForm();
      this.getDep();
      },
        err => {
          this.toastr.error(' لم يتم التحديث  ', ' فشل');
        }


      )
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.depService.formData = {
      id: null,
      prix: '',
      type:'',
      details: '',
      typeB: '',   
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
      this.depService.Delete(Id)
        .subscribe(res => {
          this.getDep()
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
