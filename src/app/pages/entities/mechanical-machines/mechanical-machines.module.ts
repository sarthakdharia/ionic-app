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

import { MechanicalMachinesPage } from './mechanical-machines';
import { MechanicalMachinesUpdatePage } from './mechanical-machines-update';
import { MechanicalMachines, MechanicalMachinesService, MechanicalMachinesDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MechanicalMachinesResolve implements Resolve<MechanicalMachines> {
  constructor(private service: MechanicalMachinesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MechanicalMachines> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MechanicalMachines>) => response.ok),
        map((mechanicalMachines: HttpResponse<MechanicalMachines>) => mechanicalMachines.body)
      );
    }
    return of(new MechanicalMachines());
  }
}

const routes: Routes = [
  {
    path: '',
    component: MechanicalMachinesPage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MechanicalMachinesUpdatePage,
    resolve: {
      data: MechanicalMachinesResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MechanicalMachinesDetailPage,
    resolve: {
      data: MechanicalMachinesResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MechanicalMachinesUpdatePage,
    resolve: {
      data: MechanicalMachinesResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  declarations: [MechanicalMachinesPage, MechanicalMachinesUpdatePage, MechanicalMachinesDetailPage],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, TranslateModule, RouterModule.forChild(routes)],
})
export class MechanicalMachinesPageModule {}
