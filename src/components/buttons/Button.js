import React from "react";

const Button = ({ children, onClick, type, className, variant }) => {
	const buttonVariant = {
		primary: "bg-pepper text-salt",
		secondary: "bg-pepper/10 text-pepper",
		warning: "bg-raspberry text-salt",
		danger: "bg-tomato text-salt",
	};

	return (
		<button
			onClick={onClick}
			type={type}
			className={`p-4 text-center font-semibold rounded-2xl w-full ${buttonVariant[variant]} ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
