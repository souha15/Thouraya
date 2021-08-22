import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { ToastrService } from 'ngx-toastr';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { DepenseExploitation } from '../../../shared/Models/Finance/depense-exploitation.model';
import { NgForm } from '@angular/forms';
import { DepenseExploitationService } from '../../../shared/Services/Finance/depense-exploitation.service';

@Component({
  selector: 'app-creance-financire-add',
  templateUrl: './creance-financire-add.component.html',
  styleUrls: ['./creance-financire-add.component.css']
})
export class CreanceFinancireAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private tblService: TbListeningService,
    private toastr: ToastrService,
    private depService: DepenseExploitationService) { }

  ngOnInit(): void {
    this.gettbl();
    this.getUserConnected();
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
      this.dep.idUserCreator = res.id;
      this.dep.userNameCreator = res.fullName;
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }

  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    this.dep.dateenreg = this.date;
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {
      this.isValidFormSubmitted = true
      this.depService.Add(this.dep).subscribe(
        res => {
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        }

          )
    }
  }

}
