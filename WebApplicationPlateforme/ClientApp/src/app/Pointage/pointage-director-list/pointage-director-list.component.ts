import { Component, OnInit } from '@angular/core';
import { Pointage } from '../../shared/Models/Pointage/pointage.model';
import { PointageService } from '../../shared/Services/Pointage/pointage.service';

@Component({
  selector: 'app-pointage-director-list',
  templateUrl: './pointage-director-list.component.html',
  styleUrls: ['./pointage-director-list.component.css']
})
export class PointageDirectorListComponent implements OnInit {

  constructor(private pointService: PointageService) { }

  ngOnInit(): void {
    this.getPointList();
  }

  pointList: Pointage[] = [];
  pointList2: Pointage[] = [];
  fulldate = new Date().toLocaleDateString();
  getPointList() {
    this.pointService.Get().subscribe(res => {
      this.pointList2 = res
      this.pointList = this.pointList2.filter(item => item.datePresence == this.fulldate)
    })
  }
}
