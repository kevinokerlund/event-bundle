export function eventExistsInDifferentNameSpace(event) {
	console.error(
		'Events can only belong to one bundle.',
		`\nThe following event already belongs to the bundle "${event.name}"`,
		'\n\nElement: ', event.element,
		'\nEvent Type: ', event.type,
		'\nListener Name: ', event.callback.name
	);
}

export function cannotRemoveEventFromAnotherBundle(event) {
	console.error(
		'You cannot remove an event from an element that exists in a different bundle.',
		`\nThe following event already belongs to the bundle "${event.name}"`,
		'\n\nElement: ', event.element,
		'\nEvent Type: ', event.type,
		'\nListener Name: ', event.callback.name
	);
}

export default {
	eventExistsInDifferentNameSpace,
	cannotRemoveEventFromAnotherBundle
};
