import { AboutPage } from './about.po';
import { getCurrentRouteUrl } from '../../utils/utils';

describe('About Page', () => {
  let page: AboutPage;

  beforeEach(() => (page = new AboutPage()));

  it('should display main heading', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Chainlogix - Taxlogix');
  });

  it('should display "Geting Started" section', () => {
    page.navigateTo();
    page
      .getGettingStarted()
      .isPresent()
      .then((isPresent) => expect(isPresent).toBe(true));
  });
 
});
