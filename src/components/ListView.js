import React from "react";
import { useWindowSize } from "../hooks/useWindowSize";

const ListView = ({ children }) => {
	const windowSize = useWindowSize();

	return (
		<div
			className="overflow-y-auto overflow-x-visible pt-4"
			style={{ height: `calc(${windowSize.height}px - 320px)` }}
		>
			{children}
		</div>
	);
};

export default ListView;
