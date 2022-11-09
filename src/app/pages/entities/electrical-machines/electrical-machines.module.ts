import { NgModule, Injectable } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRouteAccessService } from '../../../services/auth/user-route-access.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

import { ElectricalMachinesPage } from './electrical-machines';
import { ElectricalMachinesUpdatePage } from './electrical-machines-update';
import { ElectricalMachines, ElectricalMachinesService, ElectricalMachinesDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ElectricalMachinesResolve implements Resolve<ElectricalMachines> {
  constructor(private service: ElectricalMachinesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ElectricalMachines> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ElectricalMachines>) => response.ok),
        map((electricalMachines: HttpResponse<ElectricalMachines>) => electricalMachines.body)
      );
    }
    return of(new ElectricalMachines());
  }
}

const routes: Routes = [
  {
    path: '',
    component: ElectricalMachinesPage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ElectricalMachinesUpdatePage,
    resolve: {
      data: ElectricalMachinesResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ElectricalMachinesDetailPage,
    resolve: {
      data: ElectricalMachinesResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ElectricalMachinesUpdatePage,
    resolve: {
      data: ElectricalMachinesResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  declarations: [ElectricalMachinesPage, ElectricalMachinesUpdatePage, ElectricalMachinesDetailPage],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, TranslateModule, RouterModule.forChild(routes)],
})
export class ElectricalMachinesPageModule {}
