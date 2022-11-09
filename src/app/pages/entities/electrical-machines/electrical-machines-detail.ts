import { Component, OnInit } from '@angular/core';
import { ElectricalMachines } from './electrical-machines.model';
import { ElectricalMachinesService } from './electrical-machines.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-electrical-machines-detail',
  templateUrl: 'electrical-machines-detail.html',
})
export class ElectricalMachinesDetailPage implements OnInit {
  electricalMachines: ElectricalMachines = {};

  constructor(
    private navController: NavController,
    private electricalMachinesService: ElectricalMachinesService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.electricalMachines = response.data;
    });
  }

  open(item: ElectricalMachines) {
    this.navController.navigateForward('/tabs/entities/electrical-machines/' + item.id + '/edit');
  }

  async deleteModal(item: ElectricalMachines) {
    const alert = await this.alertController.create({
      header: 'Confirm the deletion?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: () => {
            this.electricalMachinesService.delete(item.id).subscribe(() => {
              this.navController.navigateForward('/tabs/entities/electrical-machines');
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
