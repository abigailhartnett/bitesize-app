import React, { useState } from "react";
import pantry from "../data/pantry";
import Tag from "./Tag";
import IconButton from "./buttons/IconButton";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const Filter = ({ pantry, filterBy, pantryOptions, setPantryOptions }) => {
	const [recipeOptions, setRecipeOptions] = useState([]);
	const [storeOptions, setStoreOptions] = useState([]);

	const [isOpen, setIsOpen] = useState(false);

	const filterOptions = {
		pantry: ["in stock", "low", "out"],
		recipe: ["favorites", "dinner", "cook time: <30 mins"],
		store: ["Costco", "Safeway"],
	};

	const filter =
		filterBy === "pantry"
			? pantryOptions
			: filterBy === "recipe"
				? recipeOptions
				: filterBy === "store"
					? storeOptions
					: "";

	const options = filterOptions.pantry.map((option) => {
		return <option>{option}</option>;
	});

	// Note:Move this function to the Tag component?
	let tags = [];

	// filter.map((option) => {
	// 	return <Tag label={option.status} type="close" />;
	// });

	const handleChange = (e) => {
		setPantryOptions((currentOptions) => {
			if (currentOptions.some((option) => option.status === e.target.value)) {
				return currentOptions.filter(
					(option) => option.status !== e.target.value
				);
			} else {
				return [
					...currentOptions,
					...pantry.filter(
						(item) =>
							item.status === e.target.value && !currentOptions.includes(item)
					),
				];
			}
		});
	};

	const handleKeyDown = (e) => {
		if (e.key === "Tab" && isOpen) {
			e.preventDefault();
		} else if (e.key === "Escape") {
			setIsOpen(false);
		}
	};

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<div>
			{console.log(pantryOptions)}
			<div className="flex items-center">
				<IconButton icon={faFilter} onClick={handleClick} />
				{tags}
			</div>
			{isOpen && (
				<div class="absolute">
					<select
						multiple={true}
						value={filter}
						onClick={handleChange}
						onKeyDown={handleKeyDown}
						onBlur={handleClose}
						className="bg-blue-400"
					>
						{options}
					</select>
				</div>
			)}
		</div>
	);
};

export default Filter;
