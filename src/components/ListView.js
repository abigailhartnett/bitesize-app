import React from "react";

const ListView = ({ children, grid }) => {
	return (
		<div
			className={`overflow-y-auto mb-[97px] ${grid ? "grid grid-cols-2 grid-rows-auto gap-4 justify-items-center content-start" : ""}`}
		>
			{children}
		</div>
	);
};

export default ListView;
