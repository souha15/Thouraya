import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../shared/Services/User/user-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private router: Router,
    private tostr: ToastrService) { }

  formModel = {
    UserName: '',
    Password: ''
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home')
  }

  onSubmit(form: NgForm) {
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
  }

  //Rember Me Function
}
