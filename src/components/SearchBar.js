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
		<div className="my-2 w-full">
			<div className="flex items-center gap-2 p-1 bg-[#e9e9e9] rounded-2xl h-12 pl-4">
				<i class="fa-solid fa-search"></i>
				<input
					id={id}
					name="search"
					type="text"
					value={input}
					placeholder={placeholder}
					onChange={(e) => handleInputChange(e)}
					className="w-full bg-[#e9e9e9]"
				></input>
				<IconButton icon={"fas fa-close"} onClick={clearSearch} />
			</div>
		</div>
	);
};

export default SearchBar;
