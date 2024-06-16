import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { useParams } from "react-router-dom";
import { useToggleOnList } from "../hooks/useToggleOnList";
// import PantryItem from "../components/PantryItem";
import Menu from "../components/Menu";
import ListView from "../components/ListView";
import TopBar from "../components/TopBar";
import Container from "../components/Container";
import PopOver from "../components/PopOver";
import Button from "../components/buttons/Button";
import EditPantryItem from "../forms/EditPantryItem";
import BottomBar from "../components/BottomBar";
import IconButton from "../components/buttons/IconButton";
import RecipeItemList from "../components/RecipeItemList";

const CookRecipePage = ({ recipes, pantryItems, setPantryItems }) => {
	const { slug } = useParams();
	const [recipeIngredients, setRecipeIngredients] = useState(null);
	const [fetchError, setFetchError] = useState(null);
	const [currentItem, setCurrentItem] = useState(
		recipes.find((recipe) => recipe.slug === slug)
	);
	const [popoverIsOpen, setPopoverIsOpen] = useState(false);
	const [editing, setEditing] = useState(false);

	const [ingredientsOpen, setIngredientsOpen] = useState(true);

	// const toggle = useToggleOnList(pantryItems, setPantryItems);

	const recipe = recipes?.find((recipe) => recipe.slug === slug);

	const recipeIngredientsList = recipeIngredients?.filter(
		(item) => item.recipe_slug === slug
	);

	const findItemById = (id) => {
		const item = pantryItems.find((item) => item.id === id);
		if (!item) {
			console.log(`Item with id ${id} not found`);
			return;
		}
		setCurrentItem(item);
		return item;
	};

	const openPopover = (id) => {
		setPopoverIsOpen(true);
		const item = findItemById(id);
		setCurrentItem(item);
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
			currentItem.status === "planned" ? "not planned" : "planned";
		setCurrentItem((prevItem) => ({ ...prevItem, status: newStatus }));

		try {
			await supabase
				.from("recipes")
				.update({ status: newStatus })
				.eq("slug", slug);
		} catch (error) {
			console.error("Error adding recipe to meal plan:", error);
			setCurrentItem((prevItem) => ({
				...prevItem,
				status: currentItem.status,
			}));
		}
	};

	if (!recipeIngredients) {
		return <div>Loading...</div>;
	}

	return (
		<Container>
			<TopBar pageTitle={recipe.title} />
			<ListView>
				{popoverIsOpen && (
					<PopOver
						setPopoverIsOpen={setPopoverIsOpen}
						currentItem={currentItem}
						setEditing={setEditing}
						editing={editing}
					>
						{currentItem && (
							<>
								{editing ? (
									<EditPantryItem
										currentItem={currentItem}
										setCurrentItem={setCurrentItem}
										pantryItems={pantryItems}
										setEditing={setEditing}
										setPopoverIsOpen={setPopoverIsOpen}
										editing={editing}
									/>
								) : (
									<div className="my-4 font-semibold">
										<span className="mb-4">{currentItem?.name}</span>
										<Button onClick={() => setEditing(true)}>Edit Item</Button>
									</div>
								)}
							</>
						)}
					</PopOver>
				)}
				<div className="flex justify-between">
					<div className="pt-4 font-semibold">Ingredients</div>
					<IconButton
						icon={ingredientsOpen ? "fa-chevron-up" : "fa-chevron-down"}
						onClick={() => setIngredientsOpen(!ingredientsOpen)}
					/>
				</div>
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
						status={currentItem.status}
					/>
				)}

				<div className="mt-4">
					<h3 className="font-semibold">Instructions:</h3>
					<div>{recipe.instructions}</div>
				</div>
			</ListView>
			<BottomBar>
				{currentItem && currentItem?.status === "planned" ? (
					<Button onClick={() => togglePlanned()}>Remove from meal plan</Button>
				) : (
					currentItem && (
						<Button onClick={() => togglePlanned()}>Add to meal plan</Button>
					)
				)}
				<Menu />
			</BottomBar>
		</Container>
	);
};

export default CookRecipePage;
