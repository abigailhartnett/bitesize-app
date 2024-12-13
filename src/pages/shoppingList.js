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
	useFindItem,
} from "bitesize-app/hooks";
import { EditPantryItem } from "bitesize-app/forms";
import PantryItemCard from "./PantryItemCard";

import { PANTRY_FILTER_OPTIONS } from "../constants";

const ShoppingListPage = ({ pantryItems, setPantryItems }) => {
	const { currentItem, setCurrentItem } = useFindItem();
	const [filteredItems, setSearchQuery] = useSearch(pantryItems, "name");
	const [filter, setFilter] = useFilter(PANTRY_FILTER_OPTIONS);

	const [editing, setEditing] = useState(false);

	const location = useLocation();
	const currentPage = location.pathname;

	const toggle = useToggleOnList(pantryItems, setPantryItems);
	const { popoverIsOpen, setPopoverIsOpen, openPopover, closePopover } =
		usePopover(pantryItems, setCurrentItem);

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

	return (
		<Container>
			<TopBar pageTitle="Shopping list">
				<Filter filter={filter} setFilter={setFilter} />
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
						<PopOver closePopover={closePopover}>
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
