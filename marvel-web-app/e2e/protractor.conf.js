// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    //silent: true,
    defaultTimeoutInterval: 60000,
    print: function() {}
  },

  allScriptsTimeout: 11000,

  specs: [
    //'./src/**/*.e2e-spec.ts'
    //'./src/**/scenario1.e2e-spec.ts',
    //'./src/**/scenario2.e2e-spec.ts',
    //'./src/**/scenario3.e2e-spec.ts',
    //'./src/**/scenario4.e2e-spec.ts',
    //'./src/**/scenario5.e2e-spec.ts',
    //'./src/**/scenario6.e2e-spec.ts',
    './src/**/scenario7.e2e-spec.ts',
  ],

  capabilities: {
    browserName: 'chrome',
    //chromeOptions: {'args': ['disable-infobars']},
    //browserName : 'firefox',
    //marionette : true,
    //acceptSslCerts : true
  },

  directConnect: true,

  onPrepare() {
    let globals = require('protractor');
    let browser = globals.browser;
    browser.manage().timeouts().implicitlyWait(30000);
    browser.ignoreSynchronization = true;

    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });

    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: StacktraceOption.PRETTY
      }
    }));
  },

  params: {
    appUrl : 'http://localhost:4200/',
    user : {
        email : 'kwm@e2e.at',
        password : 'kwme2e'
      },

  },
};
