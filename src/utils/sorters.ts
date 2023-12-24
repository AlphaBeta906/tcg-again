export function findKeyWithMaxValue<T extends Record<string, number>>(dictionary: T): keyof T {
	const keys = Object.keys(dictionary) as Array<keyof T>;
  
	if (keys.length === 0) {
		throw new Error("Dictionary is empty");
	}
  
	return keys.reduce((maxKey: keyof T, key: keyof T) => {
		return dictionary[key]! > dictionary[maxKey]! ? key : maxKey;
	}, keys[0] as keyof T);
}

export function sortByKeys<T, U extends string | number>(
	dictionary: Record<U, T>,
	orderedKeys: U[]
): Record<U, T> {
	const sortedObject: Record<U, T> = {} as Record<U, T>;

	// Iterate over the ordered keys
	for (const key of orderedKeys) {
		// Check if the key exists in the original dictionary
		if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
			// Add the key-value pair to the new object
			sortedObject[key] = dictionary[key];
		}
	}

	return sortedObject;
}