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
				className={`${selectedTag === tag && "bg-mint text-broccoli border-mint"}`}
			>
				{tag}
			</Tag>
		);
	});

	return (
		<div className="flex gap-2 items-center overflow-x-scroll w-full max-w-[calc(100vw-2rem)]">
			<div className="flex gap-2">{tagOptions}</div>
		</div>
	);
};

export default Filter;
