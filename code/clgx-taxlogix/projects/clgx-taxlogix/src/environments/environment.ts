// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --configuration production` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const packageJson = require('../../../../package.json');

export const environment = {
  appName: 'Chainlogix - Tax Services',
  envName: 'DEV',
  production: false,
  test: false,
  i18nPrefix: '',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress'],
    eslint: packageJson.devDependencies['eslint']
  }
};

//QA URL
export const API_BASE_URL =
  'https://mytaxlogix.com:8882/omschaingatewayservice/api';
//Prod URL
// export const API_BASE_URL = 'https://mytaxlogix.com:9092/omschaingatewayservice/api';
export const API_BASE_URL_LOCAL = 'http://localhost:8082/api';
export const IMAGE_BASE_URL = 'https://mytaxlogix.com:8882/';
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
  'pk_test_51JDhjzFjXK4p2fESgYIPmSpyAF2qc4c9klk0MVSxgNFG4aDSnsQC7fKNePj9Ka5u2vYhuduzmNXxOizUsJesX4zE007vl3DyXn';
