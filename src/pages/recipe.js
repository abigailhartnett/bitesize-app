import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePantry } from "../contexts/PantryContext";
import {
	ListView,
	TopBar,
	Container,
	PopOver,
	Button,
	Menu,
	IconButton,
	RecipeItemList,
} from "bitesize-app/components";
import {
	usePopover,
	useFindItem,
	useToggle,
	useFormattedText,
} from "bitesize-app/hooks";
import { EditPantryItem } from "bitesize-app/forms";

// todo: fix this import
import EditRecipeForm from "../forms/EditRecipeItem";

const RecipePage = () => {
	const { recipes, pantryItems, recipeIngredients, setRecipeIngredients } =
		usePantry();
	const { currentItem, setCurrentItem } = useFindItem(pantryItems); // I think this is only here because it's needed for the popover hook
	const { popoverIsOpen, setPopoverIsOpen, openPopover, closePopover } =
		usePopover(pantryItems, setCurrentItem);
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

	const { togglePlanned } = useToggle(currentRecipe, setCurrentRecipe, slug);

	const recipeIngredientsList = recipeIngredients?.filter(
		(item) => item.recipe_slug === slug
	);

	const editRecipe = (recipe) => {
		setPopoverIsOpen(true);
		setCurrentRecipe(recipe);
	};

	if (!recipeIngredients) {
		return <div>Loading...</div>;
	}

	return (
		<Container>
			<TopBar pageTitle={currentRecipe?.title}>
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
					<PopOver closePopover={closePopover}>
						{currentItem && (
							<>
								{editing ? (
									<EditPantryItem
										editing={editing}
										setEditing={setEditing}
										setPopoverIsOpen={setPopoverIsOpen}
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
								recipe={currentRecipe}
								recipeIngredientsList={recipeIngredientsList}
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
					<div>{formattedText(currentRecipe?.instructions)}</div>
				</div>
				<div className="my-4 bg-white border border-solid border-pepper/20 rounded-2xl p-4">
					<h2 className="text-lg font-bold">Notes</h2>
					<div>{formattedText(currentRecipe?.notes)}</div>
				</div>
				<Button
					onClick={() => navigate(`/cook-recipe/${slug}`)}
					variant="primary"
					className="mb-4"
				>
					Cook Recipe
				</Button>
				<Button
					onClick={() => editRecipe(currentRecipe)}
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
