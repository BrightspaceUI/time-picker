/**
`d2l-time-picker`
Accessible, Localized Time Picker Input Element

@demo demo/index.html
*/
import '@polymer/polymer/polymer-legacy.js';
import 'd2l-dropdown/d2l-dropdown.js';
import 'd2l-dropdown/d2l-dropdown-content.js';
import { IronA11yKeysBehavior } from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import '@polymer/iron-selector/iron-selector.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-inputs/d2l-input-shared-styles.js';
import {getDocumentLocaleSettings} from '@brightspace-ui/intl/lib/common.js';
import {formatTime, parseTime} from '@brightspace-ui/intl/lib/dateTime.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-time-picker">
	<template strip-whitespace="">
		<style include="d2l-input-styles">
			:host {
				display: inline-flex;
				flex-direction: column;

				@apply --d2l-time-picker;
			}

			.d2l-dropdown-opener {
				max-width: 6rem;
			}

			d2l-dropdown-content {
				--d2l-dropdown-verticaloffset: 10px;
			}

			.timezone {
				@apply --d2l-body-compact-text;
				color: var(--d2l-color-tungsten);
				font-style: italic;
				padding-top: 10px;
				max-width: 6rem;
				white-space: nowrap;
			}

			iron-selector {
				box-sizing: border-box;
				display: block;
				width: 100%;
			}
			.d2l-times-item {
				box-sizing: border-box;
				border-top: 1px solid transparent;
				border-bottom: 1px solid var(--d2l-color-gypsum);
				width: calc(100% - 2px);
				font-size: 0.8rem;
				padding: 0.75rem 1rem;
				cursor: pointer;
			}
			.d2l-times-item:last-of-type {
				border-bottom-color: transparent;
			}
			.d2l-times-item:not([disabled]):focus,
			.d2l-times-item:not([disabled]):hover,
			.d2l-times-item:not([disabled])[selected] {
				background-color: var(--d2l-color-celestine-plus-2);
				border-top-color: var(--d2l-color-celestine-plus-1);
				border-bottom-color: var(--d2l-color-celestine-plus-1);
				color: var(--d2l-color-celestine);
			}
		</style>

		<d2l-dropdown no-auto-open="">
			<div class="d2l-dropdown-opener" id="opener">
				<input
					id="{{id}}-combobox"
					type="text"
					class="d2l-input"
					role="combobox"
					aria-autocomplete="list"
					aria-label$="{{label}}"
					aria-owns$="{{listboxId}}"
					aria-activedescendant$="{{selectedListboxId}}"
					aria-invalid$="[[_computedAriaInvalid(invalid)]]"
					on-focus="_onTimeInputFocused"
					value="{{value::input}}">
			</div>

			<d2l-dropdown-content
				id="dropdown"
				min-width="[[_dropdownWidth]]"
				max-width="[[_dropdownWidth]]"
				boundary="[[boundary]]"
				align="start"
				no-auto-close=""
				no-pointer=""
				no-auto-focus=""
				no-padding=""
				on-tap="_handleTimesListClick">

					<div class="dropdown-content">
						<iron-selector id="{{listboxId}}" role="listbox" selected-attribute="selected">
							<template is="dom-repeat" items="{{times}}">
								<div id="{{listboxId}}-{{index}}" class="d2l-times-item" role="option">{{item}}</div>
							</template>
						</iron-selector>
					</div>
				</d2l-dropdown-content>
		</d2l-dropdown>
		<span class="timezone">{{timezone}}</span>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
