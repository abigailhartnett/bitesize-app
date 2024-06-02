import React, { useEffect, useState } from "react";
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
import { useFilter } from "../hooks/useFilter";
import Button from "../components/buttons/Button";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar";

const PantryPage = ({ setSort, pantryItems, setPantryItems }) => {
	const [showShoppingList, setShowShoppingList] = useState(false);
	const [popoverIsOpen, setPopoverIsOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState(null);

	const toggle = useToggleOnList(pantryItems, setPantryItems);
	const [filteredItems, setSearchQuery] = useSearch(pantryItems, "name");
	const [filter, setFilter] = useFilter();

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

	const removeItemFromList = () => {
		toggle(currentItem.id);
		setPopoverIsOpen(false);
	};

	const filteredPantryItems = pantryItems.filter(
		(item) =>
			item &&
			(showShoppingList ? item.onList : true) &&
			filter?.includes(item.status) &&
			filteredItems.includes(item)
	);

	useEffect(() => {
		console.log(filter);
	}, [filter]);

	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between min-h-screen">
			<TopBar>
				<Nav pageTitle="Pantry" link="/" />
				<Sort sortType="Pantry" pantryItems={pantryItems} setSort={setSort} />
			</TopBar>
			<Filter filter={filter} setFilter={setFilter} />
			<div className="h-screen overflow-y-auto overflow-x-visible flex-grow pb-56 border-t-2 border-solid border-pepper">
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
				<SearchBar
					id={"searchInput"}
					placeholder={"Search pantry..."}
					setSearchQuery={setSearchQuery}
				/>
				<Menu
					showShoppingList={showShoppingList}
					setShowShoppingList={setShowShoppingList}
				/>
			</div>
		</div>
	);
};

export default PantryPage;
