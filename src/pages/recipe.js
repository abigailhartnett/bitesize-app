import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { useParams } from "react-router-dom";
import { useToggleOnList } from "../hooks/useToggleOnList";
import PantryItem from "../components/PantryItem";
import Menu from "../components/Menu";
import ListView from "../components/ListView";
import TopBar from "../components/TopBar";
import Container from "../components/Container";
import PopOver from "../components/PopOver";
import Button from "../components/buttons/Button";

const RecipePage = ({ recipes, pantryItems, setPantryItems }) => {
	const { slug } = useParams();
	const [recipeIngredients, setRecipeIngredients] = useState(null);
	const [fetchError, setFetchError] = useState(null);
	const [currentItem, setCurrentItem] = useState(
		recipes.find((recipe) => recipe.slug === slug)
	);
	const [popoverIsOpen, setPopoverIsOpen] = useState(false);
	const [plannedStatus, setPlannedStatus] = useState(null);

	const toggle = useToggleOnList(pantryItems, setPantryItems);

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

		const updatedRecipe = { ...currentItem, status: plannedStatus };

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

	const recipe = recipes.find((recipe) => recipe.slug === slug);

	const recipeIngredientsList = recipeIngredients.filter(
		(item) => item.recipe_slug === slug
	);

	return (
		<Container>
			<TopBar pageTitle={recipe.title} />
			<ListView>
				{popoverIsOpen && (
					<PopOver
						setPopoverIsOpen={setPopoverIsOpen}
						currentItem={currentItem}
					>
						{currentItem && (
							<>
								<div className="my-4">
									<button className="font-semibold flex gap-2">
										<span>{currentItem?.name}</span>
										<span className="material-symbols-outlined text-sm">
											edit
										</span>
									</button>
								</div>
							</>
						)}
					</PopOver>
				)}
				<div className="pt-4 font-semibold">Ingredients:</div>
				<div>
					{recipeIngredientsList.map((recipeIngredient, id) => {
						const pantryItem = pantryItems.find(
							(item) => item.name === recipeIngredient.name
						);
						if (pantryItem) {
							return (
								<PantryItem
									key={id}
									item={pantryItem}
									toggleOnList={() => toggle(pantryItem.name)}
									pantryItems={pantryItems}
									setPantryItems={setPantryItems}
									openPopover={openPopover}
								/>
							);
						}
						return null;
					})}
				</div>

				<div className="mt-8">
					<h3 className="font-semibold">Instructions:</h3>
					<div>{recipe.instructions}</div>
				</div>
				{currentItem && currentItem?.status === "planned" ? (
					<Button onClick={() => togglePlanned()}>Remove from meal plan</Button>
				) : (
					currentItem && (
						<Button onClick={() => togglePlanned()}>Add to meal plan</Button>
					)
				)}
			</ListView>

			<div className="fixed inset-x-0 bottom-0">
				<Menu />
			</div>
		</Container>
	);
};

export default RecipePage;
