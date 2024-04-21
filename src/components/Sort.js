import React, { useEffect } from "react";

const Sort = ({ sortType, pantryItems, setSort }) => {
	const sortItems = (sortType) => {
		sortType = sortType.toLowerCase();
		const sortedItems = [...pantryItems].sort((a, b) => {
			if (a[sortType] < b[sortType]) {
				return -1;
			}
			if (a[sortType] > b[sortType]) {
				return 1;
			}
			return 0;
		});

		setSort(sortedItems);
		console.log(sortedItems);
	};

	const handleChange = (e) => {
		sortItems(e.target.value);
	};

	useEffect(() => {
		sortType = "aisle";
		const sortedItems = [...pantryItems].sort((a, b) => {
			if (a[sortType] < b[sortType]) {
				return -1;
			}
			if (a[sortType] > b[sortType]) {
				return 1;
			}
			return 0;
		});

		setSort(sortedItems);
		console.log(sortedItems);
	}, []);

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
