import React from "react";

const Button = ({ children, onClick, type, className }) => {
	return (
		<button
			onClick={onClick}
			type={type}
			className={`bg-pepper text-salt p-4 text-center font-semibold rounded-2xl w-full ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
