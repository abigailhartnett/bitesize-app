import React from "react";

const BottomBar = ({ children }) => {
	return <div className="bg-white fixed inset-x-0 bottom-0">{children}</div>;
};

export default BottomBar;
