import React from "react";

const Search = ({ placeholder }) => {
	return (
		<div className="w-full">
			<input
				placeholder={placeholder}
				className="w-full border-solid border-black border-2"
				type="search"
			></input>
		</div>
	);
};

export default Search;
