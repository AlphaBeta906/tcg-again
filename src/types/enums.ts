export const manaType = ["colorless", "positivist", "idealist", "pragmatist", "fidelist"] as const;
export type ManaType = typeof manaType[number];

export const effectCategoryType = ["Activated", "Discard After", "Draw", "Restriction", "After Turn", "Conditional"] as const;
export type EffectCategoryType = typeof effectCategoryType[number]