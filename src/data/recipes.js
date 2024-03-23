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
		name: "Chicken Curry",
		readiness: "60%",
		link: "/recipes/2",
		steps: [
			{
				id: "1",
				ingredients: [
					{ name: "chicken", quantity: "200g" },
					{ name: "paste", quantity: "1L" },
					{ name: "curry", quantity: "1 tsp" },
				],
				instruction: "Cook chicken with paste and curry",
			},
			{
				id: "2",
				ingredients: [
					{ name: "More food", quantity: "1 tsp" },
					{ name: "Yummy", quantity: "500g" },
				],
				instruction: "Eat it all",
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
