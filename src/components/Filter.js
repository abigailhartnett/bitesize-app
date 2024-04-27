import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import IconButton from "./buttons/IconButton";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const Filter = ({ filter, setFilter }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [tags, setTags] = useState([]);

	const filterOptions = {
		pantry: ["in stock", "low", "out"],
		recipe: ["favorites", "dinner", "cook time: <30 mins"],
		store: ["Costco", "Safeway"],
	};

	const options = filterOptions.pantry.map((option) => {
		return <option>{option}</option>;
	});

	const removeTags = (tagToRemove) => {
		setFilter(filter.filter((tag) => tag !== tagToRemove));
	};

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleFilterChange = (e) => {
		if (
			filter &&
			!filter.includes(e.target.value) &&
			filterOptions.pantry.includes(e.target.value)
		) {
			setFilter([...filter, e.target.value]);
		} else {
			filter && setFilter(filter.filter((value) => value !== e.target.value));
		}

		setTags(filter);
	};

	const tagOptions = [...tags].sort().map((tag) => {
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
		<div className="flex justify-between items-center pr-2">
			<div className="flex items-center">
				<IconButton icon={faFilter} onClick={handleClick} />
				<div className="flex gap-2">{tagOptions}</div>
			</div>
			{isOpen && (
				<div class="absolute">
					<select
						multiple={true}
						value={filterOptions}
						onChange={handleFilterChange}
					>
						{options}
					</select>
				</div>
			)}
		</div>
	);
};

export default Filter;
