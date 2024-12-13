import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../config/supabaseClient";

import {
	Filter,
	PopOver,
	PantryItemList,
	Button,
	TopBar,
	ListView,
	Container,
	SearchBar,
	IconButton,
	Menu,
} from "bitesize-app/components";
import {
	useToggleOnList,
	useSearch,
	useFilter,
	usePopover,
} from "bitesize-app/hooks";
import { EditPantryItem } from "bitesize-app/forms";
import PantryItemCard from "./PantryItemCard";

import { PANTRY_FILTER_OPTIONS } from "../constants";

const ShoppingListPage = ({ pantryItems, setPantryItems }) => {
	const [currentItem, setCurrentItem] = useState(null);
	const [filteredItems, setSearchQuery] = useSearch(pantryItems, "name");
	const [filter, setFilter] = useFilter(PANTRY_FILTER_OPTIONS);
	const [popoverIsOpen, setPopoverIsOpen] = usePopover();
	const [editing, setEditing] = useState(false);
	// const [openWarning, setOpenWarning] = useState(false);

	const location = useLocation();
	const currentPage = location.pathname;

	const toggle = useToggleOnList(pantryItems, setPantryItems);

	const findItemById = (id) => {
		const item = pantryItems?.find((item) => item.id === id);
		if (!item) {
			console.log(`Item with id ${id} not found`);
			return;
		}
		return item;
	};

	const openPopover = (id) => {
		setPopoverIsOpen(true);
		const item = findItemById(id);
		setCurrentItem(item);
	};

	const removeItemFromList = () => {
		toggle(currentItem.name);
		setPopoverIsOpen(false);
	};

	const filteredPantryItems = pantryItems.filter(
		(item) =>
			item?.onList &&
			(filter?.includes(item.status) || filter?.includes(item.store)) &&
			filteredItems.includes(item)
	);

	// const clearList = async () => {
	// 	const itemsOnList = pantryItems?.filter((item) => item.onList);

	// 	// Find Items
	// 	for (const item of itemsOnList) {
	// 		// Toggle the onList and status properties
	// 		const updatedItem = { ...item, onList: false, prevStatus: item.status };

	// 		// Update the item in the state
	// 		setPantryItems((prevItems) =>
	// 			prevItems.map((prevItem) =>
	// 				prevItem.id === item.id ? updatedItem : prevItem
	// 			)
	// 		);

	// 		// Update the item in Supabase
	// 		const { error } = await supabase
	// 			.from("pantry")
	// 			.update({
	// 				onList: updatedItem.onList,
	// 				prevStatus: updatedItem.prevStatus,
	// 			})
	// 			.eq("id", item.id);

	// 		if (error) {
	// 			console.log(error);
	// 		}
	// 	}

	// 	setPopoverIsOpen(false);
	// 	setOpenWarning(false);
	// };

	const clearCheckedItems = async () => {
		const itemsOnList = pantryItems?.filter(
			(item) => item.onList && item.checked
		);

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

		setPopoverIsOpen(false);
	};

	// const triggerClearList = () => {
	// 	setOpenWarning(true);
	// 	openPopover();
	// };

	return (
		<Container>
			<TopBar pageTitle="Shopping list">
				<Filter
					filter={filter}
					setFilter={setFilter}
					options={["in stock", "low", "out", "safeway", "costco", "other"]}
				/>
				<div className="flex items-center gap-2">
					<SearchBar
						id={"searchInput"}
						placeholder={"Search shopping list..."}
						setSearchQuery={setSearchQuery}
					/>
					<IconButton
						icon="fa-check-double"
						onClick={() => clearCheckedItems()}
						className="bg-[#e9e9e9] rounded-2xl"
						faStyle="fa-solid"
						size="lg"
					/>
				</div>
			</TopBar>
			<ListView>
				{popoverIsOpen && (
					<>
						{/* {openWarning ? (
							<PopOver
								setPopoverIsOpen={setPopoverIsOpen}
								setEditing={setEditing}
							>
								<div className="my-4">
									Are you sure you want to clear your entire list? <br />
									This cannot be undone.
								</div>
								<Button onClick={() => clearList()}>Clear list</Button>
							</PopOver>
						) : null} */}
						<PopOver
							setPopoverIsOpen={setPopoverIsOpen}
							setEditing={setEditing}
							editing={editing}
						>
							{editing ? (
								<EditPantryItem
									currentItem={currentItem}
									setCurrentItem={setCurrentItem}
									pantryItems={pantryItems}
									setEditing={setEditing}
									editing={setEditing}
									setPopoverIsOpen={setPopoverIsOpen}
								/>
							) : (
								<PantryItemCard item={currentItem}>
									<Button
										onClick={() => removeItemFromList(currentItem?.id)}
										variant="primary"
									>
										Remove from List
									</Button>
									<Button onClick={() => setEditing(true)} variant="secondary">
										Edit Item
									</Button>
								</PantryItemCard>
							)}
						</PopOver>
					</>
				)}
				{filteredPantryItems?.length > 0 ? (
					<PantryItemList
						filteredPantryItems={filteredPantryItems}
						pantryItems={pantryItems}
						setPantryItems={setPantryItems}
						openPopover={openPopover}
						currentPage={currentPage}
						aisle
						status
						checkbox
					/>
				) : (
					<h2 className="text-center text-lg font-bold mb-4">No Items Found</h2>
				)}
				{/* <Button onClick={() => triggerClearList()}>Clear list</Button> */}
			</ListView>
			<Menu />
		</Container>
	);
};

export default ShoppingListPage;
