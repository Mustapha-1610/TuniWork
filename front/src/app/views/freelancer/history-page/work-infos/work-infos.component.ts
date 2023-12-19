import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FreelancerService } from 'src/app/views/services/freelancer.service';

@Component({
  selector: 'app-work-infos',
  templateUrl: './work-infos.component.html',
  styleUrls: ['./work-infos.component.css'],
})
export class WorkInfosComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fs: FreelancerService,
    private router: Router
  ) {}
  workId: any;
  workData: any;
  add: boolean = true;
  submitRequestButton: any = null;
  ngOnInit() {
    this.workId = this.route.snapshot.paramMap.get('id');
    this.getCompanyWorkOffer();
  }
  getCompanyWorkOffer() {
    this.fs.getWorkOfferProgress(this.workId).subscribe((res: any) => {
      if (res.error) {
        this.router.navigate(['/freelancer']);
      } else {
        this.workData = res.workOffer;
        this.progressCounter();
        if (this.progress === this.workData.TaskTable.length) {
          this.submitRequestButton = true;
        }
      }
    });
  }
  idsArrays: any[] = [];
  markDone(id: any, index: any) {
    this.successMessage = null;
    this.workData.TaskTable[index].TaskDoneStatus =
      !this.workData.TaskTable[index].TaskDoneStatus;
    this.progressCounter();
    this.submitRequestButton = false;
    if (this.idsArrays.includes(id)) {
      this.idsArrays = this.idsArrays.filter((ids) => ids !== id);
    } else {
      this.idsArrays.push(id);
    }
  }
  unmarkDone(id: any, index: any) {
    this.successMessage = null;
    this.workData.TaskTable[index].TaskDoneStatus =
      !this.workData.TaskTable[index].TaskDoneStatus;
    this.progressCounter();
    this.submitRequestButton = false;
    if (this.idsArrays.includes(id)) {
      this.idsArrays = this.idsArrays.filter((ids) => ids !== id);
    } else {
      this.idsArrays.push(id);
    }
  }
  markedAsDone(id: any) {
    return this.idsArrays.includes(id);
  }
  successMessage: any;
  saveDone() {
    if (this.idsArrays.length === 0) {
    } else {
      this.fs
        .updateProg(this.workData._id, this.idsArrays)
        .subscribe((res: any) => {
          this.successMessage = 'Changes Saved';
          this.workData = res.PWO;
        });
      this.idsArrays = [];
      this.progressCounter();
      if (this.progress === this.workData.TaskTable.length) {
        this.submitRequestButton = true;
      }
    }
  }
  progress: any = 0;
  progressPercentage: number = 0;
  progressCounter() {
    this.progress = 0;
    console.log(this.workData);
    this.workData.TaskTable.map((item: any) => {
      if (item.TaskDoneStatus) {
        this.progress = this.progress + 1;
      }
    });
    this.progressPercentage = (this.progress / this.workData.TaskTable.length) * 100;
    if (this.progress === this.workData.TaskTable.length) {
      this.submitRequestButton = true;
    }

  }
  navigateToPaymentRequest(id: any) {
    this.router.navigate(['/freelancer/submitPaymentRequest', id]);
  }
}
