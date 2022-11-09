import { USER_USERNAME, USER_PASSWORD } from '../../../support/config';
import {
  ElectricalMachinesComponentsPage,
  ElectricalMachinesDetailPage,
  ElectricalMachinesUpdatePage,
} from '../../../support/pages/entities/electrical-machines/electrical-machines.po';
import electricalMachinesSample from './electrical-machines.json';

describe('ElectricalMachines entity', () => {
  const COMPONENT_TITLE = 'Electrical Machines';
  const SUBCOMPONENT_TITLE = 'Electrical Machines';

  const electricalMachinesPageUrl = '/tabs/entities/electrical-machines';
  const electricalMachinesApiUrl = '/api/electrical-machines';

  const electricalMachinesComponentsPage = new ElectricalMachinesComponentsPage();
  const electricalMachinesUpdatePage = new ElectricalMachinesUpdatePage();
  const electricalMachinesDetailPage = new ElectricalMachinesDetailPage();

  let electricalMachines: any;

  beforeEach(() => {
    electricalMachines = undefined;
    cy.login(USER_USERNAME, USER_PASSWORD);
  });

  describe('navigation test', () => {
    it('should load ElectricalMachines page using menu and go back', () => {
      cy.visit('/tabs/home');
      // go to entity component page
      cy.get('ion-tab-button[tab="entities"]').click();
      cy.get('ion-item h2').contains(SUBCOMPONENT_TITLE).first().click();

      electricalMachinesComponentsPage.getPageTitle().should('have.text', COMPONENT_TITLE).should('be.visible');
      cy.url().should('include', electricalMachinesPageUrl);

      electricalMachinesComponentsPage.back();
      cy.url().should('include', '/tabs/entities');
    });

    it('should load create ElectricalMachines page and go back', () => {
      cy.visit(electricalMachinesPageUrl);
      electricalMachinesComponentsPage.clickOnCreateButton();

      electricalMachinesUpdatePage.getPageTitle().should('have.text', SUBCOMPONENT_TITLE);

      electricalMachinesUpdatePage.back();
      cy.url().should('include', electricalMachinesPageUrl);
    });
  });

  describe('navigation test with items', () => {
    beforeEach(() => {
      cy.authenticatedRequest({
        method: 'POST',
        url: electricalMachinesApiUrl,
        body: electricalMachinesSample,
      }).then(({ body }) => {
        electricalMachines = body;

        cy.intercept(
          {
            method: 'GET',
            url: `${electricalMachinesApiUrl}+(?*|)`,
            times: 1,
          },
          {
            statusCode: 200,
            body: [electricalMachines],
          }
        ).as('entitiesRequestInternal');
      });
    });

    afterEach(() => {
      if (electricalMachines) {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `${electricalMachinesApiUrl}/${electricalMachines.id}`,
        }).then(() => {
          electricalMachines = undefined;
        });
      }
    });

    it('should open ElectricalMachines view, open ElectricalMachines edit and go back', () => {
      cy.visit(electricalMachinesPageUrl);
      electricalMachinesComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      electricalMachinesDetailPage.getPageTitle().contains(SUBCOMPONENT_TITLE).should('be.visible');
      if (electricalMachines.equipmentName !== undefined && electricalMachines.equipmentName !== null) {
        electricalMachinesDetailPage.getEquipmentNameContent().contains(electricalMachines.equipmentName);
      }
      if (electricalMachines.equipmentBrand !== undefined && electricalMachines.equipmentBrand !== null) {
        electricalMachinesDetailPage.getEquipmentBrandContent().contains(electricalMachines.equipmentBrand);
      }
      if (electricalMachines.equipmentType !== undefined && electricalMachines.equipmentType !== null) {
        electricalMachinesDetailPage.getEquipmentTypeContent().contains(electricalMachines.equipmentType);
      }
      if (electricalMachines.batteryCapacity !== undefined && electricalMachines.batteryCapacity !== null) {
        electricalMachinesDetailPage.getBatteryCapacityContent().contains(electricalMachines.batteryCapacity);
      }
      electricalMachinesDetailPage.edit();

      electricalMachinesUpdatePage.back();
      electricalMachinesDetailPage.back();
      cy.url().should('include', electricalMachinesPageUrl);
    });

    it('should open ElectricalMachines view, open ElectricalMachines edit and save', () => {
      cy.visit(electricalMachinesPageUrl);
      electricalMachinesComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      electricalMachinesDetailPage.getPageTitle().contains(SUBCOMPONENT_TITLE).should('be.visible');
      electricalMachinesDetailPage.edit();

      electricalMachinesUpdatePage.save();
      cy.url().should('include', electricalMachinesPageUrl);
    });

    it('should delete ElectricalMachines', () => {
      cy.visit(electricalMachinesPageUrl);
      electricalMachinesComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      electricalMachinesDetailPage.delete();
      cy.get('ion-alert button:not(.alert-button-role-cancel)').click();

      electricalMachinesComponentsPage.getPageTitle().should('have.text', COMPONENT_TITLE);
      electricalMachines = undefined;
    });
  });

  describe('creation test', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'POST',
        url: electricalMachinesApiUrl,
        times: 1,
      }).as('entitiesPost');
    });

    afterEach(() => {
      if (electricalMachines) {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `${electricalMachinesApiUrl}/${electricalMachines.id}`,
        }).then(() => {
          electricalMachines = undefined;
        });
      }
    });

    it('should create ElectricalMachines', () => {
      cy.visit(electricalMachinesPageUrl + '/new');

      electricalMachinesUpdatePage.getPageTitle().should('have.text', SUBCOMPONENT_TITLE);
      if (electricalMachinesSample.equipmentName !== undefined && electricalMachinesSample.equipmentName !== null) {
        electricalMachinesUpdatePage.setEquipmentNameInput(electricalMachinesSample.equipmentName);
      }
      if (electricalMachinesSample.equipmentBrand !== undefined && electricalMachinesSample.equipmentBrand !== null) {
        electricalMachinesUpdatePage.setEquipmentBrandInput(electricalMachinesSample.equipmentBrand);
      }
      if (electricalMachinesSample.equipmentType !== undefined && electricalMachinesSample.equipmentType !== null) {
        electricalMachinesUpdatePage.setEquipmentTypeInput(electricalMachinesSample.equipmentType);
      }
      if (electricalMachinesSample.warranty !== undefined && electricalMachinesSample.warranty !== null) {
        electricalMachinesUpdatePage.setWarrantyInput(electricalMachinesSample.warranty);
      }
      if (electricalMachinesSample.batteryCapacity !== undefined && electricalMachinesSample.batteryCapacity !== null) {
        electricalMachinesUpdatePage.setBatteryCapacityInput(electricalMachinesSample.batteryCapacity);
      }
      if (electricalMachinesSample.status !== undefined && electricalMachinesSample.status !== null) {
        electricalMachinesUpdatePage.setStatusInput(electricalMachinesSample.status);
      }
      if (electricalMachinesSample.createdOn !== undefined && electricalMachinesSample.createdOn !== null) {
        electricalMachinesUpdatePage.setCreatedOnInput(electricalMachinesSample.createdOn);
      }
      if (electricalMachinesSample.updatedOn !== undefined && electricalMachinesSample.updatedOn !== null) {
        electricalMachinesUpdatePage.setUpdatedOnInput(electricalMachinesSample.updatedOn);
      }
      electricalMachinesUpdatePage.save();

      cy.wait('@entitiesPost').then(({ response }) => {
        const { body } = response;
        electricalMachines = body;
      });

      electricalMachinesComponentsPage.getPageTitle().contains(COMPONENT_TITLE);
    });
  });
});
