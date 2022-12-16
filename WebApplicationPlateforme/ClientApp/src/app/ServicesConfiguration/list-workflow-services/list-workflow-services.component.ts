import { Component, OnInit } from '@angular/core';
import { WorkFlowServiceService } from '../../shared/Services/ServicesConfiguration/work-flow-service.service';
import { ServiceWorkFlow } from '../../shared/Services/ServicesConfiguration/service-work-flow.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-workflow-services',
  templateUrl: './list-workflow-services.component.html',
  styleUrls: ['./list-workflow-services.component.css']
})
export class ListWorkflowServicesComponent implements OnInit {

  constructor(private workFlowService: WorkFlowServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getWorkList();
  }

  c: Number = 1;
  count: Number = 5;
  WfList: ServiceWorkFlow[] = [];

  getWorkList() {
    this.workFlowService.Get().subscribe(res => {
      this.WfList = res;
    })
  }

  //Delete Administration

  delete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.workFlowService.Delete(id)
        .subscribe(res => {
          this.getWorkList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');
          }
        )

    }

  }

  //PopulateForm
  wf: ServiceWorkFlow = new ServiceWorkFlow();
  val: string;
  populateForm(wf: ServiceWorkFlow) {
    this.workFlowService.formData = Object.assign({}, wf)
    this.wf = wf;
    //this.val = 100 / wf.rolesNb

  }
}
