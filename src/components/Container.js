import React from "react";
// import { useWindowSize } from "../hooks/useWindowSize";

const Container = ({ children }) => {
	// const windowSize = useWindowSize();

	return (
		<div
			className="grid grid-rows-[auto_auto_1fr_auto] justify-center p-4 pb-0 fixed top-0 left-0 w-full h-full"
			style={
				{
					// height: `${windowSize.height}px`,
				}
			}
		>
			{children}
		</div>
	);
};

export default Container;
