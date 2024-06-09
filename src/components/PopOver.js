import React from "react";

const PopOver = ({ setPopoverIsOpen, children, setEditing, editing }) => {
	const closePopOver = () => {
		setPopoverIsOpen(false);
		editing && setEditing(false);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-10">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg flex-col align-top">
				<button onClick={closePopOver} className="absolute top-2 right-4">
					<span class="material-symbols-outlined text-sm font-bold">close</span>
				</button>

				{children}
			</div>
		</div>
	);
};

export default PopOver;
