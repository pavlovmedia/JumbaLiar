import { Component } from '@angular/core';
import {DataService} from '../../../shared/data.service';
import {first, map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ConditionalService} from '../../../shared/conditional.service';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-endpoints',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent {
  public isUpdating = false;
  public user;
  public endpointForm = {};
  public applications = [];
  public types = [];
  public methodOptions = [
    {label: 'GET', value: 'GET'},
    {label: 'PUT', value: 'PUT'},
    {label: 'POST', value: 'POST'},
    {label: 'DELETE', value: 'DELETE'}
  ];
  public typeOptions = [];
  public applicationOptions = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private data: DataService,
    private conditionalService: ConditionalService
  ) {
    this.conditionalService.setDefaultConditionals();
    combineLatest(
      this.data.userSubject.pipe(first(), map(dto => dto as any[])),
      this.data.endpointsSubject.pipe(first(), map(dto => dto as any[])),
      this.data.typesSubject.pipe(first(), map(dto => dto as any[])),
      this.data.applicationsSubject.pipe(first(), map(dto => dto as any[])),
      this.route.params
    ).subscribe(([user, endpoints, types, applications, params]) => {
      this.user = user;
      this.types = types;
      this.applications = applications;
      types.forEach(i => this.typeOptions.push({label: i.name, value: i.id}));
      applications.forEach(i => this.applicationOptions.push({label: i.name, value: i.id}));
      if (params.id !== 'new') {
        const foundEndpoint = endpoints.find(i => i.id === params.id);
        if (foundEndpoint) {
          this.isUpdating = true;
          this.endpointForm = {...foundEndpoint};
          this.conditionalService.setConditionals(this.endpointForm['conditionals']);
        } else {
          this.router.navigate(['/endpoints']).then();
        }
      } else {
        this.endpointForm = {
          visibility: true,
          authorization: false,
          owner: this.user.id,
          usedByIds: []
        };
        this.isUpdating = false;
      }
    });
  }

  public isValid(): boolean {
    let valid = false;
    if (
      (this.endpointForm['owner'] && this.endpointForm['owner'] !== '') &&
      (this.endpointForm['method'] && this.endpointForm['method'] !== '') &&
      (this.endpointForm['typeId'] && this.endpointForm['typeId'] !== '') &&
      (this.endpointForm['path'] && this.endpointForm['path'] !== '') &&
      (this.endpointForm.hasOwnProperty('authorization')) &&
      (this.endpointForm.hasOwnProperty('visibility'))
    ) {
      valid = true;
    }
    return !valid;
  }

  public submit(): void {
    this.endpointForm['conditionals'] = this.conditionalService.conditional;
    if (!this.isUpdating) {
      this.data.create('endpoints', this.endpointForm).subscribe(res => {
        this.data.getData();
        this.data.restartSubject.next(true);
        this.router.navigate(['/']).then();
      });
    } else {
      this.data.update('endpoints', this.endpointForm).subscribe(res => {
        this.data.getData();
        this.data.restartSubject.next(true);
        this.router.navigate(['/']).then();
      });
    }
  }
}
