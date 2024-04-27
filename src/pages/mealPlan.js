import React from "react";
import Nav from "../components/Nav";
import MealPlanList from "../components/mealPlanList";
// import Footer from "../components/Footer";
import Sort from "../components/Sort";
import Filter from "../components/Filter";

const MealPlanPage = () => {
	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between min-h-screen">
			<div class="border-solid border-black border-2 border-t-0 border-x-0 bg-white py-2">
				<div class="flex justify-between pb-2 mr-3">
					<Nav pageTitle="Meal Plan" />
					<Sort sortType="Recipes" />
				</div>
				<Filter filterBy="recipes" />
			</div>
			<div className="h-screen overflow-y-auto overflow-x-visible flex-grow pb-56">
				<MealPlanList />
			</div>
			<div className="fixed inset-x-0 bottom-0">
				{/* <Footer searchPlaceholder="Search for recipe" /> */}
			</div>
		</div>
	);
};

export default MealPlanPage;
