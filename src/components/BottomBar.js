import React from "react";
import Menu from "./Menu";

const BottomBar = ({ children }) => {
	return (
		<div className="bg-white px-4 mx-auto pb-9 w-full">
			<div className="flex justify-between items-center gap-2">{children}</div>
			<Menu />
		</div>
	);
};

export default BottomBar;
