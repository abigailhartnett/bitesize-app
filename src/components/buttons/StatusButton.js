import React from "react";
import supabase from "../../config/supabaseClient";
import { IconButton } from "bitesize-app/components";
import { usePantry } from "../../contexts/PantryContext";
import { STATUSES } from "../../constants";

const StatusButton = ({ item }) => {
	const { pantryItems, setPantryItems } = usePantry();

	const icon =
		item?.status === "out"
			? "fa-circle-dashed"
			: item?.status === "low"
				? "fa-duotone fa-circle-quarter-stroke"
				: "fa-duotone fa-circle-notch";

	const statusColor =
		item?.status === "out"
			? "text-pepper/20"
			: item?.status === "low"
				? "text-carrot"
				: "text-broccoli";

	const toggleStatus = async (id) => {
		// Find the item
		const item = pantryItems?.find((item) => item.id === id);
		if (!item) {
			console.log(`Item with id ${id} not found`);
			return;
		}

		// Get status index
		const getNextStatus = (currentStatus) => {
			const currentIndex = STATUSES.indexOf(currentStatus);
			if (currentIndex === -1 || currentIndex === STATUSES.length - 1) {
				return STATUSES[0];
			} else {
				return STATUSES[currentIndex + 1];
			}
		};

		// Toggle the onList property
		const updatedItem = {
			...item,
			status: getNextStatus(item?.status),
			prevStatus: getNextStatus(item?.status),
		};

		// Update the item in the state
		setPantryItems((prevItems) =>
			prevItems.map((item) => (item.id === id ? updatedItem : item))
		);

		// Update the item in Supabase
		const { error } = await supabase
			.from("pantry")
			.update({
				status: updatedItem?.status,
				prevStatus: updatedItem.prevStatus,
			})
			.eq("id", id);

		if (error) {
			console.log(error);
		}
	};

	return item?.status === "in stock" ? (
		<IconButton onClick={() => toggleStatus(item?.id)} className={statusColor}>
			<i class="fas fa-circle fa-stack-1x fa-md"></i>
			<i class="fa-duotone fa-circle-notch fa-xl"></i>
		</IconButton>
	) : (
		<IconButton
			icon={icon}
			onClick={() => toggleStatus(item.id)}
			className={statusColor}
			faStyle={item?.status === "out" ? "fa-regular" : "fa-solid"}
			size="xl"
		/>
	);
};

export default StatusButton;
