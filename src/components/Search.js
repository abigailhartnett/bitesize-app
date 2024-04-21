import React, { useState, useEffect } from "react";

const Search = ({
	placeholder,
	pantryItems,
	searchFilter,
	setSearchFilter,
	searchQuery,
	setSearchQuery,
}) => {
	const filterItems = (searchQuery) => {
		if (pantryItems) {
			const filteredItems = pantryItems.filter((item) => {
				return item.name.toLowerCase().includes(searchQuery.toLowerCase());
			});
			return filteredItems;
		} else {
			return "oops!";
		}
	};

	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);

		setSearchFilter(filterItems(e.target.value));
	};

	useEffect(() => {
		console.log(searchQuery);
		console.log(searchFilter);
	}, [handleInputChange]);

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

export default Search;
