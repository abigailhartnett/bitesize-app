export const recipes = [
	{
		id: "1",
		name: "Spaghetti Bolognese",
		cookTime: "45 mins",
		favorite: true,
		link: "/recipes/1",
		lastCooked: "2021-09-01",
		servings: "4",
		planned: true,
		steps: [
			{
				id: "1",
				ingredients: [
					{ name: "spaghetti", quantity: "200g" },
					{ name: "water", quantity: "1L" },
					{ name: "salt", quantity: "1 tsp" },
				],
				instruction: "Boil water in a pot",
			},
			{
				id: "2",
				ingredients: [
					{ name: "olive oil", quantity: "1 tsp" },
					{ name: "ground beef", quantity: "500g" },
					{ name: "onion", quantity: "1" },
					{ name: "garlic", quantity: "2 cloves" },
				],
				instruction: "Cook ground beef in oil with onion and garlic",
			},
			{
				id: "3",
				ingredients: [{ name: "tomato sauce", quantity: "500g" }],
				instruction: "Combine all with tomato sauce. Serve. Yummy.",
			},
		],
	},
	{
		id: "2",
		name: "Middle East Fall Thai Surprise",
		cookTime: "45 mins",
		favorite: true,
		link: "/recipes/2",
		lastCooked: "2021-09-01",
		servings: "4",
		planned: true,
		steps: [
			{
				id: "1",
				ingredients: [
					{ name: "Ginger, fresh", quantity: "4 tsp" },
					{ name: "Basil, fresh", quantity: "1/2 cup" },
					{ name: "Red bell pepper", quantity: "2 medium" },
					{ name: "Garlic", quantity: "2 tsp" },
					{ name: "Onion", quantity: "2 medium" },
				],
				instruction: `Chop butternut squash. Store in fridge up to 7 days. Chop red bell pepper, garlic, and onion. Combine. Chop basil leaves.`,
			},
			{
				id: "2",
				ingredients: [
					{ name: "Ginger, fresh", quantity: "4 tsp" },
					{ name: "Red bell pepper", quantity: "2 medium" },
					{ name: "Garlic, fresh", quantity: "2 tbsp" },
					{ name: "Onion", quantity: "2 medium" },
					{ name: "Coconut oil", quantity: "2 tbsp" },
				],
				instruction:
					"Heat oil in large skillet over medium-high until oil sizzles. Saute vegetables until tender.",
				time: "3-4 minutes",
			},
			{
				id: "3",
				ingredients: [
					{ name: "Red curry paste", quantity: "4 tbsp" },
					{ name: "Butternut squash", quantity: "1 medium" },
				],
				instruction:
					"Add butternut squash and currey paste. Stir well until evenly combined.",
				time: "2 minutes",
			},
			{
				id: "4",
				ingredients: [
					{ name: "Lime", quantity: "2 lime" },
					{ name: "Fish sauce", quantity: "2 tbsp" },
					{ name: "Coconut milk", quantity: "26 oz" },
				],
				instruction:
					"Add liquids, stir well. Bring to a boil. Simmer until squash softens.",
				time: "10-12 minutes",
			},
			{
				id: "5",
				ingredients: [
					{ name: "Basil, fresh", quantity: "1/2 cup" },
					{ name: "Chickpeas", quantity: "28 oz can" },
				],
				instruction:
					"Add chickpeas. Mix well and cook 2-3 minutes. Add basil leaves. Cook 1 minute",
				time: "",
			},
			{
				id: "5",
				ingredients: [],
				instruction: "Serve with coconut milk or over rice.",
				time: "",
			},
		],
	},
	{
		id: "3",
		name: "Caesar Salad",
		link: "/recipes/3",
		planned: false,
		steps: [
			{
				id: "1",
				ingredients: [{ name: "Mushrooms", quantity: "200g" }],
				instruction: "Eat mushrooms",
			},
			{
				id: "2",
				ingredients: [
					{ name: "Life, the universe, and everything", quantity: "1 tsp" },
				],
				instruction: "Have an adventure",
			},
		],
	},
	{
		id: "cinnamon-roll-cookies",
		name: "Cinnamon Roll Cookies",
		cookTime: "30 mins",
		favorite: true,
		link: "/recipes/cinnamon-roll-cookies",
		lastCooked: "2021-09-01",
		servings: "12",
		planned: true,
		steps: [
			{
				id: "1",
				summary: "Prep filling",
				ingredients: [
					{ name: "Vanilla extract", quantity: "6g" },
					{ name: "Powdered sugar", quantity: "60g" },
					{ name: "Cream cheese", quantity: "8 oz" },
				],
				instruction: `Preheat oven to 350. Mix room temperature cream cheese, powdered sugar, and vanilla. Chill 12 20g (1 tbsp) balls in the freezer.`,
			},
			{
				id: "2",
				summary: "Fluff butter",
				ingredients: [
					{ name: "Sugar, granulated", quantity: "200g" },
					{ name: "Butter", quantity: "226g" },
				],
				instruction:
					"With room temp butter, beat until mixture turns off-white (1-2 minutes).",
				time: "1-2 minutes",
			},
			{
				id: "3",
				summary: "Add liquids",
				ingredients: [
					{ name: "Vanilla extract", quantity: "6g" },
					{ name: "Egg", quantity: "1 large" },
				],
				instruction: "Add egg and vanilla. Beat until fluffy.",
				time: "",
			},
			{
				id: "4",
				summary: "Add dry ingredients",
				ingredients: [
					{ name: "Baking powder", quantity: "2g" },
					{ name: "Baking soda", quantity: "4g" },
					{ name: "Flour, all purpose", quantity: "330g" },
				],
				instruction: "Fold in dry ingredients.",
				time: "",
			},
			{
				id: "5",
				summary: "Create cinnamon swirl",
				ingredients: [
					{ name: "Butter", quantity: "30g" },
					{ name: "Cinnamon", quantity: "4g" },
					{ name: "Brown sugar", quantity: "100g" },
				],
				instruction:
					"When butter is room temp, mix together. Chill slightly before swirling into cookies.",
				time: "",
			},
			{
				id: "6",
				summary: "Mold cookies",
				ingredients: [{ name: "Sugar, granulated", quantity: "" }],
				instruction:
					"Scoop 1/3 cup (66g) dough and slightly fold in 1 tsp (3g) brown sugar mixture. Flatten in palm and add chilled cream cheese to the center. Fold cookie around the cream cheese and roll in granulated sugar.",
				time: "",
			},
			{
				id: "7",
				summary: "Bake",
				ingredients: [],
				instruction:
					"Place on lined tray. Bake for 12-13 minutes. Let sit 10 minutes before removing.",
				time: "",
			},
		],
	},
	// {
	// 	id: "4",
	// 	name: "Chocolate Chip Cookies",
	// 	link: "/recipes/4",
	// 	steps: [],
	// },
	// {
	// 	id: "5",
	// 	name: "Mushroom Risotto",
	// 	link: "/recipes/5",
	// 	steps: [],
	// },
];
