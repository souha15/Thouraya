import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { ChequeCService } from '../../../shared/Services/Cheques/cheque-c.service';
import { PayChequeService } from '../../../shared/Services/Cheques/pay-cheque.service';
import { ListeningProjetService } from '../../../shared/Services/Projets/listening-projet.service';
import { ChequesC } from '../../../shared/Models/Cheques/cheques-c.model';
import { ToastrService } from 'ngx-toastr';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PayChequesC } from '../../../shared/Models/Cheques/pay-cheques-c.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
@Component({
  selector: 'app-chequec-lis',
  templateUrl: './chequec-lis.component.html',
  styleUrls: ['./chequec-lis.component.css']
})
export class ChequecLisComponent implements OnInit {
  filter;
  constructor(private chequeService: ChequeCService,
    private articleService: PayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getChequesList();
    this.getPaycheque();
    this.getUserConnected();
  }

  UserIdConnected: string;
  UserNameConnected: string;
  roleslist: any = [];
  testrole: boolean = false;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;
        this.roleslist.forEach(item => {
          if (item == "ADMINISTRATEUR" || item == "SECRETAIRE") {
            this.testrole = true;
          } else { this.testrole = false; }
          console.log(this.testrole)
        })
      })
    })

  }
  paycList: PayChequesC[] = [];
  paycList2: PayChequesC[] = [];
  getPaycheque() {
    this.articleService.Get().subscribe(res => {
      this.paycList2 = res
      this.paycList = this.paycList2.filter(item => item.idCheque == this.id)
      return this.paycList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      
    })
  }
  p: Number = 1;
  count: Number = 5;
  cheq: ChequesC[] = [];
  cheq1: ChequesC[] = [];
  cheq2: ChequesC[] = [];
  cheq3: ChequesC[] = [];
  nb1: number = 0;
  nb2: number = 0;
  nb3: number = 0;

  getChequesList() {
    this.chequeService.Get().subscribe(res => {
      this.cheq = res
      this.cheq1 = this.cheq.filter(item => item.etat == "جاري العمل عليها")
      this.nb1 = this.cheq1.length;

      this.cheq2 = this.cheq.filter(item => item.etat == "مكتملة")
      this.nb2 = this.cheq2.length;

      this.cheq3 = this.cheq.filter(item => item.etat == "متعثرة")
      this.nb3 = this.cheq3.length;
    })
  }


  details: ChequesC = new ChequesC();
  id: number;
  populateForm(edittache: ChequesC) {
    this.chequeService.formData = Object.assign({}, edittache)
    this.details = Object.assign({}, edittache);
    this.id = this.details.id
  }

  //impression tr
  path: string;
  public print() {

    var data = document.getElementById('htmlData');
   // data.style.display = "block";
    html2canvas(data).then(canvas => {
      // Few necessary setting options
    //  data.style.display = "none"
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "Cheque" + this.details.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    }

    );

  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.chequeService.Delete(Id)
        .subscribe(res => {
          this.getChequesList();
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
