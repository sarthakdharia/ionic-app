import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserRouteAccessService } from 'src/app/services/auth/user-route-access.service';
import { LivePage } from './live.page';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import Marcaron from './marcaron';
import { HttpClientModule } from '@angular/common/http';

echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]);
echarts.registerTheme('macarons', Marcaron);

const routes: Routes = [
  {
    path: '',
    component: LivePage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [
    IonicModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    HttpClientModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LivePage],
})
export class LivePageModule {}
