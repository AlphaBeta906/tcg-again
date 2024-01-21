export const manaType = ["colorless", "positivist", "idealist", "pragmatist", "fidelist"] as const;
export type ManaType = typeof manaType[number];

export const effectCategoryType = ["Activated", "Discard After", "Draw", "Restriction", "After Turn", "Conditional", "Special Attack", "Use Every 3 Turns", "Once Every Game"] as const;
export type EffectCategoryType = typeof effectCategoryType[number]