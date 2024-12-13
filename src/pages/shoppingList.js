import React, { useState } from "react";
import { useLocation } from "react-router-dom";

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
	useListFunctions,
	useSearch,
	useFilter,
	usePopover,
	useFindItem,
	usePantryItems,
} from "bitesize-app/hooks";
import { EditPantryItem } from "bitesize-app/forms";
import PantryItemCard from "./PantryItemCard";

import { PANTRY_FILTER_OPTIONS } from "../constants";

const ShoppingListPage = ({ pantryItems, setPantryItems }) => {
	const location = useLocation();
	const currentPage = location.pathname;

	const [editing, setEditing] = useState(false);

	const { currentItem, setCurrentItem } = useFindItem(pantryItems);
	const [filteredItems, setSearchQuery] = useSearch(pantryItems, "name");
	const [filter, setFilter] = useFilter(PANTRY_FILTER_OPTIONS);

	const { removeItemFromList, clearCheckedItems } = useListFunctions(
		pantryItems,
		setPantryItems,
		currentItem
	);
	const { popoverIsOpen, setPopoverIsOpen, openPopover, closePopover } =
		usePopover(pantryItems, setCurrentItem);

	const { shoppingListItems } = usePantryItems(
		pantryItems,
		filter,
		filteredItems
	);

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
				{shoppingListItems?.length > 0 ? (
					<PantryItemList
						filteredPantryItems={shoppingListItems}
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
			</ListView>
			<Menu />
		</Container>
	);
};

export default ShoppingListPage;
