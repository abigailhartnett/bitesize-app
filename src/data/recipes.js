export const recipes = [
	{
		id: "1",
		name: "Spaghetti Bolognese",
		readiness: "45%",
		cookTime: "45 mins",
		favorite: true,
		link: "/recipes/1",
		lastCooked: "2021-09-01",
		servings: "4",
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
		readiness: "60%",
		link: "/recipes/2",
		steps: [
			{
				id: "1",
				ingredients: [
					{ name: "Ginger, grated", quantity: "4 tsp" },
					{ name: "Basil leaves", quantity: "1/2 cup" },
					{ name: "Red bell pepper", quantity: "2 medium" },
					{ name: "Garlic, fresh", quantity: "2 tsp" },
					{ name: "Onion", quantity: "2 medium" },
				],
				instruction: `Chop butternut squash. Store in fridge up to 7 days. Chop red bell pepper, garlic, and onion. Combine. Chop basil leaves.`,
			},
			{
				id: "2",
				ingredients: [
					{ name: "Ginger, grated", quantity: "4 tsp" },
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
					{ name: "Lime zest", quantity: "2 lime" },
					{ name: "Lime juice", quantity: "2 lime" },
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
					{ name: "Basil leaves", quantity: "1/2 cup" },
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
		readiness: "30%",
		link: "/recipes/3",
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
	// {
	// 	id: "4",
	// 	name: "Chocolate Chip Cookies",
	// 	readiness: "75%",
	// 	link: "/recipes/4",
	// 	steps: [],
	// },
	// {
	// 	id: "5",
	// 	name: "Mushroom Risotto",
	// 	readiness: "50%",
	// 	link: "/recipes/5",
	// 	steps: [],
	// },
];
