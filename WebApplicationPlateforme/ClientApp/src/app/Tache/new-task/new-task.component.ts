import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TacheService } from '../../shared/Services/Taches/tache.service';
import { ToastrService } from 'ngx-toastr';
import { Tache } from '../../shared/Models/Taches/tache.model';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { PiecesJointes } from '../../shared/Models/Taches/pieces-jointes.model';
import { PathSharedService } from '../../shared/path-shared.service';
import { NgForm } from '@angular/forms';
import { PrivilegesService } from '../../shared/Services/User/privileges.service';
import { NgxDropzoneComponent } from 'ngx-dropzone';
import { TacheProcessService } from '../../shared/Services/Taches/tache-process.service';
import { TacheProcess } from '../../shared/Models/Taches/tache-process.model';
import { TacheNotifService } from '../../shared/Services/Taches/tache-notif.service';
import { TacheNotif } from '../../shared/Models/Taches/tache-notif.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  filter;
  userDetails;
  constructor(private TacheService: TacheService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private privilegesService: PrivilegesService,
    private http: HttpClient,
    private tacheprocessService: TacheProcessService,
    private rootUrl: PathSharedService,
    private notiftaskService: TacheNotifService,
  ) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();}


  ShowFilter = false;
  limitSelection = false;
  cities= [];
  selectedItems = [];
  dropdownSettings: any = {};
  ngOnInit(): void {


    this.getUserConnected();
    this.UserService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;

      },
      err => {
        console.log(err);
      },
    );


    this.UserService.GetUsersList().subscribe(res => {
      this.FUsersList = res
      this.UsersList = this.FUsersList.filter(item => item.id != this.UserIdConnected)
      let i = 0;
      this.UsersList.forEach(item => {
        /*   this.cities[i] = [{ id: item.id, text: item.fullName }];
           i = i + 1;*/
        this.cities.push({ id: item.id, text: item.fullName });
      })
    })
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      searchPlaceholderText: 'بحث',
      allowSearchFilter:true
    };
    this.getFiles();
 
  }

  selecteditems=[];
  onItemSelect(item: any) {
    this.selecteditems.push({ id: item.id, text: item.text });

   
  }

  allselecteditems = [];
  onSelectAll(items: any) {
    this.allselecteditems.push(items);
  }

  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  public onFilterChange(item: any) {
    console.log(item);
  }
  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  privtest: boolean = false;
  privtestR: boolean = false;
  addTask: any;
  rapport: any;
  getUserConnected() {
    
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.tache.type = res.nomAdministration
      
          
    })
    
  }

  //Get Users List

  FUsersList: UserDetail[] = [];
  UsersList: UserDetail[] = [];

  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.FUsersList = res
      this.UsersList = this.FUsersList.filter(item => item.id != this.UserIdConnected)
      let i = 0;
      this.UsersList.forEach(item => {
     /*   this.cities[i] = [{ id: item.id, text: item.fullName }];
        i = i + 1;*/
        this.cities.push({ id: item.id, text: item.fullName });

      })
    })
  }

  // Select Event

  isEmployeeSelected: boolean = false;
  
  affected: string;
  selectInput(event) {
    let selected = event.target.value;
    if (selected == "employee") {
      this.isEmployeeSelected = true;
      this.affected ="employee"
      this.testchamp = true;

    } else {
      this.isEmployeeSelected = false;
      this.affected = "all"
      this.testchamp = true;
    }
   
  }
  Id: string;
  userAffectedName: string;
  selectInput2(event) {
    this.Id = event.target.value;
    
    this.UserService.GetUserById(this.Id).subscribe(res => {
      this.tache.Attribut1 = res.fullName
      this.userAffectedName = res.fullName;
    })
  }

  vider() {
    this.tacheId = null;
    if (this.serviceupload.list.length > 0) {
      this.serviceupload.list.pop();
    }

  }
  //Create Tache

  tache: Tache = new Tache();
  tacheformany: Tache = new Tache();
  attachments: File[] = [];
  CreatedTache: Tache = new Tache();
  tacheId: number;
  testchamp: boolean;
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  tp: TacheProcess = new TacheProcess();
  notiftask: TacheNotif = new TacheNotif();
  onSubmit(form: NgForm) {
    if (this.selecteditems.length == 1) {
      if (form.invalid) {

        this.isValidFormSubmitted = false;
      }
      else {
        this.isValidFormSubmitted = true;
        this.testchamp = true;
        this.tache.idUserCreator = this.UserIdConnected;
        this.tache.creatorName = this.UserNameConnected;
        this.tache.etat = "في الإنتظار"
        this.tache.Attribut2 = "0";
        this.tache.attribut4 = 0;
        this.tache.createur = this.selecteditems[0].text;
        console.log(this.selecteditems[0].text)
        this.tache.affectedName = this.selecteditems[0].id;
        this.tache.sousProjet = "يوم"
        this.TacheService.CreateTache(this.tache).subscribe(
          (res: any) => {
            this.CreatedTache = res;
            this.tacheId = this.CreatedTache.id;


            /***** ------ Pieces Jointes ------ *****/
            this.pj.nomUser = this.tache.creatorName;
            let datef = Date.now();
            this.pj.dateTime = new Date(datef);
            this.pj.dateTime

            this.pj.idTache = this.tacheId;
            let path = this.rootUrl.getPath();
            this.fileslist.forEach(item => {
              this.pj.path = item;
              console.log(item)
              this.http.post(path + '/PiecesJointes', this.pj)
                .subscribe(res => {
                  this.serviceupload.refreshList();
                  this.GetFileName();
                });
            })


            /****** ------Tache Process------ ****/

            this.tp.idtache = this.tacheId;
            this.tp.date = this.date;
            this.tp.affectationtype = this.CreatedTache.atous;
            this.tp.nomusercreator = this.UserNameConnected;
            this.tp.idusercreator = this.UserIdConnected;
            this.tp.etataff = "في الإنتظار"
            if (this.CreatedTache.atous == 'employee') {

              this.tp.nomuseraff = this.userAffectedName;
              this.tp.iduseraffected = this.CreatedTache.affectedName;

            }

            this.tacheprocessService.CreateTache(this.tp).subscribe(res => {

            })


            /**** ------Tache Notification------ *****/

            this.notiftask.datenotif = this.date;
            this.notiftask.idUserAff = this.tache.affectedName;
            this.notiftask.idTache = this.tacheId
            this.notiftask.nomCreator = "0";
            this.notiftaskService.CreateTache(this.notiftask).subscribe(res => {

            }
            )
            this.toastr.success("تم تسجيل المهمة بنجاح", " تسجيل المهمة");
            this.isValidFormSubmitted = false;
          },
          err => {
            this.toastr.error("فشل تسجيل المهمة", " تسجيل المهمة")
          }

        )
      }
    }

    if (this.selecteditems.length > 1) {
      
        if (form.invalid) {
          this.isValidFormSubmitted = false;
        } else {
          this.isValidFormSubmitted = true;
          this.testchamp = true;

          this.tache.idUserCreator = this.UserIdConnected;
          this.tache.creatorName = this.UserNameConnected;
          this.tache.etat = "في الإنتظار"
          this.tache.Attribut2 = "0";
          this.tache.attribut4 = 0;
          this.tache.createur = this.selecteditems[0].text;
          console.log(this.selecteditems[0].text)
          this.tache.affectedName = this.selecteditems[0].id;
          this.tache.sousProjet = "يوم"

          this.TacheService.CreateTache(this.tache).subscribe(
            (res: any) => {
              this.CreatedTache = res;
              this.tacheId = this.CreatedTache.id;


              /***** ------ Pieces Jointes ------ *****/
              this.pj.nomUser = this.tache.creatorName;
              let datef = Date.now();
              this.pj.dateTime = new Date(datef);
              this.pj.dateTime

              this.pj.idTache = this.tacheId;
              let path = this.rootUrl.getPath();
              this.fileslist.forEach(item => {
                this.pj.path = item;
                console.log(item)
                this.http.post(path + '/PiecesJointes', this.pj)
                  .subscribe(res => {
                    this.serviceupload.refreshList();
                    this.GetFileName();
                  });
              })


              /****** ------Tache Process------ ****/

              this.tp.idtache = this.tacheId;
              this.tp.date = this.date;
              this.tp.affectationtype = this.CreatedTache.atous;
              this.tp.nomusercreator = this.UserNameConnected;
           
              this.tp.idusercreator = this.UserIdConnected;
              this.tp.nomuseraff = this.selecteditems[0].text;
              this.tp.iduseraffected = this.selecteditems[0].id;
              this.tp.etataff = "في الإنتظار"
              if (this.CreatedTache.atous == 'employee') {

                this.tp.nomuseraff = this.userAffectedName;
                this.tp.iduseraffected = this.CreatedTache.affectedName;

              }

              this.tacheprocessService.CreateTache(this.tp).subscribe(res => {

              })


              /**** ------Tache Notification------ *****/

              this.notiftask.datenotif = this.date;
              this.notiftask.idUserAff = this.tache.affectedName;
              this.notiftask.idTache = this.tacheId
              this.notiftask.nomCreator = "0";
          
              this.notiftaskService.CreateTache(this.notiftask).subscribe(res => {

              }
              )


              /*****  ------ Task to many Employees -------  *******/

              for (let i = 1; i <= this.selecteditems.length; i++) {
                this.tacheformany = new Tache();
                this.tacheformany = this.tache;
                this.tacheformany.createur = this.selecteditems[i].text;
                this.tacheformany.affectedName = this.selecteditems[i].id;
                this.tacheformany.attribut4 = this.tacheId;
                this.TacheService.CreateTache(this.tacheformany).subscribe(res => {
                  let tachformanyId = res.id;


                  /***** ------ Pieces Jointes ------ *****/
                  this.pj.nomUser = this.tacheformany.creatorName;
                  let datef = Date.now();
                  this.pj.dateTime = new Date(datef);
                  this.pj.dateTime

                  this.pj.idTache = tachformanyId;
                  let path = this.rootUrl.getPath();
                  this.fileslist.forEach(item => {
                    this.pj.path = item;
                    console.log(item)
                    this.http.post(path + '/PiecesJointes', this.pj)
                      .subscribe(res => {
                        this.serviceupload.refreshList();
                        this.GetFileName();
                      });
                  })

                  /****** ------Tache Process------ ****/

                  this.tp.idtache = tachformanyId;
                  this.tp.date = this.date;
                  this.tp.affectationtype = this.tacheformany.atous;
                  this.tp.nomusercreator = this.UserNameConnected;
                  this.tp.idusercreator = this.UserIdConnected;
                  this.tp.etataff = "في الإنتظار"
                  this.tp.nomuseraff = this.tacheformany.createur
                  this.tp.iduseraffected = this.tacheformany.affectedName
                  this.tacheprocessService.CreateTache(this.tp).subscribe(res => {

                  })
                  // Notification
                  this.notiftask.datenotif = this.date;
                  this.notiftask.idUserAff = this.selecteditems[i].id
                  this.notiftask.idTache = tachformanyId
                  this.notiftask.nomCreator = "0";
                  this.notiftaskService.CreateTache(this.notiftask).subscribe(res => {

                  }
                  )
                })
              }
             

              
              /* this.files1 = [];
              
               form.resetForm();   */
              this.toastr.success("تم تسجيل المهمة بنجاح", " تسجيل المهمة");
              this.isValidFormSubmitted = false;
            },
            err => {
              this.toastr.error("فشل تسجيل المهمة", " تسجيل المهمة")
            }

          )
        }
    }

    if (this.affected == "all") {
      if (form.invalid) {
        this.isValidFormSubmitted = false;
      } else {
        this.isValidFormSubmitted = true;
        this.testchamp = true;
        this.tache.idUserCreator = this.UserIdConnected;
        this.tache.creatorName = this.UserNameConnected;
        this.tache.etat = "في الإنتظار"
        this.tache.Attribut2 = "0";
        this.tache.sousProjet = "يوم"
        for (let i = 0; i <= this.UsersList.length; i++) {
          this.tache.createur = this.UsersList[i].fullName;
          this.tache.affectedName = this.UsersList[i].id;

          this.TacheService.CreateTache(this.tache).subscribe(
            res => {
              this.CreatedTache = res;
              this.tacheId = this.CreatedTache.id;

              //Files
              this.pj.nomUser = this.tache.creatorName;
              let datef = Date.now();
              this.pj.dateTime = new Date(datef);
              this.pj.dateTime

              this.pj.idTache = this.tacheId;
              let path = this.rootUrl.getPath();
              this.fileslist.forEach(item => {
                this.pj.path = item;
                console.log(item)
                this.http.post(path + '/PiecesJointes', this.pj)
                  .subscribe(res => {
                    this.serviceupload.refreshList();
                    this.GetFileName();
                  });
              })


              /****** ------Tache Process------ ****/

              this.tp.idtache = this.tacheId;
              this.tp.date = this.date;
              this.tp.affectationtype = this.CreatedTache.atous;
              this.tp.nomusercreator = this.UserNameConnected;

              this.tp.idusercreator = this.UserIdConnected;
              this.tp.nomuseraff = this.tache.createur;
              this.tp.iduseraffected = this.tache.affectedName;
              this.tp.etataff = "في الإنتظار"
              if (this.CreatedTache.atous == 'employee') {

                this.tp.nomuseraff = this.userAffectedName;
                this.tp.iduseraffected = this.CreatedTache.affectedName;

              }

              this.tacheprocessService.CreateTache(this.tp).subscribe(res => {

              })


              this.notiftask.datenotif = this.date;
              this.notiftask.idUserAff = this.tache.affectedName;
              this.notiftask.idTache = this.tacheId
              this.notiftask.nomCreator = "0";

              this.notiftaskService.CreateTache(this.notiftask).subscribe(res => {

              }
              )

          
              this.isValidFormSubmitted = false;
            },
            err => {
              this.toastr.error("فشل تسجيل المهمة", " تسجيل المهمة")
            })
        }

        this.toastr.success("تم تسجيل المهمة بنجاح", " تسجيل المهمة");
      }
    }
  }

  //Files
  files1: File[] = [];
  onSelect(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: PiecesJointes = new PiecesJointes();
  public pjs: PiecesJointes[];
  public files: string[];

  //get List of Files

  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data
       
      }
    );

  }

  //Get file name for Database

  GetFileName() {
    let sa: string;
    let s: any;
    let finalres: any;
    let i: number = 0;
    let tlistnew: any[] = [];
    for (var k = 0; k < this.files.length; k++) {
      sa = <string>this.files[k]
      s = sa.toString().split('uploads\\,', sa.length - 1);
      finalres = s.toString().split('uploads\\', sa.length - 1);

      tlistnew[i] = finalres[1]
      i++;

    }

 
  }

  //Upload

  //Save it ToDatabase
  Idtransaction: number;
  url: any;
  file: any;
  fileslist: string[]=[];
  public upload(event) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                // this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          /// this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist.push(this.file.name);
      console.log(this.fileslist)
    }
  }

  //Test Date

  datecreation: Date;
  datec: any;
 
  testdate(event) {
    this.datecreation = new Date(event.target.value);
    this.datecreation.toDateString();
    this.datec = this.datecreation.toLocaleDateString();
  }


  //test Nom
  nomt: string;
  testnom(event) {
    this.nomt = event.target.value;
    this.nomt.toString();
  }
}
