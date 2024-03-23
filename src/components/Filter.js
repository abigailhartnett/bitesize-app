import React from "react";
import Tag from "./Tag";
import IconButton from "./buttons/IconButton";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const Filter = () => {
	return (
		<div className="flex items-center gap-2 pl-1 pb-4">
			<IconButton icon={faFilter} />
			<Tag label="in stock" type="close" />
			<Tag label="out" type="close" />
			<Tag label="low" type="close" />
		</div>
	);
};

export default Filter;
