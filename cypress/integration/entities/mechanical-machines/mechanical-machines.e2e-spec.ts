import { USER_USERNAME, USER_PASSWORD } from '../../../support/config';
import {
  MechanicalMachinesComponentsPage,
  MechanicalMachinesDetailPage,
  MechanicalMachinesUpdatePage,
} from '../../../support/pages/entities/mechanical-machines/mechanical-machines.po';
import mechanicalMachinesSample from './mechanical-machines.json';

describe('MechanicalMachines entity', () => {
  const COMPONENT_TITLE = 'Mechanical Machines';
  const SUBCOMPONENT_TITLE = 'Mechanical Machines';

  const mechanicalMachinesPageUrl = '/tabs/entities/mechanical-machines';
  const mechanicalMachinesApiUrl = '/api/mechanical-machines';

  const mechanicalMachinesComponentsPage = new MechanicalMachinesComponentsPage();
  const mechanicalMachinesUpdatePage = new MechanicalMachinesUpdatePage();
  const mechanicalMachinesDetailPage = new MechanicalMachinesDetailPage();

  let mechanicalMachines: any;

  beforeEach(() => {
    mechanicalMachines = undefined;
    cy.login(USER_USERNAME, USER_PASSWORD);
  });

  describe('navigation test', () => {
    it('should load MechanicalMachines page using menu and go back', () => {
      cy.visit('/tabs/home');
      // go to entity component page
      cy.get('ion-tab-button[tab="entities"]').click();
      cy.get('ion-item h2').contains(SUBCOMPONENT_TITLE).first().click();

      mechanicalMachinesComponentsPage.getPageTitle().should('have.text', COMPONENT_TITLE).should('be.visible');
      cy.url().should('include', mechanicalMachinesPageUrl);

      mechanicalMachinesComponentsPage.back();
      cy.url().should('include', '/tabs/entities');
    });

    it('should load create MechanicalMachines page and go back', () => {
      cy.visit(mechanicalMachinesPageUrl);
      mechanicalMachinesComponentsPage.clickOnCreateButton();

      mechanicalMachinesUpdatePage.getPageTitle().should('have.text', SUBCOMPONENT_TITLE);

      mechanicalMachinesUpdatePage.back();
      cy.url().should('include', mechanicalMachinesPageUrl);
    });
  });

  describe('navigation test with items', () => {
    beforeEach(() => {
      cy.authenticatedRequest({
        method: 'POST',
        url: mechanicalMachinesApiUrl,
        body: mechanicalMachinesSample,
      }).then(({ body }) => {
        mechanicalMachines = body;

        cy.intercept(
          {
            method: 'GET',
            url: `${mechanicalMachinesApiUrl}+(?*|)`,
            times: 1,
          },
          {
            statusCode: 200,
            body: [mechanicalMachines],
          }
        ).as('entitiesRequestInternal');
      });
    });

    afterEach(() => {
      if (mechanicalMachines) {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `${mechanicalMachinesApiUrl}/${mechanicalMachines.id}`,
        }).then(() => {
          mechanicalMachines = undefined;
        });
      }
    });

    it('should open MechanicalMachines view, open MechanicalMachines edit and go back', () => {
      cy.visit(mechanicalMachinesPageUrl);
      mechanicalMachinesComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      mechanicalMachinesDetailPage.getPageTitle().contains(SUBCOMPONENT_TITLE).should('be.visible');
      if (mechanicalMachines.machineName !== undefined && mechanicalMachines.machineName !== null) {
        mechanicalMachinesDetailPage.getMachineNameContent().contains(mechanicalMachines.machineName);
      }
      if (mechanicalMachines.machineBrand !== undefined && mechanicalMachines.machineBrand !== null) {
        mechanicalMachinesDetailPage.getMachineBrandContent().contains(mechanicalMachines.machineBrand);
      }
      if (mechanicalMachines.machineType !== undefined && mechanicalMachines.machineType !== null) {
        mechanicalMachinesDetailPage.getMachineTypeContent().contains(mechanicalMachines.machineType);
      }
      if (mechanicalMachines.capacity !== undefined && mechanicalMachines.capacity !== null) {
        mechanicalMachinesDetailPage.getCapacityContent().contains(mechanicalMachines.capacity);
      }
      if (mechanicalMachines.length !== undefined && mechanicalMachines.length !== null) {
        mechanicalMachinesDetailPage.getLengthContent().contains(mechanicalMachines.length);
      }
      if (mechanicalMachines.width !== undefined && mechanicalMachines.width !== null) {
        mechanicalMachinesDetailPage.getWidthContent().contains(mechanicalMachines.width);
      }
      if (mechanicalMachines.height !== undefined && mechanicalMachines.height !== null) {
        mechanicalMachinesDetailPage.getHeightContent().contains(mechanicalMachines.height);
      }
      mechanicalMachinesDetailPage.edit();

      mechanicalMachinesUpdatePage.back();
      mechanicalMachinesDetailPage.back();
      cy.url().should('include', mechanicalMachinesPageUrl);
    });

    it('should open MechanicalMachines view, open MechanicalMachines edit and save', () => {
      cy.visit(mechanicalMachinesPageUrl);
      mechanicalMachinesComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      mechanicalMachinesDetailPage.getPageTitle().contains(SUBCOMPONENT_TITLE).should('be.visible');
      mechanicalMachinesDetailPage.edit();

      mechanicalMachinesUpdatePage.save();
      cy.url().should('include', mechanicalMachinesPageUrl);
    });

    it('should delete MechanicalMachines', () => {
      cy.visit(mechanicalMachinesPageUrl);
      mechanicalMachinesComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      mechanicalMachinesDetailPage.delete();
      cy.get('ion-alert button:not(.alert-button-role-cancel)').click();

      mechanicalMachinesComponentsPage.getPageTitle().should('have.text', COMPONENT_TITLE);
      mechanicalMachines = undefined;
    });
  });

  describe('creation test', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'POST',
        url: mechanicalMachinesApiUrl,
        times: 1,
      }).as('entitiesPost');
    });

    afterEach(() => {
      if (mechanicalMachines) {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `${mechanicalMachinesApiUrl}/${mechanicalMachines.id}`,
        }).then(() => {
          mechanicalMachines = undefined;
        });
      }
    });

    it('should create MechanicalMachines', () => {
      cy.visit(mechanicalMachinesPageUrl + '/new');

      mechanicalMachinesUpdatePage.getPageTitle().should('have.text', SUBCOMPONENT_TITLE);
      if (mechanicalMachinesSample.machineName !== undefined && mechanicalMachinesSample.machineName !== null) {
        mechanicalMachinesUpdatePage.setMachineNameInput(mechanicalMachinesSample.machineName);
      }
      if (mechanicalMachinesSample.machineBrand !== undefined && mechanicalMachinesSample.machineBrand !== null) {
        mechanicalMachinesUpdatePage.setMachineBrandInput(mechanicalMachinesSample.machineBrand);
      }
      if (mechanicalMachinesSample.machineType !== undefined && mechanicalMachinesSample.machineType !== null) {
        mechanicalMachinesUpdatePage.setMachineTypeInput(mechanicalMachinesSample.machineType);
      }
      if (mechanicalMachinesSample.warranty !== undefined && mechanicalMachinesSample.warranty !== null) {
        mechanicalMachinesUpdatePage.setWarrantyInput(mechanicalMachinesSample.warranty);
      }
      if (mechanicalMachinesSample.capacity !== undefined && mechanicalMachinesSample.capacity !== null) {
        mechanicalMachinesUpdatePage.setCapacityInput(mechanicalMachinesSample.capacity);
      }
      if (mechanicalMachinesSample.length !== undefined && mechanicalMachinesSample.length !== null) {
        mechanicalMachinesUpdatePage.setLengthInput(mechanicalMachinesSample.length);
      }
      if (mechanicalMachinesSample.width !== undefined && mechanicalMachinesSample.width !== null) {
        mechanicalMachinesUpdatePage.setWidthInput(mechanicalMachinesSample.width);
      }
      if (mechanicalMachinesSample.height !== undefined && mechanicalMachinesSample.height !== null) {
        mechanicalMachinesUpdatePage.setHeightInput(mechanicalMachinesSample.height);
      }
      if (mechanicalMachinesSample.status !== undefined && mechanicalMachinesSample.status !== null) {
        mechanicalMachinesUpdatePage.setStatusInput(mechanicalMachinesSample.status);
      }
      if (mechanicalMachinesSample.createdOn !== undefined && mechanicalMachinesSample.createdOn !== null) {
        mechanicalMachinesUpdatePage.setCreatedOnInput(mechanicalMachinesSample.createdOn);
      }
      if (mechanicalMachinesSample.updatedOn !== undefined && mechanicalMachinesSample.updatedOn !== null) {
        mechanicalMachinesUpdatePage.setUpdatedOnInput(mechanicalMachinesSample.updatedOn);
      }
      mechanicalMachinesUpdatePage.save();

      cy.wait('@entitiesPost').then(({ response }) => {
        const { body } = response;
        mechanicalMachines = body;
      });

      mechanicalMachinesComponentsPage.getPageTitle().contains(COMPONENT_TITLE);
    });
  });
});
