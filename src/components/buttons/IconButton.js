import React from "react";

const IconButton = ({
	icon,
	onClick,
	className,
	faStyle,
	size,
	type,
	variant,
}) => {
	const buttonVariant = {
		primary: "bg-pepper text-salt",
		secondary: "bg-[#e9e9e9] text-pepper",
	};

	return (
		<button
			onClick={onClick}
			className={`cursor-pointer h-12 w-12 flex justify-center items-center active:text-salt rounded-lg px-4 ${buttonVariant[variant]} ${className}`}
			type={type ? type : "button"}
		>
			<i className={`${icon} ${faStyle} fa-${size}`}></i>
		</button>
	);
};

export default IconButton;
