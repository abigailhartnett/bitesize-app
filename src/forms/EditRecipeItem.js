import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import PopOver from "../components/PopOver";
import { useLocation } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import TextButton from "../components/buttons/TextButton";
import Button from "../components/buttons/Button";
import IconButton from "../components/buttons/IconButton";
import PantryItemList from "../components/calculations/PantryItemList";
import SearchBar from "../components/SearchBar";
import CreatePantryItem from "../forms/CreatePantryItem";

// Form
import Form from "../components/Form";
import TextInput from "../components/inputs/TextInput";
import Number from "../components/inputs/Number";
import LongTextInput from "../components/inputs/LongTextInput";

const EditRecipe = ({
	pantryItems,
	recipe,
	recipeIngredientsList,
	// setPopoverIsOpen,
}) => {
	const [successMessage, setSuccessMessage] = useState("");
	const [formError, setFormError] = useState(null);
	const [titleError, setTitleError] = useState(null);
	const [slugError, setSlugError] = useState(null);
	// const [ingredientError, setIngredientError] = useState(null);
	const [title, setTitle] = useState(recipe?.title || "");
	const [servings, setServings] = useState(4);
	const [slug, setSlug] = useState(recipe?.slug || "");
	const [ingredients, setIngredients] = useState(recipeIngredientsList || []);
	const [instructions, setInstructions] = useState(recipe?.instructions || "");
	const [warningIsOpen, setWarningIsOpen] = useState(false);
	const [popoverIsOpen, setPopoverIsOpen] = useState(false);

	const location = useLocation();
	const currentPage = location.pathname;
	const [filteredItems, setSearchQuery] = useSearch(pantryItems, "name");

	console.log(popoverIsOpen);

	const navigate = useNavigate();

	const findItemById = (id) => {
		const item = pantryItems.find((item) => item.id === id);
		if (!item) {
			console.log(`Item with id ${id} not found`);
			return;
		}
		return item;
	};

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

	const openPopover = () => {
		setPopoverIsOpen(true);
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

		const { added, removed, updated } = detectIngredientChanges();

		// Update recipe
		if (!title || !instructions || !slug || !servings) {
			setFormError("Please fill out all fields");
			return;
		}

		const { error: recipeError } = await supabase
			.from("recipes")
			.update([{ title, instructions, slug, servings }])
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
				onSubmit={submitRecipe}
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
					<PopOver setPopoverIsOpen={setPopoverIsOpen}>
						<div className="mt-4 h-3/4 overflow-y-auto overflow-x-visible">
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
										<span>Whoops! No items found 😱</span>
										<CreatePantryItem />
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
