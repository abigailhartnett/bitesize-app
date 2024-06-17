import React, { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { useFilter } from "../hooks/useFilter";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import CreatePantryItem from "../forms/CreatePantryItem";
import PopOver from "../components/PopOver";
import PantryItemList from "../components/calculations/PantryItemList";
import TopBar from "../components/TopBar";
import ListView from "../components/ListView";
import Container from "../components/Container";
import EditPantryItem from "../forms/EditPantryItem";
import Button from "../components/buttons/Button";
import BottomBar from "../components/BottomBar";

const PantryPage = ({ setSort, pantryItems, setPantryItems }) => {
	const [popoverIsOpen, setPopoverIsOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState(null);
	const [editing, setEditing] = useState(false);

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

	const findItemById = (id) => {
		const item = pantryItems.find((item) => item.id === id);
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

	const filteredPantryItems = pantryItems.filter(
		(item) =>
			item && filter?.includes(item.status) && filteredItems.includes(item)
	);

	return (
		<Container>
			<TopBar pageTitle="Pantry">
				<Filter
					filter={filter}
					setFilter={setFilter}
					options={["in stock", "out", "low", "safeway", "costco", "other"]}
				/>
			</TopBar>

			<ListView>
				{popoverIsOpen && (
					<PopOver
						setPopoverIsOpen={setPopoverIsOpen}
						currentItem={currentItem}
						setEditing={setEditing}
						editing={editing}
					>
						{currentItem && (
							<>
								{editing ? (
									<EditPantryItem
										currentItem={currentItem}
										setCurrentItem={setCurrentItem}
										pantryItems={pantryItems}
										setEditing={setEditing}
										setPopoverIsOpen={setPopoverIsOpen}
										editing={editing}
									/>
								) : (
									<div className="my-4 font-semibold">
										<span className="mb-4">{currentItem?.name}</span>
										<Button onClick={() => setEditing(true)}>Edit Item</Button>
									</div>
								)}
							</>
						)}
					</PopOver>
				)}
				{filteredPantryItems.length > 0 ? (
					<PantryItemList
						filteredPantryItems={filteredPantryItems}
						pantryItems={pantryItems}
						setPantryItems={setPantryItems}
						openPopover={openPopover}
						aisle
						status
						toggleButton
					/>
				) : (
					<div className="text-center pt-4">
						<div>
							<span>Whoops! No items found 😱</span>
							<CreatePantryItem pantryItems={pantryItems} />
						</div>
					</div>
				)}
			</ListView>
			<BottomBar>
				<SearchBar
					id={"searchInput"}
					placeholder={"Search pantry..."}
					setSearchQuery={setSearchQuery}
				/>
			</BottomBar>
		</Container>
	);
};

export default PantryPage;
