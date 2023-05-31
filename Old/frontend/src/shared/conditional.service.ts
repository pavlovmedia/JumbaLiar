import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class ConditionalService {
  public conditionalSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  public conditional;

  public defaultConditionals = [
    {
      if: [
        {
          type: '*',
          checkType: '',
          config: '',
          body: ''
        }
      ],
      then: [
        {
          type: 'returnData',
          checkType: '',
          config: '',
          body: ''
        }
      ]
    }
  ];

  public if = [
    {
      label: '*',
      value: '*',
      requiresConfig: '',
      requiresCheckType: '',
      requiresBody: '',
      defaultConfig: '',
      defaultCheckType: '',
      defaultBody: ''
    },
    {
      label: 'INPUT PAYLOAD',
      value: 'payload',
      requiresConfig: '',
      requiresCheckType: 'simpleCheckType',
      requiresBody: 'json',
      defaultConfig: '',
      defaultCheckType: 'Equals',
      defaultBody: '{}'
    },
    {
      label: 'INPUT PAYLOAD KEY',
      value: 'payloadKey',
      requiresConfig: 'string',
      requiresCheckType: 'checkType',
      requiresBody: 'string',
      defaultConfig: 'id',
      defaultCheckType: 'Equals',
      defaultBody: '*'
    },
    {
      label: 'USER',
      value: 'user',
      requiresConfig: '',
      requiresCheckType: 'simpleCheckType',
      requiresBody: 'userSelect',
      defaultConfig: '',
      defaultCheckType: 'Equals',
      defaultBody: '*'
    },
    {
      label: 'PATH PARAM',
      value: 'pathParam',
      requiresConfig: 'pathParam',
      requiresCheckType: 'checkType',
      requiresBody: 'string',
      defaultConfig: ':*',
      defaultCheckType: 'Equals',
      defaultBody: '*'
    },
  ];

  public then = [
    {
      label: 'RETURN OBJECT',
      value: 'returnObject',
      requiresConfig: '',
      requiresCheckType: '',
      requiresBody: 'json',
      defaultConfig: '',
      defaultCheckType: '',
      defaultBody: '[]'
    },
    {
      label: 'RETURN DATA',
      value: 'returnData',
      requiresConfig: '',
      requiresCheckType: '',
      requiresBody: '',
      defaultConfig: '',
      defaultCheckType: '',
      defaultBody: ''
    },
    {
      label: 'RETURN DATA WHERE ITEM KEY',
      value: 'returnDataWhereKey',
      requiresConfig: 'string',
      requiresCheckType: 'checkType',
      requiresBody: 'string',
      defaultConfig: 'id',
      defaultCheckType: 'Equals',
      defaultBody: ':id'
    },
    {
      label: 'RETURN DATA WHERE ITEM INDEX',
      value: 'returnDataWhereIndex',
      requiresConfig: '',
      requiresCheckType: 'simpleCheckType',
      requiresBody: 'string',
      defaultConfig: '',
      defaultCheckType: 'Equals',
      defaultBody: '0'
    },
    {
      label: 'RETURN DATA MATCHING INCOMING QUERY',
      value: 'returnDataWhereQuery',
      requiresConfig: '',
      requiresCheckType: '',
      requiresBody: '',
      defaultConfig: '',
      defaultCheckType: '',
      defaultBody: ''
    },
    {
      label: 'RETURN ERROR',
      value: 'returnError',
      requiresConfig: '',
      requiresCheckType: '',
      requiresBody: 'errorCode',
      defaultConfig: '',
      defaultCheckType: '',
      defaultBody: '404'
    },
    {
      label: 'PUSH INCOMING BODY',
      value: 'pushBody',
      requiresConfig: '',
      requiresCheckType: '',
      requiresBody: '',
      defaultConfig: '',
      defaultCheckType: '',
      defaultBody: ''
    },
    {
      label: 'UPDATE MATCHING DATA',
      value: 'updateData',
      requiresConfig: '',
      requiresCheckType: '',
      requiresBody: '',
      defaultConfig: '',
      defaultCheckType: '',
      defaultBody: ''
    },
    {
      label: 'DELETE MATCHING DATA',
      value: 'deleteData',
      requiresConfig: '',
      requiresCheckType: '',
      requiresBody: '',
      defaultConfig: '',
      defaultCheckType: '',
      defaultBody: ''
    },
  ];

  constructor() {
    this.conditional = [];
    this.conditionalSubject.next([]);
  }


  public setDefaultConditionals(): void {
    this.conditional = this.defaultConditionals;
    this.conditionalSubject.next(this.defaultConditionals);
  }

  public setConditionals(payload): void {
    this.conditional = payload;
    this.conditionalSubject.next(payload);
  }

  public updateCondition(conditionIndex, action, actionIndex, key, value): void {
    const c = this.conditional[conditionIndex][action][actionIndex];
    c[key] = value;
    if (key === 'type') {
      const foundType = this[action].find(i => i.value === value);
      if (foundType.defaultBody !== '') { c['body'] = foundType.defaultBody; }
      if (foundType.defaultCheckType !== '') { c['checkType'] = foundType.defaultCheckType; }
      if (foundType.defaultConfig !== '') { c['config'] = foundType.defaultConfig; }
    }
    this.conditionalSubject.next(this.conditional);
  }

  public addDefaultConditional(): void {
    const defaultNewConditional = {
      if: [
        {
          type: 'payload',
          checkType: 'Equals',
          config: '',
          body: '{}'
        }
      ],
      then: [
        {
          type: 'returnObject',
          body: '[]'
        }
      ]
    };
    this.conditional.push(defaultNewConditional);
    this.conditionalSubject.next(this.conditional);
  }

  public removeConditional(index): void {
    index = index + 1;
    this.conditional.splice(index, 1);
    this.conditionalSubject.next(this.conditional);
  }
}
