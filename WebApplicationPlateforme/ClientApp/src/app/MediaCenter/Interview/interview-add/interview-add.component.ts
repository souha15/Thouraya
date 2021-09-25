import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../shared/Services/MediaCenter/Interview/interview.service';
import { TypeInterviewService } from '../../../shared/Services/MediaCenter/Interview/type-interview.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Interview } from '../../../shared/Models/MediaCenter/Interview/interview.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-interview-add',
  templateUrl: './interview-add.component.html',
  styleUrls: ['./interview-add.component.css']
})
export class InterviewAddComponent implements OnInit {

  constructor(private interviewService: InterviewService,
    private typeInterService: TypeInterviewService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.GetTypeInter();
    this.getUserConnected();
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
    } else {
      this.media = false;
    }

    if (event.target.value == "تغطية صحفية ") {
      this.presse = true;
    } else {
      this.presse = false;
    }

    if (event.target.value == "أخرى") {
      this.autre = true;
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
      this.inter.diretat = "في الإنتظار";
      this.interviewService.Create(this.inter).subscribe(res => {
        this.toastr.success("تم التسجيل بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
          this.toastr.error("  فشل في تسجيل	 ", "فشل")
          })
    }

  }
}
