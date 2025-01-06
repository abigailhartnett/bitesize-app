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
	Container,
	Menu,
	Button,
} from "bitesize-app/components";
import { EditPantryItem, CreatePantryItem } from "bitesize-app/forms";
import PantryItemCard from "./PantryItemCard";
import { PANTRY_FILTER_OPTIONS } from "../constants";

const PantryPage = () => {
	const { pantryItems, setPantryItems, fetchError } = usePantry();

	const [editing, setEditing] = useState(false);

	const { currentItem, setCurrentItem } = useFindItem();
	const [filteredItems, setSearchQuery] = useSearch(pantryItems, "name");
	const [filter, setFilter] = useFilter(PANTRY_FILTER_OPTIONS);

	const { popoverIsOpen, setPopoverIsOpen, openPopover, closePopover } =
		usePopover(pantryItems, setCurrentItem);

	const { filteredPantryItems } = usePantryItems(
		pantryItems,
		filter,
		filteredItems
	);

	if (fetchError) {
		return <div>{fetchError}</div>;
	}

	if (!pantryItems) {
		return <div>Loading...</div>;
	}

	return (
		<Container>
			<TopBar pageTitle="Pantry">
				<Filter filter={filter} setFilter={setFilter} />
				<SearchBar
					id={"searchInput"}
					placeholder={"Search pantry..."}
					setSearchQuery={setSearchQuery}
				/>
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
										pantryItems={pantryItems}
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
						pantryItems={pantryItems}
						setPantryItems={setPantryItems}
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
						<CreatePantryItem pantryItems={pantryItems} />
					</div>
				)}
			</ListView>
			<Menu />
		</Container>
	);
};

export default PantryPage;