var instances = 0;
Polymer({

	is: 'd2l-time-picker',

	behaviors: [
		IronA11yKeysBehavior
	],

	properties: {
		timeInterval: {
			type: Number,
			value: 30
		},
		hours: {
			type: Number,
			notify: true,
			value: 23
		},
		minutes: {
			type: Number,
			notify: true,
			value: 59
		},
		value: {
			type: String,
			notify: true,
			observer: '_valueChanged'
		},
		timezone: String,
		times: {
			type: Object,
			readOnly: true,
			value: []
		},
		boundary: Object,
		_dropdownWidth: String,
		listboxId: String,
		selectedListboxId: String,
		label: String,
		invalid: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		}
	},

	observers: [
		'updateValue(hours, minutes)',
		'updateSelection(hours, minutes)',
		'_updateTimes(timeInterval)'
	],

	listeners: {
		'iron-select': '_scrollSelectedItemIntoView'
	},

	keyBindings: {
		'esc': '_onTimeInputKeyPressed',
		'enter': '_onTimeInputKeyPressed',
		'up': '_onTimeInputKeyPressed',
		'down': '_onTimeInputKeyPressed',
		'home': '_onTimeInputKeyPressed',
		'end': '_onTimeInputKeyPressed'
	},

	clear: function() {
		this.updateValue(23, 59);
	},

	// time display logic start

	_valueChanged: function(value) {
		this._closeTimesList(false);
		var date = parseTime(value);
		if (date) {
			this._dontUpdateValue = true;
			this.hours = date.getHours();
			this.minutes = date.getMinutes();
			this.fire('d2l-time-picker-time-changed', {
				hours: this.hours,
				minutes: this.minutes,
				value: this.value
			});
			this._dontUpdateValue = false;
		}
	},

	// Update the value given the specified hours and minutes
	updateValue: function(hours, minutes) {
		hours = +hours;
		minutes = +minutes;
		if (this._dontUpdateValue) {
			return;
		}
		if (hours >= 0 && minutes >= 0) {
			var dateDisplay = new Date(0, 0, 0, hours || 0, minutes || 0, 0, 0);
			this.value = formatTime(dateDisplay);
		}
	},

	attached: function() {
		document.body.addEventListener('focus', this.__onAutoCloseFocus, true);
		document.body.addEventListener('click', this.__onAutoCloseClick, true);
		getDocumentLocaleSettings().addChangeListener(this.__onLanguageChange);
	},

	detached: function() {
		document.body.removeEventListener('focus', this.__onAutoCloseFocus, true);
		document.body.removeEventListener('click', this.__onAutoCloseClick, true);
		getDocumentLocaleSettings().removeChangeListener(this.__onLanguageChange);
	},

	// selection logic start

	ready: function() {
		this.__onAutoCloseFocus = this.__onAutoCloseFocus.bind(this);
		this.__onAutoCloseClick = this.__onAutoCloseClick.bind(this);
		this.__onLanguageChange = this.__onLanguageChange.bind(this);
		this.id = this.id || ('d2l-time-picker-' + instances++);
	},

	focus: function() {
		this.$$('input').focus();
	},

	// Select the item closest the the hours and minutes given
	updateSelection: function(hours, minutes) {
		var index = Math.round((hours * 60 + minutes) / this.timeInterval);
		if (index >= (this.times && this.times.length)) {
			index = 0;
		}
		this.$$('iron-selector').selectIndex(index);
	},

	_updateTimes: function(timeInterval) {
		var date = new Date(0, 0, 0, 0, 0, 0, 0);
		var length = Math.ceil(24 * 60 / timeInterval);
		var times = new Array(length);
		for (var i = 0; i < length; i++) {
			date.setHours(Math.floor(i / (60 / timeInterval)));
			date.setMinutes((i % (60 / timeInterval)) * timeInterval);
			times[i] = formatTime(date);
		}
		this._setTimes(times);
	},

	_openTimesList: function() {
		if (this.$.dropdown.opened) {
			return false;
		}
		this.updateValue(this.hours, this.minutes);
		this.$.dropdown.open();
		// listboxId is not set until the dropdown is open because the listbox
		// isn't actually added to the DOM until dropdown is opened for the first time
		this.listboxId = this.id + '-listbox';
		this.updateSelection(this.hours, this.minutes);
		this._scrollSelectedItemIntoView();
		return true;
	},

	_closeTimesList: function(updateValue) {
		this.$.dropdown.close();
		if (updateValue) {
			var listBox = this.$$('iron-selector');
			if (listBox.selectedItem) {
				this.value = listBox.selectedItem.textContent.trim();
			}
		}
	},

	_scrollSelectedItemIntoView: function() {
		// Wait for dropdown menu height to be calculated
		this.async(function() {
			var dropdownContent = this.$$('d2l-dropdown-content');
			var listBox = this.$$('iron-selector');
			if (dropdownContent && listBox.selectedItem) {
				this.selectedListboxId = this.listboxId + '-' + listBox.selected;
				var height = dropdownContent.height();
				var offsetTop = listBox.selectedItem.offsetTop;
				dropdownContent.scrollTo(offsetTop - height / 2);
			}
		}.bind(this));
	},

	_onBlur: function() {
		this.updateValue(this.hours, this.minutes);
		return this._closeTimesList(false);
	},

	__onAutoCloseFocus: function(e) {
		if (dom(e).rootTarget !== this.$$('input')) {
			this._onBlur();
		}
	},

	__onAutoCloseClick: function() {
		this.async(function() {
			if (dom(this.root).activeElement !== this.$$('input')) {
				this._onBlur();
			}
		}.bind(this), 1);
	},

	__onLanguageChange: function() {
		this._updateTimes(this.timeInterval);
	},

	_onTimeInputFocused: function() {
		this._dropdownWidth = this.$$('input').offsetWidth + 20;
		this._openTimesList();
	},

	_handleTimesListClick: function(e) {
		this.$$('input').focus();
		this._closeTimesList(true);
		e.preventDefault();
	},

	_onTimeInputKeyPressed: function(e) {
		var listBox = this.$$('iron-selector');
		switch (e.detail.key) {
			case 'esc':
				this._closeTimesList(false);
				break;
			case 'enter':
				if (this.$.dropdown.opened) {
					this._closeTimesList(true);
				} else {
					this.updateValue(this.hours, this.minutes);
				}
				break;
			case 'down':
				if (!this._openTimesList()) {
					listBox.selectNext();
				}
				break;
			case 'up':
				if (!this._openTimesList()) {
					listBox.selectPrevious();
				}
				break;
			case 'home':
				if (this.$.dropdown.opened) {
					listBox.selectIndex(0);
				}
				break;
			case 'end':
				if (this.$.dropdown.opened) {
					listBox.selectIndex(listBox.items.length - 1);
				}
				break;
			default:
				return;
		}
		e.preventDefault();
	},

	_computedAriaInvalid: function(invalid) {
		return invalid ? 'true' : 'false';
	}
});
