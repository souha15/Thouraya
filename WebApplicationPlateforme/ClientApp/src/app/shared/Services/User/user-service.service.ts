import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { UserDetail } from '../../Models/User/user-detail.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private PathService: PathSharedService) { }

  readonly BaseURI = this.PathService.getPath();
  formData: UserDetail;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  formModel = this.fb.group({
   
    /*UserName: ['', [Validators.minLength(6),Validators.required]],
    Email: ['', [Validators.email, Validators.required]],
    fullName: ['',  Validators.required],
    PhoneNumber: ['', [Validators.minLength(8), Validators.maxLength(10)]],
    directeur: [''],
    position: [''],
    num: ['',  Validators.required],
    registreCivil: ['', Validators.required],
    idDepartement: [''],
    idAdministration: [''],
    nomAdministration: [''],
    nomDepartement: [''],
    Roles: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })*/
    UserName: ['', [Validators.minLength(6), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    fullName: ['', Validators.required],
    fullNameEnglish: [''],
    id: [''],
    registreCivil: [''],
    adresse: [''],
    PhoneNumber: ['', [Validators.minLength(8), Validators.maxLength(10)]],
    tel: [''],
    statut: [''],
    nationalite: [''],
    religion: [''],
    sexe: [''],
    dateNaissance: [''],
    lieuNaissance: [''],
    passeport: [''],
    typeSang: [''],
    num: [''],
    emploi: [''],
    rang: [''],
    typeEmploi: [''],
    nomAdministration: [''],
    nomDepartement: [''],
    unite: [''],
    qualification: [''],
    typeQualification: [''],
    faculteEcole: [''],
    dateQualification: [''],
    specialite: [''],
    paysetude: [''],
    mention: [''],
    classement: [''],
    degre: [''],
    salaire: [''],
    indemnite: [''],
    autreIndemnite: [''],
    heureArrive: [''],
    heureDepart: [''],
    photo: [''],
    idAdministration: [''],
    idDepartement: [''],
    directeur: [''],
    position: [''],
    attribut1: [''],
    attribut2: [''],
    attribut3: [''],
    attribut4: [''],
    attribut5: [''],
    attribut6: [''],
    soldeconge: [''],
    daterectrutement: [''],
    etatuser: [''],
    dateenreg: [''],
    userNameCreator: [''],
    idUserCreator: [''],
    Roles: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
 
  });

  /* Test for Confirming Passwords*/
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }

  }
