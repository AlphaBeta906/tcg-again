import { cards } from "@/data/cards";

export default function Home() {
	return (
		<div className="p-3 grid lg:grid-cols-5 lg:gap-4 sm:grid-cols-3 sm:gap-10">
			{cards}
		</div>
	);
}
