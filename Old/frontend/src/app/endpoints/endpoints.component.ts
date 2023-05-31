import { Component } from '@angular/core';
import {DataService} from '../../shared/data.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {combineLatest} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.css']
})
export class EndpointsComponent {
  public isUpdatingTypes = false;
  public typeMap = {};
  public applicationOptions = [];
  public displayTypeModal = false;
  public typeForm = {};
  public displayGenerateModal = false;
  public generateForm = {};
  public user;
  public users;
  public endpoints = [];
  public types = [];
  public applications = [];
  public viewData = false;
  public dataForm = '';

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public data: DataService
  ) {
    combineLatest(
      this.data.userSubject,
      this.data.usersSubject.pipe(first()),
      this.data.endpointsSubject,
      this.data.typesSubject,
      this.data.applicationsSubject.pipe(first())
    ).subscribe(([user, users, endpoints, types, applications]) => {
      this.user = user;
      this.users = users;
      this.endpoints = endpoints;
      this.types = types;
      this.applications = applications;
      this.applicationOptions = [];
      this.applications.forEach(i => this.applicationOptions.push({label: i.name, value: i.id}));

      this.mapTypes();
    });
  }

  public mapTypes(): void {
    this.typeMap = {};
    this.endpoints.forEach(i => {
      if (!this.typeMap[i.typeId]) {
        this.typeMap[i.typeId] = [];
      }
      this.typeMap[i.typeId].push(i);
    });
  }

  public getType(id): void {
    return this.types.find(i => i.id === id);
  }

  public getUser(id): void {
    return this.users.find(i => i.id === id);
  }

  public getApplications(ids): any[] {
    const payload = [];
    ids.forEach(i => {
      payload.push(this.applications.find(j => j.id === i));
    });
    return payload;
  }

  public deleteEndpoint(endpoint): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + endpoint.method + ' /services/' + endpoint.path + '?',
      accept: () => {
        this.data.delete('endpoints', endpoint.id).subscribe(res => {
          this.data.getData();
          this.data.restartSubject.next(true);
        }, error => {
          this.messageService.add({severity: 'error', detail: error.statusText});
        });
      }
    });
  }

  public submitTypes(): void {
    if (this.isUpdatingTypes) {
      this.data.update('types', this.typeForm).subscribe(res => {
        this.displayTypeModal = false;
        this.typeForm = {};
        this.data.getData();
        this.data.restartSubject.next(true);
      }, error => {
        this.messageService.add({severity: 'error', detail: error.statusText});
      });
    } else {
      this.data.create('types', this.typeForm).subscribe(res => {
        this.displayTypeModal = false;
        this.typeForm = {};
        this.data.getData();
        this.data.restartSubject.next(true);
      }, error => {
        this.messageService.add({severity: 'error', detail: error.statusText});
      });
    }
  }

  public createType(): void {
    this.typeForm = {definition: '{}'};
    this.isUpdatingTypes = false;
    this.displayTypeModal = true;
  }

  public updateType(type): void {
    this.typeForm = {...type};
    this.isUpdatingTypes = true;
    this.displayTypeModal = true;
  }

  public getEndpointsByType(id): number {
    return this.endpoints.filter(i => i.typeId === id).length;
  }

  public viewType(type): void {
    this.data.get('data/' + type.name).subscribe(res => {
      this.dataForm = res;
    });
    this.typeForm = {...type};
    this.viewData = true;
  }

  public generate(): void {
    const payload = [
      {
        owner: this.user.id,
        method: 'GET',
        typeId: this.generateForm['type'].id,
        path: this.generateForm['path'],
        authorization: false,
        visibility: true,
        hasBody: false,
        customBody: false,
        body: '{}',
        usedByIds: [this.generateForm['application']],
        conditionals: [
          {
            if: [ { type: '*', checkType: '', config: '', body: ''}],
            then: [ { type: 'returnData', checkType: '', config: '', body: '' }]
          }
        ]
      },
      {
        owner: this.user.id,
        method: 'GET',
        typeId: this.generateForm['type'].id,
        path: this.generateForm['path'] + '/:id',
        authorization: false,
        visibility: true,
        hasBody: false,
        customBody: false,
        body: '{}',
        usedByIds: [this.generateForm['application']],
        conditionals: [
          {
            if: [ { type: '*', checkType: '', config: '', body: ''}],
            then: [ { type: 'returnDataWhereKey', checkType: 'Equals', config: 'id', body: ':id' }]
          }
        ]
      },
      {
        owner: this.user.id,
        method: 'POST',
        typeId: this.generateForm['type'].id,
        path: this.generateForm['path'] + '/query',
        authorization: false,
        visibility: true,
        hasBody: true,
        customBody: true,
        body: '[{"fieldName": "string","filterType": "string","check": "string"}]',
        usedByIds: [this.generateForm['application']],
        conditionals: [
          {
            if: [ { type: '*', checkType: '', config: '', body: ''}],
            then: [ { type: 'returnDataWhereQuery', checkType: '', config: '', body: '' }]
          }
        ]
      },
      {
        owner: this.user.id,
        method: 'POST',
        typeId: this.generateForm['type'].id,
        path: this.generateForm['path'],
        authorization: false,
        visibility: true,
        hasBody: true,
        customBody: false,
        body: '{}',
        usedByIds: [this.generateForm['application']],
        conditionals: [
          {
            if: [ { type: '*', checkType: '', config: '', body: ''}],
            then: [ { type: 'pushBody', checkType: '', config: '', body: '' }]
          }
        ]
      },
      {
        owner: this.user.id,
        method: 'PUT',
        typeId: this.generateForm['type'].id,
        path: this.generateForm['path'] + '/:id',
        authorization: false,
        visibility: true,
        hasBody: true,
        customBody: false,
        body: '{}',
        usedByIds: [this.generateForm['application']],
        conditionals: [
          {
            if: [ { type: '*', checkType: '', config: '', body: ''}],
            then: [ { type: 'updateData', checkType: '', config: '', body: '' }]
          }
        ]
      },
      {
        owner: this.user.id,
        method: 'DELETE',
        typeId: this.generateForm['type'].id,
        path: this.generateForm['path'] + '/:id',
        authorization: false,
        visibility: true,
        hasBody: false,
        customBody: false,
        body: '{}',
        usedByIds: [this.generateForm['application']],
        conditionals: [
          {
            if: [ { type: '*', checkType: '', config: '', body: ''}],
            then: [ { type: 'deleteData', checkType: '', config: '', body: '' }]
          }
        ]
      }
    ];
    this.displayGenerateModal = false;
    this.data.create('endpoints/bulk', payload).subscribe(res => {
      this.data.getData();
      window.setTimeout(() => this.data.getData(), 7000);
      this.data.restartSubject.next(true);
    }, error => {
      this.messageService.add({severity: 'error', detail: error.statusText});
    });
  }

  public generateType(type): void {
    this.generateForm = {type, application: this.applications[0].id};
    this.displayGenerateModal = true;
  }

  private camelize(str): string {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  public deleteType(type): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + type.name + '?',
      accept: () => {
        this.data.delete('types', type.id).subscribe(res => {
          this.data.getData();
          this.data.restartSubject.next(true);
        }, error => {
          this.messageService.add({severity: 'error', detail: error.statusText});
        });
      }
    });
  }
}
