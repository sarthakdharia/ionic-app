import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
          },
        ],
      },
      {
        path: 'entities',
        children: [
          {
            path: '',
            loadChildren: () => import('../entities/entities.module').then(m => m.EntitiesPageModule),
          },
        ],
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule),
          },
        ],
      },
      {
        path: 'live',
        children: [
          {
            path: '',
            loadChildren: () => import('../live/live.module').then(m => m.LivePageModule),
          },
        ],
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../map/map.module').then(m => m.MapPageModule),
          },
        ],
      },
      {
        path: 'charts',
        children: [
          {
            path: '',
            loadChildren: () => import('../charts/charts.module').then(m => m.ChartsPageModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
