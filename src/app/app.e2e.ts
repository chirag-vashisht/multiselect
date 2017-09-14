import { browser, by, element } from 'protractor';
import 'tslib';

describe('App', () => {

  beforeEach(async () => {
    await browser.get('/');
  });

  it('should have a title', async () => {
    let subject = await browser.getTitle();
    let result = 'Angular demo';
    expect(subject).toEqual(result);
  });

  it('should have multiselect', async () => {
    let subject = await element(by.tagName('multiselect')).isPresent();
    expect(subject).toEqual(true);
  });
});
