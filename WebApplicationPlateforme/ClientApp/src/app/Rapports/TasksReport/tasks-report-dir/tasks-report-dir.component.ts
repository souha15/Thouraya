import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../../shared/Services/Taches/tache.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Tache } from '../../../shared/Models/Taches/tache.model';

@Component({
  selector: 'app-tasks-report-dir',
  templateUrl: './tasks-report-dir.component.html',
  styleUrls: ['./tasks-report-dir.component.css']
})
export class TasksReportDirComponent implements OnInit {

  constructor(private TasksService: TacheService,
    private userService: UserServiceService,
    public toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.getAllTaskList();
    this.GetUsersList();
  }
  p: Number = 1;
  count: Number = 5;

  //Radio Button 

  private selectedLink: string;
  search: string;
  setsearch(event): void {

    this.selectedLink = event.target.value;
    if (this.selectedLink == "employee") {
      this.search = "employee"
    }

    if (this.selectedLink == "all") {
      this.search = "all"
    }

    if (this.selectedLink == "date") {
      this.search = "date"
    }
  }


  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }
  //Get Users List
  UsersList: UserDetail[] = [];
  GetUsersList() {
    this.userService.GetUsersList().subscribe(res => {
      this.UsersList = res;
    })
  }
  allTasks: Tache[] = [];
  getAllTaskList() {
    this.TasksService.ListTache().subscribe(res => {
      this.allTasks = res;
    })
  }

  taskList: Tache[] = [];
  GetMediaList() {
    this.taskList = [];
    if (this.isSelected('all')) {
      this.TasksService.ListTache().subscribe(res => {
        this.taskList = res;
      })
    } else if (this.isSelected('employee') && this.employeeId != null) {
      this.TasksService.SearchByEmployee(this.employeeId).subscribe(res => {
        this.taskList = res;
      })
    } else {
      if (this.DateDeb != null && this.DateFin != null) {

        this.allTasks.forEach(item => {
          if (this.TestBetweenTwoDate(item.date)) {
            this.taskList.push(item);
          }
        })


      } else {
        this.toastr.error("يرجى ملء تاريخ البدء وتاريخ الانتهاء", "فشل")
        this.failed = true;
        this.msg = "يرجى ملء تاريخ البدء وتاريخ الانتهاء"
      }
    }

  }
  msg: string;
  failed: boolean = false;
  TestBetweenTwoDate(dateEnreg): boolean {
    if (this.DateDeb != null && this.DateFin != null) {
      var from = new Date(this.DateDeb);
      var to = new Date(this.DateFin);
      var date = new Date(dateEnreg);
      if (from <= date && to >= date) {
        return true
      } else {
        return false
      }
    } else {
      return false;
    }

  }
  employeeId: string;
  getEmployee(event) {
    this.employeeId = event.target.value;

  }

  DateDeb: string;
  getDateDeb(event) {
    this.DateDeb = event.target.value;
  }

  DateFin: string;
  getDateFin(event) {
    this.DateFin = event.target.value;
  }
}
