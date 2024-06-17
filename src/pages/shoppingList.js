import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../config/supabaseClient";
import Filter from "../components/Filter";
import PopOver from "../components/PopOver";
import PantryItemList from "../components/calculations/PantryItemList";
import { useToggleOnList } from "../hooks/useToggleOnList";
import { useSearch } from "../hooks/useSearch";
import { useFilter } from "../hooks/useFilter";
import { usePopover } from "../hooks/usePopover";
import Button from "../components/buttons/Button";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar";
import ListView from "../components/ListView";
import Container from "../components/Container";
import EditPantryItem from "../forms/EditPantryItem";
import BottomBar from "../components/BottomBar";
import SearchBar from "../components/SearchBar";
import IconButton from "../components/buttons/IconButton";

const ShoppingListPage = ({ pantryItems, setPantryItems }) => {
	const [currentItem, setCurrentItem] = useState(null);
	const [filteredItems, setSearchQuery] = useSearch(pantryItems, "name");
	const filterOptions = [
		"in stock",
		"out",
		"low",
		"safeway",
		"costco",
		"other",
	];
	const [filter, setFilter] = useFilter(filterOptions);
	const [popoverIsOpen, setPopoverIsOpen] = usePopover();
	const [editing, setEditing] = useState(false);
	const [openWarning, setOpenWarning] = useState(false);

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
			filter?.includes(item.status) &&
			(filter?.includes(item.store) || item.store === null) &&
			filteredItems.includes(item)
	);

	const clearList = async () => {
		const itemsOnList = pantryItems?.filter((item) => item.onList);

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
		setOpenWarning(false);
	};

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

	const triggerClearList = () => {
		setOpenWarning(true);
		openPopover();
	};

	return (
		<Container>
			<TopBar pageTitle="Shopping list" />
			<Filter
				filter={filter}
				setFilter={setFilter}
				options={["in stock", "low", "out", "safeway", "costco", "other"]}
			/>
			<ListView>
				{popoverIsOpen && (
					<>
						{openWarning ? (
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
						) : null}
						{currentItem?.onList && !openWarning ? (
							<PopOver
								setPopoverIsOpen={setPopoverIsOpen}
								setEditing={setEditing}
							>
								<div className="my-4">
									<span>{currentItem?.name}</span>
									<button className="font-semibold flex gap-2">
										<span class="material-symbols-outlined text-sm">edit</span>
									</button>
								</div>
								<Button onClick={() => setEditing(true)}>Edit Item</Button>
								<Button onClick={() => removeItemFromList(currentItem?.id)}>
									Remove from list
								</Button>
							</PopOver>
						) : null}
						{editing ? (
							<PopOver
								setPopoverIsOpen={setPopoverIsOpen}
								setEditing={setEditing}
								editing={editing}
							>
								<EditPantryItem
									currentItem={currentItem}
									setCurrentItem={setCurrentItem}
									pantryItems={pantryItems}
									setEditing={setEditing}
									editing={setEditing}
									setPopoverIsOpen={setPopoverIsOpen}
								/>
							</PopOver>
						) : null}
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
					<div className="text-center pt-4">Woohoo! All done! 🙌🏻</div>
				)}
				<Button onClick={() => triggerClearList()}>Clear list</Button>
			</ListView>
			<BottomBar>
				<div className="flex justify-between items-center gap-2 max-w-sm">
					<SearchBar
						id={"searchInput"}
						placeholder={"Search shopping list..."}
						setSearchQuery={setSearchQuery}
					/>

					<IconButton
						icon="fa-check-double"
						className="bg-[#e9e9e9]"
						onClick={() => clearCheckedItems()}
					/>
				</div>
				<Menu />
			</BottomBar>
		</Container>
	);
};

export default ShoppingListPage;
