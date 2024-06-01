import React from "react";
import supabase from "../../config/supabaseClient";

const StatusButton = ({
	pantryItems,
	setPantryItems,
	item,
	showShoppingList,
}) => {
	const statuses = ["in stock", "low", "out"];

	const icon =
		item.status === "out"
			? "radio_button_unchecked"
			: item.status === "low"
				? "radio_button_partial"
				: "radio_button_checked";

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
		<button onClick={() => toggleStatus(item.id)}>
			<span
				class={`material-symbols-outlined ${showShoppingList && item.checked ? `${statusColor}-50` : statusColor}`}
			>
				{icon}
			</span>
		</button>
	);
};

export default StatusButton;
