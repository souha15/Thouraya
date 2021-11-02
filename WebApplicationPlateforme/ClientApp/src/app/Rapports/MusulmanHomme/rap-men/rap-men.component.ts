import { Component, OnInit, Injectable } from '@angular/core';
import {
  NgbDateStruct, NgbCalendar, NgbCalendarIslamicUmalqura, NgbDatepickerI18n, NgbDate
} from '@ng-bootstrap/ng-bootstrap';

import { TranslationWidth } from '@angular/common';
import { MusulmanService } from '../../../shared/Services/NvMusulman/musulman.service';
import { Musulman } from '../../../shared/Models/NvMusulman/musulman.model';


const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
  'ذو القعدة', 'ذو الحجة'];

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {

  getWeekdayShortName(weekday: number): string {
    return WEEKDAYS[weekday - 1];
  }
  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }

  getWeekdayLabel(weekday: number, width?: TranslationWidth) {
    return WEEKDAYS[weekday - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}
@Component({
  selector: 'app-rap-men',
  templateUrl: './rap-men.component.html',
  styleUrls: ['./rap-men.component.css'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n }
  ]
})
export class RapMenComponent implements OnInit {
  model: NgbDateStruct;
  constructor(private calendar: NgbCalendar,
    private musService: MusulmanService,) { }

  ngOnInit(): void {
  }
  c: Number = 1;

  count: Number = 5;
  datehij: string = "";

  onDateSelect(date: NgbDate) {

    var day: string = date.day.toString()
    var month: string = date.month.toString()
    var year: string = date.year.toString()
    this.datehij = year + "-" + month + "-" + day;


  }
  dateMil: string;
  getDateMil(event) {
    this.dateMil = event.target.value;
  }
  list: Musulman[] = [];
  list2: Musulman[] = [];
  getActiviteListG() {
    this.musService.List().subscribe(res => {
      this.list2 = res
      this.list = this.list2.filter(item => item.datemil == this.dateMil || item.datehij == this.datehij)
      this.musService.list = this.list
    })
  }
}
