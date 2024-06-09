import React, { useState, useEffect } from "react";
import Tag from "./Tag";

const Filter = ({ filter, setFilter, options }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [tags, setTags] = useState([]);

	const displayOptions = options?.map((option, index) => {
		return <option key={index}>{option}</option>;
	});

	const removeTags = (tagToRemove) => {
		setFilter(filter?.filter((tag) => tag !== tagToRemove));
	};

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const handleFilterChange = (e) => {
		if (
			filter &&
			!filter.includes(e.target.value) &&
			options.includes(e.target.value)
		) {
			setFilter([...filter, e.target.value]);
		} else {
			filter && setFilter(filter.filter((value) => value !== e.target.value));
		}

		setTags(filter);
	};

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
		<div className="flex gap-2 items-center mb-4">
			<button onClick={handleClick}>
				<span class="material-symbols-outlined px-3">filter_list</span>
			</button>
			<div className="flex gap-2">{tagOptions}</div>
			{isOpen && (
				<div class="absolute top-24 left-2">
					<select multiple={true} value={filter} onChange={handleFilterChange}>
						{displayOptions}
					</select>
				</div>
			)}
		</div>
	);
};

export default Filter;
