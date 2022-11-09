import { EntityComponentsPage, EntityDetailPage, EntityUpdatePage } from '../../entity.po';

export class BuildingComponentsPage extends EntityComponentsPage {
  pageSelector = 'page-building';
}

export class BuildingUpdatePage extends EntityUpdatePage {
  pageSelector = 'page-building-update';

  setCategoryInput(category: string) {
    this.setInputValue('category', category);
  }

  setNameInput(name: string) {
    this.setInputValue('name', name);
  }

  setFloorsInput(floors: string) {
    this.setInputValue('floors', floors);
  }

  setCreatedOnInput(createdOn: string) {
    this.setDateTime('createdOn', createdOn);
  }

  setUpdatedOnInput(updatedOn: string) {
    this.setDateTime('updatedOn', updatedOn);
  }
}

export class BuildingDetailPage extends EntityDetailPage {
  pageSelector = 'page-building-detail';

  getCategoryContent() {
    return cy.get('#category-content');
  }

  getNameContent() {
    return cy.get('#name-content');
  }

  getFloorsContent() {
    return cy.get('#floors-content');
  }

  getCreatedOnContent() {
    return cy.get('#createdOn-content');
  }

  getUpdatedOnContent() {
    return cy.get('#updatedOn-content');
  }
}
