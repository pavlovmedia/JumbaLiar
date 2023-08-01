import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/data.service';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent {
  public media = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private data: DataService
  ) {
    this.data.mediaSubject.subscribe(media => {
      this.media = media;
    });
  }

  public upload(event, input): void {
    const formData = new FormData();
    formData.append('file', event[0]);
    this.data.create('uploads', formData).subscribe(res => {
      this.data.getData();
    });
  }

  public delete(name): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + name + '?',
      accept: () => {
        this.data.delete('uploads', name).subscribe(res => {
          this.data.getData();
        }, error => {
          this.messageService.add({severity: 'error', detail: error.statusText});
        });
      }
    });
  }
}
