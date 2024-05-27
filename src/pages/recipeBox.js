import React, { useEffect, useState } from "react";
// import supabase from "../config/supabaseClient";
import Nav from "../components/Nav";
// import Footer from "../components/Footer";
import Sort from "../components/Sort";
import RecipeItem from "../components/RecipeItem";
// import Filter from "../components/Filter";

const RecipeBoxPage = ({ recipes }) => {
	const recipeItems = recipes.map((item) => {
		return (
			<>
				<RecipeItem
					title={item.title}
					// readiness={item.readiness}
					slug={item.slug}
					id={item.id}
				/>
			</>
		);
	});

	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between min-h-screen">
			<div class="border-solid border-black border-2 border-t-0 border-x-0 bg-white py-2">
				<div class="flex justify-between pb-2 mr-3">
					<Nav pageTitle="Recipe Box" />
					<Sort sortType="Recipes" />
				</div>
				{/* <Filter filterBy="recipes" /> */}
			</div>
			<div className="h-screen overflow-y-auto overflow-x-visible flex-grow pb-56">
				{recipeItems}
			</div>
			<div className="fixed inset-x-0 bottom-0">
				{/* <Footer searchPlaceholder="Search for recipe" /> */}
			</div>
		</div>
	);
};

export default RecipeBoxPage;
