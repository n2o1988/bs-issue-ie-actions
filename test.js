import webdriver from 'selenium-webdriver';
import { HttpClient, Request } from 'selenium-webdriver/http';

describe('test', function() {
  const { By, until } = webdriver;
  let driver;
  this.timeout(30000);

  before('Browserstack setup', async () => {
    const { BROWSERSTACK_USER, BROWSERSTACK_KEY } = process.env;
    const capabilities = {
      browserName: 'internet explorer',
      'browserstack.user': BROWSERSTACK_USER,
      'browserstack.key': BROWSERSTACK_KEY,
      project: 'Test IE failure',
      name: 'IE 11',
      build: `Lambo test: ${Math.random()}`,
      os: 'WINDOWS',
      os_version: '10',
      'browserstack.captureCrash': true,
      'browserstack.console': 'verbose',
      'browserstack.debug': true,
      'browserstack.networkLogs': false,
      resolution: '1920x1080',
      browserVersion: '11',
      'browserstack.ie.arch': 'x32',
      'browserstack.ie.driver': '3.141.59',
      'browserstack.selenium_version': '3.141.59',
    };

    driver = await new webdriver.Builder()
      .usingServer('http://hub.browserstack.com/wd/hub')
      .withCapabilities(capabilities)
      .build();

    const session = await driver.getSession();
    const sessionId = session.getId();

    const response = await new HttpClient(
      `https://${BROWSERSTACK_USER}:${BROWSERSTACK_KEY}@www.browserstack.com`
    ).send(new Request('get', `/automate/sessions/${sessionId}.json`));

    const { browser_url, public_url } = JSON.parse(
      response.body
    ).automation_session;
    console.log('Browserstack internal url', browser_url);
    console.log('Browserstack public url', public_url);
  });

  it('actions should work', async () => {
    await driver.get('https://www.google.com');
    const button = await driver.wait(until.elementLocated(By.css('input[type=submit]')));
    await driver
          .actions()
          .move({ origin: button })
          .perform();
    // this should just work, instead it fires the following error:
    // "UnknownCommandError: Unrecognized command: actions"
  });

  after(() => {
    return driver.quit();
  });
});
