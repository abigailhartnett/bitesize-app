import React from "react";

const TopBar = ({ children, pageTitle }) => {
	return (
		<div className="pb-4">
			<h1 className="font-extrabold text-3xl my-6 w-full">{pageTitle}</h1>
			{children}
		</div>
	);
};

export default TopBar;
