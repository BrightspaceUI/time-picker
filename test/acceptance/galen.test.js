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

var mainlineEndpoint = 'http://localhost:8081/components/d2l-time-picker/demo/index.html';
var oneDotXEndpoint = 'http://localhost:8000/components/d2l-time-picker/demo/index.html';

//var demoEndpoint = 'http://localhost:8080/components/d2l-time-picker/demo/index.html';

var inputClickScript = 'document.querySelector("d2l-time-picker").$$(".d2l-input").dispatchEvent(new FocusEvent("focus"))';

polymerTests(browsers, function(test) {

	test('d2l-time-picker', {
		endpoint: mainlineEndpoint + '?wc-shadydom',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['mainline', 'closed', 'ltr']
	});

	test('d2l-time-picker-open', {
		endpoint: mainlineEndpoint + '?wc-shadydom',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['mainline', 'open', 'ltr']
	}, function(opts, cb) {
		opts.driver.executeScript(inputClickScript);
		cb();
	});

	test('d2l-time-picker-rtl', {
		endpoint: mainlineEndpoint + '?wc-shadydom&dir=rtl',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['mainline', 'closed', 'rtl']
	});

	test('d2l-time-picker-open-rtl', {
		endpoint: mainlineEndpoint + '?wc-shadydom&dir=rtl',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['mainline', 'open', 'rtl']
	}, function(opts, cb) {
		opts.driver.executeScript(inputClickScript);
		cb();
	});

	test.shadow('d2l-time-picker-shadow', {
		endpoint: mainlineEndpoint + '?dom=shadow',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['mainline', 'closed', 'ltr']
	});

	test.shadow('d2l-time-picker-open-shadow', {
		endpoint: mainlineEndpoint + '?dom=shadow',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['mainline', 'open', 'ltr']
	}, function(opts, cb) {
		opts.driver.executeScript(inputClickScript);
		cb();
	});

	test.shadow('d2l-time-picker-rtl-shadow', {
		endpoint: mainlineEndpoint + '?dir=rtl&dom=shadow',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['mainline', 'closed', 'rtl']
	});

	test.shadow('d2l-time-picker-open-rtl-shadow', {
		endpoint: mainlineEndpoint + '?dir=rtl&dom=shadow',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['mainline', 'open', 'rtl']
	}, function(opts, cb) {
		opts.driver.executeScript(inputClickScript);
		cb();
	});

	test('d2l-time-picker', {
		endpoint: mainlineEndpoint + '?wc-shadydom',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['mainline', 'closed', 'ltr']
	});

	test('d2l-time-picker-open', {
		endpoint: oneDotXEndpoint + '?wc-shadydom',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['1.x', 'open', 'ltr']
	}, function(opts, cb) {
		opts.driver.executeScript(inputClickScript);
		cb();
	});

	test('d2l-time-picker-rtl', {
		endpoint: oneDotXEndpoint + '?wc-shadydom&dir=rtl',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['1.x', 'closed', 'rtl']
	});

	test('d2l-time-picker-open-rtl', {
		endpoint: oneDotXEndpoint + '?wc-shadydom&dir=rtl',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['1.x', 'open', 'rtl']
	}, function(opts, cb) {
		opts.driver.executeScript(inputClickScript);
		cb();
	});

	test.shadow('d2l-time-picker-shadow', {
		endpoint: oneDotXEndpoint + '?dom=shadow',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['1.x', 'closed', 'ltr']
	});

	test.shadow('d2l-time-picker-open-shadow', {
		endpoint: oneDotXEndpoint + '?dom=shadow',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['1.x', 'open', 'ltr']
	}, function(opts, cb) {
		opts.driver.executeScript(inputClickScript);
		cb();
	});

	test.shadow('d2l-time-picker-rtl-shadow', {
		endpoint: oneDotXEndpoint + '?dir=rtl&dom=shadow',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['1.x', 'closed', 'rtl']
	});

	test.shadow('d2l-time-picker-open-rtl-shadow', {
		endpoint: oneDotXEndpoint + '?dir=rtl&dom=shadow',
		spec: 'test/acceptance/timepicker.gspec',
		tags: ['1.x', 'open', 'rtl']
	}, function(opts, cb) {
		opts.driver.executeScript(inputClickScript);
		cb();
	});
});
