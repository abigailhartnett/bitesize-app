import React from "react";

const TopBar = ({ children, pageTitle }) => {
	return (
		<>
			{pageTitle && (
				<h1 className="font-extrabold text-3xl my-4 ml-2 w-full capitalize">
					{pageTitle}
				</h1>
			)}
			<div className="flex flex-col gap-2 mb-2">{children}</div>
		</>
	);
};

export default TopBar;
