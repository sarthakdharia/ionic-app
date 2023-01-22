import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Account } from 'src/model/account.model';
import { AccountService } from '../../services/auth/account.service';
import { LoginService } from '../../services/login/login.service';
import { HttpClient } from '@angular/common/http';
import { MockServerService } from './mock-server.service';
@Component({
  selector: 'app-root',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit {
  account: Account;

  options = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };

  option2 = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  mergeOption: any;
  loading = false;

  constructor(
    public navController: NavController,
    private accountService: AccountService,
    private loginService: LoginService,
    private api: MockServerService,
    private http: HttpClient
  ) {}

  getData() {
    this.loading = true;
    this.api
      .getData()
      .then(data => {
        this.mergeOption = { series: [{ data }] };
      })
      .catch(e => {
        /** Error Handler */
      })
      .then(() => {
        this.loading = false;
      });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
