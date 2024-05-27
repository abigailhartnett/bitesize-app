import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import PopOver from "../components/PopOver";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";

const CreateRecipePage = ({
	searchQuery,
	setSearchQuery,
	pantryItems,
	toggleShoppingList,
	filter,
}) => {
	const [formError, setFormError] = useState(null);
	const [titleError, setTitleError] = useState(null);
	const [slugError, setSlugError] = useState(null);
	// const [ingredientError, setIngredientError] = useState(null);
	const [title, setTitle] = useState("");
	const [servings, setServings] = useState(4);
	const [slug, setSlug] = useState("");
	const [ingredients, setIngredients] = useState([]);
	const [instructions, setInstructions] = useState("");
	const [popoverIsOpen, setPopoverIsOpen] = useState(false);

	const location = useLocation();
	const currentPage = location.pathname;

	const findItemById = (id) => {
		const item = pantryItems.find((item) => item.id === id);
		if (!item) {
			console.log(`Item with id ${id} not found`);
			return;
		}
		return item;
	};

	const filteredPantryItems = pantryItems.filter(
		(item) =>
			(toggleShoppingList ? item.onList : true) &&
			filter.includes(item.status) &&
			item.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleSlugChange = (e) => {
		setSlug(e.target.value);
	};

	const handleServingsChange = (e) => {
		setServings(e.target.value);
	};

	const handleInstructionsChange = (e) => {
		setInstructions(e.target.value);
	};

	const handleAmountChange = (e, index) => {
		const newIngredients = [...ingredients];
		newIngredients[index].amount = e.target.value;
		setIngredients(newIngredients);
	};

	const handleUnitChange = (e, index) => {
		const newIngredients = [...ingredients];
		newIngredients[index].unit = e.target.value;
		setIngredients(newIngredients);
	};

	const openPopover = () => {
		setPopoverIsOpen(true);
	};

	const addToRecipe = (id) => {
		const item = findItemById(id);
		const ingredientArray = [...ingredients, { ...item, amount: 0, unit: "g" }];
		setIngredients(ingredientArray);
	};

	const ingredientList = ingredients.map((ingredient, index) => {
		return (
			<div className="flex gap-4" key={ingredient.name}>
				{ingredient.name}
				<label for="amount" className="hidden">
					Amount
				</label>
				<input
					id={`amount-${index}`}
					type="number"
					step="0.25"
					className="w-20"
					value={ingredient.amount}
					onChange={(e) => handleAmountChange(e, index)}
				></input>
				<label for="unit" className="hidden">
					Unit
				</label>
				<select
					id={`unit-${index}`}
					value={ingredient.unit}
					onChange={(e) => handleUnitChange(e, index)}
				>
					<option>g</option>
					<option>cup</option>
					<option>tsp</option>
					<option>tbsp</option>
					<option>oz</option>
					<option>whole</option>
					<option>package</option>
					<option>can</option>
				</select>
			</div>
		);
	});

	const submitRecipe = async (e) => {
		e.preventDefault();

		// Create recipe
		if (!title || !instructions || !slug || !servings) {
			setFormError("Please fill out all fields");
			return;
		}

		const { error: recipeError } = await supabase
			.from("recipes")
			.insert([{ title, instructions, slug, servings }]);

		if (recipeError) {
			console.error("Error creating recipe", recipeError);
			if (recipeError.message.includes("title")) {
				setTitleError("Please enter a unique title");
				return;
			}

			if (recipeError.message.includes("slug")) {
				setSlugError("Please enter a unique slug");
				return;
			}
		}

		// Create ingredients
		// Note: add error if the values in here are invalid
		const recipeIngredients = ingredients.map((ingredient) => ({
			recipe_slug: slug,
			recipe_name: title,
			pantry_item_name: ingredient.name,
			amount: ingredient.amount,
			unit: ingredient.unit,
		}));

		const { error } = await supabase
			.from("recipeIngredients")
			.insert(recipeIngredients);

		if (error) {
			console.error("Error creating recipe ingredients", error);
			return;
		}

		setTitle("");
		setSlug("");
		setServings(4);
		setInstructions("");
		setIngredients([]);
		setFormError(null);
		setTitleError(null);
		setSlugError(null);

		console.log(recipeIngredients);
	};

	return (
		<>
			<div>
				<div class="pb-2 mr-3">
					<Nav pageTitle="Create a recipe" link="/recipes" />
				</div>
				<div class="border-solid border-black border-2 border-t-0 border-x-0 bg-white pb-2"></div>
				<div className="flex justify-between">
					<div className="flex gap-2 align-items mt-4">
						<label for="title">Recipe Title:</label>
						<input
							type="text"
							name="title"
							value={title}
							onChange={handleTitleChange}
						/>
					</div>
					{titleError && <div>{titleError}</div>}
					<button
						type="submit"
						value="Submit"
						className="bg-pepper text-salt p-2 mt-4"
						onClick={submitRecipe}
					>
						Create recipe
					</button>
				</div>
				<div className="flex gap-2 align-items mt-4">
					<label for="slug">Recipe slug:</label>
					<input
						type="text"
						name="slug"
						value={slug}
						onChange={handleSlugChange}
					/>
				</div>
				{slugError && <div>{slugError}</div>}
				<div className="flex gap-2 align-items mt-4">
					<label for="servings">Servings</label>
					<input
						type="number"
						name="servings"
						value={servings}
						onChange={handleServingsChange}
					/>
				</div>
			</div>
			<div className="my-4">
				<label>Ingredients:</label>
				<ul>
					<div>{ingredientList}</div>
				</ul>
				<button className="bg-pepper text-white p-2" onClick={openPopover}>
					Add ingredients
				</button>
				{popoverIsOpen && (
					<PopOver
						setPopoverIsOpen={setPopoverIsOpen}
						toggleShoppingList={toggleShoppingList}
						filteredPantryItems={filteredPantryItems}
						currentPage={currentPage}
						addToRecipe={addToRecipe}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						pantryItems={pantryItems}
					></PopOver>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<label for="instructions">Instructions:</label>
				<textarea
					id="instructions"
					className="border-2 border-solid border-pepper h-72"
					placeholder="Write recipe instructions here..."
					value={instructions}
					onChange={handleInstructionsChange}
				></textarea>
			</div>
			{formError}
		</>
	);
};

export default CreateRecipePage;
