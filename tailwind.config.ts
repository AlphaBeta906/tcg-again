import type { Config } from "tailwindcss";
import tailwindColors from "tailwindcss/colors";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import chalk from "chalk";

const colorSafeList: string[] = [];

// Skip these to avoid a load of deprecated warnings when tailwind starts up
const deprecated = ["lightBlue", "warmGray", "trueGray", "coolGray", "blueGray"];

Object.keys(tailwindColors).forEach((colorName) => {
	if (deprecated.includes(colorName)) {
		return;
	}

	const colorNameKey = colorName as keyof DefaultColors;
  
	const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  
	const palette = tailwindColors[colorNameKey] as unknown;
  
	if (palette && typeof palette === "object") {
		shades.forEach((shade) => {
			if (shade.toString() in palette) {
				colorSafeList.push(`text-${colorName}-${shade}`);
				colorSafeList.push(`border-${colorName}-${shade}`);
				colorSafeList.push(`bg-${colorName}-${shade}`);
			}
		});
	}
});

console.log(` ${chalk.bold.green("✓")} Finished loading colors (Tailwind)`);

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: colorSafeList,
	plugins: [],
};
export default config;
