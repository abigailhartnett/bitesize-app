import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../config/supabaseClient";

import {
	PopOver,
	Button,
	TopBar,
	IconButton,
	ListView,
	Container,
	PantryItemList,
	SearchBar,
	Menu,
	TextInput,
	Number,
	LongTextInput,
} from "bitesize-app/components";

import { CreatePantryItem } from "bitesize-app/forms";
import { useSearch, useFindItem } from "bitesize-app/hooks";

const CreateRecipePage = ({ pantryItems }) => {
	const [formError, setFormError] = useState(null);
	const [titleError, setTitleError] = useState(null);
	const [slugError, setSlugError] = useState(null);
	// const [ingredientError, setIngredientError] = useState(null);
	const [title, setTitle] = useState("");
	const [servings, setServings] = useState(4);
	const [ingredients, setIngredients] = useState([]);
	const [instructions, setInstructions] = useState("");
	const [popoverIsOpen, setPopoverIsOpen] = useState(false);

	const location = useLocation();
	const currentPage = location.pathname;
	const [filteredItems, setSearchQuery] = useSearch(pantryItems, "name");

	const navigate = useNavigate();
	const findItemById = useFindItem(pantryItems);

	const filteredPantryItems = pantryItems.filter(
		(item) => item && filteredItems?.includes(item)
	);

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
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
			<div
				className="grid grid-cols-[1fr_auto_auto] gap-4"
				key={ingredient.name}
			>
				<div className="font-semibold bg-transparent capitalize my-1">
					{ingredient.name}
				</div>
				<label htmlFor="amount" className="hidden">
					Amount
				</label>
				<input
					id={`amount-${index}`}
					type="number"
					step="0.25"
					className="font-semibold bg-transparent capitalize w-16"
					value={ingredient.amount}
					onChange={(e) => handleAmountChange(e, index)}
				></input>
				<label htmlFor="unit" className="hidden">
					Unit
				</label>
				<select
					id={`unit-${index}`}
					value={ingredient.unit}
					onChange={(e) => handleUnitChange(e, index)}
					className="font-semibold bg-transparent w-16"
				>
					<option>tsp</option>
					<option>tbsp</option>
					<option>cup</option>
					<option>g</option>
					<option>oz</option>
					<option>lb</option>
					<option>whole</option>
					<option>clove</option>
					<option>package</option>
					<option>can</option>
					<option>to taste</option>
				</select>
			</div>
		);
	});

	const submitRecipe = async (e) => {
		e.preventDefault();

		// Create recipe
		if (!title || !instructions || !servings) {
			setFormError("Please fill out all fields");
			return;
		}

		const slug = title.toLowerCase().replace(/\s/g, "-");

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
			name: ingredient.name,
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
		setServings(4);
		setInstructions("");
		setIngredients([]);
		setFormError(null);
		setTitleError(null);
		setSlugError(null);

		navigate(`/recipes/${slug}`);
	};

	return (
		<Container>
			<TopBar pageTitle="Create a recipe"></TopBar>
			<ListView>
				<div className="flex flex-col gap-4 w-full">
					<TextInput
						label="Recipe Title"
						value={title}
						onChange={handleTitleChange}
						id="title"
					/>
					{titleError && <div>{titleError}</div>}
					{slugError && <div>{slugError}</div>}

					<Number
						label="Servings"
						value={servings}
						onChange={handleServingsChange}
						name="servings"
					/>

					<label className="text-xs font-semibold">Ingredients</label>
					<ul className="mb-4">
						<div>{ingredientList}</div>
					</ul>
					<IconButton
						onClick={openPopover}
						icon="fa-add"
						faStyle="fa-solid"
						size="lg"
						className="bg-pepper/10 self-end"
					/>
					{popoverIsOpen && (
						<PopOver setPopoverIsOpen={setPopoverIsOpen}>
							<div className="h-3/4 overflow-y-auto overflow-x-visible">
								{filteredPantryItems.length > 0 ? (
									<PantryItemList
										filteredPantryItems={filteredPantryItems}
										addToRecipe={addToRecipe}
										currentPage={currentPage}
										recipeIngredient
									/>
								) : (
									<div className="text-center pt-4">
										<div>
											<CreatePantryItem pantryItems={pantryItems} />
										</div>
									</div>
								)}
							</div>
							<SearchBar
								id={"searchInput"}
								placeholder={"Search pantry..."}
								pantryItems={pantryItems}
								setSearchQuery={setSearchQuery}
							/>
						</PopOver>
					)}
					<LongTextInput
						label="Instructions"
						value={instructions}
						onChange={handleInstructionsChange}
						placeholder="Write recipe instructions here..."
						id="instructions"
					/>
					{formError}
					<Button
						type={"submit"}
						onClick={submitRecipe}
						variant="primary"
						className="mb-4"
					>
						Submit
					</Button>
				</div>
			</ListView>
			<Menu />
		</Container>
	);
};

export default CreateRecipePage;
