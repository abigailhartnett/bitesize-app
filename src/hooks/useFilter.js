import { useState } from "react";

export const useFilter = (filterOptions) => {
	const [filter, setFilter] = useState(filterOptions);

	return [filter, setFilter];
};
