import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { Data } from '@angular/router';
import { TacheService } from '../../shared/Services/Taches/tache.service';
import { Tache } from '../../shared/Models/Taches/tache.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tasks-reports',
  templateUrl: './tasks-reports.component.html',
  styleUrls: ['./tasks-reports.component.css']
})
export class TasksReportsComponent implements OnInit {


  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private userService: UserServiceService,
    private administrationService: AdministrationService,
    private tacheService: TacheService,
    private toastr: ToastrService
   ) { }

  ngOnInit(): void {
    this.GetUsersList();
    this.GetAdministratoionList();
    this.TacheList();
    this.getUserConnected();
  }



  //Get users list

  UsersList: UserDetail[] = [];

  GetUsersList() {
    this.userService.GetUsersList().subscribe(res => {
      this.UsersList = res
    })
  }

  //GetUserName
  username: string;
  GetUserName(id) {
    if (this.employee != null) {
      this.userService.GetUserById(id).subscribe(res => {
        this.username = res.fullName
    });
    }
  }

  //Get Administration Service

  administrationList: Administration[] = [];

  GetAdministratoionList() {
    this.administrationService.ListAdministration().subscribe(res => {
      this.administrationList=res
    })

  }
  show: boolean = false;
  clear() {
    this.Genarallist = [];
    this.show = false;
  }
  //Pdf
  path: string;
  public openPDF() {
   
    var data = document.getElementById('htmlData');
    data.style.display = "block";
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      data.style.display = "none"
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "Report" + this.datedepart.toDateString() + this.datefin.toDateString() + ".pdf"
      pdf.save(this.path); // Generated PDF
      
    });
   
  }


  datedepart: Date;
  datef: any;
  dated: any;
  dateDepart(event) {
    this.datedepart = new Date(event.target.value);
    this.datedepart.toDateString();
    this.dated = this.datedepart.toLocaleDateString();
  }

  datefin: Date;
  dateFin(event) {

    this.datefin = new Date(event.target.value);
    this.datefin.toDateString();
    this.datef = this.datefin.toLocaleDateString();

  }
  compare(a) {

    if (this.datefin != null && this.datedepart != null) {
      if (a >= this.datedepart && a <= this.datefin) {

        return true;
      }
      else {

        return false
      }

    }
    else
      console.log("fer8iiin")
  }

  //Tache List

  ListeTache: Tache[] = [];
  TacheList() {
    this.tacheService.ListTache().subscribe(res => {
      this.ListeTache=res
    })
  }

  // Liste Filtering
  employee: string;

  selectEmployee(event) {
    this.employee = event.target.value;
      }

  admin: number;
  nameadmin: string;
  selectAdmin(event) {
    this.admin = +event.target.value;
    
  }

  UserIdConnected: string;
  getUserConnected() {

    this.userService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;

    })
  }

  foradminlist: Tache[] = [];
  forEmployeelist: Tache[] = [];
  foraDateDepartlist: Tache[] = [];
  forDatelist: Tache[] = [];
  Genarallist: Tache[] = [];
  adminname: string;
  nodata: boolean;
  filtredtachelist: Tache[] = [];
  formRapport() {
    if (this.adminOremp == null) {

      this.toastr.warning("اختر اسم الموظف/الإدارة", 'تحذير')
      if (this.employee == null || this.admin == null) {

        this.toastr.warning("اختر اسم الموظف/الإدارة", 'تحذير')

      } 
    }
  else if (this.datedepart == null) {
      this.toastr.error("اختر تاريخ البدء", 'تحذير')

    } else if (this.datefin == null) {
      this.toastr.error("اختر تاريخ الانتهاء", 'تحذير')
    }
   
    else {
      this.tacheService.ListTache().subscribe(res => {
        this.ListeTache = res


        //Get administration name

        this.administrationService.GetById(this.admin).subscribe(res => {
          this.adminname = res.nom
        });

        //Get userName

        this.userService.GetUserById(this.employee).subscribe(res => {
          this.username = res.fullName
        });


        //Received list
   
        this.filtredtachelist = this.ListeTache.filter(item => item.idUserCreator == this.UserIdConnected)

        if (this.employee != null) {
          this.forEmployeelist = this.filtredtachelist.filter(item =>
            item.affectedName == this.employee

          );
          this.forEmployeelist.forEach(element => {
            var date = new Date(element.date)
            date.toLocaleDateString();
            if (date >= this.datedepart && date <= this.datefin) {
              this.Genarallist.push(element);

              this.show = true;


            }
            /*if(this.Genarallist == null) {
              this.toastr.error(" لا يوجد بيانات بهذه المواصفات", "")
            }*/


          })

        }

        if (this.admin != null) {
          this.forEmployeelist = this.filtredtachelist.filter(item =>
            item.attribut4 == this.admin

          );
          this.forEmployeelist.forEach(element => {
            var date = new Date(element.date)
            date.toLocaleDateString();
            if (date >= this.datedepart && date <= this.datefin) {
              this.Genarallist.push(element);

              this.show = true;


            }
            /*if(this.Genarallist == null) {
              this.toastr.error(" لا يوجد بيانات بهذه المواصفات", "")
            }*/


          })

        }

      });
    
    }

      /*this.forEmployeelist.forEach(element => {
        if (this.compare(element.date)) {
          this.forEmployeelist.push(element);
        }
      })
      console.log(this.forEmployeelist)*/    

  }

  isEmployeeSelected: boolean = false;
  isAdminSelected: boolean = false;
  testchamp: boolean;
  affected: string;
  adminOremp: string;
  selectInput(event) {
    let selected = event.target.value;
    this.adminOremp = selected;
    this.adminOremp.toString();
    if (selected == "employee") {
      this.isEmployeeSelected = true;
      this.isAdminSelected = false;
      this.affected = "employee"
      this.testchamp = true;

    } else {
      this.isAdminSelected = true;
      this.isEmployeeSelected = false;
      this.affected = "all"
      this.testchamp = true;
    }

  }


      
}
