import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { usePantry } from "../contexts/PantryContext";
import {
	ListView,
	TopBar,
	Container,
	PopOver,
	Button,
	Menu,
	IconButton,
	TextButton,
	RecipeItemList,
} from "bitesize-app/components";
import { usePopover, useFindItem, useFormattedText } from "bitesize-app/hooks";
import { EditPantryItem } from "bitesize-app/forms";

// todo: fix this import
import EditRecipeForm from "../forms/EditRecipeItem";

const CookRecipePage = () => {
	const {
		recipes,
		pantryItems,
		setPantryItems,
		recipeIngredients,
		setRecipeIngredients,
	} = usePantry();
	const { currentItem, setCurrentItem } = useFindItem(pantryItems); // I think this is only here because it's needed for the popover hook
	const { popoverIsOpen, setPopoverIsOpen, closePopover } = usePopover(
		pantryItems,
		setCurrentItem
	);

	const { formattedText } = useFormattedText();

	const navigate = useNavigate();
	const { slug } = useParams();

	const [ingredientsOpen, setIngredientsOpen] = useState(true);
	const [currentRecipe, setCurrentRecipe] = useState(null);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		if (recipes) {
			const recipe = recipes.find((recipe) => recipe.slug === slug);
			setCurrentRecipe(recipe);
		}
	}, [recipes, slug]);

	const recipeIngredientsList = recipeIngredients?.filter(
		(item) => item.recipe_slug === slug
	);

	const editRecipe = (recipe) => {
		setPopoverIsOpen(true);
		setCurrentRecipe(recipe);
	};

	//todo: move this into a hook
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
			<TopBar pageTitle={currentRecipe?.title}></TopBar>
			<ListView>
				{popoverIsOpen && (
					<PopOver
						closePopover={closePopover}
						currentIngredient={currentItem}
						setEditing={setEditing}
						editing={editing}
					>
						{currentItem && (
							<>
								{editing ? (
									<EditPantryItem
										currentIngredient={currentItem}
										setCurrentIngredient={setCurrentItem}
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
						{currentRecipe && (
							<EditRecipeForm
								pantryItems={pantryItems}
								recipe={currentRecipe}
								recipeIngredientsList={recipeIngredientsList}
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
							className={`border-2 radius-2xl border-pepper/10 ${ingredientsOpen ? "text-pepper/20" : "bg-pepper/20"}`}
						/>
					</div>

					<div>
						{ingredientsOpen && (
							<div>
								<div className="border-b border-solid border-pepper/20 m-4">
									{formattedText(currentRecipe?.instructions)}
								</div>
								<RecipeItemList
									pantryItems={pantryItems}
									setPantryItems={setPantryItems}
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
					variant="primary"
					className="mb-4"
				>
					Clear checked ingredients
				</Button>
				<Button
					onClick={() => editRecipe(currentRecipe)}
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
