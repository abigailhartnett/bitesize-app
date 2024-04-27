import React from "react";
import Search from "./Search";

const Footer = ({
	pantryItems,
	searchPlaceholder,
	searchFilter,
	setSearchFilter,
	searchQuery,
	setSearchQuery,
	setToggleShoppingList,
	toggleShoppingList,
}) => {
	const onClick = (e) => {
		setToggleShoppingList(!toggleShoppingList);
	};

	return (
		<div className="bg-gray-200 p-5 mt-4">
			<div className="flex items-center justify-between gap-1">
				<button
					className={`w-full p-2 ${toggleShoppingList ? "bg-gray-300 text-black/50" : "bg-white"} text-center font-semibold`}
					onClick={onClick}
				>
					Pantry
				</button>
				<button
					className={`w-full p-2 ${!toggleShoppingList ? "bg-gray-300 text-black/50" : "bg-white"} text-center font-semibold`}
					onClick={onClick}
				>
					Shopping list
				</button>
			</div>
			<div className="flex justify-center">
				<Search
					placeholder={searchPlaceholder}
					searchFilter={searchFilter}
					setSearchFilter={setSearchFilter}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					pantryItems={pantryItems}
				/>
			</div>
		</div>
	);
};

export default Footer;
