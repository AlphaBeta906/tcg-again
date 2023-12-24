import { EffectCategoryType, ManaType } from "@/types/enums";
import { findKeyWithMaxValue, sortByKeys } from "@/utils/sorters";
import { removeZeros } from "@/utils/dataEditing";
import { Effect } from "@/types/structs";

type Props = {
	name: string
	cost: Record<ManaType, number>,
	category: string,
	effects: Effect[],
	flavor: string,
	attack?: number,
	defense?: number,
	bgCover?: true
}

export default function Card({ name, cost, category, effects, flavor, attack, defense, bgCover }: Props) {
	// Mana Rendering
	const defaultManaOrder: ManaType[] = [
		"colorless",
		"positivist", 
		"idealist", 
		"pragmatist", 
		"fidelist"
	];
	const sortedCost = sortByKeys(cost, defaultManaOrder);

	const prioritizedManaOrder: ManaType[] = [
		"positivist", 
		"idealist", 
		"pragmatist", 
		"fidelist",
		"colorless"
	];

	const costVal = sortByKeys(cost, prioritizedManaOrder);
	const maxVal = findKeyWithMaxValue(costVal);
	const colorLookup: Record<ManaType, string> = {
		"colorless": "slate",
		"pragmatist": "rose",
		"positivist": "indigo",
		"fidelist": "amber",
		"idealist": "teal",
	};
	const cardColor = colorLookup[maxVal];

	// Effect Rendering
	const categoryLookup: Record<EffectCategoryType, string> = {
		"Activated": "red-500",
		"Discard After": "red-700",
		"Draw": "emerald-600",
		"Restriction": "slate-600",
		"After Turn": "violet-500",
		"Conditional": "orange-500"
	};
	const effectList: JSX.Element[] = [];

	effects.map((element, index) => {
		const categoryList: JSX.Element[] = [];

		element.categories.map((element) => {
			categoryList.push(
				<div key={`effect-${index}-${name}`} className={`p-1 text-white bg-${categoryLookup[element]} px-2 rounded-md text-[0.47rem]`}>{element}</div>
			);
			return;
		});

		effectList.push(
			<div key={`effect-${index}-${name.toLowerCase()}`}>
				<div className="flex gap-1">{categoryList}</div>
				<div className="text-[0.55rem] my-1">{element.content}</div>
			</div>
		);
	});

	return (
		<div className={`w-[16.5rem] h-[28.5rem] p-2 rounded border-4 border-${cardColor}-400 bg-${cardColor}-100 flex flex-col gap-2 box-border p-1`}>
			<div>
				<div className="text-xl font-extrabold -my-1">{name}</div>
				<div className="text-xs mb-1 flex justify-between italic">
					<div>{category}</div> 
					<div>{!(attack && defense) ? "Function" : `${defense} / ${attack}`}</div>
				</div>
				<div className="flex gap-1">
					{Object.keys(removeZeros(sortedCost)).map((element) => {
						const item = element as ManaType;
						const manaColor = colorLookup[item];

						return (
							<div key={element} className={`border-${manaColor}-600 bg-${manaColor}-200 border-2 rounded-md h-6 w-6 text-${manaColor}-600 flex justify-center items-center font-bold`}>
								<div>{sortedCost[item]}</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex flex-col h-full w-full gap-2">
				<div className={`h-[176px] w-full border-4 rounded border-${cardColor}-400 relative overflow-hidden box-border`}>
					<div className={`${bgCover ? "" : "bg-white"} justify-center flex items-center h-full w-full bg-cover bg-center p-2`} style={{ backgroundImage: (bgCover ? `url("./img/${name.toLowerCase().replace(/ /g, "-")}.png")` : undefined )}} >
						{bgCover ? <div /> : <img src={`./img/${name.toLowerCase().replace(/ /g, "-")}.png`} className="object-contain w-full h-full" /> }
					</div>
				</div>
				<div className={`h-[176px] w-full border-4 rounded border-${cardColor}-400 bg-white p-2`}>
					<div className="h-full flex flex-col gap-2">
						<div className="h-3/4 overflow-auto">
							{effectList}
						</div>
						<div className="h-1/4 pt-2 border-t border-t-black">
							<div className="text-[0.45rem] text-slate-700 italic">{flavor}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}