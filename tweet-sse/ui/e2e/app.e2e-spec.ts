import { QuoteMachinePage } from './app.po';

describe('quote-machine App', () => {
  let page: QuoteMachinePage;

  beforeEach(() => {
    page = new QuoteMachinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
