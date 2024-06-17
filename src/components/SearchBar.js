import React from "react";

const SearchBar = ({ placeholder, id, setSearchQuery }) => {
	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div className="py-2">
			<div className="flex items-center gap-2 p-1 bg-[#e9e9e9] max-w-sm rounded-2xl h-12 px-4">
				<i class="fa-solid fa-search"></i>
				<input
					id={id}
					name="search"
					type="text"
					placeholder={placeholder}
					onChange={(e) => handleInputChange(e)}
					className="w-full bg-[#e9e9e9]"
				></input>
			</div>
		</div>
	);
};

export default SearchBar;
