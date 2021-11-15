const packageJson = require('../../../../package.json');

export const environment = {
  appName: 'Chainlogix - Taxlogix',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '/clgx-taxlogix',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress'],
    eslint: packageJson.devDependencies['eslint']
  }
};

//Prod URL
export const API_BASE_URL =
  'https://mytaxlogix.com:9092/omschaingatewayservice/api';
export const API_BASE_URL_LOCAL = 'http://localhost:8082/api';
export const IMAGE_BASE_URL = 'https://mytaxlogix.com:9092/';
export const IMAGE_BASE_PATH = 'imageBasePath';
export const ACCESS_TOKEN = 'accessToken';
export const USER_MENUS = 'userMenus';
export const PROFILE_NAME = 'username';
export const PROCESS_ORG = 'processOrgModel';
export const USER_ID = 'userId';
export const CLIENT_ID = 'clientId';
export const BRANCH_NAME = 'branchName';
export const BRANCH_ID = 'branchId';
export const PROCESS_ID = 'processId';
export const SCREEN_MAPPING = 'listOfScreenMapping';
export const STRIPE_PUBLIC_KEY =
  'pk_live_51JDhjzFjXK4p2fESQ3umKSONqxxHs5E2SVNwCGl5T0mLTBbljMemj3JRpOULtEfILP6eIKh1LuAfaiCD2qLrVTYe00kc4vyADE';
