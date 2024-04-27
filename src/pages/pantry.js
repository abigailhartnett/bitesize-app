import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import Nav from "../components/Nav";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import PantryItem from "../components/PantryItem";
import SearchBar from "../components/SearchBar";

const PantryPage = ({
	filter,
	setFilter,
	searchQuery,
	setSearchQuery,
	sort,
	setSort,
	pantryItems,
	setPantryItems,
}) => {
	const [toggleShoppingList, setToggleShoppingList] = useState(false);
	const [onList, setOnList] = useState();

	const onClick = (e) => {
		setToggleShoppingList(!toggleShoppingList);
	};

	const toggleOnList = async (id) => {
		// Find the item
		const item = pantryItems.find((item) => item.id === id);
		if (!item) {
			console.log(`Item with id ${id} not found`);
			return;
		}

		// Toggle the onList property
		const updatedItem = { ...item, onList: !item.onList };

		// Update the item in the state
		setPantryItems((prevItems) =>
			prevItems.map((item) => (item.id === id ? updatedItem : item))
		);

		// Update the item in Supabase
		const { error } = await supabase
			.from("pantry")
			.update({ onList: updatedItem.onList })
			.eq("id", id);

		if (error) {
			console.log(error);
		}
	};

	const filteredPantryItems = pantryItems
		.filter(
			(item) =>
				(toggleShoppingList ? item.onList : true) &&
				filter.includes(item.status) &&
				item.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.map((item) => {
			return (
				<PantryItem
					item={item}
					id={item.id}
					key={item.id}
					icon={item.icon}
					name={item.name}
					aisle={item.aisle}
					status={item.status}
					onList={onList}
					onClick={() => toggleOnList(item.id)}
					checkbox={true}
					toggleShoppingList={toggleShoppingList}
					// onChange={(e) => checkOffItem(e.target.checked, item.id)}
				/>
			);
		});

	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between min-h-screen">
			<div class="border-solid border-black border-2 border-t-0 border-x-0 bg-white py-2">
				<div class="flex justify-between pb-2 mr-3">
					<Nav pageTitle="Pantry" />
					<Sort sortType="Pantry" pantryItems={pantryItems} setSort={setSort} />
				</div>
				<Filter filter={filter} setFilter={setFilter} />
			</div>
			<div className="h-screen overflow-y-auto overflow-x-visible flex-grow pb-56">
				{filteredPantryItems.length > 0 ? (
					filteredPantryItems
				) : (
					<div className="text-center pt-4">Whoops! No items found 😱</div>
				)}
				{toggleShoppingList && (
					<div className=" flex justify-center pt-4">
						<button
							class="bg-pepper text-white font-semibold p-2"
							// onClick={() => clearList()}
						>
							Remove all items
						</button>
					</div>
				)}
			</div>
			<div className="fixed inset-x-0 bottom-0">
				<SearchBar
					placeholder={"Search pantry..."}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					pantryItems={pantryItems}
				/>
				<div className="bg-gray-200 p-4">
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
				</div>
			</div>
		</div>
	);
};

export default PantryPage;
