import React from "react";

const TopBar = ({ children, pageTitle }) => {
	return (
		<div className="pb-4">
			<h1 className="font-extrabold text-3xl my-6 ml-2 w-full capitalize">
				{pageTitle}
			</h1>
			<div className="flex flex-col gap-2">{children}</div>
		</div>
	);
};

export default TopBar;
