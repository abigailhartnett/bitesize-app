import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PantryList from "../components/PantryList";

const PantryPage = () => {
	return (
		<div>
			<Nav />
			<PantryList />
			<Footer />
		</div>
	);
};

export default PantryPage;
