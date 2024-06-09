import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../config/supabaseClient";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
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

const ShoppingListPage = ({ setSort, pantryItems, setPantryItems }) => {
	const [currentItem, setCurrentItem] = useState(null);
	const [filteredItems] = useSearch(pantryItems, "name");
	const filterOptions = ["in stock", "out", "low"];
	const [filter, setFilter] = useFilter(filterOptions);
	const [popoverIsOpen, setPopoverIsOpen] = usePopover();

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
			filteredItems.includes(item)
	);

	return (
		<Container>
			<TopBar pageTitle="Shopping list">
				<Sort sortType="Pantry" pantryItems={pantryItems} setSort={setSort} />
			</TopBar>
			<Filter
				filter={filter}
				setFilter={setFilter}
				options={["in stock", "low", "out"]}
			/>
			<ListView>
				{popoverIsOpen && (
					<PopOver setPopoverIsOpen={setPopoverIsOpen}>
						{currentItem?.onList && (
							<>
								<div className="my-4">
									<button className="font-semibold flex gap-2">
										<span>{currentItem?.name}</span>
										<span class="material-symbols-outlined text-sm">edit</span>
									</button>
								</div>
								<Button onClick={() => removeItemFromList(currentItem?.id)}>
									Remove from list
								</Button>
							</>
						)}
					</PopOver>
				)}
				{filteredPantryItems?.length > 0 ? (
					<PantryItemList
						filteredPantryItems={filteredPantryItems}
						pantryItems={pantryItems}
						setPantryItems={setPantryItems}
						openPopover={openPopover}
						currentPage={currentPage}
					/>
				) : (
					<div className="text-center pt-4">Woohoo! All done! 🙌🏻</div>
				)}
			</ListView>
			<div className="fixed inset-x-0 bottom-0">
				<Button onClick={() => clearList()}>Clear list</Button>
				<Menu />
			</div>
		</Container>
	);
};

export default ShoppingListPage;
