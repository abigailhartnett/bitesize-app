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
import Menu from "../components/Menu";
import Button from "../components/buttons/Button";
import PantryItemCard from "./PantryItemCard";

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
			item &&
			(filter?.includes(item.status) || filter?.includes(item.store)) &&
			filteredItems.includes(item)
	);

	return (
		<Container>
			<TopBar pageTitle="Pantry">
				<Filter
					filter={filter}
					setFilter={setFilter}
					options={["in stock", "out", "low", "safeway", "costco", "other"]}
				/>
				<SearchBar
					id={"searchInput"}
					placeholder={"Search pantry..."}
					setSearchQuery={setSearchQuery}
					pantryItems={pantryItems}
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
										setPantryItems={setPantryItems}
										setEditing={setEditing}
										setPopoverIsOpen={setPopoverIsOpen}
										editing={editing}
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
						pantryItems={pantryItems}
						setPantryItems={setPantryItems}
						openPopover={openPopover}
						aisle
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
