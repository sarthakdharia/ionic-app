import { USER_USERNAME, USER_PASSWORD } from '../../../support/config';
import { BuildingComponentsPage, BuildingDetailPage, BuildingUpdatePage } from '../../../support/pages/entities/building/building.po';
import buildingSample from './building.json';

describe('Building entity', () => {
  const COMPONENT_TITLE = 'Buildings';
  const SUBCOMPONENT_TITLE = 'Building';

  const buildingPageUrl = '/tabs/entities/building';
  const buildingApiUrl = '/api/buildings';

  const buildingComponentsPage = new BuildingComponentsPage();
  const buildingUpdatePage = new BuildingUpdatePage();
  const buildingDetailPage = new BuildingDetailPage();

  let building: any;

  beforeEach(() => {
    building = undefined;
    cy.login(USER_USERNAME, USER_PASSWORD);
  });

  describe('navigation test', () => {
    it('should load Buildings page using menu and go back', () => {
      cy.visit('/tabs/home');
      // go to entity component page
      cy.get('ion-tab-button[tab="entities"]').click();
      cy.get('ion-item h2').contains(SUBCOMPONENT_TITLE).first().click();

      buildingComponentsPage.getPageTitle().should('have.text', COMPONENT_TITLE).should('be.visible');
      cy.url().should('include', buildingPageUrl);

      buildingComponentsPage.back();
      cy.url().should('include', '/tabs/entities');
    });

    it('should load create Building page and go back', () => {
      cy.visit(buildingPageUrl);
      buildingComponentsPage.clickOnCreateButton();

      buildingUpdatePage.getPageTitle().should('have.text', SUBCOMPONENT_TITLE);

      buildingUpdatePage.back();
      cy.url().should('include', buildingPageUrl);
    });
  });

  describe('navigation test with items', () => {
    beforeEach(() => {
      cy.authenticatedRequest({
        method: 'POST',
        url: buildingApiUrl,
        body: buildingSample,
      }).then(({ body }) => {
        building = body;

        cy.intercept(
          {
            method: 'GET',
            url: `${buildingApiUrl}+(?*|)`,
            times: 1,
          },
          {
            statusCode: 200,
            body: [building],
          }
        ).as('entitiesRequestInternal');
      });
    });

    afterEach(() => {
      if (building) {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `${buildingApiUrl}/${building.id}`,
        }).then(() => {
          building = undefined;
        });
      }
    });

    it('should open Building view, open Building edit and go back', () => {
      cy.visit(buildingPageUrl);
      buildingComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      buildingDetailPage.getPageTitle().contains(SUBCOMPONENT_TITLE).should('be.visible');
      if (building.category !== undefined && building.category !== null) {
        buildingDetailPage.getCategoryContent().contains(building.category);
      }
      if (building.name !== undefined && building.name !== null) {
        buildingDetailPage.getNameContent().contains(building.name);
      }
      if (building.floors !== undefined && building.floors !== null) {
        buildingDetailPage.getFloorsContent().contains(building.floors);
      }
      buildingDetailPage.edit();

      buildingUpdatePage.back();
      buildingDetailPage.back();
      cy.url().should('include', buildingPageUrl);
    });

    it('should open Building view, open Building edit and save', () => {
      cy.visit(buildingPageUrl);
      buildingComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      buildingDetailPage.getPageTitle().contains(SUBCOMPONENT_TITLE).should('be.visible');
      buildingDetailPage.edit();

      buildingUpdatePage.save();
      cy.url().should('include', buildingPageUrl);
    });

    it('should delete Building', () => {
      cy.visit(buildingPageUrl);
      buildingComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      buildingDetailPage.delete();
      cy.get('ion-alert button:not(.alert-button-role-cancel)').click();

      buildingComponentsPage.getPageTitle().should('have.text', COMPONENT_TITLE);
      building = undefined;
    });
  });

  describe('creation test', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'POST',
        url: buildingApiUrl,
        times: 1,
      }).as('entitiesPost');
    });

    afterEach(() => {
      if (building) {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `${buildingApiUrl}/${building.id}`,
        }).then(() => {
          building = undefined;
        });
      }
    });

    it('should create Building', () => {
      cy.visit(buildingPageUrl + '/new');

      buildingUpdatePage.getPageTitle().should('have.text', SUBCOMPONENT_TITLE);
      if (buildingSample.category !== undefined && buildingSample.category !== null) {
        buildingUpdatePage.setCategoryInput(buildingSample.category);
      }
      if (buildingSample.name !== undefined && buildingSample.name !== null) {
        buildingUpdatePage.setNameInput(buildingSample.name);
      }
      if (buildingSample.floors !== undefined && buildingSample.floors !== null) {
        buildingUpdatePage.setFloorsInput(buildingSample.floors);
      }
      if (buildingSample.createdOn !== undefined && buildingSample.createdOn !== null) {
        buildingUpdatePage.setCreatedOnInput(buildingSample.createdOn);
      }
      if (buildingSample.updatedOn !== undefined && buildingSample.updatedOn !== null) {
        buildingUpdatePage.setUpdatedOnInput(buildingSample.updatedOn);
      }
      buildingUpdatePage.save();

      cy.wait('@entitiesPost').then(({ response }) => {
        const { body } = response;
        building = body;
      });

      buildingComponentsPage.getPageTitle().contains(COMPONENT_TITLE);
    });
  });
});
