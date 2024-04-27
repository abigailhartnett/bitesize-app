import React, { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PantryList from "../components/PantryList";
import Filter from "../components/Filter";
import Sort from "../components/Sort";

const PantryPage = ({
	filter,
	setFilter,
	searchFilter,
	setSearchFilter,
	searchQuery,
	sort,
	setSort,
	setSearchQuery,
	pantryItems,
	setPantryItems,
	setShoppingList,
	shoppingList,
}) => {
	const [toggleShoppingList, setToggleShoppingList] = useState(false);

	useState(() => {
		setFilter(["in stock", "low", "out"]);
	}, []);

	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between min-h-screen">
			<div class="border-solid border-black border-2 border-t-0 border-x-0 bg-white py-2">
				<div class="flex justify-between pb-2 mr-3">
					<Nav pageTitle="Pantry" />
					{pantryItems && (
						<Sort
							sortType="Pantry"
							pantryItems={pantryItems}
							setSort={setSort}
						/>
					)}
				</div>
				<Filter
					setShoppingList={setShoppingList}
					shoppingList={shoppingList}
					filter={filter}
					setFilter={setFilter}
					toggleShoppingList={toggleShoppingList}
					setToggleShoppingList={setToggleShoppingList}
				/>
			</div>
			<div className="h-screen overflow-y-auto overflow-x-visible flex-grow pb-56">
				{sort && (
					<PantryList
						filter={filter}
						searchFilter={searchFilter}
						sort={sort}
						pantryItems={pantryItems}
						setPantryItems={setPantryItems}
						setShoppingList={setShoppingList}
						shoppingList={shoppingList}
						toggleShoppingList={toggleShoppingList}
					/>
				)}
			</div>

			<div className="fixed inset-x-0 bottom-0">
				<Footer
					searchPlaceholder="Search pantry..."
					pantryItems={pantryItems}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					searchFilter={searchFilter}
					setSearchFilter={setSearchFilter}
					setToggleShoppingList={setToggleShoppingList}
					toggleShoppingList={toggleShoppingList}
				/>
			</div>
		</div>
	);
};

export default PantryPage;
