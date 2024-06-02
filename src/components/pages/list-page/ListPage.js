import React from "react";
import Nav from "../../Nav";
import Sort from "../../Sort";
import Filter from "../../Filter";
// import Popover from "../../components/Popover";
// Import list
import SearchBar from "../../SearchBar";
import { useFilter } from "../../../hooks/useFilter";

const ListPage = ({
	pantryItems,
	setSort,
	pageTitle,
	children,
	// toggleShoppingList,
}) => {
	const [filter, setFilter] = useFilter();

	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between min-h-screen">
			<div class="border-solid border-black border-2 border-t-0 border-x-0 bg-white py-2">
				<div class="flex justify-between pb-2 mr-3">
					<Nav pageTitle={pageTitle} link="/" />
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
