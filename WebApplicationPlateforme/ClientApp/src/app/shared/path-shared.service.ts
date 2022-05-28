import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathSharedService {

  constructor() { }

  getPath() {
 return  'http://awwal-dawahtaif.com/api'
//  return 'http://localhost:49599/api'


  }
}
