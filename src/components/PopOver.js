import React from "react";
import IconButton from "./buttons/IconButton";

const PopOver = ({ setPopoverIsOpen, children, setEditing, editing }) => {
	const closePopOver = () => {
		setPopoverIsOpen(false);
		editing && setEditing(false);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-10">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-8 rounded-2xl flex-col align-top w-10/12 max-h-96 overflow-y-scroll">
				<IconButton
					icon="fa-xmark"
					onClick={closePopOver}
					faStyle="fa-solid"
					size="lg"
					className="absolute top-2 left-4 text-pepper"
				/>
				{children}
			</div>
		</div>
	);
};

export default PopOver;
