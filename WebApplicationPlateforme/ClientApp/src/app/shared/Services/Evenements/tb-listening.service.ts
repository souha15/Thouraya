import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbListening } from '../../Models/Evenements/tb-listening.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TbListeningService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TbListening;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create TacheEv

  AddT(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TacheEvs', dotation, this.headers);
  }


  PostT() {
    return this.http.post(this.rootURL + '/TacheEvs', this.formData, this.headers);
  }



  GetTache(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TacheEvs');
  }

  GetT() {
    return this.http.get<TbListening[]>(this.rootURL + '/TacheEvs');
  }


  GetByIdT(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TacheEvs/' + Id);
  }



  EditT() {
    return this.http.put(this.rootURL + '/TacheEvs/' + this.formData.id, this.formData, this.headers);
  }



  DeleteT(id) {
    return this.http.delete(this.rootURL + '/TacheEvs/' + id);
  }


  //Create Outils


  AddO(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/OutilsEvs', dotation, this.headers);
  }


  PostO() {
    return this.http.post(this.rootURL + '/OutilsEvs', this.formData, this.headers);
  }



  GetOutils(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/OutilsEvs');
  }

  GetO() {
    return this.http.get<TbListening[]>(this.rootURL + '/OutilsEvs');
  }


  GetByIdO(Id) {
    return this.http.get<TbListening>(this.rootURL + '/OutilsEvs/' + Id);
  }



  EditO() {
    return this.http.put(this.rootURL + '/OutilsEvs/' + this.formData.id, this.formData, this.headers);
  }



  DeleteO(id) {
    return this.http.delete(this.rootURL + '/OutilsEvs/' + id);
  }



  //Create Beneficiaires

  AddB(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/Beneficiaires', dotation, this.headers);
  }


  PostB() {
    return this.http.post(this.rootURL + '/Beneficiaires', this.formData, this.headers);
  }



  GetBeneficiaire(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/Beneficiaires');
  }

  GetB() {
    return this.http.get<TbListening[]>(this.rootURL + '/Beneficiaires');
  }


  GetByIdB(Id) {
    return this.http.get<TbListening>(this.rootURL + '/Beneficiaires/' + Id);
  }



  EditB() {
    return this.http.put(this.rootURL + '/Beneficiaires/' + this.formData.id, this.formData, this.headers);
  }



  DeleteB(id) {
    return this.http.delete(this.rootURL + '/Beneficiaires/' + id);
  }



  //Create ClasseEvs

  

  AddC(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/ClasseEvs', dotation, this.headers);
  }


  PosC() {
    return this.http.post(this.rootURL + '/ClasseEvs', this.formData, this.headers);
  }



  GetClasseEvs(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/ClasseEvs');
  }

  GetC() {
    return this.http.get<TbListening[]>(this.rootURL + '/ClasseEvs');
  }


  GetByIdC(Id) {
    return this.http.get<TbListening>(this.rootURL + '/ClasseEvs/' + Id);
  }



  EditC() {
    return this.http.put(this.rootURL + '/ClasseEvs/' + this.formData.id, this.formData, this.headers);
  }



  DeleteC(id) {
    return this.http.delete(this.rootURL + '/ClasseEvs/' + id);
  }




  //Create MediasEvs


  AddM(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/MediasEvs', dotation, this.headers);
  }


  PostM() {
    return this.http.post(this.rootURL + '/MediasEvs', this.formData, this.headers);
  }



  GetMediasEvs(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/MediasEvs');
  }

  GetM() {
    return this.http.get<TbListening[]>(this.rootURL + '/MediasEvs');
  }


  GetByIdM(Id) {
    return this.http.get<TbListening>(this.rootURL + '/MediasEvs/' + Id);
  }



  EditM() {
    return this.http.put(this.rootURL + '/MediasEvs/' + this.formData.id, this.formData, this.headers);
  }



  DeleteM(id) {
    return this.http.delete(this.rootURL + '/MediasEvs/' + id);
  }

  //Create activity


  AddA(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/ActivityEvs', dotation, this.headers);
  }


  PostA() {
    return this.http.post(this.rootURL + '/ActivityEvs', this.formData, this.headers);
  }



  GetActivityEvs(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/ActivityEvs');
  }

  GetA() {
    return this.http.get<TbListening[]>(this.rootURL + '/ActivityEvs');
  }


  GetByIdA(Id) {
    return this.http.get<TbListening>(this.rootURL + '/ActivityEvs/' + Id);
  }



  EditA() {
    return this.http.put(this.rootURL + '/ActivityEvs/' + this.formData.id, this.formData, this.headers);
  }



  DeleteA(id) {
    return this.http.delete(this.rootURL + '/ActivityEvs/' + id);
  }

  //Create NomEquipement

  AddN(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/nomEquipements', dotation, this.headers);
  }


  PostN() {
    return this.http.post(this.rootURL + '/nomEquipements', this.formData, this.headers);
  }



  GetNom(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/nomEquipements');
  }

  GetN() {
    return this.http.get<TbListening[]>(this.rootURL + '/nomEquipements');
  }


  GetByIdN(Id) {
    return this.http.get<TbListening>(this.rootURL + '/nomEquipements/' + Id);
  }



  EditN() {
    return this.http.put(this.rootURL + '/nomEquipements/' + this.formData.id, this.formData, this.headers);
  }



  DeleteN(id) {
    return this.http.delete(this.rootURL + '/nomEquipements/' + id);
  }

  //Create Type Facture

  AddTfacture(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeFactures', dotation, this.headers);
  }


  PostTfacture() {
    return this.http.post(this.rootURL + '/TypeFactures', this.formData, this.headers);
  }



  GetTypefacture(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeFactures');
  }

  GetTfacture() {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeFactures');
  }


  GetByIdTfacture(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeFactures/' + Id);
  }



  EditTfacture() {
    return this.http.put(this.rootURL + '/TypeFactures/' + this.formData.id, this.formData, this.headers);
  }



  DeleteTfacture(id) {
    return this.http.delete(this.rootURL + '/TypeFactures/' + id);
  }

  //Create Type Depense

  AddTDep(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeDepenses', dotation, this.headers);
  }


  PostTDep() {
    return this.http.post(this.rootURL + '/TypeDepenses', this.formData, this.headers);
  }



  GetTypeDep(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeDepenses');
  }

  GetTDep() {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeDepenses');
  }


  GetByIdTDep(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeDepenses/' + Id);
  }



  EditTDep() {
    return this.http.put(this.rootURL + '/TypeDepenses/' + this.formData.id, this.formData, this.headers);
  }



  DeleteTDep(id) {
    return this.http.delete(this.rootURL + '/TypeDepenses/' + id);
  }

  //Create Type Beneficiaire

  AddTBen(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeBeneficiaires', dotation, this.headers);
  }


  PostTBen() {
    return this.http.post(this.rootURL + '/TypeBeneficiaires', this.formData, this.headers);
  }



  GetTypeBeneficiare(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeBeneficiaires');
  }

  GetTBen() {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeBeneficiaires');
  }


  GetByIdTBen(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeBeneficiaires/' + Id);
  }



  EditTBen() {
    return this.http.put(this.rootURL + '/TypeBeneficiaires/' + this.formData.id, this.formData, this.headers);
  }



  DeleteTBen(id) {
    return this.http.delete(this.rootURL + '/TypeBeneficiaires/' + id);
  }


  //Create Projet Prog

  AddProg(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/ProjetProgs', dotation, this.headers);
  }


  PostProg() {
    return this.http.post(this.rootURL + '/ProjetProgs', this.formData, this.headers);
  }



  GetProjetProg(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/ProjetProgs');
  }

  GetProg() {
    return this.http.get<TbListening[]>(this.rootURL + '/ProjetProgs');
  }


  GetByIdProg(Id) {
    return this.http.get<TbListening>(this.rootURL + '/ProjetProgs/' + Id);
  }



  EditProg() {
    return this.http.put(this.rootURL + '/ProjetProgs/' + this.formData.id, this.formData, this.headers);
  }



  DeleteProg(id) {
    return this.http.delete(this.rootURL + '/ProjetProgs/' + id);
  }



  //Create Branche two

  AddBt(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/BrancheTwoes', dotation, this.headers);
  }


  PostBt() {
    return this.http.post(this.rootURL + '/BrancheTwoes', this.formData, this.headers);
  }



  GetBrancheTwo(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/BrancheTwoes');
  }

  GetBt() {
    return this.http.get<TbListening[]>(this.rootURL + '/BrancheTwoes');
  }


  GetByIdBt(Id) {
    return this.http.get<TbListening>(this.rootURL + '/BrancheTwoes/' + Id);
  }



  EditBt() {
    return this.http.put(this.rootURL + '/BrancheTwoes/' + this.formData.id, this.formData, this.headers);
  }



  DeleteBt(id) {
    return this.http.delete(this.rootURL + '/BrancheTwoes/' + id);
  }


  //Create Branche Ones

  AddBo(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/BrancheOnes', dotation, this.headers);
  }


  PostBo() {
    return this.http.post(this.rootURL + '/BrancheOnes', this.formData, this.headers);
  }



  GetBrancheOne(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/BrancheOnes');
  }

  GetBo() {
    return this.http.get<TbListening[]>(this.rootURL + '/BrancheOnes');
  }


  GetByIdBo(Id) {
    return this.http.get<TbListening>(this.rootURL + '/BrancheOnes/' + Id);
  }



  EditBo() {
    return this.http.put(this.rootURL + '/BrancheOnes/' + this.formData.id, this.formData, this.headers);
  }



  DeleteBo(id) {
    return this.http.delete(this.rootURL + '/BrancheOnes/' + id);
  }

  //Create Organisme Voiture

  AddOV(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/OrganismeVoitures', dotation, this.headers);
  }


  PostOV() {
    return this.http.post(this.rootURL + '/OrganismeVoitures', this.formData, this.headers);
  }



  GetOrganismeVoiture(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/OrganismeVoitures');
  }

  GetOV() {
    return this.http.get<TbListening[]>(this.rootURL + '/OrganismeVoitures');
  }


  GetByIdOV(Id) {
    return this.http.get<TbListening>(this.rootURL + '/OrganismeVoitures/' + Id);
  }



  EditOV() {
    return this.http.put(this.rootURL + '/OrganismeVoitures/' + this.formData.id, this.formData, this.headers);
  }



  DeleteOV(id) {
    return this.http.delete(this.rootURL + '/OrganismeVoitures/' + id);
  }


  //Create Type Voiture

  AddTV(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/TypeVoitures', dotation, this.headers);
  }


  PostTV() {
    return this.http.post(this.rootURL + '/TypeVoitures', this.formData, this.headers);
  }



  GetTypeVoiture(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeVoitures');
  }

  GetTV() {
    return this.http.get<TbListening[]>(this.rootURL + '/TypeVoitures');
  }


  GetByIdTV(Id) {
    return this.http.get<TbListening>(this.rootURL + '/TypeVoitures/' + Id);
  }



  EditTV() {
    return this.http.put(this.rootURL + '/TypeVoitures/' + this.formData.id, this.formData, this.headers);
  }



  DeleteTV(id) {
    return this.http.delete(this.rootURL + '/TypeVoitures/' + id);
  }


  //Create TypeEquipement

  AddE(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/typeEquipements', dotation, this.headers);
  }


  PostE() {
    return this.http.post(this.rootURL + '/typeEquipements', this.formData, this.headers);
  }



  GetType(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/typeEquipements');
  }

  GetE() {
    return this.http.get<TbListening[]>(this.rootURL + '/typeEquipements');
  }


  GetByIdE(Id) {
    return this.http.get<TbListening>(this.rootURL + '/typeEquipements/' + Id);
  }



  EditE() {
    return this.http.put(this.rootURL + '/typeEquipements/' + this.formData.id, this.formData, this.headers);
  }



  DeleteE(id) {
    return this.http.delete(this.rootURL + '/typeEquipements/' + id);
  }


  //Create TypeEquipement

  AddPD(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/ProjetDons', dotation, this.headers);
  }


  PostPD() {
    return this.http.post(this.rootURL + '/ProjetDons', this.formData, this.headers);
  }



  GetProjetDons(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/ProjetDons');
  }

  GetPD() {
    return this.http.get<TbListening[]>(this.rootURL + '/ProjetDons');
  }


  GetByIdPD(Id) {
    return this.http.get<TbListening>(this.rootURL + '/ProjetDons/' + Id);
  }



  EditPD() {
    return this.http.put(this.rootURL + '/ProjetDons/' + this.formData.id, this.formData, this.headers);
  }



  DeletePD(id) {
    return this.http.delete(this.rootURL + '/ProjetDons/' + id);
  }


  //Specialite

  Add(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/Specialites', dotation, this.headers);
  }


  Post() {
    return this.http.post(this.rootURL + '/Specialites', this.formData, this.headers);
  }



  GetSpecialite(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/Specialites');
  }

  Get() {
    return this.http.get<TbListening[]>(this.rootURL + '/Specialites');
  }


  GetById(Id) {
    return this.http.get<TbListening>(this.rootURL + '/Specialites/' + Id);
  }



  Edit() {
    return this.http.put(this.rootURL + '/Specialites/' + this.formData.id, this.formData, this.headers);
  }



  Delete(id) {
    return this.http.delete(this.rootURL + '/Specialites/' + id);
  }


  //Panne

  AddP(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/Pannes', dotation, this.headers);
  }


  PostP() {
    return this.http.post(this.rootURL + '/Pannes', this.formData, this.headers);
  }



  GetPanne(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/Pannes');
  }

  GetP() {
    return this.http.get<TbListening[]>(this.rootURL + '/Pannes');
  }


  GetByIdP(Id) {
    return this.http.get<TbListening>(this.rootURL + '/Pannes/' + Id);
  }



  EditP() {
    return this.http.put(this.rootURL + '/Pannes/' + this.formData.id, this.formData, this.headers);
  }



  DeleteP(id) {
    return this.http.delete(this.rootURL + '/Pannes/' + id);
  }

  //Nom Files

  AddNF(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/NomFiles', dotation, this.headers);
  }


  PostNF() {
    return this.http.post(this.rootURL + '/NomFiles', this.formData, this.headers);
  }



  GetNomFiles(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/NomFiles');
  }

  GetNF() {
    return this.http.get<TbListening[]>(this.rootURL + '/NomFiles');
  }


  GetByIdNF(Id) {
    return this.http.get<TbListening>(this.rootURL + '/NomFiles/' + Id);
  }



  EditNF() {
    return this.http.put(this.rootURL + '/NomFiles/' + this.formData.id, this.formData, this.headers);
  }



  DeleteNF(id) {
    return this.http.delete(this.rootURL + '/NomFiles/' + id);
  }


  //Nom Files

  AddDep(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/DepenseEvents', dotation, this.headers);
  }


  PostDep() {
    return this.http.post(this.rootURL + '/DepenseEvents', this.formData, this.headers);
  }



  GetDepEvent(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/DepenseEvents');
  }

  GetDep() {
    return this.http.get<TbListening[]>(this.rootURL + '/DepenseEvents');
  }


  GetByIdDep(Id) {
    return this.http.get<TbListening>(this.rootURL + '/DepenseEvents/' + Id);
  }



  EditDep() {
    return this.http.put(this.rootURL + '/DepenseEvents/' + this.formData.id, this.formData, this.headers);
  }



  DeleteDep(id) {
    return this.http.delete(this.rootURL + '/DepenseEvents/' + id);
  }


  //Etat Comte

  AddEtatCompte(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/EtatListComptes', dotation, this.headers);
  }


  PostEtatCompte() {
    return this.http.post(this.rootURL + '/EtatListComptes', this.formData, this.headers);
  }



  GetEC(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/EtatListComptes');
  }

  GetEtatCompte() {
    return this.http.get<TbListening[]>(this.rootURL + '/EtatListComptes');
  }


  GetByIdEtatCompte(Id) {
    return this.http.get<TbListening>(this.rootURL + '/EtatListComptes/' + Id);
  }



  EditEtatCompte() {
    return this.http.put(this.rootURL + '/EtatListComptes/' + this.formData.id, this.formData, this.headers);
  }



  DeleteEtatCompte(id) {
    return this.http.delete(this.rootURL + '/EtatListComptes/' + id);
  }


  //ClasseCheque

  AddLangue(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/langueEvs', dotation, this.headers);
  }


  PostLangue() {
    return this.http.post(this.rootURL + '/langueEvs', this.formData, this.headers);
  }



  GetLangue(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/langueEvs');
  }

  GetLangueT() {
    return this.http.get<TbListening[]>(this.rootURL + '/langueEvs');
  }


  GetByIdLangue(Id) {
    return this.http.get<TbListening>(this.rootURL + '/langueEvs/' + Id);
  }



  EditLangue() {
    return this.http.put(this.rootURL + '/langueEvs/' + this.formData.id, this.formData, this.headers);
  }



  DeleteLangue(id) {
    return this.http.delete(this.rootURL + '/langueEvs/' + id);
  }



  //ClasseCheque

  AddClasseCheque(dotation: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/ChequeClasses', dotation, this.headers);
  }


  PostClasseCheque() {
    return this.http.post(this.rootURL + '/ChequeClasses', this.formData, this.headers);
  }



  GetClasseCheque(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/ChequeClasses');
  }

  GetClasseChequeE() {
    return this.http.get<TbListening[]>(this.rootURL + '/ChequeClasses');
  }


  GetByIdClasseCheque(Id) {
    return this.http.get<TbListening>(this.rootURL + '/ChequeClasses/' + Id);
  }



  EditClasseCheque() {
    return this.http.put(this.rootURL + '/ChequeClasses/' + this.formData.id, this.formData, this.headers);
  }



  DeleteClasseCheque(id) {
    return this.http.delete(this.rootURL + '/ChequeClasses/' + id);
  }
}


