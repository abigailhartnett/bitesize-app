import React from "react";

const Menu = ({ showShoppingList, setShowShoppingList }) => {
	return (
		<div className="bg-gray-200 p-4">
			<div className="flex items-center justify-between gap-1">
				<button
					className={`w-full p-2 ${showShoppingList ? "bg-gray-300 text-black/50" : "bg-white"} text-center font-semibold`}
					onClick={() => setShowShoppingList(!showShoppingList)}
				>
					Pantry
				</button>
				<button
					className={`w-full p-2 ${!showShoppingList ? "bg-gray-300 text-black/50" : "bg-white"} text-center font-semibold`}
					onClick={() => setShowShoppingList(!showShoppingList)}
				>
					Shopping list
				</button>
			</div>
		</div>
	);
};

export default Menu;
