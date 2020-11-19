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
  public display = false;
  public accountForm = {};
  public isUpdating = false;

  public roles = [
    {label: 'USER', value: 'user'},
    {label: 'ADMIN', value: 'admin'}
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private data: DataService
  ) {
    this.data.usersSubject.subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  public submit(): void {
    if (this.isUpdating) {
      this.data.update('accounts', this.accountForm).subscribe(res => {
        this.display = false;
        this.accountForm = {};
        this.data.getData();
      }, error => {
        this.messageService.add({severity: 'error', detail: error.statusText});
      });
    } else {
      this.data.create('accounts', this.accountForm).subscribe(res => {
        this.display = false;
        this.accountForm = {};
        this.data.getData();
      }, error => {
        this.messageService.add({severity: 'error', detail: error.statusText});
      });
    }
  }

  public create(): void {
    this.accountForm = {};
    this.isUpdating = false;
    this.display = true;
  }

  public update(account): void {
    this.accountForm = {...account};
    this.isUpdating = true;
    this.display = true;
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
