import React from "react";
import Nav from "../../Nav";
import Sort from "../../Sort";
import Filter from "../../Filter";
// import Popover from "../../components/Popover";
// Import list
import SearchBar from "../../SearchBar";

const ListPage = ({
	filter,
	setFilter,
	pantryItems,
	setSort,
	// toggleShoppingList,
}) => {
	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between min-h-screen">
			<div class="border-solid border-black border-2 border-t-0 border-x-0 bg-white py-2">
				<div class="flex justify-between pb-2 mr-3">
					<Nav pageTitle="Pantry" link="/" />
					<Sort sortType="Pantry" pantryItems={pantryItems} setSort={setSort} />
				</div>
				<Filter filter={filter} setFilter={setFilter} />
			</div>
			{/* <div className="h-screen overflow-y-auto overflow-x-visible flex-grow pb-56">
				{popoverIsOpen && (
					<PopOver
						setPopoverIsOpen={setPopoverIsOpen}
						toggleShoppingList={toggleShoppingList}
						removeItemFromList={removeItemFromList}
						currentItem={currentItem}
					></PopOver>
				)} */}
			{/* PANTRY ITEMS */}
			{/* {filteredPantryItems.length > 0 ? (
					<PantryItemList
						filteredPantryItems={filteredPantryItems}
						pantryItems={pantryItems}
						filter={filter}
						toggleOnList={toggleOnList}
						toggleShoppingList={toggleShoppingList}
						openPopover={openPopover}
						checkOffItem={checkOffItem}
						toggleStatus={toggleStatus}
						onChange={() => checkOffItem}
					/>
				) : (
					<div className="text-center pt-4">
						{toggleShoppingList ? (
							"Woohoo! All done! 🙌🏻"
						) : (
							<div>
								<span>Whoops! No items found 😱</span>
								<CreatePantryItem />
							</div>
						)}
					</div>
				)} */}
			{/* PANTRY ITEMS */}
			{/* {toggleShoppingList && (
					<div className=" flex justify-center pt-4">
						<button
							className="bg-pepper text-white font-semibold p-2"
							onClick={() => clearList()}
						>
							Clear list
						</button>
					</div>
				)}
			</div> */}
			<div className="fixed inset-x-0 bottom-0">
				{/* SEARCH BAR */}
				<SearchBar
					id={"searchInput"}
					placeholder={"Search pantry..."}
					pantryItems={pantryItems}
				/>
				{/* SEARCH BAR */}
				{/* <div className="bg-gray-200 p-4">
					<div className="flex items-center justify-between gap-1">
						<button
						className={`w-full p-2 ${toggleShoppingList ? "bg-gray-300 text-black/50" : "bg-white"} text-center font-semibold`}
						onClick={onClick}
						>
							Pantry
						</button>
						<button
						className={`w-full p-2 ${!toggleShoppingList ? "bg-gray-300 text-black/50" : "bg-white"} text-center font-semibold`}
						onClick={onClick}
						>
							Shopping list
						</button>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default ListPage;
