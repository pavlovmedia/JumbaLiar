import { Component } from '@angular/core';
import {MessageService} from 'primeng/api';
import {DataService} from '../../shared/data.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public signinForm = {};
  public registerForm = {};

  public submitting = false;
  public display = false;

  constructor(
    private router: Router,
    private data: DataService,
    private messageService: MessageService
  ) {
    this.data.logout();
  }

  public submit(): void {
    this.submitting = true;
    this.data.login(this.signinForm).subscribe(res => {
      if (res.token) {
        this.data.setToken(res.token);
        this.data.userSubject.pipe(first()).subscribe(() => {
          this.router.navigate(['/']).then();
        });
      } else {
        this.submitting = false;
        this.messageService.add({severity: 'error', summary: 'No Token', detail: 'Something went wrong with the backend'});
      }
    }, error => {
      this.submitting = false;
      switch (error.status) {
        case 401:
          this.messageService.add({severity: 'error', summary: 'Email or Password Incorrect', detail: 'Verify your credentials and try again'});
          return;
        case 400:
          this.messageService.add({severity: 'warn', summary: 'Invalid Form', detail: 'Fill in all fields and try again'});
          return;
        default:
          this.messageService.add({severity: 'error', summary: 'Unable to communicate', detail: 'Verify the backend is up and reachable'});
          return;
      }
    });
  }

  public register(): void {
    this.submitting = true;
    this.registerForm['role'] = 'admin';
    this.data.create('accounts', this.registerForm).subscribe(res => {
      this.signinForm['email'] = this.registerForm['email'];
      this.signinForm['password'] = this.registerForm['password'];
      window.setTimeout(() => {
        this.submit();
      }, 1000);
    }, error => {
      this.submitting = false;
      switch (error.status) {
        case 409:
          this.messageService.add({severity: 'error', summary: 'User already exists', detail: 'Log in instead'});
          return;
        case 400:
          this.messageService.add({severity: 'warn', summary: 'Invalid form', detail: 'Fill in all fields and try again'});
          return;
        default:
          this.messageService.add({severity: 'error', summary: 'Unable to communicate', detail: 'Verify the backend is up and reachable'});
          return;
      }
    });
  }
}
