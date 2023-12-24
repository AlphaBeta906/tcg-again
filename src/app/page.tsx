import Card from "@/components/card";
import { addZerosToIncompleteRecord } from "@/utils/dataEditing";
import { manaType } from "@/types/enums";

export default function Home() {
	return (
		<div className="p-3 grid grid-cols-5 gap-2">
			<Card name="Set" cost={addZerosToIncompleteRecord(manaType, {"colorless": 2, "idealist": 1})} category="Set Theory" effects={[
				{
					categories: ["Activated", "Discard After"],
					content: <>Choose two or more cards to <i>bind</i> together.</>
				}
			]} flavor="In the symphony of elements, harmony arises from the union of distinct notes. A set, a composition, a unity waiting to be woven into the tapestry of strategy." />
			<Card name="Power Set" cost={addZerosToIncompleteRecord(manaType, {"colorless": 3, "idealist": 3})} category="Set Theory" effects={[
				{
					categories: ["Draw"],
					content: <><i>Praeteramplify</i> a card by two until it gets discarded.</>
				}
			]} flavor="Within the boundless sphere of possibility, each subset weaves its unique narrative, and from the infinite combinations, emerges the strength of the all-encompassing whole." />
			<Card name="Russell's Paradox" cost={addZerosToIncompleteRecord(manaType, {"colorless": 6, "idealist": 5, "positivist": 7})} category="Set Theory" effects={[
				{
					categories: ["Activated", "Discard After"],
					content: <>A random card in play will be chosen. If it contains the ability to draw, summon, or transform into a card, it loses its abilities until the end of your turn. Otherwise, amplify the card with all your cards with the word &quot;paradox&quot; in its name.</>
				},
				{
					categories: ["Restriction"],
					content: <>The card can&apos;t target the same card more than once.</>
				}
			]} flavor="In the paradoxical dance of sets, inclusion may lead to exclusion, and the all-encompassing may crumble within its own definition." />
			<Card name="Francisco Espoz y Mina" cost={addZerosToIncompleteRecord(manaType, {"pragmatist": 5})} category="Peninsular War" attack={5} defense={4} bgCover={true} effects={[
				{
					categories: ["After Turn"],
					content: <>For every 5 cards in your hand, heal 1 defense.</>
				},
				{
					categories: ["Conditional"],
					content: <>If <i>Hit-and-Run Tactics</i> is applied to this card, increase attack by 2 and reduce defense by 1.</>
				}
			]} flavor="In the rugged terrain of resistance, Espoz y Mina's guerrilla tactics struck fear into the hearts of the invaders, a resilient leader in the fight for freedom." />
			<Card name="Hit-and-Run Tactics" cost={addZerosToIncompleteRecord(manaType, {"colorless": 1, "pragmatist": 2})} category="War Tactics" bgCover={true} effects={[
				{
					categories: ["Activated", "Discard After"],
					content: <>Choose a card in your hand to gain 2 attack and lose 1 defense, and also to target an opposing card without taking damage in return. In the next turn, sacrifice the card.</>
				},
			]} flavor="Strike quickly, fade into the shadows, and live to fight another day." />
			<Card name="Bait-and-Switch" cost={addZerosToIncompleteRecord(manaType, {"colorless": 6, "pragmatist": 6})} category="Deceptive Marketing" bgCover={true} effects={[
				{
					categories: ["Activated", "Discard After"],
					content: <>Choose a card in your hand to switch, and draw another card. If the card drawn is part of the same category as the card in your hand, you can play it in your turn without paying the mana cost. Otherwise, lose 2 health and lose that card.</>
				},
			]} flavor="Sometimes, the best move is to vanish momentarily." />
		</div>
	);
}
