import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-entities',
  templateUrl: 'entities.page.html',
  styleUrls: ['entities.page.scss'],
})
export class EntitiesPage {
  entities: Array<any> = [
    { name: 'Address', component: 'AddressPage', route: 'address' },
    { name: 'Building', component: 'BuildingPage', route: 'building' },
    { name: 'Mechanical Machines', component: 'MechanicalMachinesPage', route: 'mechanical-machines' },
    { name: 'Electrical Machines', component: 'ElectricalMachinesPage', route: 'electrical-machines' },
    /* jhipster-needle-add-entity-page - JHipster will add entity pages here */
  ];

  constructor(public navController: NavController) {}

  openPage(page) {
    this.navController.navigateForward('/tabs/entities/' + page.route);
  }
}
