import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { useParams } from "react-router-dom";
import ListView from "../components/ListView";
import TopBar from "../components/TopBar";
import Container from "../components/Container";
import PopOver from "../components/PopOver";
import Button from "../components/buttons/Button";
import EditPantryItem from "../forms/EditPantryItem";
import BottomBar from "../components/BottomBar";
import IconButton from "../components/buttons/IconButton";
import RecipeItemList from "../components/RecipeItemList";
import EditRecipeForm from "../forms/EditRecipeItem";

const RecipePage = ({ recipes, pantryItems, setPantryItems }) => {
	const { slug } = useParams();
	const [recipeIngredients, setRecipeIngredients] = useState(null);
	const [ingredientsOpen, setIngredientsOpen] = useState(true);
	const [fetchError, setFetchError] = useState(null);
	const [currentRecipe, setCurrentRecipe] = useState(
		recipes.find((recipe) => recipe.slug === slug)
	);
	const [currentIngredient, setCurrentIngredient] = useState(null);
	const [popoverIsOpen, setPopoverIsOpen] = useState(false);
	const [editing, setEditing] = useState(false);

	const recipe = recipes?.find((recipe) => recipe.slug === slug);

	const recipeIngredientsList = recipeIngredients?.filter(
		(item) => item.recipe_slug === slug
	);

	const findIngredientByName = (name) => {
		const item = pantryItems.find((item) => item.name === name);
		if (!item) {
			console.log(`Item with id ${name} not found`);
			return;
		}
		setCurrentIngredient(item);
		return item;
	};

	const openPopover = (name) => {
		setPopoverIsOpen(true);
		const item = findIngredientByName(name);
		setCurrentIngredient(item);
	};

	const editRecipe = (recipe) => {
		setPopoverIsOpen(true);
		setCurrentRecipe(recipe);
	};

	useEffect(() => {
		const fetchRecipeIngredients = async () => {
			const { data, error } = await supabase.from("recipeIngredients").select();

			if (error) {
				setFetchError("Could not fetch pantry recipe ingredients");
				setRecipeIngredients(null);
				console.log(fetchError, error);
			}
			if (data) {
				setRecipeIngredients(data);
				setFetchError(null);
			}
		};
		fetchRecipeIngredients();
	}, [fetchError, setFetchError]);

	const togglePlanned = async () => {
		const newStatus =
			currentRecipe.status === "planned" ? "not planned" : "planned";
		setCurrentRecipe((prevItem) => ({ ...prevItem, status: newStatus }));

		try {
			await supabase
				.from("recipes")
				.update({ status: newStatus })
				.eq("slug", slug);
		} catch (error) {
			console.error("Error adding recipe to meal plan:", error);
			setCurrentRecipe((prevItem) => ({
				...prevItem,
				status: currentRecipe.status,
			}));
		}
	};

	if (!recipeIngredients) {
		return <div>Loading...</div>;
	}

	return (
		<Container>
			<TopBar pageTitle={recipe?.title} />
			<ListView>
				{popoverIsOpen && (
					<PopOver
						setPopoverIsOpen={setPopoverIsOpen}
						currentIngredient={currentIngredient}
						setEditing={setEditing}
						editing={editing}
					>
						{currentIngredient && (
							<>
								{editing ? (
									<EditPantryItem
										currentIngredient={currentIngredient}
										setCurrentIngredient={setCurrentIngredient}
										pantryItems={pantryItems}
										setEditing={setEditing}
										setPopoverIsOpen={setPopoverIsOpen}
										editing={editing}
									/>
								) : (
									<div className="my-4 font-semibold">
										<span className="mb-4">{currentRecipe?.name}</span>
										<Button onClick={() => setEditing(true)}>Edit Item</Button>
									</div>
								)}
							</>
						)}
						{recipe && (
							<EditRecipeForm
								pantryItems={pantryItems}
								recipe={recipe}
								recipeIngredientsList={recipeIngredientsList}
								setPopoverIsOpen={setPopoverIsOpen}
							/>
						)}
					</PopOver>
				)}
				<div className="flex justify-between">
					<h2 className="text-lg font-bold my-4">Ingredients</h2>
					<IconButton
						icon={ingredientsOpen ? "fa-chevron-up" : "fa-chevron-down"}
						onClick={() => setIngredientsOpen(!ingredientsOpen)}
						faStyle="fa-solid"
						size="lg"
					/>
				</div>
				<div>
					{ingredientsOpen && (
						<RecipeItemList
							pantryItems={pantryItems}
							setPantryItems={setPantryItems}
							openPopover={openPopover}
							recipeIngredients={recipeIngredients}
							setRecipeIngredients={setRecipeIngredients}
							slug={slug}
							checkbox
							recipeIngredientsList={recipeIngredientsList}
							// status={currentIngredient.status}
						/>
					)}
				</div>
				<div className="mt-4">
					<h2 className="text-lg font-bold my-4">Instructions</h2>
					<div>{recipe?.instructions}</div>
				</div>
				<Button onClick={() => editRecipe(recipe)}>Edit recipe</Button>
			</ListView>
			<BottomBar>
				{currentRecipe && currentRecipe?.status === "planned" ? (
					<Button onClick={() => togglePlanned()}>Remove from meal plan</Button>
				) : (
					currentRecipe && (
						<Button onClick={() => togglePlanned()}>Add to meal plan</Button>
					)
				)}
			</BottomBar>
		</Container>
	);
};

export default RecipePage;
