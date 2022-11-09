import { EntityComponentsPage, EntityDetailPage, EntityUpdatePage } from '../../entity.po';

export class ElectricalMachinesComponentsPage extends EntityComponentsPage {
  pageSelector = 'page-electrical-machines';
}

export class ElectricalMachinesUpdatePage extends EntityUpdatePage {
  pageSelector = 'page-electrical-machines-update';

  setEquipmentNameInput(equipmentName: string) {
    this.setInputValue('equipmentName', equipmentName);
  }

  setEquipmentBrandInput(equipmentBrand: string) {
    this.setInputValue('equipmentBrand', equipmentBrand);
  }

  setEquipmentTypeInput(equipmentType: string) {
    this.setInputValue('equipmentType', equipmentType);
  }

  setWarrantyInput(warranty: string) {
    this.setDateTime('warranty', warranty);
  }

  setBatteryCapacityInput(batteryCapacity: string) {
    this.setInputValue('batteryCapacity', batteryCapacity);
  }

  setStatusInput(status: string) {
    this.select('status', status);
  }

  setCreatedOnInput(createdOn: string) {
    this.setDateTime('createdOn', createdOn);
  }

  setUpdatedOnInput(updatedOn: string) {
    this.setDateTime('updatedOn', updatedOn);
  }
}

export class ElectricalMachinesDetailPage extends EntityDetailPage {
  pageSelector = 'page-electrical-machines-detail';

  getEquipmentNameContent() {
    return cy.get('#equipmentName-content');
  }

  getEquipmentBrandContent() {
    return cy.get('#equipmentBrand-content');
  }

  getEquipmentTypeContent() {
    return cy.get('#equipmentType-content');
  }

  getWarrantyContent() {
    return cy.get('#warranty-content');
  }

  getBatteryCapacityContent() {
    return cy.get('#batteryCapacity-content');
  }

  getStatusContent() {
    return cy.get('#status-content');
  }

  getCreatedOnContent() {
    return cy.get('#createdOn-content');
  }

  getUpdatedOnContent() {
    return cy.get('#updatedOn-content');
  }
}
