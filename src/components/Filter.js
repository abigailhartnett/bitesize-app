import React, { useState, useEffect } from "react";
import Tag from "./Tag";

const Filter = ({ filter, setFilter, options }) => {
	const [tags, setTags] = useState([]);

	const displayOptions = options?.map((option, index) => {
		return <option key={index}>{option}</option>;
	});

	const removeTags = (tagToRemove) => {
		setFilter(filter?.filter((tag) => tag !== tagToRemove));
	};

	// const handleFilterChange = (e) => {
	// 	if (
	// 		filter &&
	// 		!filter.includes(e.target.value) &&
	// 		options.includes(e.target.value)
	// 	) {
	// 		setFilter([...filter, e.target.value]);
	// 	} else {
	// 		filter && setFilter(filter.filter((value) => value !== e.target.value));
	// 	}

	// 	setTags(filter);
	// };

	const tagOptions = [...tags]?.sort().map((tag) => {
		return (
			<Tag type="close" label={`${tag}`} onClick={() => removeTags(tag)}>
				{tag}
			</Tag>
		);
	});

	useEffect(() => {
		setTags(filter);
	}, [filter]);

	return (
		<div className="flex gap-2 items-center ml-4 mb-4 overflow-x-scroll">
			<div className="flex gap-2">{tagOptions}</div>
		</div>
	);
};

export default Filter;
