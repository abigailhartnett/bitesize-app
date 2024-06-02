import { useState } from "react";

export const useFilter = () => {
	const [filter, setFilter] = useState(["in stock", "out", "low"]);

	return [filter, setFilter];
};
