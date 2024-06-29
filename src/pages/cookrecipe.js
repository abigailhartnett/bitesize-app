import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useParams } from "react-router-dom";
import ListView from "../components/ListView";
import TopBar from "../components/TopBar";
import Container from "../components/Container";
import PopOver from "../components/PopOver";
import Button from "../components/buttons/Button";
import EditPantryItem from "../forms/EditPantryItem";
import Menu from "../components/Menu";
import IconButton from "../components/buttons/IconButton";
import RecipeItemList from "../components/RecipeItemList";
import EditRecipeForm from "../forms/EditRecipeItem";
import TextButton from "../components/buttons/TextButton";

const CookRecipePage = ({ recipes, pantryItems, setPantryItems }) => {
	const navigate = useNavigate();
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

	const formattedRecipeInstructions = useCallback((instructions) => {
		const paragraphs = instructions
			.split("\n")
			.filter((instruction) => instruction.trim() !== "");
		return paragraphs.map((instruction, index) => (
			<div key={index}>
				<p>{instruction}</p>
				<br />
			</div>
		));
	}, []);

	const clearCheckedIngredients = async () => {
		const checkedIngredients = recipeIngredientsList.filter(
			(item) => item.ingredient_checked === true
		);

		checkedIngredients.forEach(async (ingredient) => {
			const { error } = await supabase
				.from("recipeIngredients")
				.update({ ingredient_checked: false })
				.eq("id", ingredient.id);

			if (error) {
				console.error("Error updating ingredient:", error);
			}

			const updatedIngredients = recipeIngredientsList.map((item) =>
				item.id === ingredient.id
					? { ...item, ingredient_checked: false }
					: item
			);

			setRecipeIngredients(updatedIngredients);
		});
	};

	if (!recipeIngredients) {
		return <div>Loading...</div>;
	}

	return (
		<Container>
			<TopBar pageTitle={recipe?.title}></TopBar>
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
								// setPopoverIsOpen={setPopoverIsOpen}
							/>
						)}
					</PopOver>
				)}
				<div className="my-4 bg-white border border-solid border-pepper/20 rounded-2xl p-4">
					<div className="flex justify-between items-center px-4">
						<h2 className="text-lg font-bold">Instructions</h2>
						<IconButton
							icon={"fa-check"}
							onClick={() => setIngredientsOpen(!ingredientsOpen)}
							faStyle="fa-solid"
							size="md"
							className={`border-2 radius-2xl border-pepper/5 ${ingredientsOpen ? "text-pepper/10" : "bg-pepper/20"}`}
						/>
					</div>

					<div>
						{ingredientsOpen && (
							<div>
								<div className="border-b border-solid border-pepper/20 m-4">
									{formattedRecipeInstructions(recipe?.instructions)}
								</div>
								<RecipeItemList
									pantryItems={pantryItems}
									setPantryItems={setPantryItems}
									openPopover={openPopover}
									recipeIngredients={recipeIngredients}
									setRecipeIngredients={setRecipeIngredients}
									slug={slug}
									checkbox
									recipeIngredientsList={recipeIngredientsList}
									ingredient
								/>
							</div>
						)}
					</div>
				</div>
				<Button
					onClick={() => clearCheckedIngredients()}
					variant="secondary"
					className="mb-4"
				>
					Clear checked ingredients
				</Button>
				<Button
					onClick={() => editRecipe(recipe)}
					variant="secondary"
					className="mb-4"
				>
					Edit recipe
				</Button>
				<TextButton onClick={() => navigate(-1)}>
					Back to recipe page
				</TextButton>
			</ListView>
			<Menu />
		</Container>
	);
};

export default CookRecipePage;
