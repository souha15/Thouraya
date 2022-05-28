import { Component, OnInit } from '@angular/core';
import { TechDemService } from '../../../shared/Services/TechnicalDemands/tech-dem.service';
import { TechDem } from '../../../shared/Models/TechnicalDemands/tech-dem.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-tech',
  templateUrl: './histo-tech.component.html',
  styleUrls: ['./histo-tech.component.css']
})
export class HistoTechComponent implements OnInit {

  constructor(private demTechService: TechDemService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDemList();
  }

  p: Number = 1;
  count: Number = 5;

  List2: TechDem[] = []
  List: TechDem[] = []


  getDemList() {
    this.demTechService.List().subscribe(res => {
      this.List = res
    })
  }
  dem: TechDem = new TechDem();
  autre: boolean = false;
  video: boolean = false;
  prog: boolean = false;
  imprimante: boolean = false;

  populateForm(dem: TechDem) {
    this.demTechService.formData = Object.assign({}, dem)
    this.dem = Object.assign({}, dem);

    if (this.dem.typedem == "أخرى") {
      this.autre = true;
      this.video = false;
      this.prog = false;
      this.imprimante = false
    } else {
      this.autre = false;
    }
    if (this.dem.typedem == "تشغيل جهاز الفيديو كونفرنس") {
      this.video = true;
      this.autre = false;
      this.prog = false;
      this.imprimante = false
    } else {
      this.video = false;
    }
    if (this.dem.typedem == "تنصيب برنامج") {
      this.prog = true;
      this.autre = false;
      this.video = false;

      this.imprimante = false
    } else {
      this.prog = false;
    }
    if (this.dem.typedem == "تعريف طابعة" || this.dem.typedem == "تعريف آلة تصوير" || this.dem.typedem == "تعريف ماسح ضوئي"
      || this.dem.typedem == 'صيانة جهاز طابعة' || this.dem.typedem == 'صيانة آلة تصوير') {
      this.imprimante = true;
      this.prog = false;
      this.autre = false;
      this.video = false;
    } else {

      this.imprimante = false
    }

  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.demTechService.Delete(id)
        .subscribe(res => {
          this.getDemList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');
          }
        )

    }

  }
}
