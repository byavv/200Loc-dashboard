import { LocDashboardPage } from './app.po';

describe('loc-dashboard App', function() {
  let page: LocDashboardPage;

  beforeEach(() => {
    page = new LocDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
