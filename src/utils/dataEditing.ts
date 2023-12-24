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