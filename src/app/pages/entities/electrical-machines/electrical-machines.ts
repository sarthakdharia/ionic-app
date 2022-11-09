import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ElectricalMachines } from './electrical-machines.model';
import { ElectricalMachinesService } from './electrical-machines.service';

@Component({
  selector: 'page-electrical-machines',
  templateUrl: 'electrical-machines.html',
})
export class ElectricalMachinesPage {
  electricalMachines: ElectricalMachines[];

  // todo: add pagination

  constructor(
    private navController: NavController,
    private electricalMachinesService: ElectricalMachinesService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.electricalMachines = [];
  }

  async ionViewWillEnter() {
    await this.loadAll();
  }

  async loadAll(refresher?) {
    this.electricalMachinesService
      .query()
      .pipe(
        filter((res: HttpResponse<ElectricalMachines[]>) => res.ok),
        map((res: HttpResponse<ElectricalMachines[]>) => res.body)
      )
      .subscribe(
        (response: ElectricalMachines[]) => {
          this.electricalMachines = response;
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

  trackId(index: number, item: ElectricalMachines) {
    return item.id;
  }

  async new() {
    await this.navController.navigateForward('/tabs/entities/electrical-machines/new');
  }

  async edit(item: IonItemSliding, electricalMachines: ElectricalMachines) {
    await this.navController.navigateForward('/tabs/entities/electrical-machines/' + electricalMachines.id + '/edit');
    await item.close();
  }

  async delete(electricalMachines) {
    this.electricalMachinesService.delete(electricalMachines.id).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({
          message: 'ElectricalMachines deleted successfully.',
          duration: 3000,
          position: 'middle',
        });
        await toast.present();
        await this.loadAll();
      },
      error => console.error(error)
    );
  }

  async view(electricalMachines: ElectricalMachines) {
    await this.navController.navigateForward('/tabs/entities/electrical-machines/' + electricalMachines.id + '/view');
  }
}
