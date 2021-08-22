import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { EtablissementService } from '../../shared/Services/Etablissement/etablissement.service';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { RoleService } from '../../shared/Services/User/role.service';
import { Etablissement } from '../../shared/Models/Etablissement/etablissement.model';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private administrationservice: AdministrationService,
    private etablissementservice: EtablissementService,
    private RolesService: RoleService,
    public serviceupload: UploadDownloadService, ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.UserService.formModel.reset();
    this.getRoles();
    this.GetEtablisssementList();
    this.GetAdmninstrativeList();
    this.getUserConnected();
  }


  //Get User Connected
  usernamecr: string;
  idusercr: string;
  date = new Date().toLocaleDateString();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.usernamecr = res.fullName;
      this.idusercr = res.id

    })

  }

  //GetUserId
  username: string;
  usernameid: string;

  findid(event) {
    console.log("souha")
    this.username = event.target.value;
    this.UserService.GetUserByUserName2(this.username).subscribe(res => {
      this.usernameid = res.id;

    })
  }
  // Get Etablissement List

  EtablissementList: Etablissement[] = [];

  GetEtablisssementList() {
    this.etablissementservice.ListEtablissement().subscribe(res => {
      this.EtablissementList = res

    })

  }

  // convert id Etablissement
  ConvertedEtabId: number;
  selectInput1(event) {
    let selected = event.target.value;
    if (selected) {
      console.log(typeof parseInt(selected))
      return parseInt(selected)

    } else {
      return parseInt(selected)
    }
  }

  // convert idAdmnistration
  ConvertedId: number;
  selectInput2(event) {
    let selected = event.target.value;
    if (selected) {
      return parseInt(selected)
    } else {
      return parseInt(selected)
    }
  }

  //Administration Liste

  AdministrationList: Administration[] = [];

  GetAdmninstrativeList() {
    this.administrationservice.ListAdministration().subscribe(res => {
      this.AdministrationList = res
    })
  }
  x: any
  selectInput4(event) {
    this.x = event.target.value;
    console.log(this.x)
  }
  //Get Users List
  UsersList: UserDetail[] = [];
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersList = res
    })

  }


  // Get Roles List

  roles: any[];

  getRoles() {
    this.RolesService.getAllRoles().subscribe(
      (data: any) => {
        data.forEach(obj => obj.selected = false);
        this.roles = data;


      }

    )


  }

  //Administration test
  bossId: number = null;
  boss: string;
  selectedEtab: boolean = false;
  etabList: Etablissement[] = [];
  etabListAd: Etablissement[] = [];
  etabFinder: boolean = false;
  adFinder: boolean = false;
  nomAdministration: string;
  nomDepartement: string;
  position: string;
  directoretab: string;
  directorad: string
  dir: string;

  administartion: Administration = new Administration();
  admintest(event) {

    this.bossId = event.target.value;
    console.log(this.bossId)

    this.administrationservice.GetById(+this.bossId).subscribe(res => {
      console.log(res.nom)
      this.administartion = res
      this.nomAdministration = res.nom;
      this.directorad = res.nomDirecteur;
      if (this.directoretabSelectedRole) {
        this.directoretab = res.nomDirecteur
        this.UserService.GetUserByUserName2(this.directoretab).subscribe(res => {
          this.usernameid = res.id;

        })
      }



    })

    let adlis: Administration[] = [];
    let adlisfiltred: Administration[] = [];
    this.administrationservice.ListAdministration().subscribe(res => {
      adlis = res
      adlisfiltred = adlis.filter(item => item.nom == "الادارة العامة")
      this.dir = adlisfiltred[0].nomDirecteur
      if (this.dir != null) {
        this.UserService.GetUserByUserName2(this.dir).subscribe(res => {
          this.usernameid = res.id;

        })
      }
    })

    //Test existence of administration

    if (this.AdministrationList.length > 0) {
      this.adFinder = true;
    }
    else {
      this.adFinder = false
    }


    //Test etab existence

    this.etablissementservice.ListEtablissement().subscribe(res => {
      this.etabList = res
      this.etabListAd = this.etabList.filter(item => item.idAdministration == +this.bossId)

      if (this.etabListAd.length > 0) {
        this.etabFinder = true;
      } else {
        this.etabFinder = false;
      }



    })



  }

  //etab test
  etabId: number = null;
  etabName: string = "";
  directorfinder: boolean = false;
  etabdirectorTest: boolean = false;
  etabdirector: string;
  etabnamedirectoretab: string;
  etablissement: Etablissement = new Etablissement();
  etabtest(event) {
    this.etabId = event.target.value;

    if (+this.etabId != null) {
      this.etablissementservice.GetById(+this.etabId).subscribe(res => {
        this.etablissement = res

        this.nomDepartement = res.nom
        this.etabdirector = res.nomDirecteur

        if (this.employeeSelectedRole) {
          this.etabName = res.nomDirecteur
          this.UserService.GetUserByUserName2(this.etabName).subscribe(res => {
            this.usernameid = res.id;

          })
        }

        if (this.directoretabSelectedRole) {
          this.etabnamedirectoretab = res.nomDirecteur
        }




        if (this.etabName != null) {
          this.directorfinder == true;

        } else {


          this.directorfinder = false;

        }


      })
    }
  }
  selectedRole: boolean = false;
  employeeSelectedRole: boolean = false;
  directoretabSelectedRole: boolean = false;
  directoreadSelectedRole: boolean = false;
  directoreGSelectedRole: boolean = false;

  updateSelectedRoles(index) {
    this.roles[index].selected = !this.roles[index].selected;
    var x = this.roles.filter(x => x.selected).map(y => y.Name);

    if (index == 0) {
      this.employeeSelectedRole = true;
      this.position = "موظف"
      console.log(this.position)
    } else {
      this.employeeSelectedRole = false;

    }

    if (index == 2) {
      this.directoretabSelectedRole = true
      this.position = "مدير قسم"
      console.log(this.position)
    } else {
      this.directoretabSelectedRole = false;
    }


    if (index == 1) {
      this.directoreadSelectedRole = true
      this.position = "مدير إدارة"
      console.log(this.position)
    } else {
      this.directoreadSelectedRole = false
    }

    if (index == 3) {
      this.directoreGSelectedRole = true
      this.position = "مدير عام"
      console.log(this.position)
    } else {
      this.directoreGSelectedRole = false
    }

  }


  //Create Number

  randomnumbertest: boolean = false;
  randomnumber: number;
  notrandom: boolean = true;
  testrandom: boolean = false
  password: string;
  usernameg: string;
  numrandom(event) {
    if (event.target.checked) {
      this.randomnumbertest = true;
      this.notrandom = false;

      this.randomnumber = Math.floor(1000 + Math.random() * 9000);
      this.fuser = this.UsersList.filter(item => item.num == this.randomnumber.toString())
      if (this.fuser.length == 0) {
        this.testrandom = true
        this.password = this.randomnumber + "123"
        this.usernameg = "00" + this.randomnumber;
        console.log(this.password)
      } else {
        this.testrandom = false;
      }

    }



  }
  creatednum: boolean = false;
  numnum: any;
  fuser: any;
  changenum(event) {
    this.numnum = event.target.value;
    console.log(this.numnum)
    console.log(typeof this.numnum)
    if (event.target.value != null) {
      // console.log(this.UsersList.filter(item => item.num == this.numnum).length == 0)
      this.fuser = this.UsersList.filter(item => item.num == this.numnum)
      this.password = this.numnum + "123";
      this.usernameg = "00" + this.numnum;
      console.log(this.password)
      if (this.fuser.length == 0) {
        this.creatednum = true;

      }
    } else {
      this.creatednum = false;

    }
  }
  activiation: string = "0";
  onSubmit() {

    var x = this.roles.filter(x => x.selected).map(y => y.name);
    this.UserService.register(x).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.UserService
          this.UserService.formModel.reset();
          this.UserService.formModel.invalid
          this.toastr.success('تم إنشاء المستخدم', 'تم التسجيل بنجاح');

          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('اسم المستخدم مسجل من قبل', 'فشل في التسجيل');
                break;

              default:
                this.toastr.error(element.description, 'فشل في التسجيل');
                break;
            }
          });
        }

      },
      err => {
        console.log(err);
      }
    );
  }

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
  path: string;
  Idtransaction: number;
  url: any;
  file: any;
  fileslist: string[] = [];
  public upload(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist.push(this.file.name);
      this.fileslist.forEach(item => {
        this.path = item;

      })
    }
  }
}

