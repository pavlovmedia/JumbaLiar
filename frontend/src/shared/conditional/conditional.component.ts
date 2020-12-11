import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ConditionalService} from '../conditional.service';

@Component({
  selector: 'app-conditional',
  templateUrl: './conditional.component.html',
  styleUrls: ['./conditional.component.css']
})
export class ConditionalComponent implements OnInit {

  public conditionals;

  constructor(public conditionalService: ConditionalService) {}

  public ngOnInit(): void {
    this.conditionalService.conditionalSubject.subscribe(conditionals => {
      this.conditionals = conditionals;
    });
  }

  public clickAdd(): void {
    this.conditionalService.addDefaultConditional();
  }

  public clickRemove(index): void {
    this.conditionalService.removeConditional(index);
  }
}
