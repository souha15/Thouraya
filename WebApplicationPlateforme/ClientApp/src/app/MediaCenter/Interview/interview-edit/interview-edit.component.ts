import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../shared/Services/MediaCenter/Interview/interview.service';
import { TypeInterviewService } from '../../../shared/Services/MediaCenter/Interview/type-interview.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Interview } from '../../../shared/Models/MediaCenter/Interview/interview.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-interview-edit',
  templateUrl: './interview-edit.component.html',
  styleUrls: ['./interview-edit.component.css']
})
export class InterviewEditComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private interviewService: InterviewService,
    private typeInterService: TypeInterviewService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getUrl();
    this.GetTypeInter();
    this.getUserConnected();
  }

  interId: number;
  getUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.interId = params['id']

      this.interviewService.GetById(this.interId).subscribe(res => {
        this.inter = res

        if (this.inter.type == "حملة إعلامية لبرنامج محدد ") {
          this.media = true;
        } else {
          this.media = false;
        }

        if (this.inter.type == "تغطية صحفية ") {
          this.presse = true;
        } else {
          this.presse = false;
        }

        if (this.inter.type == "أخرى") {
          this.autre = true;
        } else {
          this.autre = false;
        }

      })
    });

  }

  // Get Data From TypeInterService
  typeInterList: TbListening[] = [];

  GetTypeInter() {
    this.typeInterService.GetTalent().subscribe(res => {
      this.typeInterList = res;
    })
  }

  //Get User Connected

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.inter.idUserCreator = res.id;
      this.inter.userNameCreator = res.fullName;
    })

  }

  //Tester Le Type
  media: boolean = false;
  presse: boolean = false;
  autre: boolean = false;
  testType(event) {
    if (event.target.value == "حملة إعلامية لبرنامج محدد ") {
      this.media = true;
   
      this.autre = false;
      if (this.presse) {
        this.presse = false;
        this.inter.nomEvent = ""
        this.inter.dateEvent = ""
        this.inter.etabEvent = ""
      }
      if (this.autre) {
        this.autre = false;
        this.inter.Autre = "";
      }
    } else {
      this.media = false;
      
    }

    if (event.target.value == "تغطية صحفية ") {
      this.presse = true;
      if (this.media) {
        this.media = false;
        this.inter.butProg = "";
        this.inter.ideeProg = "";
        this.inter.nomProg = "";
        this.inter.dureeProg = "";
      }
      if (this.autre) {
        this.autre = false;
        this.inter.Autre = "";
      }
    } else {
      this.presse = false
   
    }

    if (event.target.value == "أخرى") {
      this.autre = true;
      if (this.media) {
        this.media = false;
        this.inter.butProg = "";
        this.inter.ideeProg = "";
        this.inter.nomProg = "";
        this.inter.dureeProg = "";
      }

      if (this.presse) {
        this.presse = false;
        this.inter.nomEvent = ""
        this.inter.dateEvent = ""
        this.inter.etabEvent = ""
      }
    } else {
      this.autre = false;
      
    }
  }

  //Create Interview

  inter: Interview = new Interview();
  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    } else {

      this.isValidFormSubmitted = true;
      this.inter.dateenreg = this.date;
      this.interviewService.PutObservableTr(this.inter).subscribe(res => {
        this.toastr.success("تم التسجيل بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
          this.toastr.error("  فشل في تسجيل	 ", "فشل")
        })
    }

  }
}
