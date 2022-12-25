import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { Account } from 'src/model/account.model';
import { AccountService } from '../../services/auth/account.service';
import { LoginService } from '../../services/login/login.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  @ViewChild('barCanvas') private barCanvas: ElementRef;

  barChart: any;

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined.
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.

  segment = 0;
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
  account: Account;

  constructor(public navController: NavController, private accountService: AccountService, private loginService: LoginService) {}

  ngOnInit() {
    this.accountService.identity().then(account => {
      if (account === null) {
        this.goBackToHomePage();
      } else {
        this.account = account;
      }
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.goBackToHomePage();
  }

  private goBackToHomePage(): void {
    this.navController.navigateBack('');
  }
  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Acquisitions by year',
            data: [
              { year: 2010, count: 10 },
              { year: 2011, count: 20 },
              { year: 2012, count: 15 },
              { year: 2013, count: 25 },
              { year: 2014, count: 22 },
              { year: 2015, count: 30 },
              { year: 2016, count: 28 },
            ].map(row => row.count),
          },
        ],
        labels: [
          { year: 2010, count: 10 },
          { year: 2011, count: 20 },
          { year: 2012, count: 15 },
          { year: 2013, count: 25 },
          { year: 2014, count: 22 },
          { year: 2015, count: 30 },
          { year: 2016, count: 28 },
        ].map(row => row.year),
      },
    });
  }
}
