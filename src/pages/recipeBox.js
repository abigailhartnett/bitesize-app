import React from "react";
import Nav from "../components/Nav";
import RecipeList from "../components/RecipeList";
import Footer from "../components/Footer";

const RecipeBoxPage = () => {
	return (
		<div>
			<div>
				<Nav />
				<RecipeList />
			</div>
			<Footer />
		</div>
	);
};

export default RecipeBoxPage;
