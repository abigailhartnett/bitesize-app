import React from "react";

import { Sort, Filter, SearchBar } from "bitesize-app/components";

import { useFilter } from "bitesize-app/hooks";

const ListPage = ({
	pantryItems,
	setSort,
	children,
	// toggleShoppingList,
}) => {
	const [filter, setFilter] = useFilter();

	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between min-h-screen">
			<div class="border-solid border-black border-2 border-t-0 border-x-0 bg-white py-2">
				<div class="flex justify-between pb-2 mr-3">
					<Sort sortType="Pantry" pantryItems={pantryItems} setSort={setSort} />
				</div>
				<Filter filter={filter} setFilter={setFilter} />
			</div>
			{children}
			<div className="fixed inset-x-0 bottom-0">
				<SearchBar
					id={"searchInput"}
					placeholder={"Search pantry..."}
					pantryItems={pantryItems}
				/>
			</div>
		</div>
	);
};

export default ListPage;
