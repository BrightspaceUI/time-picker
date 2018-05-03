/* global polymerTests, LocalBrowserFactory, SauceBrowserFactory */
/* eslint no-invalid-this: 0 */
'use strict';

var browsers = {
	chrome: new LocalBrowserFactory({ browser: 'chrome', size: '768x768' }),
	chromeWindows: new SauceBrowserFactory({
		browser: 'Chrome',
		platform: 'WIN10',
		size: '1400x900'
	}),
	/*
	firefoxWindows: new SauceBrowserFactory({
		browser: 'Firefox',
		platform: 'WIN10',
		size: '1400x900'
	}),*//*
	ie11Windows: new SauceBrowserFactory({
		browser: 'internet explorer',
		version: '11',
		platform: 'WIN10',
		size: '1400x900'
	}),
	edgeWindows: new SauceBrowserFactory({
		browser: 'microsoftedge',
		platform: 'WIN10',
		size: '1400x900',
		tags: ['no-d2l-shadow']
	}),
	chromeMac: new SauceBrowserFactory({
		browser: 'Chrome',
		platform: 'SIERRA',
		*//* crashes during screenshot command on > 2.24
		 *			https://bugs.chromium.org/p/chromedriver/issues/detail?id=1770# *//*
		desiredCapabilities: {
			chromedriverVersion: '2.24'
		}
	}),
	safariMac: new SauceBrowserFactory({
		browser: 'Safari',
		platform: 'EL_CAPITAN',
		size: '1400x900',
		tags: ['no-d2l-shadow']
	})*/
};

var endpoint = 'http://localhost:8081/components/d2l-time-picker/demo/index.html';
//var demoEndpoint = 'http://localhost:8080/components/d2l-time-picker/demo/index.html';

var inputClickScript = 'document.querySelector("d2l-time-picker").$$.(".d2l-input").click()';

polymerTests(browsers, function(test) {

	test('d2l-time-picker', {
		endpoint: endpoint,
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['closed', 'ltr']
	});

	test('d2l-time-picker-open', {
		endpoint: endpoint,
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['open', 'ltr']
	}, function(opts, cb) {
		opts.driver.executeScript(inputClickScript);
		cb();
	});

	test('d2l-time-picker-rtl', {
		endpoint: endpoint + '?dir=rtl',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['closed', 'rtl']
	});

	test('d2l-time-picker-open-rtl', {
		endpoint: endpoint + '?dir=rtl',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['open', 'rtl']
	}, function(opts, cb) {
		opts.driver.executeScript(inputClickScript);
		cb();
	});

	test.shadow('d2l-time-picker-shadow', {
		endpoint: endpoint + '?dom=shadow',
		spec: 'test/acceptance/timepicker.shadow.gspec',
		tags: ['closed', 'ltr']
	});

	test.shadow('d2l-time-picker-open-shadow', {
		endpoint: endpoint + '?dom=shadow',
		spec: 'test/acceptance/timepicker.shadow.gspec',
		tags: ['open', 'ltr']
	}, function(opts, cb) {
		opts.driver.executeScript(inputClickScript);
		cb();
	});

	test.shadow('d2l-time-picker-rtl-shadow', {
		endpoint: endpoint + '?dir=rtl&dom=shadow',
		spec: 'test/acceptance/timepicker.shadow.gspec',
		tags: ['closed', 'rtl']
	});

	test.shadow('d2l-time-picker-open-rtl-shadow', {
		endpoint: endpoint + '?dir=rtl&dom=shadow',
		spec: 'test/acceptance/timepicker.shadow.gspec',
		tags: ['open', 'rtl']
	}, function(opts, cb) {
		opts.driver.executeScript(inputClickScript);
		cb();
	});
});
