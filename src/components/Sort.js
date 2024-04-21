import React, { useEffect } from "react";

const Sort = ({ sortType, pantryItems, setSort }) => {
	const sortItems = (sortType) => {
		sortType = sortType.toLowerCase();
		const sortedItems =
			pantryItems &&
			[...pantryItems].sort((a, b) => {
				if (a[sortType] < b[sortType]) {
					return -1;
				}
				if (a[sortType] > b[sortType]) {
					return 1;
				}
				return 0;
			});

		setSort(sortedItems);
	};

	const handleChange = (e) => {
		sortItems(e.target.value);
	};

	// Line 25:14:  Assignments to the 'sortType' variable from inside React Hook useEffect will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useEffect  react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	sortType = "aisle";
	// 	const sortedItems =
	// 		pantryItems &&
	// 		[...pantryItems].sort((a, b) => {
	// 			if (a[sortType] < b[sortType]) {
	// 				return -1;
	// 			}
	// 			if (a[sortType] > b[sortType]) {
	// 				return 1;
	// 			}
	// 			return 0;
	// 		});

	// 	setSort(sortedItems);
	// }, []);

	return (
		<div className="flex pl-1">
			{sortType === "Pantry" ? (
				<div className="flex items-center gap-2 font-semibold">
					<label for="sort" className="text-xs">
						Sort by
					</label>
					<select
						className="flex items-center gap-4 text-sm"
						id="sort"
						onChange={handleChange}
					>
						<option className="sortOption text-sm font-semibold">Aisle</option>
						<option className="sortOption text-sm font-semibold">Status</option>
						<option className="sortOption text-sm font-semibold">
							Expiration
						</option>
					</select>
				</div>
			) : sortType === "Recipes" ? (
				<div className="flex items-center gap-2 font-semibold">
					<label for="sort" className="text-xs">
						Sort by
					</label>
					<select className="flex items-center gap-4 text-sm" id="sort">
						<option
							className="sortOption text-sm font-semibold"
							onSelect={() => pantryItems.sort()}
						>
							Readiness
						</option>
						<option className="sortOption text-sm font-semibold">
							Cook time
						</option>
					</select>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default Sort;
