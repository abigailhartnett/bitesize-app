import React from "react";

const IconButton = ({
	icon,
	onClick,
	className,
	faStyle,
	size,
	type,
	variant,
	children,
}) => {
	const buttonVariant = {
		primary: "bg-pepper text-salt",
		secondary: "bg-[#e9e9e9] text-pepper",
	};

	return (
		<button
			onClick={onClick}
			className={`relative cursor-pointer ${size === "md" ? "h-8 w-8 px-2" : "h-12 w-12 px-4"} flex justify-center items-center active:text-salt rounded-lg  ${buttonVariant[variant]} ${className}`}
			type={type ? type : "button"}
		>
			{children ? (
				children
			) : (
				<i className={`${icon} ${faStyle} fa-${size}`}></i>
			)}
		</button>
	);
};

export default IconButton;
