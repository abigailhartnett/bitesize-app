import React from "react";
import Nav from "../components/Nav";
import RecipeList from "../components/RecipeList";
import Footer from "../components/Footer";
import Sort from "../components/Sort";
import Filter from "../components/Filter";

const RecipeBoxPage = () => {
	return (
		<div>
			<Nav />
			<Sort sortType="Recipes" />
			<Filter filterBy="recipes" />
			<RecipeList />
			<Footer searchPlaceholder="Search for recipe" />
		</div>
	);
};

export default RecipeBoxPage;
