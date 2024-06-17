import React from "react";
import supabase from "../../config/supabaseClient";
import IconButton from "./IconButton";

const StatusButton = ({
	pantryItems,
	setPantryItems,
	item,
	showShoppingList,
}) => {
	const statuses = ["in stock", "low", "out"];

	const icon =
		item.status === "out"
			? "fa-circle"
			: item.status === "low"
				? "fa-circle-half-stroke"
				: "fa-circle";

	const statusColor =
		item.status === "out"
			? "text-tomato"
			: item.status === "low"
				? "text-mustard"
				: "text-broccoli";

	const toggleStatus = async (id) => {
		// Find the item
		const item = pantryItems.find((item) => item.id === id);
		if (!item) {
			console.log(`Item with id ${id} not found`);
			return;
		}

		// Get status index
		const getNextStatus = (currentStatus) => {
			const currentIndex = statuses.indexOf(currentStatus);
			if (currentIndex === -1 || currentIndex === statuses.length - 1) {
				return statuses[0];
			} else {
				return statuses[currentIndex + 1];
			}
		};

		// Toggle the onList property
		const updatedItem = {
			...item,
			status: getNextStatus(item.status),
			prevStatus: getNextStatus(item.status),
		};

		// Update the item in the state
		setPantryItems((prevItems) =>
			prevItems.map((item) => (item.id === id ? updatedItem : item))
		);

		// Update the item in Supabase
		const { error } = await supabase
			.from("pantry")
			.update({
				status: updatedItem.status,
				prevStatus: updatedItem.prevStatus,
			})
			.eq("id", id);

		if (error) {
			console.log(error);
		}
	};

	return (
		<IconButton
			icon={icon}
			onClick={() => toggleStatus(item.id)}
			className={statusColor}
			type={item.status === "out" ? "fa-regular" : "fa-solid"}
			size="xl"
		/>
	);
};

export default StatusButton;
