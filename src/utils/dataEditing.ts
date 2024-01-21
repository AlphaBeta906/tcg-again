export function addZerosToIncompleteRecord<T extends readonly string[]>(
	enumType: T,
	input: Partial<Record<T[number], number>>
): Record<T[number], number> {
	const result: Record<T[number], number> = {} as Record<T[number], number>;
  
	// Iterate through all enum values
	for (const enumKey of enumType) {
		// Use type assertion to tell TypeScript that enumKey is a valid key
		result[enumKey as T[number]] = input[enumKey as T[number]] || 0;
	}
  
	return result;
}

export function removeZeros<T>(input: Record<string, T>): Record<string, T> {
	const result: Record<string, T> = {};
  
	for (const key in input) {
		if (input[key] !== 0) {
			result[key] = input[key];
		}
	}
  
	return result;
}

// @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle<T>(array: T[]) {
	let currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle.
	while (currentIndex > 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		
		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
  
	return array;
}