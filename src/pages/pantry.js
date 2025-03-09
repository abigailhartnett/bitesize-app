import React, { useState } from "react";
import { usePantry } from "../contexts/PantryContext";
import {
	useSearch,
	useFilter,
	useFindItem,
	usePopover,
	usePantryItems,
} from "bitesize-app/hooks";
import {
	Filter,
	SearchBar,
	PopOver,
	PantryItemList,
	TopBar,
	ListView,
	Menu,
	Button,
} from "bitesize-app/components";
import { EditPantryItem, CreatePantryItem } from "bitesize-app/forms";
import PantryItemCard from "./PantryItemCard";
import { PANTRY_FILTER_OPTIONS } from "../constants";

const PantryPage = () => {
	const { pantryItems, fetchError } = usePantry();

	const [editing, setEditing] = useState(false);

	const { currentItem, setCurrentItem } = useFindItem(pantryItems);
	const [filteredItems, setSearchQuery] = useSearch(pantryItems, "name");
	const [filter, setFilter] = useFilter(PANTRY_FILTER_OPTIONS);

	const { popoverIsOpen, setPopoverIsOpen, openPopover, closePopover } =
		usePopover(setCurrentItem);

	const { filteredPantryItems } = usePantryItems(filter, filteredItems);

	if (fetchError) {
		return <div>{fetchError}</div>;
	}

	if (!pantryItems) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<TopBar>
				<SearchBar
					id={"searchInput"}
					placeholder={"Search pantry..."}
					setSearchQuery={setSearchQuery}
				/>
				<Filter filter={filter} setFilter={setFilter} />
			</TopBar>

			<ListView>
				{popoverIsOpen && (
					<PopOver closePopover={closePopover}>
						{currentItem && (
							<>
								{editing ? (
									<EditPantryItem
										currentItem={currentItem}
										setCurrentItem={setCurrentItem}
										editing={editing}
										setEditing={setEditing}
										setPopoverIsOpen={setPopoverIsOpen}
									/>
								) : (
									<PantryItemCard item={currentItem}>
										<Button
											onClick={() => setEditing(true)}
											variant="secondary"
										>
											Edit Item
										</Button>
									</PantryItemCard>
								)}
							</>
						)}
					</PopOver>
				)}
				{filteredPantryItems.length > 0 ? (
					<PantryItemList
						filteredPantryItems={filteredPantryItems}
						openPopover={openPopover}
						status
						toggleButton
					/>
				) : (
					<div className="w-2/3 mx-auto">
						<div className="text-center">
							<h2 className="text-center text-lg font-bold mb-4">
								No Items Found
							</h2>
							<span>Try a different search term, or create a new item.</span>
						</div>
						<CreatePantryItem />
					</div>
				)}
			</ListView>
			<Menu />
		</>
	);
};

export default PantryPage;
