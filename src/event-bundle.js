import errors from './errors.js';
import warnings from './warnings.js';

let EVENT_REGISTER = [];
let BUNDLE_INSTANCES = [];

function findBundleByName(bundleName) {
	return BUNDLE_INSTANCES.find(bundle => bundle.name == bundleName);
}

function findEvent(element, type, callback) {
	return EVENT_REGISTER.find(event => (
		event.element == element &&
		event.type == type &&
		event.callback == callback
	));
}

class EventBundle {
	constructor(bundleName) {
		this.name = bundleName;
		this.events = [];

		let instanceWithSameName = findBundleByName(this.name);

		if (instanceWithSameName) {
			warnings.bundleNameAlreadyExists(this.name);
			return instanceWithSameName;
		}
		else {
			BUNDLE_INSTANCES.push(this);
		}
	}

	add(element, type, callback, options) {
		let event = findEvent(element, type, callback);

		if (!event) {
			element.addEventListener(type, callback, options);
			EVENT_REGISTER.push({
				name: this.name,
				element,
				type,
				callback,
				options
			});

			this.events = EVENT_REGISTER.filter(event => event.name == this.name);
		}
		else if (event.name != this.name) {
			errors.eventExistsInDifferentNameSpace(event);
		}

		return this;
	}

	remove(element, type, callback, options) {
		let event = findEvent(element, type, callback);

		if (event) {
			event.element.removeEventListener(event.type, event.callback, event.options);
			this.events.splice(this.events.indexOf(event), 1);
			EVENT_REGISTER.splice(EVENT_REGISTER.indexOf(event), 1);
		}

		return this;
	}

	empty() {
		[...this.events].forEach(event => this.remove(event.element, event.type, event.callback, event.options));
		return this;
	}

	static empty(bundleName) {
		findBundleByName(bundleName).empty();
	}

	static get(bundleName) {
		return findBundleByName(bundleName);
	}

	static get bundleNames() {
		return [...BUNDLE_INSTANCES].map(bundle => bundle.name);
	}
}

export default EventBundle;
