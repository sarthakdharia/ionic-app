import { Component, OnInit } from '@angular/core';
import { MechanicalMachines } from './mechanical-machines.model';
import { MechanicalMachinesService } from './mechanical-machines.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-mechanical-machines-detail',
  templateUrl: 'mechanical-machines-detail.html',
})
export class MechanicalMachinesDetailPage implements OnInit {
  mechanicalMachines: MechanicalMachines = {};

  constructor(
    private navController: NavController,
    private mechanicalMachinesService: MechanicalMachinesService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.mechanicalMachines = response.data;
    });
  }

  open(item: MechanicalMachines) {
    this.navController.navigateForward('/tabs/entities/mechanical-machines/' + item.id + '/edit');
  }

  async deleteModal(item: MechanicalMachines) {
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
            this.mechanicalMachinesService.delete(item.id).subscribe(() => {
              this.navController.navigateForward('/tabs/entities/mechanical-machines');
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
