import React, { useState } from "react";
import { Tag } from "bitesize-app/components";

const Filter = ({ filter, setFilter }) => {
	const [originalFilter] = useState(filter);
	const [tags] = useState(filter);
	const [selectedTag, setSelectedTag] = useState(null);

	const handleFilterChange = (tagValue) => {
		if (tagValue === selectedTag) {
			setFilter(originalFilter);
			setSelectedTag(null);
			return;
		} else if (tagValue === "all") {
			setFilter(originalFilter);
			setSelectedTag("all");
		} else {
			setFilter([tagValue]);
			setSelectedTag(tagValue);
		}
	};

	const tagOptions = [...tags, "all"]?.sort().map((tag) => {
		return (
			<Tag
				type="close"
				label={`${tag}`}
				onClick={() => handleFilterChange(tag)}
				color="transparent"
				activeColor="white"
				// className={`${selectedTag === tag && "bg-mint text-broccoli border-mint"}`}
				isActive={selectedTag === tag}
			>
				{tag}
			</Tag>
		);
	});

	return (
		<div className="overflow-x-scroll w-full max-w-[calc(100vw-1rem)] py-1">
			<div className="flex">{tagOptions}</div>
		</div>
	);
};

export default Filter;
