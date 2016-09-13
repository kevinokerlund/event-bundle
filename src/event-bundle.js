import errors from './errors.js';
import warnings from './warnings.js';


/**
 * Store all of the events that are used
 * @type {Array}
 */
let EVENT_REGISTER = [];


/**
 * Store all of the EventBundle instances.
 * There are static methods that return EventBundle instances. This array allows searching for those instances
 * @type {Array}
 */
let BUNDLE_INSTANCES = [];


/**
 * Finds an EventBundle instance based on a bundle name
 * @param {string} bundleName
 * @returns {EventBundle|undefined}
 */
function findBundleByName(bundleName) {
	return BUNDLE_INSTANCES.find(bundle => bundle.name == bundleName);
}


/**
 * Finds an event object based on the element, eventType, and the callback
 * @param element
 * @param type
 * @param callback
 * @returns {Object|undefined}
 */
function findEvent(element, type, callback) {
	return EVENT_REGISTER.find(event => (
		event.element == element &&
		event.type == type &&
		event.callback == callback
	));
}


/**
 * EventBundle Class
 */
class EventBundle {

	/**
	 * Constructs a new EventBundle.
	 * However, if a new bundle is being created that has the same name as a current bundle, it will return
	 * that instance
	 * @param bundleName
	 * @returns {EventBundle|undefined}
	 */
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

	/**
	 * Adds a new event to an element and adds it to the current instance.
	 * If the event already exists on the element, and on a different namespace, an error is displayed.
	 * @param element
	 * @param type
	 * @param callback
	 * @param options
	 * @returns {EventBundle}
	 */
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

	/**
	 * Removes an event from an element if it exists in the bundle. Removes the event object from the bundle.
	 * @param element
	 * @param type
	 * @param callback
	 * @param options
	 * @returns {EventBundle}
	 */
	remove(element, type, callback, options) {
		let event = findEvent(element, type, callback);

		if (event) {
			event.element.removeEventListener(event.type, event.callback, event.options);
			this.events.splice(this.events.indexOf(event), 1);
			EVENT_REGISTER.splice(EVENT_REGISTER.indexOf(event), 1);
		}

		return this;
	}

	/**
	 * Removes all of the events from the bundle and removes the event from the element.
	 * @returns {EventBundle}
	 */
	empty() {
		[...this.events].forEach(event => this.remove(event.element, event.type, event.callback, event.options));
		return this;
	}

	/**
	 * Finds a bundle with a specific name and empties it.
	 * @param {string} bundleName
	 */
	static empty(bundleName) {
		findBundleByName(bundleName).empty();
	}

	/**
	 * Returns an EventBundle instance that is found using the bundle name
	 * @param {string} bundleName
	 * @returns {EventBundle|undefined}
	 */
	static get(bundleName) {
		return findBundleByName(bundleName);
	}

	/**
	 * Returns an array of bundle names
	 * @returns {Array}
	 */
	static get bundleNames() {
		return [...BUNDLE_INSTANCES].map(bundle => bundle.name);
	}
}

export default EventBundle;
