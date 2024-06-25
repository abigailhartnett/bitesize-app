import React from "react";

const BottomBar = ({ children }) => {
	return (
		<div className="bg-white mx-auto pb-9 w-full">
			<div className="flex justify-between items-center gap-2">{children}</div>
		</div>
	);
};

export default BottomBar;
