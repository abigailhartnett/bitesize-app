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

const RecipePage = ({ recipes, pantryItems, setPantryItems }) => {
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

	const formattedText = useCallback((text) => {
		const paragraphs = text.split("\n").filter((text) => text.trim() !== "");
		return paragraphs.map((text, index) => (
			<div key={index}>
				<p>{text}</p>
				<br />
			</div>
		));
	}, []);

	if (!recipeIngredients) {
		return <div>Loading...</div>;
	}

	return (
		<Container>
			<TopBar pageTitle={recipe?.title}>
				{currentRecipe && currentRecipe?.status === "planned" ? (
					<div className="flex items-center">
						<IconButton onClick={() => togglePlanned()}>
							{" "}
							<i class="fa-solid fa-check fa-stack-1x fa-md text-broccoli"></i>
							<i class="fa-duotone fa-circle fa-xl text-mint"></i>
						</IconButton>
						<span>Planned</span>
					</div>
				) : (
					currentRecipe && (
						<div className="flex items-center">
							<IconButton
								onClick={() => togglePlanned()}
								icon="fas fa-circle-dashed"
								className="text-pepper/20"
								size="lg"
							/>
							<span>Add to meal plan</span>
						</div>
					)
				)}
			</TopBar>
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
				<div className="my-4 bg-white border border-solid border-pepper/20 rounded-2xl px-1 py-4">
					<div className="flex justify-between items-center">
						<h2 className="text-lg font-bold pl-3">Ingredients</h2>
						<IconButton
							icon={ingredientsOpen ? "fa-chevron-up" : "fa-chevron-down"}
							onClick={() => setIngredientsOpen(!ingredientsOpen)}
							faStyle="fa-solid"
							size="lg"
						/>
					</div>
					<div className="ml-3">
						{ingredientsOpen && (
							<RecipeItemList
								pantryItems={pantryItems}
								setPantryItems={setPantryItems}
								openPopover={openPopover}
								recipeIngredients={recipeIngredients}
								setRecipeIngredients={setRecipeIngredients}
								slug={slug}
								recipeIngredientsList={recipeIngredientsList}
								status
								ingredient
							/>
						)}
					</div>
				</div>
				<div className="my-4 bg-white border border-solid border-pepper/20 rounded-2xl p-4">
					<h2 className="text-lg font-bold">Instructions</h2>
					<div>{formattedText(recipe?.instructions)}</div>
				</div>
				<div className="my-4 bg-white border border-solid border-pepper/20 rounded-2xl p-4">
					<h2 className="text-lg font-bold">Notes</h2>
					<div>{formattedText(recipe?.notes)}</div>
				</div>
				<Button
					onClick={() => navigate(`/cook-recipe/${slug}`)}
					variant="primary"
					className="mb-4"
				>
					Cook Recipe
				</Button>
				<Button
					onClick={() => editRecipe(recipe)}
					variant="secondary"
					className="mb-4"
				>
					Edit Recipe
				</Button>
			</ListView>
			<Menu />
		</Container>
	);
};

export default RecipePage;
