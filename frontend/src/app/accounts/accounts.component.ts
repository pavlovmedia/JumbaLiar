import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/data.service';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  public accounts = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private data: DataService
  ) {
    this.data.usersSubject.subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  public delete(account): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + account.firstName + ' ' + account.lastName + '?',
      accept: () => {
        this.data.delete('accounts', account.id).subscribe(res => {
          this.data.getData();
        }, error => {
          this.messageService.add({severity: 'error', detail: error.statusText});
        });
      }
    });
  }
}
