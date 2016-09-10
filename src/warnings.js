export function bundleNameAlreadyExists(bundleName) {
	console.warn(`An EventBundle with the name "${bundleName}" already exists. The original instance has been returned.`);
}

export default {
	bundleNameAlreadyExists
};
