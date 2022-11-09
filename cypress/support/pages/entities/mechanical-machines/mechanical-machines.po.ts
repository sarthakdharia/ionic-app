import { EntityComponentsPage, EntityDetailPage, EntityUpdatePage } from '../../entity.po';

export class MechanicalMachinesComponentsPage extends EntityComponentsPage {
  pageSelector = 'page-mechanical-machines';
}

export class MechanicalMachinesUpdatePage extends EntityUpdatePage {
  pageSelector = 'page-mechanical-machines-update';

  setMachineNameInput(machineName: string) {
    this.setInputValue('machineName', machineName);
  }

  setMachineBrandInput(machineBrand: string) {
    this.setInputValue('machineBrand', machineBrand);
  }

  setMachineTypeInput(machineType: string) {
    this.setInputValue('machineType', machineType);
  }

  setWarrantyInput(warranty: string) {
    this.setDateTime('warranty', warranty);
  }

  setCapacityInput(capacity: string) {
    this.setInputValue('capacity', capacity);
  }

  setLengthInput(length: string) {
    this.setInputValue('length', length);
  }

  setWidthInput(width: string) {
    this.setInputValue('width', width);
  }

  setHeightInput(height: string) {
    this.setInputValue('height', height);
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

export class MechanicalMachinesDetailPage extends EntityDetailPage {
  pageSelector = 'page-mechanical-machines-detail';

  getMachineNameContent() {
    return cy.get('#machineName-content');
  }

  getMachineBrandContent() {
    return cy.get('#machineBrand-content');
  }

  getMachineTypeContent() {
    return cy.get('#machineType-content');
  }

  getWarrantyContent() {
    return cy.get('#warranty-content');
  }

  getCapacityContent() {
    return cy.get('#capacity-content');
  }

  getLengthContent() {
    return cy.get('#length-content');
  }

  getWidthContent() {
    return cy.get('#width-content');
  }

  getHeightContent() {
    return cy.get('#height-content');
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
