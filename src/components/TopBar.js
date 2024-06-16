import React from "react";

const TopBar = ({ children, pageTitle }) => {
	return (
		<div class="flex justify-between py-6 px-4">
			<h1 className="font-extrabold text-3xl my-4">{pageTitle}</h1>
			{children}
		</div>
	);
};

export default TopBar;
