// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
    //'./src/**/scenario1.e2e-spec.ts',
    //'./src/**/scenario2.e2e-spec.ts',
    //'./src/**/scenario3.e2e-spec.ts',
    //'./src/**/scenario4.e2e-spec.ts',
    //'./src/**/scenario5.e2e-spec.ts',
    //'./src/**/scenario6.e2e-spec.ts',
    //'./src/**/scenario7.e2e-spec.ts',
  ],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: StacktraceOption.PRETTY
      }
    }));
  }
};
