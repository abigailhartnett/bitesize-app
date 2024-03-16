import React from "react";
import PantryItem from "../components/PantryItem";
import Nav from "../components/Nav";
import Filter from "../components/Filter";
import Footer from "../components/Footer";

const PantryPage = () => {
	return (
		<div>
			<Nav />
			<Filter />
			<div className="mt-4">
				<PantryItem />
			</div>
			<Footer />
		</div>
	);
};

export default PantryPage;
