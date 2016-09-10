export function eventExistsInDifferentNameSpace(event) {
	console.error(
		'Events can only belong to one bundle.',
		`\nThe following event already belongs to the bundle "${event.name}"`,
		'\n\nElement: ', event.element,
		'\nEvent Type: ', event.type,
		'\nListener Name: ', event.callback.name
	);
}

export default {
	eventExistsInDifferentNameSpace
};
