import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConditionalService} from '../conditional.service';

@Component({
  selector: 'app-chip',
  templateUrl: './configuration-chip.component.html',
  styleUrls: ['./configuration-chip.component.css']
})
export class ConfigurationChipComponent implements OnInit{
  public editorOptions = {theme: 'vs-dark', language: 'json'};
  @Input() canDelete = false;
  @Input() editable = true;
  @Input() type;
  @Input() action;
  @Input() conditionIndex;
  @Input() actionIndex;

  public condition;
  public conditionTypes;
  public activeType;

  public selectTypeModal = false;
  public selectConfigModal = false;
  public selectSimpleCheckTypeModal = false;
  public selectCheckTypeModal = false;
  public enterJsonModal = false;
  public enterStringModal = false;
  public selectErrorCodeModal = false;
  public enterConfigStringModal = false;
  public selectDataKeyModal = false;

  public enteredBody = '{}';
  public selectedType;
  public selectedConfig;
  public selectedCheckType;

  public errorCodes = [
    {label: '404', value: '404'},
    {label: '500', value: '500'},
    {label: '409', value: '409'},
    {label: '503', value: '503'},
  ];

  public simpleCheckTypeOptions = [
    {label: 'is', value: 'Equals'},
    {label: 'is not', value: 'NotEquals'}
  ];

  public checkTypeOptions = [
    {label: 'starts with', value: 'StartsWith'},
    {label: 'ends with', value: 'EndsWith'},
    {label: 'contains', value: 'Contains'},
    {label: 'regex', value: 'Regex'},
    {label: 'is', value: 'Equals'},
    {label: 'is not', value: 'NotEquals'},
    {label: 'is greater than', value: 'LongGreaterThan'},
    {label: 'is greater than or equal to', value: 'LongGreaterThanOrEqual'},
    {label: 'is less than', value: 'LongLessThan'},
    {label: 'is less than or equal to', value: 'LongLessThanOrEqual'}
  ];

  constructor(
    public conditionalService: ConditionalService
  ) {
  }

  public ngOnInit(): void {
    this.conditionTypes = this.conditionalService[this.action];
    this.conditionalService.conditionalSubject.subscribe(conditionals => {
      // console.log(this.conditionIndex, this.action, this.actionIndex, this.type);
      if (conditionals[this.conditionIndex]) {
        this.condition = conditionals[this.conditionIndex][this.action][this.actionIndex];
        this.activeType = this.conditionTypes.find(i => i.value === this.condition.type);
        this.selectedCheckType = this.condition.checkType;
        this.selectedConfig = this.condition.config;
        this.enteredBody = this.condition.body;
      }
    });
    this.editable = this.condition.type !== '*';
  }

  public getCheckTypeLabel(value): string {
    return this.checkTypeOptions.find(i => i.value === value).label;
  }

  public submit(type): void {
    switch (type) {
      case 'type':
        this.conditionalService.updateCondition(this.conditionIndex, this.action, this.actionIndex, type, this.selectedType);
        break;
      case 'config':
        this.conditionalService.updateCondition(this.conditionIndex, this.action, this.actionIndex, type, this.selectedConfig);
        break;
      case 'checkType':
        this.conditionalService.updateCondition(this.conditionIndex, this.action, this.actionIndex, type, this.selectedCheckType);
        break;
      case 'body':
        this.conditionalService.updateCondition(this.conditionIndex, this.action, this.actionIndex, type, this.enteredBody);
        break;
    }
    this.selectTypeModal = false;
    this.selectConfigModal = false;
    this.selectSimpleCheckTypeModal = false;
    this.selectCheckTypeModal = false;
    this.enterJsonModal = false;
    this.enterStringModal = false;
    this.selectErrorCodeModal = false;
    this.enterConfigStringModal = false;
    this.selectDataKeyModal = false;
  }
}
