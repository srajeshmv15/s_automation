//import { ElementFinder, browser, by, element} from 'protractor';
// An example configuration file
exports.config = {
	framework : 'jasmine',

	
	capabilities : {
		browserName : 'chrome',
		chromeOptions : {
			args : ["--no-sandbox" ],
		}
	},
	directConnect : true,
	// Spec patterns are relative to the configuration file location passed
	// to protractor (in this example conf.js).
	// They may include glob patterns.
	specs : [ 'specs/swiggy.js',
			//'src/specs/employee-rules-spec.ts'
			],
	// SELENIUM_PROMISE_MANAGER: false,
	// Options to be passed to Jasmine-node.
	jasmineNodeOpts : {
		showColors : true, // Use colors in the command line report.
	},

	allScriptsTimeout: 11000,

	onPrepare : function() {
		browser.driver.manage().window().maximize();
		// originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        // jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
	}
};