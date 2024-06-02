import React, { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { useFilter } from "../hooks/useFilter";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import SearchBar from "../components/SearchBar";
import CreatePantryItem from "../forms/CreatePantryItem";
import PopOver from "../components/PopOver";
import PantryItemList from "../components/calculations/PantryItemList";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar";
import ListView from "../components/ListView";

const PantryPage = ({ setSort, pantryItems, setPantryItems }) => {
	const [popoverIsOpen, setPopoverIsOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState(null);

	const [filteredItems, setSearchQuery] = useSearch(pantryItems, "name");
	const [filter, setFilter] = useFilter();

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
		<div className="flex flex-col justify-between">
			<TopBar pageTitle="Pantry">
				<Sort sortType="Pantry" pantryItems={pantryItems} setSort={setSort} />
			</TopBar>
			<Filter filter={filter} setFilter={setFilter} />
			<ListView>
				{popoverIsOpen && (
					<PopOver
						setPopoverIsOpen={setPopoverIsOpen}
						currentItem={currentItem}
					>
						{currentItem && (
							<>
								<div className="my-4">
									<button className="font-semibold flex gap-2">
										<span>{currentItem?.name}</span>
										<span class="material-symbols-outlined text-sm">edit</span>
									</button>
								</div>
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
					/>
				) : (
					<div className="text-center pt-4">
						<div>
							<span>Whoops! No items found 😱</span>
							<CreatePantryItem />
						</div>
					</div>
				)}
			</ListView>
			<div className="fixed inset-x-0 bottom-0">
				<SearchBar
					id={"searchInput"}
					placeholder={"Search pantry..."}
					setSearchQuery={setSearchQuery}
				/>
				<Menu />
			</div>
		</div>
	);
};

export default PantryPage;
