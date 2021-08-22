import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private router: Router,
    private tostr: ToastrService) { }

  formModel = {
    UserName: '',
    Password:''
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home')
  }

  onSubmit(form: NgForm) {
    if (this.activation == true) {
      this.UserService.login(form.value).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/home');
        },
        err => {
          if (err.status == 400)
            this.tostr.error("خطأ في اسم المستخدم أو كلمة مرور", "فشل في تسجيل الدخول");
          else
            console.log(err);
        }

      );
    } else {
      this.tostr.error("حسابك غير مفعل", "فشل في تسجيل الدخول");
    }
  }
  username: string;
  activation: boolean;
  getUserName(event) {
    this.username = event.target.value;
    this.UserService.GetUserByUserName(this.username).subscribe(res => {
      if (res.attribut2 == "1") {
        this.activation = true;
      } else {
        this.activation = false;
      }
    })
  }
}
