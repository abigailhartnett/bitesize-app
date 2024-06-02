import React from "react";
import { useWindowSize } from "../hooks/useWindowSize";

const ListView = ({ children }) => {
	const windowSize = useWindowSize();

	return (
		<div
			className="overflow-y-auto overflow-x-visible flex-grow pb-56 border-t-2 border-solid border-pepper"
			style={{ height: `${windowSize.height}px` }}
		>
			{children}
		</div>
	);
};

export default ListView;
