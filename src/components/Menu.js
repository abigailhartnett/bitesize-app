import React from "react";
import Button from "./buttons/Button";
import { useNavigate } from "react-router-dom";

const Menu = () => {
	const navigate = useNavigate();

	return (
		<div className="bg-gray-200 p-4">
			<div className="flex items-center justify-between gap-1">
				<Button onClick={() => navigate("/recipes")}>Recipe box</Button>
				<Button onClick={() => navigate("/pantry")}>Pantry</Button>
				<Button onClick={() => navigate("/shopping-list")}>
					Shopping list
				</Button>
			</div>
		</div>
	);
};

export default Menu;
