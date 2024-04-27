import React from "react";
import BigButton from "../components/buttons/BigButton";
import CreatePantryItem from "../components/createPantryItem";

const HomePage = () => {
	return (
		<div>
			<h1 className="text-center text-xl font-bold">BiteSize App</h1>
			<BigButton text="Pantry" link="/pantry" />
			<BigButton text="Recipe Box" link="/recipe-box" />

			{/* <BigButton text="Shopping List" link="/shopping-list" /> */}

			<BigButton text="Meal Plan" link="/meal-plan" />
			<CreatePantryItem />
		</div>
	);
};

export default HomePage;
