import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {DataService} from '../shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public showRestart = false;

  constructor(
    private data: DataService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {

    this.data.restartSubject.subscribe(res => {
      this.showRestart = res;
      // Show restart for 3 seconds and then stop it
      if (res) {
        window.setTimeout(() => {
          this.data.restartSubject.next(false);
        }, 4000);
      }
    });

    this.primengConfig.ripple = true;
  }
}
