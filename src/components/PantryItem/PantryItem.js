import React from "react";
import "./pantryItem.css";
import { pantry } from "../../data/pantry";

const PantryItem = () => {
	const pantryItems = pantry.map((item) => {
		return (
			<div className="pantry-item">
				<i className={item.icon}></i>
				<div className="pantry-item--label">
					<span className="pantry-item--heading">{item.name}</span>
					<span className="pantry-item--subheading">{item.aisle}</span>
				</div>
			</div>
		);
	});

	return <div>{pantryItems}</div>;
};

export default PantryItem;
