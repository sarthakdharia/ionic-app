import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MechanicalMachines } from './mechanical-machines.model';
import { MechanicalMachinesService } from './mechanical-machines.service';

@Component({
  selector: 'page-mechanical-machines',
  templateUrl: 'mechanical-machines.html',
})
export class MechanicalMachinesPage {
  mechanicalMachines: MechanicalMachines[];

  // todo: add pagination

  constructor(
    private navController: NavController,
    private mechanicalMachinesService: MechanicalMachinesService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.mechanicalMachines = [];
  }

  async ionViewWillEnter() {
    await this.loadAll();
  }

  async loadAll(refresher?) {
    this.mechanicalMachinesService
      .query()
      .pipe(
        filter((res: HttpResponse<MechanicalMachines[]>) => res.ok),
        map((res: HttpResponse<MechanicalMachines[]>) => res.body)
      )
      .subscribe(
        (response: MechanicalMachines[]) => {
          this.mechanicalMachines = response;
          if (typeof refresher !== 'undefined') {
            setTimeout(() => {
              refresher.target.complete();
            }, 750);
          }
        },
        async error => {
          console.error(error);
          const toast = await this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
          await toast.present();
        }
      );
  }

  trackId(index: number, item: MechanicalMachines) {
    return item.id;
  }

  async new() {
    await this.navController.navigateForward('/tabs/entities/mechanical-machines/new');
  }

  async edit(item: IonItemSliding, mechanicalMachines: MechanicalMachines) {
    await this.navController.navigateForward('/tabs/entities/mechanical-machines/' + mechanicalMachines.id + '/edit');
    await item.close();
  }

  async delete(mechanicalMachines) {
    this.mechanicalMachinesService.delete(mechanicalMachines.id).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({
          message: 'MechanicalMachines deleted successfully.',
          duration: 3000,
          position: 'middle',
        });
        await toast.present();
        await this.loadAll();
      },
      error => console.error(error)
    );
  }

  async view(mechanicalMachines: MechanicalMachines) {
    await this.navController.navigateForward('/tabs/entities/mechanical-machines/' + mechanicalMachines.id + '/view');
  }
}
