import React from "react";

// tag--${label.replace(" ", "-").toLowerCase()}

const Tag = ({
	label,
	onClick,
	color,
	isActive,
	activeColor,
	size,
	className,
}) => {
	const colors = {
		default: "bg-salt text-pepper/75 border border-solid border-pepper/10",
		transparent: `bg-transparent outline-none text-pepper/75`,
		green: "bg-mint text-broccoli",
	};

	const activeColors = {
		white: "bg-white shadow-sm shadow-pepper/10",
		green: "border-none text-broccoli/75 bg-mint shadow-sm shadow-broccoli/20",
	};

	const sizes = {
		xs: "text-xs font-base",
		sm: "text-sm",
		md: "text-base",
	};

	return (
		<div
			className={`flex items-center h-fit w-fit font-semibold rounded-full px-4 py-1 capitalize tracking-wide cursor-pointer ${size ? sizes[size] : sizes["md"]} ${color && !isActive ? colors[color] : colors["default"]} ${isActive && activeColors[activeColor]} ${className}`}
			onClick={onClick}
		>
			<span className="whitespace-nowrap">{label}</span>
		</div>
	);
};

export default Tag;
