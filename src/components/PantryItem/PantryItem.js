import React from "react";
import "./pantryItem.css";
import { pantry } from "../../data/pantry";
import IconButton from "../buttons/IconButton/IconButton";
import Tag from "../Tag/Tag";

const PantryItem = () => {
	const pantryItems = pantry.map((item) => {
		return (
			<div className="wrapper">
				<div className="list-item">
					<div className="pantry-item">
						<i className={item.icon}></i>
						<div className="pantry-item__label">
							<span className="pantry-item__heading">{item.name}</span>
							<span className="pantry-item__subheading">{item.aisle}</span>
						</div>
					</div>
					<div className="controls">
						<Tag label={item.status} />
						<div className="icon-button">
							<IconButton />
						</div>
					</div>
				</div>
			</div>
		);
	});

	return <div>{pantryItems}</div>;
};

export default PantryItem;
