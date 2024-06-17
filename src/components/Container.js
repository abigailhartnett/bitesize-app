import React from "react";

const Container = ({ children }) => {
	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between mx-auto px-2">
			{children}
		</div>
	);
};

export default Container;
