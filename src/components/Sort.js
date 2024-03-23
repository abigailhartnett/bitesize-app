import React from "react";

const Sort = ({ sortType, data }) => {
	return (
		<div className="flex">
			{sortType === "Pantry" ? (
				<div className="flex items-center gap-2 font-semibold">
					<label for="sort" className="text-xs">
						Sort by
					</label>
					<select className="flex items-center gap-4 text-sm" id="sort">
						<option
							className="sortOption text-sm font-semibold"
							onSelect={() => data.sort()}
						>
							Aisle
						</option>
						<option className="sortOption text-sm font-semibold">Status</option>
						<option className="sortOption text-sm font-semibold">
							Expiration
						</option>
					</select>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};
export default Sort;
