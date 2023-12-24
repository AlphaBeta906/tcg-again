import { EffectCategoryType } from "@/types/enums";

export type Effect = {
	categories: EffectCategoryType[],
	content: JSX.Element
}