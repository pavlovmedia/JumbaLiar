import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/data.service';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent {
  public applications = [];
  public display = false;
  public applicationForm = {};
  public isUpdating = false;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private data: DataService
  ) {
    this.data.applicationsSubject.subscribe(applications => {
      this.applications = applications;
    });
  }

  public submit(): void {
    if (this.isUpdating) {
      this.data.update('applications', this.applicationForm).subscribe(res => {
        this.display = false;
        this.applicationForm = {};
        this.data.getData();
      }, error => {
        this.messageService.add({severity: 'error', detail: error.statusText});
      });
    } else {
      this.data.create('applications', this.applicationForm).subscribe(res => {
        this.display = false;
        this.applicationForm = {};
        this.data.getData();
      }, error => {
        this.messageService.add({severity: 'error', detail: error.statusText});
      });
    }
  }

  public create(): void {
    this.applicationForm = {};
    this.isUpdating = false;
    this.display = true;
  }

  public update(application): void {
    this.applicationForm = {...application};
    this.isUpdating = true;
    this.display = true;
  }

  public delete(application): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + application.name + '?',
      accept: () => {
        this.data.delete('applications', application.id).subscribe(res => {
          this.data.getData();
        }, error => {
          this.messageService.add({severity: 'error', detail: error.statusText});
        });
      }
    });
  }
}
