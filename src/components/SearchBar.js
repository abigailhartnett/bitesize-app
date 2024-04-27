import React from "react";

const SearchBar = ({
	placeholder,
	pantryItems,
	setSearch,
	searchQuery,
	setSearchQuery,
}) => {
	const filterItems = (searchQuery) => {
		const filteredItems = pantryItems.filter((item) => {
			return item.name.toLowerCase().includes(searchQuery.toLowerCase());
		});
		return filteredItems;
	};

	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);
		setSearch(filterItems(e.target.value));
	};

	return (
		<div className="w-full border-solid border-black border-2 flex items-center gap-2 p-1 bg-white">
			<i class="fa-solid fa-search"></i>
			<input
				name="search"
				id="search"
				type="text"
				placeholder={placeholder}
				value={searchQuery}
				onChange={(e) => handleInputChange(e)}
				className="w-full"
			></input>
		</div>
	);
};

export default SearchBar;