/* User Registration */
  Username: string;
  register(roles: string[]) {
    var body = {
      
      /*
      Email: this.formModel.value.Email,
      fullName: this.formModel.value.fullName,
      Password: this.formModel.value.Passwords.Password,
      PhoneNumber: this.formModel.value.PhoneNumber,
      directeur: this.formModel.value.directeur,
      position: this.formModel.value.position,
      num: this.formModel.value.num,
      registreCivil: this.formModel.value.registreCivil,
      idDepartement: this.formModel.value.idDepartement,
      idAdministration: this.formModel.value.idAdministration,
      nomAdministration: this.formModel.value.nomAdministration,
      nomDepartement: this.formModel.value.nomDepartement,
      Roles: roles,*/
      id: this.formModel.value.id,
      UserName: this.formModel.value.UserName,
      email: this.formModel.value.email,
      Password: this.formModel.value.Passwords.Password,
      registreCivil: this.formModel.value.registreCivil,
      fullNameEnglish: this.formModel.value.fullNameEnglish,
      fullName: this.formModel.value.fullName,
      adresse: this.formModel.value.adresse,
      PhoneNumber: this.formModel.value.PhoneNumber,
      tel: this.formModel.value.tel,
      statut: this.formModel.value.statut,
      nationalite: this.formModel.value.nationalite,
      religion: this.formModel.value.religion,
      sexe: this.formModel.value.sexe,
      dateNaissance: this.formModel.value.dateNaissance,
      lieuNaissance: this.formModel.value.lieuNaissance,
      passeport: this.formModel.value.passeport,
      typeSang: this.formModel.value.typeSang,
      num: this.formModel.value.num,
      emploi: this.formModel.value.emploi,
      rang: this.formModel.value.rang,
      typeEmploi: this.formModel.value.typeEmploi,
      nomAdministration: this.formModel.value.nomAdministration,
      nomDepartement: this.formModel.value.nomDepartement,
      unite: this.formModel.value.unite,
      qualification: this.formModel.value.qualification,
      typeQualification: this.formModel.value.typeQualification,
      faculteEcole: this.formModel.value.faculteEcole,
      dateQualification: this.formModel.value.dateQualification,
      specialite: this.formModel.value.specialite,
      paysetude: this.formModel.value.paysetude,
      mention: this.formModel.value.mention,
      classement: this.formModel.value.classement,
      degre: this.formModel.value.degre,
      salaire: this.formModel.value.salaire,
      indemnite: this.formModel.value.indemnite,
      autreIndemnite: this.formModel.value.autreIndemnite,
      heureArrive: this.formModel.value.heureArrive,
      heureDepart: this.formModel.value.heureDepart,
      photo: this.formModel.value.photo,
      idAdministration: this.formModel.value.idAdministration,
      idDepartement: this.formModel.value.idDepartement,
      directeur: this.formModel.value.directeur,
      position: this.formModel.value.position,
      attribut1: this.formModel.value.attribut1,
      attribut2: this.formModel.value.attribut2,
      attribut3: this.formModel.value.attribut3,
      attribut4: this.formModel.value.attribut4,
      attribut5: this.formModel.value.attribut5,
      attribut6: this.formModel.value.attribut6,
      soldeconge: this.formModel.value.soldeconge,
      daterectrutement: this.formModel.value.daterectrutement,
      etatuser: this.formModel.value.etatuser,
      dateenreg: this.formModel.value.dateenreg,
      userNameCreator: this.formModel.value.userNameCreator,
      idUserCreator: this.formModel.value.idUserCreator,
      Roles: roles,

    };
    this.Username = this.formModel.value.UserName;
    
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  //User Login
  login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  //Get User Profile

  getUserProfile() {

    return this.http.get(this.BaseURI + '/UserProfile', {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
        //"Content-Type": "application/json"
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        //"Content-Type": "application/json"
      })

    });
  }

  user: UserDetail = new UserDetail();

  async getUserConnected(): Promise<UserDetail> {
    return await  this.getUserProfileObservableAsync();  
    
  }

  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");   
  async getUserProfileObservableAsync() {

    return await this.http.get<UserDetail>(this.BaseURI + '/UserProfile', {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
        //"Content-Type": "application/json"
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        
      })

    }).toPromise();
  }
  //Get User Profile Observable

  getUserProfileObservable() {

    return this.http.get<UserDetail>(this.BaseURI + '/UserProfile', {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
        //"Content-Type": "application/json"
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      })

    });
  }

  getAdminDir(Id) {
    return this.http.get<UserDetail>(this.BaseURI + '/UserProfile/GetAdminDir/' + Id);
  }

  getAdminFinDir() {
    return this.http.get<UserDetail>(this.BaseURI + '/UserProfile/GetAdminDirFin');
  }
  GetEtabFin() {
    return this.http.get<UserDetail>(this.BaseURI + '/UserProfile/GetEtabFin');
  }

  GetRhDepartement() {
    return this.http.get<UserDetail>(this.BaseURI + '/UserProfile/GetRhDepartement');
  }

  GetAdminDirProj() {
    return this.http.get<UserDetail>(this.BaseURI + '/UserProfile/GetAdminDirProj');
  }

  GetAdminDirG() {
    return this.http.get<UserDetail>(this.BaseURI + '/UserProfile/GetAdminDirG');
  }



  //Get UserList

  GetUsersList() {
    return this.http.get<UserDetail[]>(this.BaseURI + '/User');
  }

  //Get User By ID

  GetUserById(Id) {
    return this.http.get<UserDetail>(this.BaseURI + '/User/' + Id);
  }

  GetUserByUserName(UserName) {
    return this.http.get<UserDetail>(this.BaseURI + '/GetUserName/' + UserName);
  }

  GetUserByUserName2(UserName) {
    return this.http.get<UserDetail>(this.BaseURI + '/GetFullName/' + UserName);
  }

  GetUserByNum(num) {
    return this.http.get<UserDetail>(this.BaseURI + '/UserNum/' + num);
  }
  //Delete Users

  DeleteUser(Id: string) {
    return this.http.delete(this.BaseURI + '/User/' +Id)

  }

  //Update User

  EditUser() {
    return this.http.put<UserDetail>(this.BaseURI + '/User/' + this.formData.id, this.formData, this.headers);
  }

  PutObservable(user: UserDetail) {
    return this.http.put<UserDetail>(this.BaseURI + '/User/' + user.id, user, this.headers);
  }
  


  //Handling Roles
 checker(arr1, arr2) {
   return arr1.some(elem => arr2.includes(elem));
  }

  async getUserId(Id){
    return await this.http.get(this.BaseURI + '/UserByRole/' + Id).toPromise();
   
  }
  
async roleMatch(allowedRoles):Promise<boolean>{
     var isMatch = false;
     var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));   
     var userRoles: any;


    userRoles = await this.getUserId(payLoad.UserID);

  if (this.checker(userRoles, allowedRoles)) {
    isMatch = true;

  } else {
    isMatch = false;
  }
 
   return isMatch;

  }

/* const arr1 = [1, 2, 3];
 const arr2 = [3, 5, 4, 2, 7, 0, 1, 10];

 console.log(arr1.every(elem => arr2.includes(elem)));

 let hasAllElems = true;

 for (let i = 0; i < arr1.length; i++) {
   if (arr2.indexOf(arr1[i]) === -1) {
     hasAllElems = false;
     break;
   }
   }
   console.log(hasAllElems)*/

  //Change Password
  ChangePassword(user: UserDetail) {
    return this.http.post(this.BaseURI + '/ApplicationUser/ChangePassword', user, this.headers);

  }

  getUserRoles(Id: string) {
    return this.http.get(this.BaseURI + '/UserByRole/' + Id)
  }

  deluserfromrole(userId: string, roleName: string) {
    return this.http.delete(this.BaseURI + '/UserByRole/RemoveFromRole/'+userId+'/roles/'+roleName)
  }

  addroletoUser(userId: string, roleName: string) {
    return this.http.post(this.BaseURI + '/UserByRole/AddUserRole/' + userId + '/roles/' + roleName, this.headers)
  }
}

