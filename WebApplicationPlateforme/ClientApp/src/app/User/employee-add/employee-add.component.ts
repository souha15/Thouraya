import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private administrationservice: AdministrationService,
    private etablissementservice: EtablissementService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private RolesService: RoleService,
    public serviceupload: UploadDownloadService, ) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.UserService.formModel.reset();
    this.getRoles();
    this.GetAdmninstrativeList();
  //  this.getUserConnected();
    this.getUsersList();
    this.getFiles();
    this.changeDetectorRef.detectChanges();
  }

  AutomaticDirector: boolean = false;
  automaticDir(event) {
    if (event.target.checked) {
      this.AutomaticDirector = true
    } else {
      this.AutomaticDirector = false;
    }
  }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  private selectedLink: string = "newone";

  setradio(e: string): void {

    this.selectedLink = e;

  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }

  //Calcul Salsire Net
  SalaireNet: boolean = false;
  salaireNet: number = 0;
  typeQualification: string;
  CalculSalaire() {
    this.salaireNet = (this.salaire + this.indem + this.autreInd) - this.assurance
    this.typeQualification = this.salaireNet.toString();
    //this.UserService.formData.typeQualification = this.typeQualification
  }

  
  salaire: number;
  getSalaire(event) {
    this.salaire = +event.target.value;
    if (this.salaire != null && this.indem != null && this.autreInd != null && this.assurance != null) {
      this.SalaireNet = true;
      this.CalculSalaire();
    } else {
      this.SalaireNet = false;
    }
  }

  assurance: number;
  getAssurance(event) {
    this.assurance = +event.target.value;
    if (this.salaire != null && this.indem != null && this.autreInd != null && this.assurance != null) {
      this.SalaireNet = true;
      this.CalculSalaire();
    } else {
      this.SalaireNet = false;
    }
  }

  autreInd:number
  getAuteIndemnite(event) {
    this.autreInd = +event.target.value;
    if (this.salaire != null && this.indem != null && this.autreInd != null && this.assurance != null) {
      this.SalaireNet = true;
      this.CalculSalaire();
    } else {
      this.SalaireNet = false;
    }
  }

  indem: number;
  getIndemnite(event) {
    this.indem = +event.target.value;
    if (this.salaire != null && this.indem != null && this.autreInd != null && this.assurance != null) {
      this.SalaireNet = true;
      this.CalculSalaire();
    } else {
      this.SalaireNet = false;
    }
  }
  // Type Presence
  typepresence: boolean = false;
  typePresence(event) {
    if (event.target.value == "جزئي") {
      this.typepresence = true
    } else
      this.typepresence = false;
  }
  //Get User Connected
  usernamecr: string;
  idusercr: string;
  date = new Date().toLocaleDateString();
  /*getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.usernamecr = res.fullName;
      this.idusercr = res.id
      
    })

  }
  */

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
  }
  //Get Users List
  UsersList: UserDetail[] = [];
  dirl: UserDetail[] = [];
  usernameid: string;
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
        console.log(this.roles)
      }

    )


  }

  //Administration test
  bossId: number = null;
  nomAdministration: string;
  position: string;
  dir: string;  
  administartion: Administration = new Administration();
  etabListAd: Etablissement[] = [];
  etabList: Etablissement[] = [];
  etabFinder: boolean = false;
  directoretab: string;
  admintest(event) {

    this.bossId = event.target.value;
    this.administrationservice.GetById(+this.bossId).subscribe(res => {

      this.administartion = res
      this.nomAdministration = res.nom;

      if (this.directoretabSelectedRole) {
        this.directoretab = res.nomDirecteur
        this.UserService.GetUserByUserName2(this.directoretab).subscribe(res => {
          this.usernameid = res.id;

        })
      }
      this.etablissementservice.ListEtablissement().subscribe(res => {
        this.etabList = res
        this.etabListAd = this.etabList.filter(item => item.idAdministration == +this.bossId)

        if (this.etabListAd.length > 0) {
          this.etabFinder = true;
        } else {
          this.etabFinder = false;
        }



      })
      if (this.directoreAdSelectedRole) {
        this.administartion.nomDirecteur = this.usernamey;
        this.administrationservice.PutObservable(this.administartion).subscribe(res => {

        })
      }

    })


  }
  usernamey: string;
  getUserName(event) {
    this.usernamey = event.target.value;
  }

  etabId: number = null;
  etabName: string = "";
  directorfinder: boolean = false;
  etabdirectorTest: boolean = false;
  etabdirector: string;
  etabnamedirectoretab: string;
  etablissement: Etablissement = new Etablissement();
  nomDepartement: string;
  etabtest(event) {
    this.etabId = event.target.value;

    if (+this.etabId != null) {
      this.etablissementservice.GetById(+this.etabId).subscribe(res => {
        this.etablissement = res

        this.nomDepartement = res.nom
        this.etabdirector = res.nomDirecteur
        if (this.directoretabSelectedRole) {
          this.etablissement.nomDirecteur = this.usernamey;
          this.etablissementservice.PutObservable(this.etablissement).subscribe(res => {

          })
        }
          if (this.employeeSelectedRole) {
            this.etabName = this.etabdirector
            console.log(this.etabName)
            this.UserService.GetUserByUserName2(this.etabName).subscribe(res => {
              this.usernameid = res.id;

            })
          }
       

      })
    }

  }
  username: string;
  findid(event) {

    this.username = event.target.value;
    this.UserService.GetUserByUserName2(this.username).subscribe(res => {
      this.usernameid = res.id;

    })
  }
  dirname: string;
  findnum(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.dirname = res.fullName
    })
  }

  selectedRole: boolean = false;
  employeeSelectedRole: boolean = false;
  directoretabSelectedRole: boolean = false;
  directoreGSelectedRole: boolean = false;
  directoreAdSelectedRole: boolean = false;
  rowsel: boolean = false;

  list: string[] = [];
  updateSelectedRoles(index) {
    this.rowsel = true;
    this.roles[index].selected = !this.roles[index].selected;
    var x = this.roles.filter(x => x.selected).map(y => y.Name);
 
    if (index == 1) {
      this.directoreGSelectedRole = false;
      this.position = "مسؤول النظام";
      this.dir = "";
      this.usernameid = ""

    } else {
      this.directoreGSelectedRole = true
    }

    if (index == 0) {

      this.position = "موظف"
      this.employeeSelectedRole = true;

    } else {
      this.employeeSelectedRole = false;
    }


    if (index == 2) {
      this.directoreGSelectedRole = false;
      this.position = "المدير التنفيذي"
      this.dir = ""
      this.usernameid = ""
    } else {
      this.directoreGSelectedRole = true
    }

    if (index == 6) {
      this.position = "مدير قسم"
      this.directoretabSelectedRole = true
 
    } else {
      this.directoretabSelectedRole = false;
    }

    if (index == 3) {
   
      this.position = "مسؤول شؤون توظيف"

    }

    if (index == 4) {

      this.position = "مسؤول مالية"

    }


    if (index == 5) {
      this.position = "مدير ادارة"
      this.directoreAdSelectedRole = true
      this.dirl = this.UsersList.filter(item => item.position == "المدير التنفيذي")
      this.dir = this.dirl[0].fullName
      this.usernameid = this.dirl[0].id;
      console.log(this.dir)
      console.log(this.dirl)


    } else {
      this.directoreAdSelectedRole = false;
    }
    console.log(this.position)
    console.log(index)
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
    if (event.target.value != null) {
    
      this.fuser = this.UsersList.filter(item => item.num == this.numnum)
      this.password = this.numnum + "123";
      this.usernameg = "00" + this.numnum;

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
