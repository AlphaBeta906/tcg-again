"use client";

/* eslint-disable react/jsx-key */
import { useState, useEffect, useRef, Dispatch, SetStateAction, MouseEventHandler } from "react";
import { motion, useMotionValue } from "framer-motion";

import { shuffle } from "@/utils/dataEditing";
import { cards } from "@/data/cards";

type StateAndSetter<T> = {
	value: T
	setter: Dispatch<SetStateAction<T>>
}

type Props = {
	element: JSX.Element,
	index: number,
	animationFinishedState: StateAndSetter<boolean>,
	hoveringState : StateAndSetter<number>
}

function CardWrapper({ element, index, animationFinishedState, hoveringState }: Props) {
	const [rotationValue, setRotationValue] = useState(0);
	const {value: animationFinished, setter: setAnimationFinished} = animationFinishedState;
	const {value: hovering, setter: setHovering} = hoveringState;

	const rotateX = useMotionValue(0);
	const rotateY = useMotionValue(0);
	const y = useMotionValue(-1000);
	const hoveringReference = useRef(hovering);

	const animate: MouseEventHandler<HTMLDivElement> = (event) => {
		if (!animationFinished || !(index === cards.length - 1)) {
			return;
		}

		setHovering(index);

		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const center = {
			x: target.offsetWidth/2,
			y: target.offsetHeight/2
		};
		const intermediate = {
			x: (event.clientX - center.x) - rect.left,
			y: (event.clientY - center.y) - rect.top
		};
		const transform = {
			x: Number((intermediate.x * 0.1 * ((intermediate.y - center.x) <= 0 ? -1 : 1)).toFixed(2)),
			y: Number((intermediate.y * 0.1 * ((intermediate.x - center.y) <= 0 ? -1 : 1)).toFixed(2))
		};

		rotateX.set(transform.x);
		rotateY.set(transform.y);
	};

	const stopAnimating = () => {
		setHovering(-1);

		setTimeout(() => { 
			if (!hoveringReference.current) return;
			rotateX.set(0);
			rotateY.set(0);
		}, 100);
	};

	useEffect(() => {
		setRotationValue(-5 + (Math.random() * 10));
	}, []);

	useEffect(() => {
		setTimeout(() => {
			rotateX.set(0);
			y.set(index * -2);
			if (index === cards.length - 1) setAnimationFinished(true);
		}, (index+1) * 175);
	});

	return (
		<motion.div 
			key={`card-${index}`} 
			className={`absolute ${hovering === index ? "shadow-2xl" : "shadow-lg"} transition-all origin-center`}
			transition={{
				bounce: 1,
				duration: 0.05
			}}
			animate={{
				rotate: hovering === index ? 0 : rotationValue,
				scale: hovering === index ? 1.1 : 1,
				transformPerspective: 1000
			}}
			onMouseMove={animate}
			onMouseLeave={stopAnimating}
			style={{ rotateX, rotateY, y }}
		>
			{element}
		</motion.div>
	);
}

export default function Home() {
	const [cardState, setCardState] = useState<JSX.Element[]>([]);
	const [animationFinished, setAnimationFinished] = useState(false);
	const [hovering, setHovering] = useState(-1);

	useEffect(() => {
		setCardState(shuffle(cards));
	}, []);

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			{cardState.map((element, index) => {
				return (
					<CardWrapper
						key={index}
						element={element}
						index={index}
						animationFinishedState={{value: animationFinished, setter: setAnimationFinished}}
						hoveringState={{value: hovering, setter: setHovering}}
					/>
				);
			})}
		</div>
	);
}
