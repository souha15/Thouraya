import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathSharedService {

  constructor() { }

  getPath() {

return 'http://localhost:49599/api'
  //return 'http://161.97.163.78:83/api'

  }
}
