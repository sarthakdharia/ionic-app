import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserRouteAccessService } from 'src/app/services/auth/user-route-access.service';
import { EntitiesPage } from './entities.page';

const routes: Routes = [
  {
    path: '',
    component: EntitiesPage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'address',
    loadChildren: () => import('./address/address.module').then(m => m.AddressPageModule),
  },
  {
    path: 'building',
    loadChildren: () => import('./building/building.module').then(m => m.BuildingPageModule),
  },
  {
    path: 'mechanical-machines',
    loadChildren: () => import('./mechanical-machines/mechanical-machines.module').then(m => m.MechanicalMachinesPageModule),
  },
  {
    path: 'electrical-machines',
    loadChildren: () => import('./electrical-machines/electrical-machines.module').then(m => m.ElectricalMachinesPageModule),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild(routes), TranslateModule],
  declarations: [EntitiesPage],
})
export class EntitiesPageModule {}
