import React from "react";

const TopBar = ({ children, pageTitle }) => {
	return (
		<div class="flex justify-between pb-2 mr-3">
			<h1 className="font-semibold text-2xl my-4">{pageTitle}</h1>
			{children}
		</div>
	);
};

export default TopBar;
