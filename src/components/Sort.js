import React from "react";

const Sort = ({ sortType }) => {
  return (
    <div className="flex">
      {sortType === "Pantry" ? (
        <div className="flex items-center gap-2 font-semibold">
          <label htmlFor="sort" className="text-xs">
            Sort by
          </label>
          <select className="flex items-center gap-4 text-sm" id="sort">
            <option className="sortOption text-sm font-semibold">Aisle</option>
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
