import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class DataService {
  public backendUrl = window['env']['backendUrl'];
  public token;
  private options;

  public userSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public usersSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public applicationsSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public endpointsSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public typesSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public mediaSubject: ReplaySubject<any> = new ReplaySubject<any>(1);

  public restartSubject: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.restartSubject.next(false);
    const token = localStorage.getItem('token');
    if (token) {
      this.setToken(token);
    } else {
      this.router.navigate(['/login']);
    }
  }

  public setToken(token): void {
    this.token = token;
    this.options = {headers: {Authorization: 'access_token ' + this.token}};
    localStorage.setItem('token', token);
    this.getData();
  }

  public getData(): void {
    window.setTimeout(() => {
      combineLatest(
        this.http.get(this.backendUrl + '/services/authorization/me', this.options),
        this.http.get(this.backendUrl + '/services/accounts', this.options),
        this.http.get(this.backendUrl + '/services/applications', this.options),
        this.http.get(this.backendUrl + '/services/endpoints', this.options),
        this.http.get(this.backendUrl + '/services/types', this.options),
        this.http.get(this.backendUrl + '/services/uploads', this.options)
      ).subscribe(([self, users, applications, endpoints, types, media]) => {
        this.userSubject.next(self);
        this.usersSubject.next(users);
        this.applicationsSubject.next(applications);
        this.endpointsSubject.next(endpoints);
        this.typesSubject.next(types);
        this.mediaSubject.next(media);
      }, error => {
        this.logout();
      });
    }, 0);
  }

  public login(payload): Observable<any> {
    return this.http.post(this.backendUrl + '/services/authorization/login', payload);
  }

  public get(endpoint): Observable<any> {
    return this.http.get(this.backendUrl + '/services/' + endpoint, this.options);
  }

  public create(endpoint, payload): Observable<any> {
    return this.http.post(this.backendUrl + '/services/' + endpoint, payload, this.options);
  }

  public update(endpoint, payload): Observable<any> {
    return this.http.put(this.backendUrl + '/services/' + endpoint + '/' + payload.id, payload, this.options);
  }

  public delete(endpoint, id): Observable<any> {
    return this.http.delete(this.backendUrl + '/services/' + endpoint + '/' + id, this.options);
  }

  public logout(): void {
    this.userSubject.next(null);
    this.token = null;
    localStorage.removeItem('token');
  }
}
