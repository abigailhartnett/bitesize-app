import { useState, useEffect } from "react";

export const useSearch = (items, searchKey) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredItems, setFilteredItems] = useState(items);

	useEffect(() => {
		setFilteredItems(
			items?.filter((item) =>
				item[searchKey]?.toLowerCase().includes(searchQuery?.toLowerCase())
			)
		);
	}, [items, searchQuery, searchKey]);

	return [filteredItems, setSearchQuery];
};
