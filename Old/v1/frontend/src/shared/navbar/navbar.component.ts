import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public user = [];
  public items: MenuItem[] = [
    {
      label: 'Endpoints',
      icon: 'pi pi-fw pi-sign-in',
      routerLink: '/endpoints'
    },
    {
      label: 'Media',
      icon: 'pi pi-fw pi-image',
      routerLink: '/media'
    },
    {
      label: 'Accounts',
      icon: 'pi pi-fw pi-users',
      routerLink: '/accounts'
    },
    {
      label: 'Applications',
      icon: 'pi pi-fw pi-folder',
      routerLink: '/applications'
    },
    {
      label: 'Swagger UI',
      icon: 'pi pi-fw pi-globe',
      command: () => window.open( this.data.backendUrl + '/swagger-ui', '_blank')
    },
  ];

  constructor(
    private router: Router,
    private data: DataService
  ) {
    this.data.userSubject.subscribe(res => {
      if (res) {
        this.user = [
          {
            label: res.firstName + ' ' + res.lastName,
            email: res.email,
            items: [
              // {
              //   label: 'My Profile',
              //   icon: 'pi pi-fw pi-user',
              //   routerLink: '/profile'
              // },
              // {
              //   label: 'Notifications',
              //   icon: 'pi pi-fw pi-bell',
              //   command: () => console.log('hi')
              // },
              {
                label: 'Log Out',
                icon: 'pi pi-fw pi-power-off',
                routerLink: '/login'
              }
            ]
          }
        ];
      }
    });
  }

}
