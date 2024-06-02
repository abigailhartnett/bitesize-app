import React, { useState } from "react";

export const usePopover = () => {
	const [popoverIsOpen, setPopoverIsOpen] = useState(false);

	return [popoverIsOpen, setPopoverIsOpen];
};
