window.EVENT_REGISTER = [];
window.NS_INSTANCES = [];

class EventHandler {
	constructor(namespace) {
		this.namespace = namespace;
		this.events = [];
	}

	add(element, type, callback, options) {
		let event = EVENT_REGISTER.find(event => (
			event.element == element &&
			event.type == type &&
			event.callback == callback
		));

		if (!event) {
			element.addEventListener(type, callback, options);
			EVENT_REGISTER.push({
				namespace: this.namespace,
				element,
				type,
				callback,
				options
			});
		}
		else if (event.namespace != this.namespace) {
			console.error(
				'Events can only belong to one namespace.',
				`\nThe following event already belongs to the namespace "${event.namespace}"`,
				'\n\nElement: ', element,
				'\nEvent Type: ', type,
				'\nListener Name: ', callback.name
			);
		}

		this.events = EVENT_REGISTER.filter(event => event.namespace == this.namespace);

		return this;
	}

	remove(element, type, callback, options) {
		if (!arguments.length) {
			return this.removeAll();
		}
		// if (arguments.length == 1 && isString(arguments[0])) {
		// 	console.log('Shiz, I found a string');
		// }
		// element.removeEventListener(type, callback, options);
		return this;
	}

	empty() {
		this.events.forEach(event => event.element.removeEventListener(event.type, event.callback, event.options));
		this.events = [];
		EVENT_REGISTER = EVENT_REGISTER.filter(event => (event.namespace !== this.namespace));
		return this;
	}
}

function EventBundle(namespace) {
	let workingInstance = NS_INSTANCES.find(i => (i.namespace == namespace));

	if (!workingInstance) {
		workingInstance = new EventHandler(namespace);
		NS_INSTANCES.push(workingInstance);
	}

	return workingInstance;
}

EventBundle.delete = function (namespace) {

};

export default EventBundle;
