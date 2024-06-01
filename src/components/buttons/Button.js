import React from "react";

const Button = ({ children, onClick }) => {
	return (
		<div className="bg-pepper text-salt p-2 m-2 text-center font-semibold">
			<button onClick={onClick}>{children}</button>
		</div>
	);
};

export default Button;
