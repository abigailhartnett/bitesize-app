import React from "react";
import Tag from "./Tag";
import IconButton from "./buttons/IconButton";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const Filter = ({ filterBy }) => {
	return (
		<div className="flex items-center">
			<IconButton icon={faFilter} />
			{filterBy === "pantry" ? (
				<div className="flex gap-2">
					<Tag label="in stock" type="close" />
					<Tag label="out" type="close" />
					<Tag label="low" type="close" />
				</div>
			) : filterBy === "recipes" ? (
				<div className="flex gap-2">
					<Tag label="favorites" type="close" />
					<Tag label="dinner" type="close" />
					<Tag label="cook time: < 30min" type="close" />
				</div>
			) : filterBy === "store" ? (
				<div className="flex gap-2">
					<Tag label="Costco" type="close" />
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default Filter;
