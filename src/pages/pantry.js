import React, { useState } from "react";
import Nav from "../components/Nav";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import PantryItem from "../components/PantryItem";
import SearchBar from "../components/SearchBar";

const PantryPage = ({
	filter,
	setFilter,
	search,
	setSearch,
	searchQuery,
	sort,
	setSort,
	setSearchQuery,
	pantryItems,
}) => {
	const [toggleShoppingList, setToggleShoppingList] = useState(false);

	const onClick = (e) => {
		setToggleShoppingList(!toggleShoppingList);
	};

	useState(() => {
		setFilter(["in stock", "low", "out"]);
	}, []);

	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between min-h-screen">
			<div class="border-solid border-black border-2 border-t-0 border-x-0 bg-white py-2">
				<div class="flex justify-between pb-2 mr-3">
					<Nav pageTitle="Pantry" />
					{pantryItems && (
						<Sort
							sortType="Pantry"
							pantryItems={pantryItems}
							setSort={setSort}
						/>
					)}
				</div>
				<Filter filter={filter} setFilter={setFilter} />
			</div>
			<div className="h-screen overflow-y-auto overflow-x-visible flex-grow pb-56">
				{toggleShoppingList
					? pantryItems.map((item) => {
							if (item.onList && filter.includes(item.status)) {
								return (
									<PantryItem
										item={item}
										id={item.id}
										key={item.id + item.onList}
										icon={item.icon}
										name={item.name}
										aisle={item.aisle}
										status={item.status}
										// onList={onList}
										// onClick={() => handleToggleOnList(item.id)}
										checkbox={true}
										toggleShoppingList={toggleShoppingList}
										// onChange={(e) => checkOffItem(e.target.checked, item.id)}
									/>
								);
							}
						})
					: pantryItems.map((item) => {
							if (filter.includes(item.status)) {
								return (
									<>
										<PantryItem
											item={item}
											id={item.id}
											key={item.id + item.onList}
											icon={item.icon}
											name={item.name}
											aisle={item.aisle}
											status={item.status}
											// onList={onList}
											// onClick={() => handleToggleOnList(item.id)}
											checkbox={true}
											toggleShoppingList={toggleShoppingList}
											// onChange={(e) => checkOffItem(e.target.checked, item.id)}
										/>
									</>
								);
							}
						})}
			</div>

			<div className="fixed inset-x-0 bottom-0">
				<SearchBar
					placeholder={"Search pantry..."}
					search={search}
					setSearch={setSearch}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					pantryItems={pantryItems}
				/>
				<div className="bg-gray-200 p-5 mt-4">
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
				</div>
			</div>
		</div>
	);
};

export default PantryPage;

{
	/* <div className=" flex justify-center pt-4">
	<button
		class="bg-gray-900 text-white font-semibold p-2"
		// onClick={() => clearList()}
	>
		Remove all items
	</button>
</div>; */
}
