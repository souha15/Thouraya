import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathSharedService {

  constructor() { }

  getPath() {

 return 'http://localhost:49599/api'

  // return 'http://thooraya.com/api'

  }
}
