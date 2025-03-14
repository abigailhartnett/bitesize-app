import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { usePantry } from "../contexts/PantryContext";
import {
	PopOver,
	Button,
	TextButton,
	IconButton,
	SearchBar,
	PantryItemList,
	Form,
	TextInput,
	Number,
	LongTextInput,
} from "bitesize-app/components";

import { useSearch, useFindItem, usePopover } from "bitesize-app/hooks";

import { CreatePantryItem } from "bitesize-app/forms";

const EditRecipe = ({ recipe, recipeIngredientsList }) => {
	const { pantryItems } = usePantry();
	const [successMessage, setSuccessMessage] = useState("");
	const [formError, setFormError] = useState(null);
	const [titleError, setTitleError] = useState(null);
	const [slugError, setSlugError] = useState(null);
	const [title, setTitle] = useState(recipe?.title || "");
	const [servings, setServings] = useState(4);
	const [slug, setSlug] = useState(recipe?.slug || "");
	const [ingredients, setIngredients] = useState(recipeIngredientsList || []);
	const [instructions, setInstructions] = useState(recipe?.instructions || "");
	const [notes, setNotes] = useState(recipe?.notes || "");
	const [warningIsOpen, setWarningIsOpen] = useState(false);

	const location = useLocation();
	const currentPage = location.pathname;
	const [filteredItems, setSearchQuery] = useSearch(pantryItems, "name");

	const navigate = useNavigate();
	const { findItemById, setCurrentItem } = useFindItem(pantryItems); //setCurrentItem isn't required for this page, but is required for the usePopover hook
	const { popoverIsOpen, setPopoverIsOpen, openPopover, closePopover } =
		usePopover(setCurrentItem);

	const filteredPantryItems = pantryItems.filter(
		(item) => item && filteredItems?.includes(item)
	);

	const detectIngredientChanges = () => {
		const addedIngredients = ingredients.filter(
			(ingredient) =>
				!recipeIngredientsList?.some((orig) => orig.id === ingredient.id)
		);

		const added = addedIngredients.map((ingredient) => {
			return {
				recipe_slug: slug,
				recipe_name: title,
				name: ingredient.name,
				amount: ingredient.amount,
				unit: ingredient.unit,
			};
		});

		const removed = recipeIngredientsList?.filter(
			(orig) => !ingredients.some((ingredient) => ingredient.id === orig.id)
		);
		const updated = ingredients.filter((ingredient) => {
			const original = recipeIngredientsList?.find(
				(orig) => orig.id === ingredient.id
			);
			return (
				original?.amount !== ingredient?.amount ||
				original?.unit !== ingredient?.unit
			);
		});

		return { added, removed, updated };
	};

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

	const handleNotesChange = (e) => {
		setNotes(e.target.value);
	};

	const handleAmountChange = (e, index) => {
		const newIngredients = ingredients.map((ingredient, i) => {
			if (i === index) {
				return { ...ingredient, amount: e.target.value };
			}
			return ingredient;
		});
		setIngredients(newIngredients);
	};

	const handleUnitChange = (e, index) => {
		// const newIngredients = [...ingredients];
		// newIngredients[index].unit = e.target.value;
		const newIngredients = ingredients.map((ingredient, i) => {
			if (i === index) {
				return { ...ingredient, unit: e.target.value };
			}
			return ingredient;
		});
		setIngredients(newIngredients);
	};

	const addToRecipe = (id) => {
		const item = findItemById(id);
		const ingredientArray = [
			...ingredients,
			{
				...item,
				amount: 0,
				unit: "g",
				recipe_slug: recipe.slug,
				recipe_name: recipe.title,
			},
		];
		setIngredients(ingredientArray);
	};

	const removeFromRecipe = (id) => {
		const newIngredients = ingredients.filter(
			(ingredient) => ingredient.id !== id
		);
		setIngredients(newIngredients);
	};

	const deleteRecipe = async (id) => {
		const { error } = await supabase
			.from("recipes")
			.delete()
			.match({ id: recipe.id });

		if (error) {
			console.error("Error deleting recipe", error);
			return;
		}

		setWarningIsOpen(false);
		setPopoverIsOpen(false);
		navigate("/recipes");
	};

	const ingredientList = ingredients?.map((ingredient, index) => {
		return (
			<div
				className="grid grid-cols-[auto_1fr_auto_auto] gap-4"
				key={ingredient.name}
			>
				<IconButton
					icon="fa-trash"
					faStyle="fa-solid"
					size="sm"
					className="text-tomato"
					onClick={() => removeFromRecipe(ingredient.id)}
				/>
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

		const { added, removed, updated } = detectIngredientChanges();

		// Update recipe
		if (!title || !instructions || !slug || !servings) {
			setFormError("Please fill out all fields");
			return;
		}

		const { error: recipeError } = await supabase
			.from("recipes")
			.update([{ title, instructions, slug, servings, notes }])
			.eq("id", recipe.id);

		if (recipeError) {
			console.error("Error creating recipe", recipeError);
			// if (recipeError.message.includes("title")) {
			// 	setTitleError("Please enter a unique title");
			// 	return;
			// }

			// if (recipeError.message.includes("slug")) {
			// 	setSlugError("Please enter a unique slug");
			// 	return;
			// }
		} else {
			setSuccessMessage(`🙌🏻 Updated ${title}`);
		}

		for (const ingredient of added) {
			await supabase.from("recipeIngredients").insert([ingredient]);
		}

		for (const ingredient of removed) {
			await supabase
				.from("recipeIngredients")
				.delete()
				.match({ id: ingredient.id });
		}
		for (const ingredient of updated) {
			await supabase
				.from("recipeIngredients")
				.update(ingredient)
				.match({ id: ingredient.id });
		}

		// if (error) {
		// 	console.error("Error creating recipe ingredients", error);
		// 	return;
		// }

		setFormError(null);
		setTitleError(null);
		setSlugError(null);
		navigate(`/recipes/${slug}`);
	};

	return (
		<>
			{warningIsOpen && (
				<PopOver setPopoverIsOpen={setWarningIsOpen}>
					<div className="text-center flex flex-col gap-2">
						<div>Are you sure you want to delete this recipe?</div>
						<Button
							onClick={() => deleteRecipe(recipe.id)}
							className="bg-tomato"
						>
							Yes
						</Button>
						<Button onClick={() => setWarningIsOpen(false)}>No</Button>
					</div>
				</PopOver>
			)}
			<Form
				successMessage={successMessage}
				onSubmit={submitRecipe && closePopover}
				formError={formError}
				formTitle="Edit Recipe"
			>
				<TextInput
					label="Recipe Title"
					value={title}
					onChange={handleTitleChange}
					id="title"
				/>
				{titleError && <div>{titleError}</div>}

				<TextInput
					label="Recipe slug"
					value={slug}
					onChange={handleSlugChange}
					id="slug"
				/>
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
					<PopOver closePopover={closePopover}>
						{/* Note: make this into a component (shared with Create Recipe page, at least) */}
						<div className="h-3/4 overflow-y-scroll overflow-x-visible">
							{filteredPantryItems.length > 0 ? (
								<PantryItemList
									filteredPantryItems={filteredPantryItems}
									addToRecipe={addToRecipe}
									currentPage={currentPage}
									ingredient
									toggleButton
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
				<LongTextInput
					label="Notes"
					value={notes}
					onChange={handleNotesChange}
					placeholder="Write notes here..."
					id="notes"
				/>
				<Button type={"submit"} variant="primary">
					Submit
				</Button>
				<TextButton
					className="text-tomato mb-8"
					onClick={() => setWarningIsOpen(true)}
				>
					Delete recipe
				</TextButton>
			</Form>
		</>
	);
};

export default EditRecipe;
