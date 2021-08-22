import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ShowUsersList();
  }


  //Users List

  private _Users: Observable<UserDetail[]>;
  public get allUser(): Observable<UserDetail[]> {
    return this._Users;
  }

  public set allUser(value: Observable<UserDetail[]>) {
    this._Users = value;


  }

  ShowUsersList() {

    this.allUser = this.UserService.GetUsersList();

  }

 

  populateForm(userdetail: UserDetail) {
    // this.tr = Object.assign({}, pd);
    this.UserService.formData = Object.assign({}, userdetail)
    console.log(userdetail)
  }
}
