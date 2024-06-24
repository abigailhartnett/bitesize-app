import React from "react";
import IconButton from "./buttons/IconButton";

const PopOver = ({ setPopoverIsOpen, children, setEditing, editing }) => {
	const closePopOver = () => {
		setPopoverIsOpen(false);
		editing && setEditing(false);
	};

	return (
		// <div className="fixed inset-0 bg-black bg-opacity-50 z-10">
		<div className="absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 bg-white px-4 pb-8 pt-14 rounded-t-2xl flex-col align-top w-full h-3/4 mt-4 border border-solid border-pepper/20">
			<IconButton
				icon="fa-xmark"
				onClick={closePopOver}
				faStyle="fa-solid"
				size="lg"
				className="absolute top-2 left-4 text-pepper bg-white rounded-full"
			/>

			<div className="h-full overflow-y-scroll">{children}</div>
		</div>
		// </div>
	);
};

export default PopOver;
