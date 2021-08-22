import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dons-reports',
  templateUrl: './dons-reports.component.html',
  styleUrls: ['./dons-reports.component.css']
})
export class DonsReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  r: boolean = true;
  r1: boolean = false;
  r2: boolean = false;
  r3: boolean = false;
  r4: boolean = false;
  r5: boolean = false;
  r6: boolean = false;
  r7: boolean = false;
  r8: boolean = false;
  r9: boolean = false;
  r10: boolean = false;
  r11: boolean = false;
  r12: boolean = false;
  r13: boolean = false;
  show(event) {

    if (event.target.value == "1") {
      this.r1 = true;
      this.r2 = false;
      this.r3 = false;
      this.r4 = false;
      this.r5 = false;
      this.r6 = false;
      this.r7 = false;
      this.r8 = false;
      this.r9 = false;
      this.r10 = false;
      this.r11 = false;
      this.r12 = false;
      this.r13 = false;
    } else if (event.target.value == "2") {
      this.r2 = true;
      this.r1 = false;
      this.r3 = false;
      this.r4 = false;
      this.r5 = false;
      this.r6 = false;
      this.r7 = false;
      this.r8 = false;
      this.r9 = false;
      this.r10 = false;
      this.r11 = false;
      this.r12 = false;
      this.r13 = false;
     
    } else if (event.target.value == "3") {
      this.r3 = true;
      this.r2 = false;
      this.r1 = false;
      this.r4 = false;
      this.r5 = false;
      this.r6 = false;
      this.r7 = false;
      this.r8 = false;
      this.r9 = false;
      this.r10 = false;
      this.r11 = false;
      this.r12 = false;
      this.r13 = false;
     
    } else if (event.target.value == "4") {
      this.r4 = true;
      this.r2 = false;
      this.r1 = false;
      this.r3 = false;
      this.r5 = false;
      this.r6 = false;
      this.r7 = false;
      this.r8 = false;
      this.r9 = false;
      this.r10 = false;
      this.r11 = false;
      this.r12 = false;
      this.r13 = false;
     
    } else if (event.target.value == "5") {
      this.r5 = true;
      this.r2 = false;
      this.r1 = false;
      this.r3 = false;
      this.r4 = false;
      this.r6 = false;
      this.r7 = false;
      this.r8 = false;
      this.r9 = false;
      this.r10 = false;
      this.r11 = false;
      this.r12 = false;
      this.r13 = false;
     
    } else if (event.target.value == "6") {
      this.r6 = true;
      this.r2 = false;
      this.r1 = false;
      this.r3 = false;
      this.r4 = false;
      this.r5 = false;
      this.r7 = false;
      this.r8 = false;
      this.r9 = false;
      this.r10 = false;
      this.r11 = false;
      this.r12 = false;
      this.r13 = false;
     
    } else if (event.target.value == "7") {
      this.r7 = true;
      this.r2 = false;
      this.r1 = false;
      this.r3 = false;
      this.r4 = false;
      this.r5 = false;
      this.r6 = false;
 
      this.r8 = false;
      this.r9 = false;
      this.r10 = false;
      this.r11 = false;
      this.r12 = false;
      this.r13 = false;
     
    } else if (event.target.value == "8") {
      this.r8 = true;
      this.r2 = false;
      this.r1 = false;
      this.r3 = false;
      this.r4 = false;
      this.r5 = false;
      this.r6 = false;
      this.r7 = false;

      this.r9 = false;
      this.r10 = false;
      this.r11 = false;
      this.r12 = false;
      this.r13 = false;
     
    } else if (event.target.value == "9") {
      this.r9 = true;
      this.r2 = false;
      this.r1 = false;
      this.r3 = false;
      this.r4 = false;
      this.r5 = false;
      this.r6 = false;
      this.r7 = false;
      this.r8 = false;
    
      this.r10 = false;
      this.r11 = false;
      this.r12 = false;
      this.r13 = false;
     
    } else if (event.target.value == "10") {
      this.r10 = true;
      this.r2 = false;
      this.r1 = false;
      this.r3 = false;
      this.r4 = false;
      this.r5 = false;
      this.r6 = false;
      this.r7 = false;
      this.r8 = false;
      this.r9 = false;
 
      this.r11 = false;
      this.r12 = false;
      this.r13 = false;
     
    } else if (event.target.value == "11") {
      this.r11 = true;
      this.r2 = false;
      this.r1 = false;
      this.r3 = false;
      this.r4 = false;
      this.r5 = false;
      this.r6 = false;
      this.r7 = false;
      this.r8 = false;
      this.r9 = false;
      this.r10 = false;

      this.r12 = false;
      this.r13 = false;
     
    } else if (event.target.value == "12") {
      this.r12 = true;
      this.r2 = false;
      this.r1 = false;
      this.r3 = false;
      this.r4 = false;
      this.r5 = false;
      this.r6 = false;
      this.r7 = false;
      this.r8 = false;
      this.r9 = false;
      this.r10 = false;
      this.r11 = false;

      this.r13 = false;
    } else {
      this.r13 = true;
      this.r2 = false;
      this.r1 = false;
      this.r3 = false;
      this.r4 = false;
      this.r5 = false;
      this.r6 = false;
      this.r7 = false;
      this.r8 = false;
      this.r9 = false;
      this.r10 = false;
      this.r11 = false;
      this.r12 = false;
  
    }

  }

}
