import React from "react";

const SearchBar = ({ placeholder, id, setSearchQuery }) => {
	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div className="w-full border-solid border-black border-2 flex items-center gap-2 p-1 bg-white max-w-sm">
			<i class="fa-solid fa-search"></i>
			<input
				id={id}
				name="search"
				type="text"
				placeholder={placeholder}
				onChange={(e) => handleInputChange(e)}
				className="w-full"
			></input>
		</div>
	);
};

export default SearchBar;
