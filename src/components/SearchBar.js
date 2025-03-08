import React, { useState } from "react";
import { IconButton } from "bitesize-app/components";

const SearchBar = ({ placeholder, id, setSearchQuery }) => {
	const [input, setInput] = useState("");

	const handleInputChange = (e) => {
		setInput(e.target.value);
		setSearchQuery(e.target.value);
	};

	const clearSearch = () => {
		setInput("");
		setSearchQuery("");
	};

	return (
		<div className="py-2 w-full">
			<div className="flex items-center gap-2 p-1 bg-white shadow-sm shadow-pepper/20 rounded-2xl h-12 pl-4 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-pomegranate">
				<i class="fa-solid fa-search text-pomegranate"></i>
				<input
					id={id}
					name="search"
					type="text"
					value={input}
					placeholder={placeholder}
					onChange={(e) => handleInputChange(e)}
					className="w-full focus:outline-none"
				></input>
				<IconButton
					icon={"fas fa-close text-pepper/50"}
					onClick={clearSearch}
					className={`focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-pomegranate`}
				/>
			</div>
		</div>
	);
};

export default SearchBar;
