import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import Nav from "../components/Nav";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import SearchBar from "../components/SearchBar";
import CreatePantryItem from "../components/forms/CreatePantryItem";
import PopOver from "../components/PopOver";
import PantryItemList from "../components/calculations/PantryItemList";
import { useToggleOnList } from "../hooks/useToggleOnList";
import { useSearch } from "../hooks/useSearch";
import Button from "../components/buttons/Button";

const PantryPage = ({
	filter,
	setFilter,
	setSort,
	pantryItems,
	setPantryItems,
}) => {
	const [showShoppingList, setShowShoppingList] = useState(false);
	const [popoverIsOpen, setPopoverIsOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState(null);

	const toggle = useToggleOnList(pantryItems, setPantryItems);
	const [filteredItems, setSearchQuery] = useSearch(pantryItems, "name");

	const findItemById = (id) => {
		const item = pantryItems.find((item) => item.id === id);
		if (!item) {
			console.log(`Item with id ${id} not found`);
			return;
		}
		return item;
	};

	const clearList = async () => {
		const itemsOnList = pantryItems.filter((item) => item.onList);

		// Find Items
		for (const item of itemsOnList) {
			// Toggle the onList and status properties
			const updatedItem = { ...item, onList: false, prevStatus: item.status };

			// Update the item in the state
			setPantryItems((prevItems) =>
				prevItems.map((prevItem) =>
					prevItem.id === item.id ? updatedItem : prevItem
				)
			);

			// Update the item in Supabase
			const { error } = await supabase
				.from("pantry")
				.update({
					onList: updatedItem.onList,
					prevStatus: updatedItem.prevStatus,
				})
				.eq("id", item.id);

			if (error) {
				console.log(error);
			}
		}
	};

	const openPopover = (id) => {
		setPopoverIsOpen(true);
		const item = findItemById(id);
		setCurrentItem(item);
	};

	const removeItemFromList = (id) => {
		toggle(currentItem.id);
		setPopoverIsOpen(false);
	};

	const filteredPantryItems = pantryItems.filter(
		(item) =>
			item &&
			(showShoppingList ? item.onList : true) &&
			filter.includes(item.status) &&
			filteredItems.includes(item)
	);

	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between min-h-screen">
			<div class="border-solid border-black border-2 border-t-0 border-x-0 bg-white py-2">
				<div class="flex justify-between pb-2 mr-3">
					<Nav pageTitle="Pantry" link="/" />
					<Sort sortType="Pantry" pantryItems={pantryItems} setSort={setSort} />
				</div>
				<Filter filter={filter} setFilter={setFilter} />
			</div>
			<div className="h-screen overflow-y-auto overflow-x-visible flex-grow pb-56">
				{popoverIsOpen && (
					<PopOver
						setPopoverIsOpen={setPopoverIsOpen}
						showShoppingList={showShoppingList}
						removeItemFromList={removeItemFromList}
						currentItem={currentItem}
					></PopOver>
				)}
				{/* PANTRY ITEMS */}
				{filteredPantryItems.length > 0 ? (
					<PantryItemList
						filteredPantryItems={filteredPantryItems}
						pantryItems={pantryItems}
						setPantryItems={setPantryItems}
						filter={filter}
						showShoppingList={showShoppingList}
						openPopover={openPopover}
					/>
				) : (
					<div className="text-center pt-4">
						{showShoppingList ? (
							"Woohoo! All done! 🙌🏻"
						) : (
							<div>
								<span>Whoops! No items found 😱</span>
								<CreatePantryItem />
							</div>
						)}
					</div>
				)}
				{/* CLEAR LIST */}
				{showShoppingList && (
					<Button onClick={() => clearList()}>Clear list</Button>
				)}
			</div>
			<div className="fixed inset-x-0 bottom-0">
				{/* SEARCH BAR */}
				<SearchBar
					id={"searchInput"}
					placeholder={"Search pantry..."}
					setSearchQuery={setSearchQuery}
				/>
				{/* SHOW SHOPPING LIST */}
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
			</div>
		</div>
	);
};

export default PantryPage;
