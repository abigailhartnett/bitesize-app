import React, { createContext, useContext, useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

const PantryContext = createContext();

export const PantryProvider = ({ children }) => {
	const [fetchError, setFetchError] = useState(null);
	const [pantryItems, setPantryItems] = useState(null);
	const [recipes, setRecipes] = useState(null);
	const [recipeIngredients, setRecipeIngredients] = useState(null);

	const [sort, setSort] = useState(null);

	useEffect(() => {
		const fetchPantryItems = async () => {
			const { data, error } = await supabase.from("pantry").select();

			if (error) {
				setFetchError("Could not fetch pantry items");
				setPantryItems(null);
				console.error("Fetch Pantry Error:", error);
			} else {
				setPantryItems(data);
				setFetchError(null);
			}
		};

		fetchPantryItems();

		const fetchRecipes = async () => {
			const { data, error } = await supabase.from("recipes").select();

			if (error) {
				setFetchError("Could not fetch recipes");
				setRecipes(null);
				console.log(fetchError, error);
			}
			if (data) {
				setRecipes(data);
				setFetchError(null);
			}
		};
		fetchRecipes();

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
	}, [fetchError]);

	return (
		<PantryContext.Provider
			value={{
				pantryItems,
				setPantryItems,
				recipes,
				setRecipes,
				sort,
				recipeIngredients,
				setRecipeIngredients,
				setSort,
				fetchError,
			}}
		>
			{children}
		</PantryContext.Provider>
	);
};

export const usePantry = () => {
	const context = useContext(PantryContext);
	if (context === undefined) {
		throw new Error("usePantry must be used within a PantryProvider");
	}
	return context;
};
