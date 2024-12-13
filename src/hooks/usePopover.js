import { useState } from "react";
import { useFindItem } from "bitesize-app/hooks";

export const usePopover = (pantryItems, setCurrentItem) => {
	const [popoverIsOpen, setPopoverIsOpen] = useState(false);

	// todo: update this away from "pantryItems" to make it more generic
	const { findItemById } = useFindItem(pantryItems);

	const openPopover = (id) => {
		setPopoverIsOpen(true);
		const item = findItemById(id);
		setCurrentItem(item);
	};

	const closePopover = () => {
		setPopoverIsOpen(false);
		setCurrentItem(null);
	};

	return {
		popoverIsOpen,
		setPopoverIsOpen,
		openPopover,
		closePopover,
	};
};
