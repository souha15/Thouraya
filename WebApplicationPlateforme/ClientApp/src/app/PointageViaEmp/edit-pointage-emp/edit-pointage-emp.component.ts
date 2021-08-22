import { Component, OnInit } from '@angular/core';
import { PointageEmpEmpService } from '../../shared/Services/PointageViaEmp/pointage-emp.service';
import { PointageEmp } from '../../shared/Models/VointageViaEmp/pointage-emp.model';

@Component({
  selector: 'app-edit-pointage-emp',
  templateUrl: './edit-pointage-emp.component.html',
  styleUrls: ['./edit-pointage-emp.component.css']
})
export class EditPointageEmpComponent implements OnInit {

  constructor(private empService: PointageEmpEmpService,) { }

  ngOnInit(): void {
    this.getEmpList();
  }

  pointList: PointageEmp[] = [];
  pointList2: PointageEmp[] = [];
  date = new Date().toLocaleDateString();
  getEmpList() {
    this.empService.Get().subscribe(res => {
      this.pointList2 = res;
      this.pointList = this.pointList2.filter(item => item.date == this.date);
    })
  }
}
