import { EntityComponentsPage, EntityDetailPage, EntityUpdatePage } from '../../entity.po';

export class AddressComponentsPage extends EntityComponentsPage {
  pageSelector = 'page-address';
}

export class AddressUpdatePage extends EntityUpdatePage {
  pageSelector = 'page-address-update';

  setStreetInput(street: string) {
    this.setInputValue('street', street);
  }

  setAreaInput(area: string) {
    this.setInputValue('area', area);
  }

  setCityInput(city: string) {
    this.setInputValue('city', city);
  }

  setStateInput(state: string) {
    this.setInputValue('state', state);
  }

  setCountryInput(country: string) {
    this.setInputValue('country', country);
  }

  setPostalCodeInput(postalCode: string) {
    this.setInputValue('postalCode', postalCode);
  }

  setLocationInput(location: string) {
    this.setInputValue('location', location);
  }

  setCreatedOnInput(createdOn: string) {
    this.setDateTime('createdOn', createdOn);
  }
}

export class AddressDetailPage extends EntityDetailPage {
  pageSelector = 'page-address-detail';

  getStreetContent() {
    return cy.get('#street-content');
  }

  getAreaContent() {
    return cy.get('#area-content');
  }

  getCityContent() {
    return cy.get('#city-content');
  }

  getStateContent() {
    return cy.get('#state-content');
  }

  getCountryContent() {
    return cy.get('#country-content');
  }

  getPostalCodeContent() {
    return cy.get('#postalCode-content');
  }

  getLocationContent() {
    return cy.get('#location-content');
  }

  getCreatedOnContent() {
    return cy.get('#createdOn-content');
  }
}
