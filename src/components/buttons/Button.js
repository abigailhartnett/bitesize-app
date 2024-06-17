import React from "react";

const Button = ({ children, onClick, type }) => {
	return (
		<button
			onClick={onClick}
			type={type}
			className="bg-pepper text-salt p-4 text-center font-semibold rounded-2xl w-full"
		>
			{children}
		</button>
	);
};

export default Button;
