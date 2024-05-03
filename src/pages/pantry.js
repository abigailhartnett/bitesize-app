import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import Nav from "../components/Nav";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import PantryItem from "../components/PantryItem";
import SearchBar from "../components/SearchBar";
import CreatePantryItem from "../components/forms/CreatePantryItem";
import PopOver from "../components/PopOver";

const PantryPage = ({
	filter,
	setFilter,
	searchQuery,
	setSearchQuery,
	// sort,
	setSort,
	pantryItems,
	setPantryItems,
}) => {
	const [toggleShoppingList, setToggleShoppingList] = useState(false);
	const [popoverIsOpen, setPopoverIsOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState(null);
	const statuses = ["in stock", "low", "out"];

	const findItemById = (id) => {
		const item = pantryItems.find((item) => item.id === id);
		if (!item) {
			console.log(`Item with id ${id} not found`);
			return;
		}
		return item;
	};

	const onClick = () => {
		setToggleShoppingList(!toggleShoppingList);
	};

	// Note: Check if there are better ways to write these functions
	const toggleOnList = async (id) => {
		// Find the item
		const item = pantryItems.find((item) => item.id === id);
		if (!item) {
			console.log(`Item with id ${id} not found`);
			return;
		}

		// Toggle the onList property
		const updatedItem = { ...item, onList: !item.onList, checked: false };

		// Update the item in the state
		setPantryItems((prevItems) =>
			prevItems.map((item) => (item.id === id ? updatedItem : item))
		);

		// Update the item in Supabase
		const { error } = await supabase
			.from("pantry")
			.update({ onList: updatedItem.onList, checked: updatedItem.checked })
			.eq("id", id);

		if (error) {
			console.log(error);
		}
	};

	const checkOffItem = async (isChecked, id) => {
		// Find Item
		const item = pantryItems.find((item) => item.id === id);

		// Toggle the onList and status properties
		const updatedItem = {
			...item,
			checked: isChecked,
			status: isChecked ? "in stock" : item.prevStatus,
		};

		// Update the item in the state
		setPantryItems((prevItems) =>
			prevItems.map((item) => (item.id === id ? updatedItem : item))
		);

		// Update the item in Supabase
		const { error } = await supabase
			.from("pantry")
			.update({ status: updatedItem.status, checked: updatedItem.checked })
			.eq("id", id);

		if (error) {
			console.log(error);
		}
	};

	const toggleStatus = async (id) => {
		// Find the item
		const item = pantryItems.find((item) => item.id === id);
		if (!item) {
			console.log(`Item with id ${id} not found`);
			return;
		}

		// console.log("Current status:", item.status);

		// Get status index
		const getNextStatus = (currentStatus) => {
			const currentIndex = statuses.indexOf(currentStatus);
			if (currentIndex === -1 || currentIndex === statuses.length - 1) {
				return statuses[0];
			} else {
				return statuses[currentIndex + 1];
			}
		};

		// Toggle the onList property
		const updatedItem = {
			...item,
			status: getNextStatus(item.status),
			prevStatus: getNextStatus(item.status),
		};

		// Update the item in the state
		setPantryItems((prevItems) =>
			prevItems.map((item) => (item.id === id ? updatedItem : item))
		);

		console.log("New status:", updatedItem.status);

		// Update the item in Supabase
		const { error } = await supabase
			.from("pantry")
			.update({
				status: updatedItem.status,
				prevStatus: updatedItem.prevStatus,
			})
			.eq("id", id);

		if (error) {
			console.log(error);
		}
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
		// Note: replace a lot of the logic in this component with the currentItem state
		toggleOnList(currentItem.id);
		console.log("Current Item:", currentItem);
		setPopoverIsOpen(false);
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
					onList={item.onList}
					toggleOnList={() => toggleOnList(item.id)}
					checkbox={true}
					toggleShoppingList={toggleShoppingList}
					toggleStatus={() => toggleStatus(item.id)}
					openPopover={() => openPopover(item.id)}
					onChange={(e) => checkOffItem(e.target.checked, item.id)}
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
				{popoverIsOpen && (
					<PopOver
						setPopoverIsOpen={setPopoverIsOpen}
						toggleShoppingList={toggleShoppingList}
						pantryItems={pantryItems}
						removeItemFromList={removeItemFromList}
						currentItem={currentItem}
					></PopOver>
				)}
				{filteredPantryItems.length > 0 ? (
					filteredPantryItems
				) : (
					<div className="text-center pt-4">
						{toggleShoppingList ? (
							"Woohoo! All done! 🙌🏻"
						) : (
							<div>
								<span>Whoops! No items found 😱</span>
								<CreatePantryItem />
							</div>
						)}
					</div>
				)}
				{toggleShoppingList && (
					<div className=" flex justify-center pt-4">
						<button
							class="bg-pepper text-white font-semibold p-2"
							onClick={() => clearList()}
						>
							Clear list
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
