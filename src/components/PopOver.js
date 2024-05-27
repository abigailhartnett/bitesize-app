import React from "react";
import PantryItemList from "./calculations/PantryItemList";
import CreatePantryItem from "./forms/CreatePantryItem";
import SearchBar from "./SearchBar";

const PopOver = ({
	filteredPantryItems,
	setPopoverIsOpen,
	toggleShoppingList,
	removeItemFromList,
	currentItem,
	currentPage,
	addToRecipe,
	searchQuery,
	setSearchQuery,
	pantryItems,
}) => {
	const closePopOver = () => {
		setPopoverIsOpen(false);
	};

	return (
		<div>
			<div className="fixed inset-0 bg-black bg-opacity-50 z-10">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg flex-col align-top">
					<button onClick={closePopOver} className="absolute top-2 right-4">
						<span class="material-symbols-outlined text-sm font-bold">
							close
						</span>
					</button>

					{currentPage === "/recipes/create-recipe" ? (
						<>
							<div className="mt-4 h-52 overflow-y-auto overflow-x-visible flex-grow pb-56">
								{filteredPantryItems.length > 0 ? (
									<PantryItemList
										filteredPantryItems={filteredPantryItems}
										addToRecipe={addToRecipe}
										currentPage={currentPage}
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
								)}
							</div>
							<SearchBar
								id={"searchInput"}
								placeholder={"Search pantry..."}
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
								pantryItems={pantryItems}
							/>
						</>
					) : (
						<>
							<div className="my-4">
								<button
									className="font-semibold flex gap-2"
									onClick={() => removeItemFromList(currentItem.id)}
								>
									<span>{currentItem.name}</span>
									<span class="material-symbols-outlined text-sm">edit</span>
								</button>
							</div>
							<div>
								{/* <div>Related Recipes</div> */}

								{currentItem.onList && toggleShoppingList && (
									<button
										className="bg-pepper text-salt p-2"
										onClick={removeItemFromList}
									>
										Remove from list
									</button>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PopOver;
