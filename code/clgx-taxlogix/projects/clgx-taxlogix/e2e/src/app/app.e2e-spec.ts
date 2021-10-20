import { AppPage } from './app.po';

import { getCurrentRouteUrl } from '../utils/utils';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => (page = new AppPage()));

  it('should redirect to "about" route', () => {
    page.navigateTo();
    expect(getCurrentRouteUrl()).toEqual('about');
  });

  it('should display current year in the footer', () => {
    page.navigateTo();
    expect(page.getCurrentYear()).toEqual(new Date().getFullYear().toString());
  });
  
});
